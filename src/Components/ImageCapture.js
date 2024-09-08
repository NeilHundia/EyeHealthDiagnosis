// import React, { useRef, useState, useEffect } from 'react';
// import './Opdetsstyle.css';
// import Navbar from './Navbar';

// const ImageCapture = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [patient, setPatient] = useState({
//     name: '',
//     regno: '',
//     email: '',
//     phone: '',
//     dob: '',
//     gender: '',
//   });

//   useEffect(() => {
//     const storedPatientData = JSON.parse(localStorage.getItem('patientData'));
//     if (storedPatientData) {
//       setPatient(storedPatientData);
//     }
//   }, []);

//   const startVideo = () => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then(stream => {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//       })
//       .catch(err => {
//         console.error('Error accessing camera:', err);
//       });
//   };

//   const captureImage = () => {
//     const context = canvasRef.current.getContext('2d');
//     context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//     const imageData = canvasRef.current.toDataURL('image/png');
//     const updatedPatient = { ...patient, image: imageData };
//     localStorage.setItem('patientData', JSON.stringify(updatedPatient));
//     console.log('Complete Patient Data:', updatedPatient);
//     // window.location.href = '/'; 
//   };

//   return (
//     <div className="image-capture">
//       <Navbar/>
//       <div className='imgmain'>
//       <h2 className='imghead'>Capture Patient Image</h2>
//       <video ref={videoRef} width="600" height="500" autoPlay />
//       <canvas ref={canvasRef} width="600" height="500" style={{ display: 'none' }}></canvas>
//       <button type="button" className='btn imgbtn' onClick={startVideo}>Start Camera</button>
//       <button type="button" className='btn imgbtn' onClick={captureImage}>Capture Image</button>
//       </div>
//     </div>
//   );
// };

// export default ImageCapture;


// import React, { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Opdetsstyle.css';
// import Navbar from './Navbar';

// const ImageCapture = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [imageData, setImageData] = useState('');
//   const [imagePreview, setImagePreview] = useState(null); // State for image preview
//   const navigate = useNavigate();

//   const startVideo = () => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then(stream => {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//       })
//       .catch(err => {
//         console.error('Error accessing camera:', err);
//       });
//   };

//   const captureImage = () => {
//     const context = canvasRef.current.getContext('2d');
//     context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//     const imageData = canvasRef.current.toDataURL('image/png');
//     setImageData(imageData);
//     setImagePreview(imageData); // Update image preview
//   };

//   const navigateToDashboard = () => {
//     localStorage.setItem('capturedImage', imageData); // Save image to localStorage
//     navigate('/docdash'); // Navigate to doctor's dashboard
//   };

//   return (
//     <div className="image-capture">
//       <Navbar/>
//       <div className='imgmain'>
//         <h2 className='imghead'>Capture Patient Image</h2>
//         <video ref={videoRef} width="300" height="200" autoPlay />
//         <canvas ref={canvasRef} width="300" height="200" style={{ display: 'none' }}></canvas>
//         <button type="button" className='btn imgbtn' onClick={startVideo}>Start Camera</button>
//         {imagePreview && (
//           <div>
//             <h3>Image Preview:</h3>
//             <img src={imagePreview} alt="Captured Image" width="300" height="200" />
//             <button type="button" className='btn imgbtn' onClick={navigateToDashboard}>Continue to Dashboard</button>
//           </div>
//         )}
//         {!imagePreview && (
//           <button type="button" className='btn imgbtn' onClick={captureImage}>Capture Image</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageCapture;


import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Opdetsstyle.css';
import Navbar from './Navbar';

const ImageCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState('');
  const navigate = useNavigate();

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(err => {
        console.error('Error accessing camera:', err);
      });
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const imageData = canvasRef.current.toDataURL('image/png');
    setImageData(imageData);

    fetch(imageData)
      .then(res => res.blob())
      .then(blob => {
        const formData = new FormData();
        formData.append('image', blob, 'capture.png');

        fetch('http://127.0.0.1:5000/process-image', {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
          console.log('Cropped Eyes:', data.cropped_eyes);

          const existingPatients = JSON.parse(localStorage.getItem('patientsData')) || [];
          const newPatient = {
            id: existingPatients.length + 1,
            name: existingPatients.name,
            image: imageData,
            croppedEyes: data.cropped_eyes
          };

          // Update localStorage
          existingPatients.push(newPatient);
          localStorage.setItem('patientsData', JSON.stringify(existingPatients));

          navigate('/docdash');
        })
        .catch(error => console.error('Error:', error));
      });
  };

  return (
    <div className="image-capture">
      <Navbar />
      <div className='imgmain'>
        <h2 className='imghead'>Capture Patient Image</h2>
        <video ref={videoRef} width="600" height="500" autoPlay />
        <canvas ref={canvasRef} width="600" height="500" style={{ display: 'none' }}></canvas>
        <button type="button" className='btn imgbtn' onClick={startVideo}>Start Camera</button>
        <button type="button" className='btn imgbtn' onClick={captureImage}>Capture Image</button>
      </div>
    </div>
  );
};

export default ImageCapture;

// // ImageCapture Component
// import React, { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Opdetsstyle.css';
// import Navbar from './Navbar';

// const ImageCapture = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [imageData, setImageData] = useState('');
//   const navigate = useNavigate();

//   const startVideo = () => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then(stream => {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//       })
//       .catch(err => {
//         console.error('Error accessing camera:', err);
//       });
//   };

//   const captureImage = () => {
//     const context = canvasRef.current.getContext('2d');
//     context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//     const imageData = canvasRef.current.toDataURL('image/png');
//     setImageData(imageData);

//     const patientData = JSON.parse(localStorage.getItem('patientsData')) || [];
//     const newPatient = {
//       id: Date.now(),
//       name: localStorage.getItem('patientName'),
//       regno: localStorage.getItem('patientRegno'),
//       email: localStorage.getItem('patientEmail'),
//       phone: localStorage.getItem('patientPhone'),
//       dob: localStorage.getItem('patientDob'),
//       gender: localStorage.getItem('patientGender'),
//       image: imageData,
//       croppedEyes: [], // This will be filled after cropping
//     };
    
//     // Assuming processImage is a function that returns the cropped eyes
//     fetch('http://localhost:5000/process-image', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ image: imageData }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       newPatient.croppedEyes = data.croppedEyes;
//       patientData.push(newPatient);
//       localStorage.setItem('patientsData', JSON.stringify(patientData));
//       navigate('/docdash');
//     })
//     .catch(error => {
//       console.error('Error processing image:', error);
//     });
//   };

//   return (
//     <div className="image-capture">
//       <Navbar/>
//       <div className='imgmain'>
//         <h2 className='imghead'>Capture Patient Image</h2>
//         <video ref={videoRef} width="600" height="500" autoPlay />
//         <canvas ref={canvasRef} width="600" height="500" style={{ display: 'none' }}></canvas>
//         <button type="button" className='btn imgbtn' onClick={startVideo}>Start Camera</button>
//         <button type="button" className='btn imgbtn' onClick={captureImage}>Capture Image</button>
//       </div>
//     </div>
//   );
// };

// export default ImageCapture;
