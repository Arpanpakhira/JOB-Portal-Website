// signup.js

async function signup() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const terms = document.getElementById("terms").checked;
    const errorBox = document.getElementById("errorBox");

    errorBox.innerHTML = "";

    // Frontend validation
    if (!firstName || !lastName) {
        errorBox.innerHTML = "Please enter your full name.";
        return;
    }
    if (!email) {
        errorBox.innerHTML = "Please enter your email.";
        return;
    }
    if (password.length < 6) {
        errorBox.innerHTML = "Password must be at least 6 characters.";
        return;
    }
    if (password !== confirmPassword) {
        errorBox.innerHTML = "Passwords do not match.";
        return;
    }
    if (!terms) {
        errorBox.innerHTML = "You must agree to the terms.";
        return;
    }

    // Prepare data to send to backend
    const data = {
        name: firstName + " " + lastName,
        email,
        password
    };

    try {
        const response = await fetch("http://localhost:8080/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            errorBox.innerHTML = result.message || "Something went wrong!";
            return;
        }

        alert("Account created successfully!");
        window.location.href = "login.html";

    } catch (error) {
        errorBox.innerHTML = "Server error — check console.";
        console.error(error);
    }
}


// Password toggle
const togglePass = document.getElementById("togglePass");
const toggleConfirm = document.getElementById("toggleConfirm");

togglePass.addEventListener("click", () => {
    const p = document.getElementById("password");
    p.type = p.type === "password" ? "text" : "password";
});

toggleConfirm.addEventListener("click", () => {
    const p = document.getElementById("confirmPassword");
    p.type = p.type === "password" ? "text" : "password";
});
