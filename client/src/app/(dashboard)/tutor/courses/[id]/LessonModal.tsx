import { CustomFormField } from "@/components/CustomFormField";
import CustomModal from "@/components/CustomModal";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LessonFormData, lessonSchema } from "@/lib/schemas";
import { UploadDropzone } from "@/lib/uploadthing";
import { addLesson, closeLessonModal, editLesson } from "@/state";
import { useAddLessonMutation, useUpdateLessonMutation } from "@/state/api";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { Lesson } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const LessonModal = () => {
  const params = useParams();
  const id = params.id as string;

  const [homeworkFile, setHomeworkFile] = useState<string | null>(null);

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
      homework: "",
    },
  });

  useEffect(() => {
    if (lesson) {
      methods.reset({
        title: lesson.title,
        description: lesson.description,
        learning_objectives: lesson.learning_objectives,
        materials_needed: lesson.materials_needed,
        homework: lesson.homework,
      });
      setHomeworkFile(lesson.homework || "");
    } else {
      methods.reset({
        title: "",
        description: "",
        learning_objectives: "",
        materials_needed: "",
        homework: "",
      });
    }
  }, [lesson, methods]);

  const onClose = () => {
    setHomeworkFile(null);

    dispatch(closeLessonModal());
  };

  const onSubmit = async (data: LessonFormData) => {
    const newLesson: Lesson = {
      id: Number(""),
      title: data.title,
      description: data.description,
      learning_objectives: data.learning_objectives,
      materials_needed: data.materials_needed,
      homework: homeworkFile || "",
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
          homework: homeworkFile || "",
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
          homework: homeworkFile || "",
        }).unwrap();
      } catch (error) {
        console.log("Failed to update course: ", error);
      }
    }

    methods.reset({
      title: "",
      description: "",
      learning_objectives: "",
      materials_needed: "",
    });
    onClose();
  };

  const handleRemoveFile = () => {
    setHomeworkFile(null);
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

            {homeworkFile ? (
              <div className="relative rounded-xl overflow-hidden border border-white-100/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove file" asChild side="left">
                    <Button
                      type="button"
                      className="h-auto w-auto p-1.5 bg-red-500 hover:bg-red-600"
                      onClick={handleRemoveFile}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </Hint>
                </div>
                <div className="w-full h-[400px]">
                  {" "}
                  {/* Adjustable height */}
                  <iframe
                    src={homeworkFile}
                    title="Homework PDF"
                    className="w-full h-full"
                    style={{ border: "none" }}
                  />
                  <a
                    href={homeworkFile}
                    download
                    className="text-blue-500 hover:underline text-sm mt-2 block text-center"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            ) : (
              <UploadDropzone
                endpoint={"lessonHomeWorkUploader"}
                appearance={{
                  label: {
                    color: "#FFFFFF",
                  },
                  allowedContent: {
                    color: "#FFFFFF",
                  },
                  button: {
                    color: "#7878fc",
                  },
                }}
                onClientUploadComplete={(res) => {
                  if (res?.[0]?.url) {
                    setHomeworkFile(res[0].url);
                  }
                }}
              />
            )}

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
