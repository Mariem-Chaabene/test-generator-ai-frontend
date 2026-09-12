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