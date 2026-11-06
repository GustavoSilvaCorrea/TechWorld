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

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const type = accountType.value;
    const email = document.getElementById("email").value.trim();
    const password = senha.value;

    feedback.textContent = "Entrando...";

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha: password, accountType: type })
        });

        const data = await response.json();

        if (!response.ok) {
            feedback.textContent = data.message || "Não foi possível fazer login.";
            return;
        }

        // Guarda o usuário logado (sem senha) para ser usado nas inscrições
        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = type === "empresa" ? "empresa-home.html" : "home.html";
    } catch (err) {
        console.error("Erro no login:", err);
        feedback.textContent = "Erro de conexão com o servidor.";
    }
});