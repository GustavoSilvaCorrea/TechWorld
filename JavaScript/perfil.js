const profileForm = document.getElementById("profileForm");
const saveFeedback = document.getElementById("saveFeedback");
const profileNamePreview = document.getElementById("profileNamePreview");
const profileUsernamePreview = document.getElementById("profileUsernamePreview");
const profilePhotoInput = document.getElementById("profilePhoto");
const profilePhotoPreview = document.getElementById("profilePhotoPreview");

const profileButton = document.getElementById("profileButton");
const profileMenu = document.getElementById("profileMenu");

const toast = document.getElementById("toast");

const interestsModal = document.getElementById("interestsModal");
const editInterests = document.getElementById("editInterests");
const closeInterests = document.getElementById("closeInterests");
const saveInterests = document.getElementById("saveInterests");
const interestButtons = document.querySelectorAll(".pick-interest");
const interestList = document.getElementById("interestList");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const username = document.getElementById("username").value.trim();

    profileNamePreview.textContent = name || "Seu nome";
    profileUsernamePreview.textContent =
        `${username || "@usuario"} · Membro desde 2026`;

    saveFeedback.textContent = "Alterações salvas.";
    showToast("Perfil atualizado com sucesso.");

    setTimeout(() => {
        saveFeedback.textContent = "";
    }, 2500);
});

profilePhotoInput.addEventListener("change", () => {
    const [file] = profilePhotoInput.files;

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        showToast("Selecione uma imagem válida.");
        return;
    }

    const url = URL.createObjectURL(file);
    profilePhotoPreview.src = url;
    showToast("Foto atualizada visualmente.");
});

profileButton.addEventListener("click", (event) => {
    event.stopPropagation();
    profileMenu.classList.toggle("open");
});

document.addEventListener("click", () => {
    profileMenu.classList.remove("open");
});

editInterests.addEventListener("click", () => {
    interestsModal.classList.add("open");
    interestsModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
});

function closeInterestModal() {
    interestsModal.classList.remove("open");
    interestsModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

closeInterests.addEventListener("click", closeInterestModal);

interestsModal.addEventListener("click", (event) => {
    if (event.target === interestsModal) {
        closeInterestModal();
    }
});

interestButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle("selected");
    });
});

saveInterests.addEventListener("click", () => {
    const selected = [...document.querySelectorAll(".pick-interest.selected")]
        .map(button => button.textContent.trim());

    interestList.innerHTML = selected
        .map(name => `<span class="interest active">${name}</span>`)
        .join("");

    closeInterestModal();
    showToast("Interesses atualizados.");
});

document.getElementById("showAllBadges").addEventListener("click", () => {
    showToast("Tela completa de conquistas preparada para o próximo passo.");
});

document.getElementById("addSocial").addEventListener("click", () => {
    showToast("Cadastro de nova rede social preparado.");
});

document.querySelectorAll(".row-button").forEach((button) => {
    button.addEventListener("click", () => {
        showToast("Edição do contato preparada.");
    });
});

document.querySelectorAll(".danger-button").forEach((button) => {
    button.addEventListener("click", () => {
        showToast("Ação preparada para integração com o backend.");
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeInterestModal();
        profileMenu.classList.remove("open");
    }
});
