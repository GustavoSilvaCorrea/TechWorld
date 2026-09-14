const accountButtons = document.querySelectorAll(".account-option");
const accountType = document.getElementById("accountType");
const submitText = document.getElementById("submitText");
const loginForm = document.getElementById("loginForm");
const feedback = document.getElementById("feedback");
const senha = document.getElementById("senha");
const togglePassword = document.getElementById("togglePassword");

function updateAccountType(type) {
    accountType.value = type;

    accountButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.type === type);
    });

    submitText.textContent =
        type === "empresa"
            ? "Entrar como empresa"
            : "Entrar como usuário";

    feedback.textContent = "";
}

accountButtons.forEach((button) => {
    button.addEventListener("click", () => {
        updateAccountType(button.dataset.type);
    });
});

togglePassword.addEventListener("click", () => {
    const showingPassword = senha.type === "text";

    senha.type = showingPassword ? "password" : "text";

    togglePassword.textContent = showingPassword ? "◉" : "◌";

    togglePassword.setAttribute(
        "aria-label",
        showingPassword ? "Mostrar senha" : "Ocultar senha"
    );
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const type = accountType.value;
    const email = document.getElementById("email").value.trim();

    feedback.textContent =
        `Login de ${type === "empresa" ? "empresa" : "usuário"} preparado para ${email}.`;

    setTimeout(() => {
        window.location.href = "home.html";
    }, 500);
});