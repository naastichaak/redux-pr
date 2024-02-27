import InfiniteScroll from "react-infinite-scroll-component";
import { usePosts } from "../../hooks/usePosts";
import { CircularProgress, Stack } from "@chakra-ui/react";
import PostsList from "../../components/posts/PostsList";
import { getUserLikesService } from "../../services/userServices";
import { useMemo } from "react";

function UserLikes({ userId }) {
  const params = useMemo(() => {
    return {
      userId,
    };
  }, [userId]);

  const { posts, hasMore, activePage, fetchPosts, likePost, deletePost } =
    usePosts(getUserLikesService, params);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      endMessage={<span>🐧</span>}
      loader={
        <Stack py="32px" alignItems="center">
          <CircularProgress isIndeterminate />
        </Stack>
      }
      next={() => fetchPosts(activePage + 1)}
      hasMore={hasMore}
    >
      <PostsList posts={posts} onLike={likePost} onDelete={deletePost} />
    </InfiniteScroll>
  );
}
export default UserLikes;
