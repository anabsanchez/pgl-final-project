# PGL Final Project

This is a React Native mobile application developed using Expo. The app features an intuitive interface with seamless navigation between different functionalities, including user authentication, a photo gallery, and a camera. The application is designed to provide a smooth user experience with a modern and consistent visual style.

## Features

### 🔑 Authentication:

#### Login and Registration:

- Users can register and log in using email and password.
- Validations are performed through the API to ensure secure access.
- Upon successful login, users are redirected to the main gallery.

### 🖼️ Gallery Screen:

#### Image Display:

- Shows a grid of thumbnail images retrieved from the API.
- Images are ordered with the most recent ones appearing at the top.

#### Image Enlargement:

- Users can tap on any image to view it in full screen.
- The full-screen view includes a close button at the top right, allowing users to return to the gallery.

#### Delete Functionality:

- Long-pressing an image triggers a confirmation dialog to delete the selected photo.
- After deletion, the gallery updates automatically.

### 📷 Camera Screen:

#### Camera Interface:

- Allows users to capture new photos.
- The captured images are saved directly to the API.
- Users can toggle between the front and back cameras.

#### Image Save Confirmation:

- After taking a photo, the image is automatically saved and available in the gallery.

### 📂 Side Menu Navigation:

The application features a drawer-based navigation system.

Accessible screens include:

- Home (Welcome)

- Camera

- Gallery

These screens are all accessible only after successful login.
