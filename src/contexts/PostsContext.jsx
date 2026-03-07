import React, { createContext, useContext, useState, useCallback } from "react";
import * as postsApi from "../api/postsApi";

const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
  const [forYouPosts, setForYouPosts] = useState([]);
  const [forYouPage, setForYouPage] = useState(1);
  const [forYouHasMore, setForYouHasMore] = useState(true);

  const [followingPosts, setFollowingPosts] = useState([]);
  const [followingPage, setFollowingPage] = useState(1);
  const [followingHasMore, setFollowingHasMore] = useState(true);

  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ── Fetch feed ── */
  const fetchFeed = useCallback(async (type = "foryou", page = 1) => {
    if (page === 1) setLoading(true);
    try {
      const resp = await postsApi.fetchFeed(type, page, 10);
      const newPosts = resp.data || [];
      const totalPages = resp.totalPages || 1;

      if (type === "foryou") {
        setForYouPosts((prev) =>
          page === 1 ? newPosts : [...prev, ...newPosts],
        );
        setForYouPage(page);
        setForYouHasMore(page < totalPages);
      } else {
        setFollowingPosts((prev) =>
          page === 1 ? newPosts : [...prev, ...newPosts],
        );
        setFollowingPage(page);
        setFollowingHasMore(page < totalPages);
      }
    } catch (e) {
      console.error("fetchFeed error:", e);
    } finally {
      if (page === 1) setLoading(false);
    }
  }, []);

  /* ── Create post ── */
  const createPost = useCallback(async (content) => {
    try {
      const post = await postsApi.createPost(content);
      setForYouPosts((prev) => [post, ...prev]);
      return post;
    } catch (e) {
      console.error("createPost error:", e);
      return null;
    }
  }, []);

  const editPost = useCallback(async (postId, content) => {
    try {
      const post = await postsApi.updatePost(postId, content);
      const updater = (prev) =>
        prev.map((item) => (item._id === postId ? { ...item, ...post } : item));
      setForYouPosts(updater);
      setFollowingPosts(updater);
      setUserPosts(updater);
      return post;
    } catch (e) {
      console.error("editPost error:", e);
      throw e;
    }
  }, []);

  /* ── Like post ── */
  const likePost = useCallback(async (postId) => {
    try {
      const { liked, likes } = await postsApi.likePost(postId);
      const updater = (prev) =>
        prev.map((p) => (p._id === postId ? { ...p, liked, likes } : p));
      setForYouPosts(updater);
      setFollowingPosts(updater);
      setUserPosts(updater);
    } catch (e) {
      console.error("likePost error:", e);
    }
  }, []);

  /* ── View post ── */
  const viewPost = useCallback(async (postId) => {
    try {
      const { views } = await postsApi.viewPost(postId);
      const updater = (prev) =>
        prev.map((p) => (p._id === postId ? { ...p, views } : p));
      setForYouPosts(updater);
      setFollowingPosts(updater);
      setUserPosts(updater);
    } catch (e) {
      console.error("viewPost error:", e);
    }
  }, []);

  /* ── Add comment ── */
  const addComment = useCallback(async (postId, content) => {
    try {
      const { comments } = await postsApi.addComment({ postId, content });
      const updater = (prev) =>
        prev.map((p) => (p._id === postId ? { ...p, comments } : p));
      setForYouPosts(updater);
      setFollowingPosts(updater);
      setUserPosts(updater);
    } catch (e) {
      console.error("addComment error:", e);
    }
  }, []);

  /* ── Get comments ── */
  const getComments = useCallback(async (postId, page = 1, limit = 10) => {
    try {
      return await postsApi.getComments(postId, page, limit);
    } catch (e) {
      console.error("getComments error:", e);
      return [];
    }
  }, []);

  /* ── Add reply ── */
  const addReply = useCallback(
    async (postId, commentId, content, replyToUser) => {
      try {
        return await postsApi.addReply({
          postId,
          commentId,
          content,
          replyToUser,
        });
      } catch (e) {
        console.error("addReply error:", e);
        return null;
      }
    },
    [],
  );

  /* ── Fetch user posts ── */
  const fetchUserPosts = useCallback(async (userId) => {
    try {
      const data = await postsApi.fetchUserPosts(userId);
      setUserPosts(data);
      return data;
    } catch (e) {
      console.error("fetchUserPosts error:", e);
      return [];
    }
  }, []);

  /* ── Delete post ── */
  const deletePost = useCallback(async (postId) => {
    try {
      await postsApi.deletePost(postId);
      const remover = (prev) => prev.filter((p) => p._id !== postId);
      setForYouPosts(remover);
      setFollowingPosts(remover);
      setUserPosts(remover);
    } catch (e) {
      console.error("deletePost error:", e);
    }
  }, []);

  const fetchLikedPosts = useCallback(async () => {
    try {
      return await postsApi.fetchLikedPosts();
    } catch (e) {
      console.error("fetchLikedPosts error:", e);
      return [];
    }
  }, []);

  /* ── Follow/Unfollow ── */
  const toggleFollow = useCallback(async (userId) => {
    try {
      return await postsApi.toggleFollow(userId);
    } catch (e) {
      console.error("toggleFollow error:", e);
      return null;
    }
  }, []);

  /* ── Get public profile ── */
  const getPublicProfile = useCallback(async (userId) => {
    try {
      return await postsApi.getPublicProfile(userId);
    } catch (e) {
      console.error("getPublicProfile error:", e);
      return null;
    }
  }, []);

  const value = {
    forYouPosts,
    forYouPage,
    forYouHasMore,
    followingPosts,
    followingPage,
    followingHasMore,
    userPosts,
    loading,
    fetchFeed,
    createPost,
    editPost,
    likePost,
    viewPost,
    addComment,
    getComments,
    addReply,
    fetchUserPosts,
    fetchLikedPosts,
    deletePost,
    toggleFollow,
    getPublicProfile,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
