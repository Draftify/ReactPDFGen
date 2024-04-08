import React, { useRef } from 'react';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'; // Import html2canvas library

function App() {
  const sectionRef = useRef(null);

  const handleDownloadClick = () => {
    const section = sectionRef.current;

    // Use html2canvas to capture the section as an image
    html2canvas(section, { useCORS: true })
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 100; // Adjust the image width as needed
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Calculate the x-coordinate to center align the image
        const x = (210 - imgWidth) / 2; // 210 is the width of A4 paper in mm

        // Create a new jsPDF instance
        const pdf = new jsPDF();

        // Insert the image into the PDF
        pdf.addImage(imgData, 'PNG', x, 10, imgWidth, imgHeight);

        // Save or download the PDF
        pdf.save('section.pdf');
      });
  };

  return (
    <div className='max-w-xl mx-auto'>
      <section ref={sectionRef} className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <img className="object-cover mx-auto rounded-full h-20 w-20" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/4/avatar.jpg" alt="" />
            <p className="mt-6 text-lg font-semibold text-black">Mark Tanker, <span className="font-normal text-gray-600">California</span></p>
            <blockquote className="max-w-xl mx-auto mt-7">
              <p className="text-xl leading-relaxed text-black">“Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat.”</p>
            </blockquote>
          </div>
        </div>
      </section>
      <br />
      <div>
        <button onClick={handleDownloadClick} className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
          Download as PDF
        </button>
      </div>
    </div>
  );
}

export default App;
