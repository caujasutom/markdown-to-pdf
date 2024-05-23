import React from 'react';

function slugify(string, options) {
  const separator = options && options.separator ? options.separator : '-';
  const lowercase = options && options.lower ? options.lower : false;
  const strict = options && options.strict ? options.strict : false;
  let slug = string
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, separator);

  if (lowercase) {
    slug = slug.toLowerCase();
  }

  if (strict) {
    slug = slug.replace(/[^a-z0-9-]/g, '');
  }

  return slug;
}

function PDFExportButton({ docName }) {
  const exportPDF = async () => {
    const input = document.getElementById('markdown-output').innerHTML;

    const slugifiedDocName = slugify(docName, {
      lower: true,
      strict: true,
    });

    try {
      const response = await fetch('/api/pdf.php', {
        method: 'POST',
        body: input,
        headers: {
          'Content-Type': 'text/html',
        }
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${slugifiedDocName}.pdf`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the PDF:', error);
    }
  };

  const handleSave = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      exportPDF();
    }
  };

  document.addEventListener('keydown', handleSave);

  return (
    <button onClick={exportPDF} className='bg-stone-800 hover:bg-stone-700 text-white text-sm font-bold py-2 px-4 rounded'>
      Download PDF
    </button>
  );
}

export default PDFExportButton;