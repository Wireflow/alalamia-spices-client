import React from 'react';

const PrintButton = () => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Receipt</title>
          <!-- Include any necessary CSS styles -->
        </head>
        <body>
          <!-- Include the content to be printed -->
          <h1>Receipt</h1>
          <p>Content goes here</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    }
  };

  return (
    <button onClick={handlePrint}>Print Receipt</button>
  );
};

export default PrintButton;