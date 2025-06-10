// app/hooks/useUpdatePost.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const updatePost = async (updatedPost: { id: number; title: string; body: string }) => {
  const { data } = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,
    updatedPost
  );
  return data;
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      // Update single post cache
      queryClient.setQueryData(['post', updatedPost.id], updatedPost);

      // Update list cache
      queryClient.setQueryData(['posts'], (old: any[] = []) =>
        old.map((post) =>
          post.id === updatedPost.id ? { ...post, ...updatedPost } : post
        )
      );

      // ❌ Do not refetch from API!
    },
  });
};
