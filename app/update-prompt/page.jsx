"use client";

import Form from '@components/Form';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';


const EditPrompt = () => {

  const [isSubmitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: ""
  });

  const searchparams = useSearchParams();
  const router = useRouter();

  const promptId = searchparams.get("id");

  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert("Prompt Id not found!!");

    try {
        const response = await fetch(`/api/prompt/${promptId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag
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

  useEffect(() => {
    const fetchPrompt = async () => {
        
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        
        setPost({
            prompt: data.prompt,
            tag: data.tag
        });
    }
    fetchPrompt();
  }, [promptId]);


  return (
    <Form 
        type="Update"
        post={post}
        setPost={setPost}
        isSubmitting={isSubmitting}
        handleSubmit={editPrompt}
    />
  )
}

export default EditPrompt;