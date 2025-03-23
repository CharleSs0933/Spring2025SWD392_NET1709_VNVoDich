import React, { useState } from "react";
import Image from "next/image";
import { CourseReview } from "@/types";

const Review = ({ comments }: { comments: CourseReview[] }) => {
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState<CourseReview[]>(
    comments ?? []
  );

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newEntry: CourseReview = {
        id: Date.now(),
        rating: 5,
        review_content: newComment,
        createAt: "",
        course_id: 3,
        parent_id: 0,
        // parent: null,
      };
      setCommentList([newEntry, ...commentList]);
      setNewComment("");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg bg-neutral-700">
      <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
      <div className="py-10">
        {commentList.length > 0 ? (
          commentList.map((comment, index) => (
            <div
              key={comment.id ?? index}
              className="border-b pb-3 mb-3 flex items-start"
            >
              <Image
                width={30}
                height={50}
                src={
                  "https://4mlgzdj164.ufs.sh/f/Y1D5BsqL0EJaYUgva9qL0EJajd3g15XqruxQM6Ck2cPmvOKw"
                }
                alt="avatar"
                className="rounded-full mr-3 object-contain"
              />
              <div>
                <h3 className="text-lg font-medium text-orange-400">
                  {comment.parent?.profile?.full_name ?? "Anonymous"}
                </h3>
                <p className="text-white-100">{comment.review_content}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(comment.createAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleAddComment}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Review;
