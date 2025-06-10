// app/hooks/usePosts.ts
'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchPosts = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

export const usePosts = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // Get cached manually added posts
  const createdPosts: any[] = queryClient.getQueryData(['createdPosts']) || [];

  // Combine fetched + created (make sure there's no ID collision)
  const combinedPosts = [...createdPosts, ...(query.data || [])];

  return {
    ...query,
    data: combinedPosts,
  };
};
