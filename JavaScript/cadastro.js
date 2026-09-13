const accountButtons =
    document.querySelectorAll(".account-option");

const accountType =
    document.getElementById("accountType");

const usuarioFields =
    document.getElementById("usuarioFields");

const empresaFields =
    document.getElementById("empresaFields");

const submitText =
    document.getElementById("submitText");

const registerForm =
    document.getElementById("registerForm");

const feedback =
    document.getElementById("feedback");

const senha =
    document.getElementById("senha");

const confirmarSenha =
    document.getElementById("confirmarSenha");

const togglePassword =
    document.getElementById("togglePassword");

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");



/*
    ALTERAR TIPO DE CONTA
*/

function updateAccountType(type) {

    accountType.value = type;


    accountButtons.forEach((button) => {

        button.classList.toggle(
            "active",
            button.dataset.type === type
        );

    });


    if (type === "empresa") {

        usuarioFields.classList.add("hidden");

        empresaFields.classList.remove("hidden");

        submitText.textContent =
            "Criar conta empresarial";

    } else {

        usuarioFields.classList.remove("hidden");

        empresaFields.classList.add("hidden");

        submitText.textContent =
            "Criar conta";

    }


    feedback.textContent = "";

}



accountButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            updateAccountType(
                button.dataset.type
            );

        }
    );

});



/*
    MOSTRAR SENHA
*/

togglePassword.addEventListener(
    "click",
    () => {

        if (senha.type === "password") {

            senha.type = "text";

            togglePassword.textContent = "◌";

        } else {

            senha.type = "password";

            togglePassword.textContent = "◉";

        }

    }
);



/*
    MOSTRAR CONFIRMAÇÃO DE SENHA
*/

toggleConfirmPassword.addEventListener(
    "click",
    () => {

        if (
            confirmarSenha.type === "password"
        ) {

            confirmarSenha.type = "text";

            toggleConfirmPassword.textContent = "◌";

        } else {

            confirmarSenha.type = "password";

            toggleConfirmPassword.textContent = "◉";

        }

    }
);



/*
    ENVIO DO FORMULÁRIO

    POR ENQUANTO É APENAS VISUAL.
    FUTURAMENTE ENTRA O FETCH() PARA O NODE.
*/

registerForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        if (
            senha.value !==
            confirmarSenha.value
        ) {

            feedback.textContent =
                "As senhas não são iguais.";

            return;

        }


        const type =
            accountType.value;


        feedback.textContent =
            type === "empresa"
                ? "Cadastro de empresa preparado com sucesso."
                : "Cadastro de usuário preparado com sucesso.";

    }
);