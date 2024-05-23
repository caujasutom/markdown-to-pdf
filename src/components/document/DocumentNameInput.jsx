import React from 'react';

function DocumentNameInput({ docName, setDocName }) {
  const handleDocNameChange = (event) => {

    if (event.target.value === '') {
      document.title = 'Untitled document';
    } else {
      document.title = `${event.target.value}`;
    }
    setDocName(event.target.value);
  };

  return (
    <div>
      <p className='text-xs text-stone-400'>Document name</p>
      <input
        type='text'
        id='document-name'
        className='outline-none focus:outline-none text-stone-900 max-w-full'
        value={docName}
        onChange={handleDocNameChange}
      />
    </div>
  );
}

export default DocumentNameInput;