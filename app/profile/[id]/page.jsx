"use client";

import React, { useEffect, useState } from 'react';
import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation';

const MyProfile = ({ params }) => {

  const [posts, setPosts] = useState([]);
  const searchparams = useSearchParams();
  const username = searchparams.get('name');

  useEffect(() => {
    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        const data = await response.json();
        
        setPosts(data);
    }

    if(params?.id)
        fetchPosts();
        
  }, [params?.id]);


  return (
    <Profile 
        name={username}
        desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination...`}
        data={posts}
    />
  )
}

export default MyProfile;