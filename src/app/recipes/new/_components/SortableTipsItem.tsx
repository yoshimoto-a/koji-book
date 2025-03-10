import React, { RefObject } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faGripVertical } from "@fortawesome/free-solid-svg-icons";

interface Props {
  id: string;
  index: number;
  handleNumberChange: (index: number, newValue: string) => void;
  updateStep: (index: number, text: string) => void;
  step: {
    index: string;
    text: string;
  };
  deleteStep: (index: number) => void;
  textAreaRefs: RefObject<HTMLTextAreaElement[]>;
}
export const SortableTipsItem: React.FC<Props> = ({
  id,
  index,
  handleNumberChange,
  updateStep,
  step,
  deleteStep,
  textAreaRefs,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    setActivatorNodeRef,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? "z-20 cale-105" : ""}
    >
      <div className="w-full flex justify-between items-center gap-1 ">
        <div
          ref={setActivatorNodeRef}
          className="p-2 w-6 h-full flex items-center justify-center cursor-grab touch-none"
          {...attributes}
          {...listeners}
        >
          <FontAwesomeIcon
            icon={faGripVertical}
            className="text-dark_brown text-lg"
          />
        </div>
        <input
          type="text"
          value={step.index}
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
    </div>
  );
};
