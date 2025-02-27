import React, { useState } from "react";
import avarta from "../../asset/img/tutor4.jpg"
import Image from "next/image";
interface Comment {
  username: string;
  text: string;
  date: string;
  likes: number;
}

interface ReviewProps {
  comments: Comment[];
}

const Review: React.FC<ReviewProps> = ({ comments }) => {
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState<Comment[]>(comments || []);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newEntry: Comment = {
        username: "Justin",
        text: newComment,
        date: new Date().toLocaleString(),
        likes: 0,
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
            <div key={index} className="border-b pb-3 mb-3 flex items-start">
              <Image
              width={30}
              height={50}
                src={avarta}
                alt="avatar"
                className="  rounded-full mr-3 object-contain"
              />
              <div>
                <h3 className="text-lg font-medium text-orange-400">{comment.username}</h3>
                <p className="text-white-100">{comment.text}</p>
                <p className="text-gray-500 text-sm">{comment.date}</p>
                <p className="text-gray-500 text-sm">Likes: {comment.likes}</p>
                <button className="text-blue-500 text-sm mt-1">Like</button>
                <button className="text-blue-500 text-sm mt-1 ml-2">
                  Reply
                </button>
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
