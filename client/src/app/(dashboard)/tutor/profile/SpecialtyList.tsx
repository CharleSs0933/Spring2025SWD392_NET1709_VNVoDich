import { Button } from "@/components/ui/button";
import { TutorSpecialty } from "@/types";
import { Edit, ExternalLink, GripVertical, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const SpecialtyList = ({ specialties }: { specialties: TutorSpecialty[] }) => {
  return (
    <div>
      {specialties.map((specialty) => (
        <div
          className="mb-4 p-2 rounded bg-customgreys-dirtyGrey/30"
          key={specialty.id}
        >
          <SpecialtyHeader specialty={specialty} />
        </div>
      ))}
    </div>
  );
};

export default SpecialtyList;

const SpecialtyHeader = ({
  specialty,
}: //   lessonIndex,
{
  specialty: TutorSpecialty;
  //   lessonIndex: number;
}) => {
  const params = useParams();
  const id = params.id as string;

  //   const [deleteLessonInCourse] = useDeleteLessonMutation();

  return (
    <div className=" flex justify-between items-center mb-2 bg-black/30 p-1 rounded">
      <div className="w-full flex flex-col gap-1">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <GripVertical className="h-6 w-6 mb-1" />
            <h3 className="text-lg font-medium">
              {specialty.subject} ({specialty.years_experience} years of
              experience)
            </h3>
          </div>
          <div className="flex items-center gap-[1px]">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="p-0"
              //   onClick={() =>
              //     dispatch(openLessonModal({ lessonIndex, lessonId: lesson.id }))
              //   }
            >
              <Edit className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="p-0"
              //   onClick={async () => {
              //     try {
              //       await deleteLessonInCourse({
              //         courseId: id,
              //         lessonId: lesson.id.toString(),
              //       }).unwrap();

              //       dispatch(deleteLesson(lessonIndex));
              //     } catch (error) {
              //       console.log("Failed to delete lesson: ", error);
              //     }
              //   }}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {/* Certification Preview Section */}
        <div className="flex justify-between items-center ml-6">
          <a
            href={specialty.certification}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:underline"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Certification
          </a>
        </div>
      </div>
    </div>
  );
};
