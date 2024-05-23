import React from "react";
import { useState } from "react";
import settings from '../../assets/settings.svg';

const DocumentLink = ({ doc, activeDocumentId, onDocumentSelect, onDocumentDelete }) => {

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  }

  const handleClick = (e) => {
    if (e.target.closest('.settings')) return;
    setShowSettings(false);
  }

  document.addEventListener('click', handleClick);

  // on right click
  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowSettings(true);
  }

  return (
    <div
      key={doc.id}
      onClick={() => onDocumentSelect(doc.id)}
      onContextMenu={handleContextMenu}
      className={`relative text-white text-sm p-2 ${doc.id === activeDocumentId ? 'bg-stone-800' : ''} hover:bg-stone-700 transition-colors cursor-pointer rounded-xl group`}
    >
      {doc.name}
      <div
        className={`absolute pl-8 right-0 h-full top-0 group-hover:opacity-100 opacity-0 bg-gradient-to-r from-transparent rounded-xl to-stone-800 ${doc.id === activeDocumentId ? '!opacity-100' : ''}`}
      >
        <div className='relative px-2 h-full settings'>
          <div
            className='h-full flex justify-center items-center'
            onClick={toggleSettings}
          >
            <img src={settings} alt="Settings" />
          </div>
          <div className={`absolute mt-1 left-0 bg-stone-700 bg-opacity-60 w-[150Px] backdrop-blur-xl p-2 rounded-lg shadow-md ${showSettings ? 'block' : 'hidden'}`}>
            <p
              className='text-sm text-white rounded-lg px-2 py-1 hover:bg-stone-800 !bg-opacity-20 transition-colors'
              onClick={() => {
                onDocumentDelete(doc.id);
                setShowSettings(false);
              }}
            >
              Delete
            </p>
            <p
              className='text-sm text-white rounded-lg px-2 py-1 hover:bg-stone-800 !bg-opacity-20 transition-colors'
              onClick={() => {
                const documentInput = document.getElementById('document-name');
                documentInput.focus();
                documentInput.select();
                setShowSettings(false);
              }}
            >
              Rename
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentLink;