"use client"


import React, { useState } from 'react';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

export const MyWysiwygEditor = () => {
  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = (html: React.SetStateAction<string>) => {
    setEditorHtml(html);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
      />
      <div>
        <h2>Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
      </div>
    </div>
  );
};


