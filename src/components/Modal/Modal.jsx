import React from "react";

export default function AuthModal({ mode, onClose }) {
    const isRegister = mode === "register";

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div
                className="auth-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="auth-modal-close"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2>
                    {isRegister ? "Créer un compte" : "Se connecter"}
                </h2>

                <p className="auth-modal-subtitle">
                    {isRegister
                        ? "Créez votre compte gratuitement"
                        : "Connectez-vous à votre compte"}
                </p>

                <button className="google-button">
                    <span>G</span>
                    Continuer avec Google
                </button>

                <div className="auth-divider">
                    <span>ou</span>
                </div>

                <input
                    type="email"
                    placeholder="Adresse e-mail"
                    className="auth-input"
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="auth-input"
                />

                <button className="auth-submit-button">
                    {isRegister ? "S'inscrire" : "Se connecter"}
                </button>
            </div>
        </div>
    );
}