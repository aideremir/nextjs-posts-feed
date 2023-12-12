import { IPost } from "@/types";
import React from "react";
import ModalDeleteConfirm from "@/components/ModalDeleteConfirm";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/api";

const Post = ({ post }: { post: IPost }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const toggleMenuHandler = (e) => {
    e.preventDefault();

    if (mutation.isPending) return;

    setShowMenu((prev) => !prev);
  };

  const toggleDeleteModalHandler = (e) => {
    e.preventDefault();

    if (mutation.isPending) return;

    setShowMenu(false);
    setShowDeleteModal((prev) => !prev);
  };

  const deletePostHandler = () => {
    if (mutation.isPending) return;

    mutation.mutate(post.id);
    setShowDeleteModal(false);
  };

  return (
    <div
      className={`p-4 border-b border-b-slate-200 ${
        mutation.isPending ? "opacity-70" : ""
      }`}
    >
      <div className="flex mb-1 justify-between">
        <div className="flex gap-1">
          <div className="font-semibold">{post.author}</div>
          <time
            dateTime={post.createdAt?.toISOString()}
            className="text-gray-500"
          >
            {post.createdAt?.toDateString()}
          </time>
        </div>
        <div className="relative">
          <button
            aria-haspopup={true}
            className="leading-4 text-slate-500 hover:text-black font-bold "
            onClick={toggleMenuHandler}
          >
            ...
          </button>
          {showMenu && (
            <div className="absolute right-0 top-0 mt-8 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={toggleMenuHandler}
              >
                View
              </a>
              {post.author === "Me" && (
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={toggleDeleteModalHandler}
                >
                  Delete
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      <div>{post.content}</div>
      <ModalDeleteConfirm
        postId={post.id}
        isOpen={showDeleteModal}
        onCancel={toggleDeleteModalHandler}
        onApprove={deletePostHandler}
      />
    </div>
  );
};

export default Post;
