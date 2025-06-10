// app/hooks/useDeletePost.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const deletePost = async (id: number) => {
  const { data } = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return data;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, id) => {
      // Remove the deleted post from the cache
      queryClient.setQueryData(['posts'], (oldPosts: any[] = []) =>
        oldPosts.filter((post) => post.id !== id)
      );
    },
  });
};
