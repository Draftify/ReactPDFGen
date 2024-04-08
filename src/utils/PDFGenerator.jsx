import React, { useRef } from 'react';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer'; // Import Image from react-pdf/renderer
import html2canvas from 'html2canvas';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  img: {
    width: '100%', // Set image width to 100%
  },
});

const PDFGenerator = ({ content }) => {
  const pdfRef = useRef();

  const generatePDF = async () => {
    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL('image/png');

    const pdfInstance = pdfRef.current;

    // Update the content inside the Document
    pdfInstance.updateContainer(
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>PDF generated from React</Text>
            <Text>Some other text...</Text>
          </View>
          <View style={styles.section}>
            {/* Render the image */}
            <Image src={imgData} style={styles.img} />
          </View>
        </Page>
      </Document>
    );

    // Convert to blob and trigger download
    pdfInstance.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'react-generated.pdf';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div>
      <PDFDownloadLink document={<Document />}>{({ loading }) => (loading ? 'Loading document...' : 'Download now!')}</PDFDownloadLink>
      <button onClick={generatePDF}>Generate PDF</button>
      <div ref={pdfRef}>{content}</div>
    </div>
  );
};

export default PDFGenerator;
