"use client"

import Form from '@components/Form';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const CreatePrompt = () => {

  const [isSubmitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: ""
  });

  const router = useRouter();
  const { data: session} = useSession();

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
        const response = await fetch('api/prompt/new', {
            method: 'POST',
            body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag,
                userId: session?.user.id
            })
        })

        if (response.ok) {
            router.push("/");
        }

    } catch (error) {
        console.log(error);

    } finally {
        setSubmitting(false);
    }

  }


  return (
    <Form 
        type="Create"
        post={post}
        setPost={setPost}
        isSubmitting={isSubmitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt