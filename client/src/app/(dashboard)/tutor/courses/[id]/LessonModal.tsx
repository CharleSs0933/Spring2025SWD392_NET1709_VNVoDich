import { CustomFormField } from "@/components/CustomFormField";
import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LessonFormData, lessonSchema } from "@/lib/schemas";
import { addLesson, closeLessonModal, editLesson } from "@/state";
import { useAddLessonMutation, useUpdateLessonMutation } from "@/state/api";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { Lesson } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const LessonModal = () => {
  const params = useParams();
  const id = params.id as string;

  const dispatch = useAppDispatch();
  const { isLessonModalOpen, selectedLessonIndex, selectedLessonId, lessons } =
    useAppSelector((state) => state.global.courseEditor);
  const [addLessonToCourses] = useAddLessonMutation();
  const [updateLesson] = useUpdateLessonMutation();

  const lesson =
    selectedLessonIndex !== null ? lessons[selectedLessonIndex] : null;

  const methods = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      description: "",
      learning_objectives: "",
      materials_needed: "",
    },
  });

  useEffect(() => {
    if (lesson) {
      methods.reset({
        title: lesson.title,
        description: lesson.description,
        learning_objectives: lesson.learning_objectives,
        materials_needed: lesson.materials_needed,
      });
    } else {
      methods.reset({
        title: "",
        description: "",
        learning_objectives: "",
        materials_needed: "",
      });
    }
  }, [lesson, methods]);

  const onClose = () => {
    dispatch(closeLessonModal());
  };

  const onSubmit = async (data: LessonFormData) => {
    const newLesson: Lesson = {
      id: Number(""),
      title: data.title,
      description: data.description,
      learning_objectives: data.learning_objectives,
      materials_needed: data.materials_needed,
    };

    if (selectedLessonIndex === null) {
      try {
        dispatch(addLesson(newLesson));

        await addLessonToCourses({
          courseId: id,
          title: data.title,
          description: data.description,
          learning_objectives: data.learning_objectives,
          materials_needed: data.materials_needed,
        }).unwrap();
      } catch (error) {
        console.log("Failed to update course: ", error);
      }
    } else {
      try {
        dispatch(
          editLesson({
            lessonIndex: selectedLessonIndex,
            lesson: newLesson,
          })
        );

        await updateLesson({
          courseId: id,
          lessonId: selectedLessonId?.toString(),
          title: data.title,
          description: data.description,
          learning_objectives: data.learning_objectives,
          materials_needed: data.materials_needed,
        }).unwrap();
      } catch (error) {
        console.log("Failed to update course: ", error);
      }
    }

    // toast.success(
    //   `Lesson added/updated successfully but you need to save the course to apply the changes`
    // );
    methods.reset({
      title: "",
      description: "",
      learning_objectives: "",
      materials_needed: "",
    });
    onClose();
  };

  return (
    <CustomModal isOpen={isLessonModalOpen} onClose={onClose}>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add/Edit Lesson</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <CustomFormField
              name="title"
              label="Lesson Title"
              placeholder="Write lesson title here"
            />
            <CustomFormField
              name="description"
              label="Lesson Description"
              type="textarea"
              placeholder="Write lesson description here"
            />

            <CustomFormField
              name="learning_objectives"
              label="Learning Objectives"
              type="textarea"
              placeholder="Write learning objectives here"
            />

            <CustomFormField
              name="materials_needed"
              label="Materials Needed"
              type="textarea"
              placeholder="Write materials needed here"
            />

            <div className="flex justify-end space-x-2 mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button className="bg-primary-700" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </CustomModal>
  );
};

export default LessonModal;
