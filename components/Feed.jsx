'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {
        data.map(post => {
          return(
            <PromptCard
              key={post._id}
              post={post}
          />
          ) 
        })
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);


  const handleSearchChange = e => {
    const input = e.target.value;
    console.log('this is target', input);

    const pop = [...posts];
    pop.forEach(post => post.prompt = post.prompt.toLowerCase());
    console.log('BIG', pop);
    
    const dodo = pop.filter(e => e.prompt.indexOf(input) != -1);
    console.log('DODO final', dodo);

    setPosts(dodo);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      console.log('lala land', data);
      
      setPosts(data);
    }

    // console.log('ALL POSTS', posts);
    fetchPosts();
    console.log('ALL POSTSsssss', posts);
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex flex-center' >
        <input
          type="text"
          placeholder='Search for a tag or a username'
          // value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed