import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-markdown';

function MarkdownEditor({ markdown, setMarkdown }) {
  const handleInputChange = (newValue) => {
    setMarkdown(newValue);
  };

  const handleBoldToggle = (editor) => {
    const selectedText = editor.getSelectedText();
    const range = editor.getSelectionRange();

    if (selectedText.length === 0) {
      const cursor = editor.getCursorPosition();
      const newText = '****';
      editor.session.insert(cursor, newText);
      editor.moveCursorTo(cursor.row, cursor.column + 2);
    } else {
      const isBold = /^\*\*(.*)\*\*$/.test(selectedText);

      let newText;
      if (isBold) {
        newText = selectedText.replace(/^\*\*(.*)\*\*$/, '$1');
      } else {
        newText = `**${selectedText}**`;
      }

      editor.session.replace(range, newText);
    }
  };

  const setupKeyBinding = (editor) => {
    editor.commands.addCommand({
      name: 'toggleBold',
      bindKey: { win: 'Ctrl-B', mac: 'Cmd-B' },
      exec: (editor) => {
        handleBoldToggle(editor);
      },
      readOnly: false
    });
  };

  return (
    <AceEditor
      mode='markdown'
      onChange={handleInputChange}
      value={markdown}
      name='markdownEditor'
      editorProps={{ $blockScrolling: true }}
      highlightActiveLine={true}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
        showPrintMargin: false,
      }}
      className='!h-full !w-full no-scrollbar'
      onLoad={setupKeyBinding}
    />
  );
}

export default MarkdownEditor;