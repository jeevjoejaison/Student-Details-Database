import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
    <GoogleOAuthProvider clientId="898874839639-o37d9sdj5uh6kerqgtisrclas1fsfrps.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
