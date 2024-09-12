# RouteCraft - Personalized AI Travel Itinerary Planner

### Atlan Engineering Fellowship Task - 2024
**Submitted by:** Anamika Sadh

## Description
RouteCraft is an AI-driven travel itinerary planner that generates personalized itineraries based on user inputs like budget, preferences, and trip duration. Using Google Gemini AI, Geoapify for mapping services, and Firebase for real-time data storage, it offers a seamless and intuitive travel planning experience. Users can explore places and hotels through Google Maps, view real-time data such as pricing and user ratings, and save itineraries securely using Google Authentication.


---

### [Live Demo](https://drive.google.com/file/d/1widY-5Ujv059eRhGSrFFMAbgCDrguuMb/view?usp=sharing) | [Documentation](Documentation.pdf)

---


## Features
- **AI-Driven Itinerary Generation:** Google Gemini AI creates personalized travel plans based on user preferences.
- **Geoapify Maps Integration:** Display hotels, restaurants, and attractions with real-time data like pricing, ratings, and address.
- **Google Maps Redirection:** Clicking on places or hotels redirects users to Google Maps for advanced navigation, street view, and location details.
- **Google Authentication:** Secure and simple sign-in for users to access and save their itineraries.
- **Real-Time Travel Data:** Provides real-time info on pricing, availability, and location data for hotels and places to visit.
- **Responsive Design:** Built with TailwindCSS, ensuring a mobile-first, responsive user experience.
- **Reusable Components:** Developed using React.js, allowing for efficient, reusable UI components and fast rendering.
- **Fast Development Environment:** Utilizes Vite for a quick development build and hot module replacement.

## Technology Stack
**Frontend:**
- **Vite:** Provides a fast development environment with quick builds and hot module replacement.
  **Why:** Enhances development speed and efficiency with faster build times.
- **React.js:** Reusable components and fast rendering.
  **Why:** Ensures smooth performance and quick updates.
- **React Router:** Seamless navigation between app sections without page reloads.
  **Why:** Enhances user experience with smooth transitions.
- **Geoapify API:** Displays location data for places and hotels with real-time updates, redirects to Google Maps for detailed navigation.
  **Why:** Offers flexible tools for location-based features.
- **Google Maps Integration:** Allows users to explore destinations further with features like directions and street view.
  **Why:** Provides advanced navigation tools for a better travel experience.
- **TailwindCSS:** Utility-first CSS for responsive design.
  **Why:** Ensures a mobile-first, responsive user interface.
- **Shadcn/UI:** Provides reusable UI components like buttons and modals.
  **Why:** Maintains a consistent and customizable design throughout the app.

**Backend:**
- **Google Authentication:** Manages user login via Google Sign-In.
  **Why:** Provides a secure and easy authentication method.
- **Firebase Database:** Stores user data, travel preferences, itineraries, and trip history with real-time syncing.
  **Why:** Ensures fast and scalable data management.
- **Google Gemini AI:** Generates personalized travel itineraries based on user inputs like budget, duration, and interests.
  **Why:** Delivers tailored travel suggestions using AI.

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later)
- A Firebase account and project for database and authentication setup.

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/routecraft.git
   cd routecraft

2. **Install dependencies:**

```bash
npm install
```

3. **Create a Firebase project:**

Go to the Firebase Console and create a new project.
Set up Firebase Authentication (Google Sign-In) and Firestore Database.
Obtain your Firebase configuration details.
Set up API keys:

Sign up for the Google Gemini AI API and Geoapify API.
Obtain API keys for both services.
Configure environment variables:

4. **Create a .env file at the root of your project.**
Add the following keys to your .env file:
```bash
Copy code
VITE_FIREBASE_API_KEY=<your-firebase-api-key>
VITE_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
VITE_FIREBASE_PROJECT_ID=<your-firebase-project-id>
VITE_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-sender-id>
VITE_FIREBASE_APP_ID=<your-firebase-app-id>
VITE_GEOAPIFY_API_KEY=<your-geoapify-api-key>
VITE_GEMINI_API_KEY=<your-gemini-api-key>
```
5. **Start the application:**
Run the development server:

```bash
npm run dev
```
