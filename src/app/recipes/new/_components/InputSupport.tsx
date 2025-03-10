"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useInputSuport } from "../_hooks/useInputSupport";
import { SortableTipsItem } from "./SortableTipsItem";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
interface Props {
  value: string;
  setValue: (value: string) => void;
}
export const InputSupport: React.FC<Props> = ({ value, setValue }) => {
  const {
    handleNumberChange,
    addStep,
    deleteStep,
    updateStep,
    steps,
    textAreaRefs,
    sensors,
    handleDragEnd,
  } = useInputSuport({ value, setValue });

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={steps.map((_, index) => index.toString())}
          strategy={verticalListSortingStrategy}
        >
          {steps.map((step, index) => (
            <SortableTipsItem
              deleteStep={deleteStep}
              handleNumberChange={handleNumberChange}
              id={index.toString()}
              step={step}
              index={index}
              textAreaRefs={textAreaRefs}
              updateStep={updateStep}
              key={index}
            />
          ))}
        </SortableContext>
      </DndContext>
      <div className="flex justify-end">
        <button type="button" onClick={addStep}>
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="text-dark_brown text-4xl"
          />
        </button>
      </div>
    </>
  );
};
