## Introduction:
The Eye Health Diagnostic Tool is a comprehensive web-based solution
designed to assist doctors in diagnosing eye conditions by capturing and
processing patient eye images. This project addresses the need for a streamlined
process to capture patient details, take images of their eyes, and provide a
platform for doctors to analyze these images and record their diagnoses. By
leveraging modern web technologies such as ReactJS for the frontend and Flask
for the backend, along with image processing capabilities provided by OpenCV,
this tool aims to enhance the efficiency and accuracy of eye health diagnostics.
## Overview :
This project is designed to streamline the process of capturing, processing, and
diagnosing patient eye images for medical evaluations. Built with a
combination of ReactJS for the frontend and Flask for the backend, the system
aims to assist healthcare professionals in diagnosing patients efficiently and
accurately.
The core functionality of the application involves capturing images of patients'
faces using a webcam, cropping the eye regions using machine learning
techniques, and storing this data for further medical analysis. The captured
images, along with patient details, are displayed on a doctor’s dashboard where
medical professionals can review, diagnose, and annotate each case.
This report outlines the development process, from setting up the frontend and
backend components to integrating image processing capabilities using Haar
Cascade, a machine learning algorithm.
## Technologies used :
### Frontend:
• ReactJS : A JavaScript library for building user interfaces, used for
creating interactive and dynamic components.

• CSS : Used for styling the components to create a user-friendly and
visually appealing interface.

• JavaScriptUsed for client-side scripting to handle dynamic interactions
and localStorage management.

• HTML5 : Used for structuring the web pages and integrating video and
canvas elements for image capture.

The frontend is responsible for capturing patient details and images,
displaying patient data and processed images, and allowing doctors to
record diagnoses. It interacts with the backend API to send and retrieve
data.

### Backend:
• Flask (Python) : A lightweight WSGI web application framework in
Python, used to create the backend API and handle image processing
requests.

• OpenCV : An open-source computer vision and machine learning
software library, utilized for detecting and cropping eyes from patient
images.

The backend handles API requests from the frontend, processes
images using OpenCV, and manages data storage. The image
processing service uses OpenCV to detect and crop eyes from the
images captured by the frontend. The processed images are then sent
back to the frontend for display.

## FlowChart :

## Implementation :
### App.js
The App component serves as the main entry point for the application,
managing the routing between different components using React Router. It
defines the routes for various paths in the application, such as the homepage,
login pages for doctors and operators, details pages, dashboards, and image
capture functionality. Each route is associated with a specific component that
handles the respective functionality.

#### HomePage :
The Homepage component provides the landing page for the application. It
includes a welcoming message and introductory text explaining the purpose of
the application.
The component offers navigation buttons for doctors and
operators to log in to their respective sections of the application.

The Navbar component is included for consistent navigation across the
app, and the component uses CSS for styling.

#### Operator Login :
The Operator Login component is designed for operators to log in to the
system. It provides a simple login form where users can enter their username
and password. The component includes:

• A Navbar for navigation consistency across the application.

• Input fields for the username and password.

• Buttons for submitting the form and resetting the fields.

• A link for users who forgot their password.

• The form submission is handled by a navigatetoDashboard function,
which redirects the user to the operator dashboard upon clicking the login
button.

#### Patient Details :
The Patient details component serves as the form for operators to enter
and submit new patient details. This form is a crucial part of the application,
allowing operators to collect essential patient information before capturing an
image of the patient. Key features include:

• State Management : Utilizes React's useState hook to manage form input
values and keep track of the patient's data.

• Form Fields : Includes input fields for the patient's name, email, phone
number, date of birth, gender and T&C. The gender field is implemented
using radio buttons, and T&C with a checkbox for easy selection.

• Local Storage Integration : On form submission, the patient's data is
stored in the browser's local storage. This allows for persistent
storage across page reloads and sessions.

• Navigation : After successfully submitting the form, the operator is
redirected to the image capture page to proceed with capturing the
patient's photo.

#### Capture Patient Image :
The ImageCapture component is a sophisticated tool designed for capturing
patient images using the device's camera and processing them for further
medical use. This component integrates seamlessly with the application,
providing a user-friendly interface for image capture and subsequent
processing.

Key Features:

• Camera Access: Utilizes the
navigator.mediaDevices.getUserMedia API to access the device's
camera and stream video to a video element.

• Image Capture: Captures the current frame from the video stream
and draws it onto a canvas element when the capture button is
clicked.

• Image Processing: Converts the captured image into a data URL,
then uploads it to a Flask backend for processing. The backend
extracts eye regions from the image.

• State Management: Manages the captured image data using the
useState hook.

• Navigation: Navigates to the doctor dashboard upon successful
image processing and storage.

#### User Interaction:

• Start Camera: Users can click the "Start Camera" button to
initialize the camera stream.

• Capture Image: The "Capture Image" button captures the current
frame from the video stream, processes it, and stores the result.

#### Integration with Flask:

• Data Upload: The captured image is uploaded to the Flask backend,
which processes the image and returns cropped eye regions.

• LocalStorage: The processed image data is stored in localStorage,
updating the patient's record with the captured image and cropped
eye data.

#### Doctors Login :

The Doctors Login component is designed to provide a login interface for
doctors accessing the application. It is a simple and intuitive form that captures
the doctor's credentials and navigates to the doctor dashboard upon successful
login. Key features include:

• Form Fields : Includes fields for username and password, ensuring both
fields are required for submission.

• Navigation : Utilizes a button click event to navigate to the doctor
dashboard (/docdash).

• Navbar Integration : Displays a consistent navigation bar at the top of the
page for easy access to other parts of the application.

#### Doctors Dashboard :
The Doctors Dashboard component serves as the doctor’s dashboard, providing
a comprehensive view of the patients awaiting diagnosis. It leverages local
storage to fetch and display patient data dynamically.
Key Features:

• Navbar Integration : Ensures consistent navigation across the application.

• State Management : Utilizes the useState hook to manage the state of
patients’ data.

• Data Fetching : Employs the useEffect hook to fetch patient data
from local storage when the component mounts.

• Patient Listing : Displays a list of patients with their names and
images, which link to detailed patient information pages.

#### User Interaction:
• Navigation : Each patient entry is a clickable link that navigates to a
detailed view of the patient’s information.

#### Patient Details :
The Patient Details component is designed to display detailed information about
a selected patient. This component allows doctors to review patient information,
see cropped images of the patient's eyes, and provide a diagnosis. Key features
include:

• Navbar Integration : The component includes a Navbar for consistent
navigation.

• State Management : Utilizes React's useState and useEffect hooks to
manage and fetch patient data.

• Patient Information : Displays detailed information about the patient
such as name, email, phone, date of birth, and gender.

• Cropped Eyes Display : Shows images of the patient's cropped eyes,
stored in base64 format.

• Diagnosis Input : Provides a textarea for doctors to enter their diagnosis.

• Diagnosis Saving On clicking the "Save Diagnosis" button, the entered
diagnosis is saved back to the local storage, updating the respective
patient data.

### Flask (Python) :
The Flask backend script handles the image processing functionality,
specifically designed to detect and crop eyes from uploaded images.

Key Features:

• CORS Support : Ensures that the API can be accessed from different
origins, facilitating seamless integration with the front-end.

• Image Proecessing : Utilizes OpenCV’s Haar cascade classifiers to
detect faces and eyes within the uploaded images.

• Data Conversion : Converts detected eye regions to base64-encoded
strings for easy transmission to the front-end.

#### User Interaction:
• Image Upload Endpoint : Provides a /process-image endpoint to accept
POST requests containing images. The processed data, including cropped
eye images, is returned in JSON format.

#### Connect to your doctor :
This system allows doctors and patients to have video calls, where doctors can
remotely control the patient's camera (zoom in/out, adjust brightness, etc.). This
helps doctors better diagnose patients from a distance.

1. Patient Side:
• The patient’s device uses getUserMedia to capture video and
stream it via WebRTC.

• The patient’s device also listens for camera control commands via
WebSockets.

3. Doctor Side:
• The doctor receives the video stream via WebRTC.

• The doctor sends camera control commands (like zoom and
brightness) via WebSockets using a simple control panel.
