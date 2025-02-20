import useFilter from "@/hooks/useFilter";
import { Course, Tutor } from "@/types";
import { useDebouncedCallback } from "use-debounce";

interface SearchProps {
  courses?: Course[];
  tutors?: Tutor[];
}

const Search = ({ courses, tutors }: SearchProps) => {
  const { filters, updateFilter, resetFilters } = useFilter({
    query: "",
    subject: "",
    grade: "",
    price: "",
    lessons: "",

    qualifications: "",
    teaching_style: "",
    full_name: "",
  });

  const handleSearch = useDebouncedCallback((key: string, value: string) => {
    updateFilter(key as keyof typeof filters, value);
  }, 300);

  const getUniqueValuesCourse = (key: keyof Course) => {
    return Array.from(new Set(courses?.map((item) => item[key])));
  };
  const getUniqueValuesTutor = (key: keyof Tutor) => {
    return Array.from(new Set(tutors?.map((item) => item[key])));
  };

  return (
    <div className="justify-center flex flex-col items-center mt-6">
      <input
        type="text"
        placeholder="Search for a course..."
        onChange={(e) => handleSearch("query", e.target.value)}
        className="w-full max-w-md px-4 py-2 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
        defaultValue={filters.query}
      />

      <div className="flex gap-4 mt-6 justify-center items-center flex-wrap w-full">
        {courses && (
          <>
            <select
              value={filters.subject}
              onChange={(e) => handleSearch("subject", e.target.value)}
              className="text-black p-1 rounded-xl"
            >
              <option value="">Select Subject</option>
              {getUniqueValuesCourse("subject").map((subject, index) => (
                <option key={index} value={subject?.toString()}>
                  {subject?.toString()}
                </option>
              ))}
            </select>

            <select
              value={filters.grade}
              onChange={(e) => handleSearch("grade", e.target.value)}
              className="text-black w-[6%] p-1 rounded-xl"
            >
              <option value="">Select Grade</option>
              {getUniqueValuesCourse("grade").map((grade, index) => (
                <option key={index} value={grade?.toString()}>
                  {grade?.toString()}
                </option>
              ))}
            </select>

            <select
              value={filters.price}
              onChange={(e) => handleSearch("price", e.target.value)}
              className="text-black w-[6%] p-1 rounded-xl"
            >
              <option value="">Select Price</option>
              {getUniqueValuesCourse("price").map((price, index) => (
                <option key={index} value={price?.toString()}>
                  {price?.toString()}
                </option>
              ))}
            </select>

            <select
              value={filters.lessons}
              onChange={(e) => handleSearch("lessons", e.target.value)}
              className="text-black w-[6%] p-1 rounded-xl"
            >
              <option value="">Select Total Lessons</option>
              {Array.from(
                new Set(courses?.map((item) => item.lessons?.length))
              ).map((lessonCount, index) => (
                <option key={index} value={lessonCount}>
                  {lessonCount}
                </option>
              ))}
            </select>
          </>
        )}

        {tutors && (
          <>
            <select
              value={filters.qualifications}
              onChange={(e) => handleSearch("qualifications", e.target.value)}
              className="text-black w-[6%] p-1 rounded-xl"
            >
              <option value="">Select Qualifications</option>
              {getUniqueValuesTutor("qualifications").map(
                (qualifications, index) => (
                  <option key={index} value={qualifications?.toString()}>
                    {qualifications?.toString()}
                  </option>
                )
              )}
            </select>
            <select
              value={filters.teaching_style}
              onChange={(e) => handleSearch("teaching_style", e.target.value)}
              className="text-black w-[6%] p-1 rounded-xl"
            >
              <option value="">Select Teaching Style </option>
              {getUniqueValuesTutor("teaching_style").map((style, index) => (
                <option key={index} value={style?.toString()}>
                  {style?.toString()}
                </option>
              ))}
            </select>
          </>
        )}

        <button
          onClick={resetFilters}
          className="bg-rose-500 w-[5%] p-2 rounded-xl"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Search;
