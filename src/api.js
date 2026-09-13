const API_URL = "http://127.0.0.1:8000";

export async function createGuestIdentity() {
    const response = await fetch(`${API_URL}/identity`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to create guest identity");
    }

    return response.json();
}

export async function getMe(token) {
    const response = await fetch("http://127.0.0.1:8000/auth/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get current identity");
    }

    return response.json();
}