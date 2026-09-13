import React, { useEffect , useState } from "react";
import { createGuestIdentity, getMe } from "../src/api";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal/Modal";
import "./components/Modal/Modal.css";
import "./App.css";

export default function App() {
    const [identity, setIdentity] = useState(null);
    const [authModal, setAuthModal] = useState(null);

    useEffect(() => {
        async function initializeApp() {
            let token = localStorage.getItem("guest_token");

            if (!token) {
                const data = await createGuestIdentity();
                token = data.guest_token;
                localStorage.setItem("guest_token", token);
            }

            const identity = await getMe(token);

            // console.log("Current identity:", identity);

            setIdentity(identity);
        }

        initializeApp();
    }, []);


return (
    <div className="layout">
        <Sidebar />
        <Chat />
        {identity?.type === "guest" && (
            
            <div className="guest-auth-buttons">
                    <button
                        className="guest-login-button"
                        onClick={() => setAuthModal("login")}
                    >
                        Se connecter
                    </button>
                    <button
                        className="guest-register-button"
                        onClick={() => setAuthModal("register")}
                    >
                        S'inscrire gratuitement
                    </button>
            </div>
        )}
        {authModal && (
                <Modal
                    mode={authModal}
                    onClose={() => setAuthModal(null)}
                />
            )}

    </div>
);
}

