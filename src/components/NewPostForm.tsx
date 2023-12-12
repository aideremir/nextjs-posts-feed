import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost } from "@/api";
import React from "react";

const NewPostForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [postContent, setPostContent] = React.useState("");
  const [error, setError] = React.useState(null);

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(["posts"], (old) => {
        return {
          pageParams: old.pageParams,
          pages: [
            {
              nextPage: old.pages[0].nextPage,
              data: [newPost, ...old.pages[0].data],
            },
            ...old.pages.slice(1),
          ],
        };
      });
      router.back();
      window.scroll({ top: 0, behavior: "smooth" });
    },
    onError: (error) => {
      setError(error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);

    mutation.mutate({
      id: Math.random(),
      author: "Me",
      createdAt: new Date(),
      content: postContent,
    });
  };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    router.back();
  };

  const handleTextareaChange = (event) => {
    setPostContent(event.target.value);
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="content" className="sr-only">
          Content
        </label>
        <textarea
          disabled={mutation.isPending}
          value={postContent}
          onChange={handleTextareaChange}
          name="content"
          id="content"
          className="w-full border border-gray-300 rounded-md p-2"
          rows={5}
          placeholder="What's on your mind?"
          aria-placeholder="What's on your mind?"
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm mt-1">{error.message}</div>
      )}
      <div className="mt-4 flex justify-between">
        <button
          type="reset"
          className="bg-gray-200 text-gray-500 rounded-md px-4 py-2"
          onClick={handleReset}
        >
          Cancel
        </button>
        <button
          role="button"
          disabled={mutation.isPending}
          aria-disabled={mutation.isPending}
          aria-label={mutation.isPending ? "Submitting..." : "Submit"}
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2"
        >
          {mutation.isPending ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default NewPostForm;
