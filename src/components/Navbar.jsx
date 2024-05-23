import React from 'react';
import newDocument from '../assets/new-doc.svg';
import DocumentLink from './general/DocumentLink';

const Navbar = ({ documents, activeDocumentId, onDocumentSelect, onAddNewDocument, onDocumentDelete }) => {
  return (
    <nav className='max-w-[250px] w-full bg-stone-900 sticky top-0 z-[100]'>
      <a
        onClick={onAddNewDocument}
        className='flex cursor-pointer p-4 bg-stone-800 my-4 mx-2 rounded-xl text-white transition-colors justify-between hover:bg-stone-700 hover:text-stone-200'
      >
        <span>New document</span>
        <img src={newDocument} alt="New document" />
      </a>
      <div className='p-4'>
        <p className='text-sm text-white'>My documents</p>
        <div className='grid gap-2 mt-2'>
          {documents.map(doc => (
            <DocumentLink
              key={doc.id}
              doc={doc}
              isActive={doc.id === activeDocumentId}
              activeDocumentId={activeDocumentId}
              onDocumentDelete={onDocumentDelete}
              onDocumentSelect={onDocumentSelect} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;