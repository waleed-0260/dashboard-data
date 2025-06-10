// app/hooks/usePostById.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPost = async (id: number) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return data;
};

export const usePostById = (id: number) =>
  useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
    staleTime: Infinity, // prevent automatic refetch
  });
