/*global document,
localStorage,
setInterval,
fetch,
FormData,
alert,
console,
Date*/

document.addEventListener("DOMContentLoaded", updateSite());

function updateSite() {
    let darkMode = localStorage.getItem("dark-mode") === "true";
    const colors = document.querySelector(":root");
    const form = document.getElementById("feedbackForm");
    const resetBtn = document.getElementById("resetBtn");
    const submitBtn = document.getElementById("submitBtn");
    const allInputs = document.querySelectorAll("input:not([type='color'])");
    const darkBtn = document.getElementById("darkBtn");

    const welcomeText = document.getElementById("welcome-text");

    function updateTime() {
        if (!welcomeText) {
            return;
        }
        const timeOfDay = new Date().toLocaleTimeString();
        welcomeText.textContent = timeOfDay;
    }

    updateTime();
    setInterval(updateTime, 100);

    function setDarkModeColors() {
        if (darkMode) {
            colors.style.setProperty("--primary", "#1c1b57");
            colors.style.setProperty("--primary-accent", "#100f36");
            colors.style.setProperty("--txt", "#FFFFFF");
            colors.style.setProperty("--bg-txt", "#ffffff");
            colors.style.setProperty("--bg", "#000000");
            colors.style.setProperty("--body-bg", "#0d0a13");
            colors.style.setProperty("--hover", "#bef2ff");
        } else {
            colors.style.setProperty("--primary", "#539679");
            colors.style.setProperty("--primary-accent", "#467460");
            colors.style.setProperty("--txt", "#FFFFFF");
            colors.style.setProperty("--bg-txt", "#000000");
            colors.style.setProperty("--bg", "#f0f2f5");
            colors.style.setProperty("--body-bg", "#ffffff");
            colors.style.setProperty("--hover", "#cbffc1");
        }
        localStorage.setItem("dark-mode", darkMode);
    }

    function toggleDarkMode() {
        if (!darkBtn) {
            return;
        }
        darkBtn.addEventListener("click", function () {
            darkMode = !darkMode;
            setDarkModeColors();
        });
    }

    function checkValidation(input) {
        const errorSpan = document.getElementById(`${input.id}-error`);
        const isValid = input.checkValidity();
        input.classList.toggle("invalid", !isValid);
        input.classList.toggle("valid", isValid);

        if (errorSpan) {
            errorSpan.textContent = (
                isValid
                ? ""
                : input.validationMessage
            );
            errorSpan.style.display = (
                isValid
                ? "none"
                : "block"
            );
        }
    }

    function updateValidation() {
        allInputs.forEach(function (input) {
            input.addEventListener("input", () => checkValidation(input));
        });
    }

    function resetState(input) {
        input.classList.remove("valid", "invalid");
        const errorSpan = document.getElementById(`${input.id}-error`);
        if (errorSpan) {
            errorSpan.textContent = "";
            errorSpan.style.display = "none";
        }
    }

    function resetValidationStates() {
        allInputs.forEach(function (input) {
            resetState(input);
        });
    }

    function resetForm() {
        form.reset();
        resetValidationStates();
    }

    function listenForButtons() {
        resetBtn.addEventListener("click", function (e) {
            e.preventDefault();
            resetForm();
        });

        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            if (!form.checkValidity()) {
                alert("Please correct all errors before submitting.");
                return;
            }

            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Processing...";

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const url = "https://jsonplaceholder.typicode.com/posts";
                const response = await fetch(url, {
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST"
                });

                if (response.ok) {
                    await response.json();
                    alert("Feedback submitted successfully! Thank you.");
                    resetForm();
                } else {
                    alert("Failed to submit feedback. Please try again later.");
                }
            } catch (err) {
                console.error("Error submitting feedback:", err);
                alert("An error occurred. Please try again later.");
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
    setDarkModeColors();
    toggleDarkMode();

    if (form) {
        updateValidation();
        listenForButtons();
    }

    console.log("Semantic Form Controller initialized.");
}