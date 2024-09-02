import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

export const initializeFirebase = () => {
    console.log('Initializing Firebase...');

    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');

    // Initialize Analytics if running in the browser
    if (typeof window !== 'undefined') {
        const analytics = getAnalytics(app);
        console.log('Firebase Analytics initialized successfully');
    } else {
        console.log('Firebase Analytics not initialized (server-side)');
    }
};
