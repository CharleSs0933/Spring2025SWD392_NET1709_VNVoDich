"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, GripVertical } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { setLessons, deleteLesson, openLessonModal } from "@/state";
import { Lesson } from "@/types";
import { useDeleteLessonMutation } from "@/state/api";
import { useParams } from "next/navigation";

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
                    className={`mb-4 p-2 rounded ${
                      lessonIndex % 2 === 0
                        ? "bg-customgreys-dirtyGrey/30"
                        : "bg-customgreys-secondarybg"
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
  const params = useParams();
  const id = params.id as string;

  const [deleteLessonInCourse] = useDeleteLessonMutation();

  return (
    <div
      className=" flex justify-between items-center mb-2 bg-black/30 p-1 rounded"
      {...dragHandleProps}
    >
      <div className="w-full flex flex-col gap-1">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <GripVertical className="h-6 w-6 mb-1" />
            <h3 className="text-lg font-medium">{lesson.title}</h3>
          </div>
          <div className="flex items-center gap-[1px]">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="p-0"
              onClick={() =>
                dispatch(openLessonModal({ lessonIndex, lessonId: lesson.id }))
              }
            >
              <Edit className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="p-0"
              onClick={async () => {
                try {
                  await deleteLessonInCourse({
                    courseId: id,
                    lessonId: lesson.id.toString(),
                  }).unwrap();

                  dispatch(deleteLesson(lessonIndex));
                } catch (error) {
                  console.error("Failed to delete lesson: ", error);
                }
              }}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {lesson.description && (
          <p className="text-sm text-customgreys-dirtyGrey ml-6">
            {lesson.description}
          </p>
        )}
      </div>
    </div>
  );
};
