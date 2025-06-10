// app/hooks/useCreatePost.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const createPost = async (newPost: { title: string; body: string; userId: number }) => {
  const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
  return data;
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // Add to local 'createdPosts' cache
      queryClient.setQueryData(['createdPosts'], (old: any[] = []) => [...old, newPost]);

      // Also optionally add to 'posts' cache
      queryClient.setQueryData(['posts'], (old: any[] = []) => [...old, newPost]);
    },
  });
};
