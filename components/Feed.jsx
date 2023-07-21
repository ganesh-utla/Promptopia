"use client";

import React, { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [posts, setPosts] = useState([]);

  const getFilteredPosts = (searchText) => {
    const regex = new RegExp(searchText, 'i');
    return posts.filter(post => regex.test(post.prompt) || regex.test(post.tag) || regex.test(post.creator.username));
  }

  const handleSearchChange = (text) => {

    clearTimeout(searchTimeout);

    setSearchText(text);

    setSearchTimeout(
      setTimeout(() => {
        const filteredPosts = getFilteredPosts(text);
        setSearchedResults(filteredPosts);
      }, 500)
    );
    
  }

  const handleTagClick = (tag) => {
    handleSearchChange(tag);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();

  }, []);


  return (
    <section className='feed'>
        <form className='relative w-full flex-center'>
            <input 
                type="text"
                value={searchText}
                onChange={(e) => handleSearchChange(e.target.value)} 
                placeholder='Search for a tag or username'
                className='search_input peer'
                required
            />
        </form>

        {searchText===""? (
          <PromptCardList 
            data={posts}
            handleTagClick={handleTagClick}
          />
          ) : (
          <PromptCardList 
            data={searchedResults}
            handleTagClick={handleTagClick}
          />  
        )}
    </section>
  )
}


const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className='mt-16 prompt_layout'>
        {data.map((post) => (
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    )
}

export default Feed;