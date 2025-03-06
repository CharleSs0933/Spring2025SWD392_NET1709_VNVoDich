"use client";

import { CustomFormField } from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { courseGrades, createCourseFormData } from "@/lib/utils";
import { openLessonModal, setLessons } from "@/state";
import { useGetCourseQuery, useUpdateCourseMutation } from "@/state/api";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DroppableComponent from "./Droppable";
import { courseSchema } from "@/lib/schemas";
import { CourseFormData } from "@/types";
import LessonModal from "./LessonModal";
import { courseSubjects } from "@/lib/utils";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import { UploadDropzone } from "@/lib/uploadthing";
import Hint from "@/components/Hint";
import Image from "next/image";

const CourseEditor = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: course, isLoading, refetch, isError } = useGetCourseQuery(id);
  const [updateCourse] = useUpdateCourseMutation();

  const dispatch = useAppDispatch();
  const { lessons } = useAppSelector((state) => state.global.courseEditor);

  const [courseImage, setCourseImage] = useState<string | null>(null);

  const methods = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseTitle: "",
      courseDescription: "",
      courseSubject: "",
      courseGrade: "",
      coursePrice: "0",
      courseStatus: false,
      courseImage: "",
    },
  });

  useEffect(() => {
    if (course) {
      methods.reset({
        courseTitle: course.title,
        courseDescription: course.description,
        courseSubject: course.subject,
        courseGrade: course.grade.toString(),
        coursePrice: course.price.toString(),
        courseStatus: course.status === "Published",
        courseImage: course.image,
      });
      dispatch(setLessons(course.lessons || []));
      setCourseImage(course.image || "");
    }
  }, [course, methods, dispatch]);

  const onSubmit = async (data: CourseFormData) => {
    try {
      const formData = createCourseFormData({
        ...data,
        courseImage: courseImage || "",
      });

      await updateCourse({
        courseId: id,
        formData,
      }).unwrap();

      refetch();
    } catch (error) {
      console.error("Failed to update course: ", error);
    }
  };

  const handleRemoveImage = () => {
    setCourseImage(null);
  };

  if (isLoading) return <Loading />;
  if (isError || !course) return <div>Error loading course.</div>;

  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <button
          className="flex items-center border border-customgreys-dirtyGrey rounded-lg p-2 gap-2 cursor-pointer hover:bg-customgreys-dirtyGrey hover:text-white-100 text-customgreys-dirtyGrey"
          onClick={() => router.push("/tutor/courses", { scroll: false })}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </button>
      </div>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Header
            title="Course Setup"
            subtitle="Complete all fields and save your course"
            rightElement={
              <div className="flex items-center space-x-4">
                <CustomFormField
                  name="courseStatus"
                  label={methods.watch("courseStatus") ? "Published" : "Draft"}
                  type="switch"
                  className="flex items-center space-x-2"
                  labelClassName={`text-sm font-medium ${
                    methods.watch("courseStatus")
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                  inputClassName="data-[state=checked]:bg-green-500"
                />
                <Button
                  type="submit"
                  className="bg-primary-700 hover:bg-primary-600"
                >
                  {methods.watch("courseStatus")
                    ? "Update Published Course"
                    : "Save Draft"}
                </Button>
              </div>
            }
          />
          <div className="flex justify-between md:flex-row flex-col gap-10 mt-5 font-ds-sans">
            <div className="basis-1/2">
              <div className="space-y-4">
                <CustomFormField
                  name="courseTitle"
                  label="Course Title"
                  type="text"
                  placeholder="Write course title here"
                  className="border-none"
                  initialValue={course?.title}
                />
                <CustomFormField
                  name="courseDescription"
                  label="Course Description"
                  type="textarea"
                  placeholder="Write course description here"
                  initialValue={course?.description}
                />
                <CustomFormField
                  name="courseSubject"
                  label="Course Subject"
                  type="select"
                  placeholder="Select subject here"
                  options={courseSubjects}
                  initialValue={course?.subject}
                />
                <CustomFormField
                  name="courseGrade"
                  label="Course Grade"
                  type="select"
                  placeholder="Select grade here"
                  options={courseGrades}
                  initialValue={course?.grade.toString()}
                />
                <CustomFormField
                  name="coursePrice"
                  label="Course Price"
                  type="number"
                  placeholder="0"
                  initialValue={course?.price}
                />
                {courseImage ? (
                  <div
                    className="relative aspect-video rounded-xl overflow-hidden border
                  border-white-100/10"
                  >
                    <div className="absolute top-2 right-2 ring-2 z-[10]">
                      <Hint label="Remove image" asChild side="left">
                        <Button
                          type="button"
                          className="h-auto w-auto p-1.5 bg-red-500 hover:bg-red-600"
                          onClick={handleRemoveImage}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </Hint>
                    </div>
                    <Image
                      src={courseImage}
                      alt="Course Image"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint={"courseImageUploader"}
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
                        setCourseImage(res[0].url);
                      }
                    }}
                  />
                )}
              </div>
            </div>

            <div className="bg-customgreys-darkGrey mt-4 md:mt-0 p-4 rounded-lg basis-1/2">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-secondary-foreground">
                  Lessons
                </h2>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    dispatch(
                      openLessonModal({
                        lessonIndex: null,
                        lessonId: undefined,
                      })
                    )
                  }
                  className="border-none group text-primary-700"
                >
                  <Plus className="mr-1 h-4 w-4 text-primary-700 group-hover:white-100" />
                  <span className="text-primary-700 group-hover:white-100">
                    Add Lesson
                  </span>
                </Button>
              </div>

              {isLoading ? (
                <p>Loading course content...</p>
              ) : lessons.length > 0 ? (
                <DroppableComponent />
              ) : (
                <p>No lessons available</p>
              )}
            </div>
          </div>
        </form>
      </Form>

      <LessonModal />
    </div>
  );
};

export default CourseEditor;
