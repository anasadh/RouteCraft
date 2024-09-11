// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { Button } from './components/ui/button'
// import Hero from './components/custom/Hero'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       {/* hero */}
//       <Hero/>
//     </>
//   )
// }

// export default App

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
