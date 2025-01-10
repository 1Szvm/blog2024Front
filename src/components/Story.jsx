import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import './Story.css'
import { useEffect } from 'react';

export const Story=({setStory,story})=> {
  const [html, setHtml] = useState('');
  useEffect(()=>{
    setHtml(story)
  },[story])

  return (
    <Editor value={story} onChange={(e)=>setStory(e.target.value)} placeholder='Írj...'/>
  );
}