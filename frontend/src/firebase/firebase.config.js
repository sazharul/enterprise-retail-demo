// Firebase is disabled in the GlowCart demo — configure in production only.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey || "demo",
    authDomain: import.meta.env.VITE_authDomain || "demo.firebaseapp.com",
    projectId: import.meta.env.VITE_projectId || "glowcart-demo",
    storageBucket: import.meta.env.VITE_storageBucket || "glowcart-demo.appspot.com",
    messagingSenderId: import.meta.env.VITE_messagingSenderId || "000000000000",
    appId: import.meta.env.VITE_appId || "demo",
    measurementId: import.meta.env.VITE_measurementId || "demo",
};

export default firebaseConfig;
