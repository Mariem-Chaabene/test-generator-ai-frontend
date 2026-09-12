import React, { useEffect } from "react";
import { createGuestIdentity } from "../src/api";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {

    useEffect(() => {

        async function initializeIdentity() {

            const token = localStorage.getItem("guest_token");

            if (!token) {

                try {

                    const data = await createGuestIdentity();

                    localStorage.setItem(
                        "guest_token",
                        data.guest_token
                    );

                    //console.log("Guest identity created");

                } catch (error) {

                    console.error(
                        "Error creating guest identity:",
                        error
                    );
                }
            }

        }

        initializeIdentity();

    }, []);


  return (
    <div className="layout">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default App;