from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/process-image', methods=['POST'])
def process_image():
    file = request.files['image']
    npimg = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    
    # Here you should add your Haar cascade processing code
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    cropped_eyes = []

    for (x, y, w, h) in faces:
        roi_gray = gray[y:y + h, x:x + w]
        roi_color = img[y:y + h, x:x + w]
        eyes = eye_cascade.detectMultiScale(roi_gray)
        for (ex, ey, ew, eh) in eyes:
            eye = roi_color[ey:ey + eh, ex:ex + ew]
            _, buffer = cv2.imencode('.jpg', eye)
            eye_base64 = base64.b64encode(buffer).decode('utf-8')
            cropped_eyes.append(eye_base64)
    
    return jsonify({'cropped_eyes': cropped_eyes})

if __name__ == '__main__':
    app.run(debug=True)
