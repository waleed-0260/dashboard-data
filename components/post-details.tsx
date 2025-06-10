// app/posts/[id]/PostDetails.tsx
'use client';

import { usePostById } from '@/hooks/usePostById';

export default function PostDetails({ postId }: { postId: number }) {
  const { data: post, isLoading, isError } = usePostById(postId);

  if (isLoading) return <p className="text-gray-500">Loading post...</p>;
  if (isError || !post) return <p className="text-red-500">Post not found.</p>;

  return (
    <article className="bg-white shadow-md rounded-lg p-6 border">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-2">Post ID: #{post.id}</p>
      <hr className="my-4" />
      <div className="text-gray-800 leading-relaxed whitespace-pre-line">
        {post.body}
      </div>
    </article>
  );
}
