import PostDetails from '@/components/post-details'
import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
      const postId = Number(params.id);

  return (
    <div>
        <PostDetails postId={postId}/>
    </div>
  )
}

export default page