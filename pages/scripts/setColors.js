/*global document,
localStorage*/

let darkMode = localStorage.getItem("dark-mode") === "true";
const colors = document.querySelector(":root");

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