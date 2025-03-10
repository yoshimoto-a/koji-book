"use client";
import { useEffect, useRef, useState } from "react";
import { parseSteps } from "@/app/_utils/formatSteps";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
export const useInputSuport = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) => {
  const [steps, setSteps] = useState<{ index: string; text: string }[]>([
    { index: "1", text: "" },
  ]);

  const textAreaRefs = useRef<HTMLTextAreaElement[]>([]);
  const prevStepCount = useRef<number>(steps.length);

  useEffect(() => {
    if (!value) return;
    setSteps(parseSteps(value));
  }, [value]);

  const updateFormValue = (newSteps: { index: string; text: string }[]) => {
    const formattedText = newSteps
      .map(step =>
        /^\d+$/.test(step.index)
          ? `###STEP${step.index}###${step.text}`
          : `###TIPS${step.index}###${step.text}`
      )
      .join("\n");

    setValue(formattedText);
  };

  const updateStep = (index: number, text: string) => {
    const newSteps = [...steps];
    newSteps[index].text = text;
    setSteps(newSteps);
    updateFormValue(newSteps);
  };
  const renumberSteps = (steps: { index: string; text: string }[]) => {
    let stepCounter = 1;
    return steps.map(step => {
      if (/^\d+$/.test(step.index)) {
        return { ...step, index: (stepCounter++).toString() }; // 修正: `number` ではなく `index` を更新
      }
      return step;
    });
  };
  const deleteStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    const updatedSteps = renumberSteps(newSteps);

    setSteps(updatedSteps);
    updateFormValue(updatedSteps);
  };
  const addStep = () => {
    // 数字だけのステップ数をカウント
    const stepCount = steps.filter(step => /^\d+$/.test(step.index)).length;
    const newSteps = [
      ...steps,
      { index: (stepCount + 1).toString(), text: "" },
    ];
    setSteps(newSteps);
    updateFormValue(newSteps);
  };
  const handleNumberChange = (index: number, newValue: string) => {
    const newSteps = [...steps];
    newSteps[index].index = newValue;
    setSteps(newSteps);
    updateFormValue(newSteps);
  };

  // ステップ追加時に最新のテキストエリアにフォーカス
  useEffect(() => {
    if (steps.length > prevStepCount.current) {
      textAreaRefs.current[steps.length - 1].focus();
    }
    prevStepCount.current = steps.length;
  }, [steps]);

  //以下ドラッグ＆ドロップ用機能
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;
    const oldIndex = parseInt(active.id.toString(), 10);
    const newIndex = parseInt(over.id.toString(), 10);
    const newSteps = renumberSteps(arrayMove(steps, oldIndex, newIndex));
    setSteps(newSteps);
    updateFormValue(newSteps);
  };
  return {
    handleNumberChange,
    addStep,
    deleteStep,
    updateStep,
    steps,
    setSteps,
    textAreaRefs,
    updateFormValue,
    sensors,
    handleDragEnd,
  };
};
