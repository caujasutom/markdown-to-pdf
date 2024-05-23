import { React, useEffect, useState } from 'react';
import MarkdownEditor from './components/markdown/MarkdownEditor';
import Navbar from './components/Navbar';
import DocumentNameInput from './components/document/DocumentNameInput';
import PDFExportButton from './components/document/PDFExportButton';
import MarkdownPreview from './components/markdown/MarkdownPreview';
import 'ace-builds/src-noconflict/mode-markdown';

function App() {
  const [documents, setDocuments] = useState([]);
  const [currentDocId, setCurrentDocId] = useState(null);

  function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  useEffect(() => {
    const loadedDocs = JSON.parse(localStorage.getItem('documents'));
    if (!loadedDocs || loadedDocs.length === 0) {
      const newDoc = {
        id: uuidv4(),
        name: 'New Document',
        content: ''
      };
      setDocuments([newDoc]);
      setCurrentDocId(newDoc.id);
    } else {
      setDocuments(loadedDocs);
      setCurrentDocId(loadedDocs[0].id);
      document.title = loadedDocs[0].name;
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('documents', JSON.stringify(documents));
  }, [documents]);

  const handleDocumentChange = (id) => {
    setCurrentDocId(id);
    document.title = documents.find(doc => doc.id === id).name;
  };

  const handleAddNewDocument = () => {
    const newDoc = { id: uuidv4(), name: 'New Document', content: '' };
    setDocuments([...documents, newDoc]);
    setCurrentDocId(newDoc.id);
  };

  const handleDeleteDocument = (id) => {
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocuments);
    if (updatedDocuments.length === 0) {
      return;
    }
    setCurrentDocId(updatedDocuments[0].id);
  };

  const currentDoc = documents.find(doc => doc.id === currentDocId) || { name: '', content: '' };

  const updateCurrentDocument = (content) => {
    const updatedDocuments = documents.map(doc =>
      doc.id === currentDocId ? { ...doc, content: content } : doc
    );
    setDocuments(updatedDocuments);
  };

  const updateDocumentName = (name) => {
    const updatedDocuments = documents.map(doc =>
      doc.id === currentDocId ? { ...doc, name: name } : doc
    );
    setDocuments(updatedDocuments);
  };

  return (
    <div className='flex h-screen'>
      <Navbar
        documents={documents}
        activeDocumentId={currentDocId}
        onDocumentSelect={handleDocumentChange}
        onDocumentDelete={handleDeleteDocument}
        onAddNewDocument={handleAddNewDocument}
      />
      <div className='h-full w-full'>
        <div className='h-[10vh] flex justify-between items-center px-4 border-b'>
          <DocumentNameInput docName={currentDoc.name} setDocName={updateDocumentName} />
          <PDFExportButton docName={currentDoc.name} />
        </div>
        <div className='grid grid-cols-2 h-[calc(90vh-.5rem)] overflow-hidden'>
          <MarkdownEditor markdown={currentDoc.content} setMarkdown={updateCurrentDocument} />
          <MarkdownPreview markdown={currentDoc.content} />
        </div>
      </div>
    </div>
  );
}

export default App;