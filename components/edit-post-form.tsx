"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { usePostById } from '@/hooks/usePostById';
import { useUpdatePost } from '@/hooks/useUpdatePost';

export default function EditPostForm({ postId }: { postId: number }) {
  const router = useRouter();
  const { data: post, isLoading } = usePostById(postId);
  const { mutate: updatePost, isPending } = useUpdatePost();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updatePost(
      {
        id: postId,
        title,
        body,
      },
      {
        onSuccess: () => {
          router.push('/');
        },
      }
    );
  };

  if (isLoading) return <p>Loading post...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        className="w-full border p-2 rounded"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {isPending ? 'Updating...' : 'Update Post'}
      </button>
    </form>
  );
}
