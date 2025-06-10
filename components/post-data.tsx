// app/admin/CreatePostForm.tsx
'use client';

import { useState } from 'react';
import { useCreatePost } from '../hooks/useCreatePost';
import { useRouter } from 'next/navigation';

export default function PostData() {
const router = useRouter()
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { mutate, isPending } = useCreatePost();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        title,
        body,
        userId: 1,
      },
      {
        onSuccess: () => {
          // Clear form
          setTitle('');
          setBody('');
          // Redirect to homepage
          router.push('/');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg px-4 py-10">
      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        type="submit"
        disabled={isPending}
      >
        {isPending ? 'Posting...' : 'Create Post'}
      </button>
    </form>
  );
}
