"use client";
import Post from "@/components/Post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/api";
import { useInView } from "react-intersection-observer";
import React from "react";
import Spinner from "@/components/Spinner";

const Posts = () => {
  const { ref, inView } = useInView();

  const { status, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: async ({ pageParam }) => {
        return await getPosts(pageParam);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div>
      {status === "pending" ? (
        <Spinner />
      ) : (
        <>
          {data?.pages.map((page) => (
            <React.Fragment key={page.nextPage}>
              {page.data.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </React.Fragment>
          ))}
          <div ref={ref} className="p-4 text-center text-slate-500">
            {isFetchingNextPage ? (
              <Spinner />
            ) : hasNextPage ? (
              "Load Newer"
            ) : (
              "Nothing more to load"
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Posts;
