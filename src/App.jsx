import { useState } from 'react';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Google OAuth import
import Hero from './components/custom/Hero'; // Your Hero component

function App() {
  const [count, setCount] = useState(0);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {/* Your existing Hero Component */}
      <Hero />

      {/* You can add other components or logic here if needed */}
    </GoogleOAuthProvider>
  );
}

export default App;
