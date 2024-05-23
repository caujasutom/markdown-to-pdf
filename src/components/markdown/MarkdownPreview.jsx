import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownPreview = ({ markdown }) => {
  return (
    <div id='markdown-output' className='px-4 overflow-y-scroll border-l no-scrollbar'>
      <ReactMarkdown className='prose prose-stone'>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;