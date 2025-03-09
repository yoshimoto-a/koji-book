"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { parseSteps } from "@/app/_utils/formatSteps";
interface Props {
  value: string;
  setValue: (value: string) => void;
}
export const InputSupport: React.FC<Props> = ({ value, setValue }) => {
  const [steps, setSteps] = useState<{ number: string; text: string }[]>([
    { number: "1", text: "" },
  ]);

  const textAreaRefs = useRef<HTMLTextAreaElement[]>([]);
  const prevStepCount = useRef<number>(steps.length);

  useEffect(() => {
    console.log(value);
    if (!value) return;
    setSteps(parseSteps(value));
  }, []);

  const updateFormValue = (newSteps: { number: string; text: string }[]) => {
    const formattedText = newSteps
      .map(step =>
        /^\d+$/.test(step.number)
          ? `###STEP${step.number}###${step.text}`
          : `###TIPS${step.number}###${step.text}`
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
  const deleteStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    let stepCounter = 1;
    const updatedSteps = newSteps.map(step => {
      if (/^\d+$/.test(step.number)) {
        return { ...step, number: (stepCounter++).toString() };
      }
      return step;
    });

    setSteps(updatedSteps);
    updateFormValue(updatedSteps);
  };
  const addStep = () => {
    // 数字だけのステップ数をカウント
    const stepCount = steps.filter(step => /^\d+$/.test(step.number)).length;
    const newSteps = [
      ...steps,
      { number: (stepCount + 1).toString(), text: "" },
    ];
    setSteps(newSteps);
    updateFormValue(newSteps);
  };
  const handleNumberChange = (index: number, newValue: string) => {
    const newSteps = [...steps];
    newSteps[index].number = newValue;
    setSteps(newSteps);
    updateFormValue(newSteps);
  };

  useEffect(() => {
    console.log(value);
  }, [steps, value]);

  // ステップ追加時に最新のテキストエリアにフォーカス
  useEffect(() => {
    if (steps.length > prevStepCount.current) {
      textAreaRefs.current[steps.length - 1].focus();
    }
    prevStepCount.current = steps.length;
  }, [steps]);

  return (
    <div className="">
      {steps.map((step, index) => (
        <div
          key={index}
          className="w-full flex justify-between items-center gap-1 "
        >
          <input
            type="text"
            value={step.number}
            className="w-5"
            onChange={e => handleNumberChange(index, e.target.value)}
          />
          <textarea
            className={`border-[1px] border-dark_brown w-11/12 mb-3 rounded-md ${
              index === 0 && "mr-[21.5px]" //gap-1の4pxにfaTrashの17.5px
            }`}
            onChange={e => updateStep(index, e.target.value)}
            value={step.text}
            ref={el => {
              if (el) textAreaRefs.current[index] = el;
            }}
          />
          {index !== 0 && (
            <button type="button" onClick={() => deleteStep(index)}>
              <FontAwesomeIcon
                icon={faTrash}
                className="text-dark_brown text-xl "
              />
            </button>
          )}
        </div>
      ))}
      <div className="flex justify-end">
        <button type="button" onClick={addStep}>
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="text-dark_brown text-4xl"
          />
        </button>
      </div>
    </div>
  );
};
