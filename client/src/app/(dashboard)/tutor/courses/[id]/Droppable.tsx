"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Plus, GripVertical } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { setLessons, deleteLesson, openLessonModal } from "@/state";
import { Lesson } from "@/types";

export default function DroppableComponent() {
  const dispatch = useAppDispatch();
  const { lessons } = useAppSelector((state) => state.global.courseEditor);

  const handleLessonDragEnd = (result: any) => {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const updatedLessons = [...lessons];
    const [reorderedLesson] = updatedLessons.splice(startIndex, 1);
    updatedLessons.splice(endIndex, 0, reorderedLesson);
    dispatch(setLessons(updatedLessons));
  };

  return (
    <DragDropContext onDragEnd={handleLessonDragEnd}>
      <Droppable droppableId="lessons">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {lessons.map((lesson: Lesson, lessonIndex: number) => (
              <Draggable
                key={lesson.id}
                draggableId={lesson.id.toString()}
                index={lessonIndex}
              >
                {(draggableProvider) => (
                  <div
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.draggableProps}
                    className={`droppable-lesson ${
                      lessonIndex % 2 === 0
                        ? "droppable-lesson--even"
                        : "droppable-lesson--odd"
                    }`}
                  >
                    <LessonHeader
                      lesson={lesson}
                      lessonIndex={lessonIndex}
                      dragHandleProps={draggableProvider.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const LessonHeader = ({
  lesson,
  lessonIndex,
  dragHandleProps,
}: {
  lesson: Lesson;
  lessonIndex: number;
  dragHandleProps: any;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="droppable-lesson__header" {...dragHandleProps}>
      <div className="droppable-lesson__title-wrapper">
        <div className="droppable-lesson__title-container">
          <div className="droppable-lesson__title">
            <GripVertical className="h-6 w-6 mb-1" />
            <h3 className="text-lg font-medium">{lesson.title}</h3>
          </div>
          <div className="droppable-chapter__actions">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="p-0"
              onClick={() => dispatch(openLessonModal({ lessonIndex }))}
            >
              <Edit className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="p-0"
              onClick={() => dispatch(deleteLesson(lessonIndex))}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {lesson.description && (
          <p className="droppable-lesson__description">{lesson.description}</p>
        )}
      </div>
    </div>
  );
};
