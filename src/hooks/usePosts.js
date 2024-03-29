import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export function usePosts(service, params) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const toast = useToast();

  function fetchPosts(page = 1) {
    setIsLoading(true);

    service({ perPage: 12, page, ...params })
      .then((data) => {
        setPosts((prev) =>
          data.page > 1 ? [...prev, ...data.items] : data.items
        );
        setActivePage(data.page);
        setHasMore(data.page < data.totalPages);
      })
      .catch((err) =>
        toast({
          description: err.response?.data?.message || err.message,
          title: "Loading posts failed",
          status: "error",
        })
      )
      .finally(() => setIsLoading(false));
  }

  function likePost(updatedPost) {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  }

  function deletePost(postId) {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  }

  useEffect(() => {
    fetchPosts();
  }, [params]);

  return {
    posts,
    isLoading,
    hasMore,
    activePage,
    fetchPosts,
    likePost,
    deletePost,
  };
}
