import React from 'react'
import EditPostForm from '@/components/edit-post-form';

const page = ({ params }: { params: { id: string } }) => {
      const postId = Number(params.id);

  return (
<main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <EditPostForm postId={postId} />
    </main>  )
}

export default page