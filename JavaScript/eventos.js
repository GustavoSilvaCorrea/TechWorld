const events = [
    { id: 1, titulo: "Hackathon TechWorld", categoria: "Programação", descricao: "Uma competição prática para criar soluções tecnológicas.", data: "2026-09-20", dataLabel: "20 Set 2026", horario: "09:00", local: "São Paulo, SP", localKey: "sao-paulo", preco: 0, precoLabel: "Gratuito", empresa: "TechWorld Labs", imagem: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80" },
    { id: 2, titulo: "AI Summit 2026", categoria: "Inteligência Artificial", descricao: "Palestras e networking sobre inteligência artificial.", data: "2026-09-28", dataLabel: "28 Set 2026", horario: "14:00", local: "Online", localKey: "online", preco: 49.9, precoLabel: "R$ 49,90", empresa: "Future AI", imagem: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80" },
    { id: 3, titulo: "Indie Game Night", categoria: "Games", descricao: "Uma noite para conhecer projetos independentes e seus criadores.", data: "2026-10-03", dataLabel: "03 Out 2026", horario: "18:30", local: "Rio de Janeiro, RJ", localKey: "rio", preco: 25, precoLabel: "R$ 25,00", empresa: "GameForge", imagem: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80" },
    { id: 4, titulo: "DevOps Experience", categoria: "Tecnologia", descricao: "Práticas modernas para desenvolvimento e infraestrutura.", data: "2026-10-11", dataLabel: "11 Out 2026", horario: "10:00", local: "Belo Horizonte, MG", localKey: "bh", preco: 0, precoLabel: "Gratuito", empresa: "Cloud Systems", imagem: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80" },
    { id: 5, titulo: "Startups & Innovation", categoria: "Startups", descricao: "Empreendedores e especialistas falando sobre inovação e negócios.", data: "2026-10-17", dataLabel: "17 Out 2026", horario: "13:00", local: "Curitiba, PR", localKey: "curitiba", preco: 79.9, precoLabel: "R$ 79,90", empresa: "Launch Hub", imagem: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80" },
    { id: 6, titulo: "Future of Technology", categoria: "Inovação", descricao: "Um panorama das tecnologias que estão mudando o mundo.", data: "2026-10-22", dataLabel: "22 Out 2026", horario: "19:00", local: "Online", localKey: "online", preco: 35, precoLabel: "R$ 35,00", empresa: "TechWorld", imagem: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80" },
    { id: 7, titulo: "Frontend Lab", categoria: "Tecnologia", descricao: "Workshop focado em interfaces modernas para aplicações web.", data: "2026-11-02", dataLabel: "02 Nov 2026", horario: "09:30", local: "São Paulo, SP", localKey: "sao-paulo", preco: 90, precoLabel: "R$ 90,00", empresa: "WebLab", imagem: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80" },
    { id: 8, titulo: "IA na Prática", categoria: "Inteligência Artificial", descricao: "Aprenda a aplicar ferramentas de IA em projetos reais.", data: "2026-11-14", dataLabel: "14 Nov 2026", horario: "15:00", local: "Online", localKey: "online", preco: 0, precoLabel: "Gratuito", empresa: "Open Future", imagem: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=900&q=80" },
    { id: 9, titulo: "Game Dev Meetup", categoria: "Games", descricao: "Encontro para desenvolvedores e apaixonados por criação de jogos.", data: "2026-11-21", dataLabel: "21 Nov 2026", horario: "16:00", local: "Rio de Janeiro, RJ", localKey: "rio", preco: 0, precoLabel: "Gratuito", empresa: "Pixel House", imagem: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80" }
];

const eventsGrid = document.getElementById("eventsGrid");
const emptyState = document.getElementById("emptyState");
const resultsCount = document.getElementById("resultsCount");
const searchInput = document.getElementById("searchInput");
const dateFilter = document.getElementById("dateFilter");
const locationFilter = document.getElementById("locationFilter");
const priceFilter = document.getElementById("priceFilter");
const sortFilter = document.getElementById("sortFilter");
const clearFilters = document.getElementById("clearFilters");
const clearSearch = document.getElementById("clearSearch");
const emptyClearButton = document.getElementById("emptyClearButton");
const profileButton = document.getElementById("profileButton");
const profileMenu = document.getElementById("profileMenu");
const mobileFilterButton = document.getElementById("mobileFilterButton");
const filtersPanel = document.getElementById("filtersPanel");

const registrationModal = document.getElementById("registrationModal");
const successModal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");
const closeSuccess = document.getElementById("closeSuccess");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalEventName = document.getElementById("modalEventName");
const modalDate = document.getElementById("modalDate");
const modalLocation = document.getElementById("modalLocation");
const modalPrice = document.getElementById("modalPrice");
const paymentStep = document.getElementById("paymentStep");
const paymentSubtitle = document.getElementById("paymentSubtitle");
const freeRegistration = document.getElementById("freeRegistration");
const confirmRegistration = document.getElementById("confirmRegistration");
const registrationFeedback = document.getElementById("registrationFeedback");
const successText = document.getElementById("successText");

let selectedEvent = null;
let selectedPayment = "pix";

function createEventCard(evento) {
    return `
        <article class="event-card">
            <div class="event-image">
                <img src="${evento.imagem}" alt="${evento.titulo}">
                <span class="event-type">DISPONÍVEL</span>
            </div>
            <div class="event-body">
                <span class="event-category">${evento.categoria}</span>
                <h3 class="event-title">${evento.titulo}</h3>
                <p class="event-description">${evento.descricao}</p>
                <div class="event-meta">
                    <div class="event-meta-row"><span>Data</span><span>${evento.dataLabel}</span></div>
                    <div class="event-meta-row"><span>Horário</span><span>${evento.horario}</span></div>
                    <div class="event-meta-row"><span>Local</span><span>${evento.local}</span></div>
                </div>
                <div class="event-footer">
                    <div>
                        <strong class="event-price">${evento.precoLabel}</strong>
                        <div class="event-company">${evento.empresa}</div>
                    </div>
                    <button class="event-button registration-trigger" data-event-id="${evento.id}" type="button">
                        Inscrever-se →
                    </button>
                </div>
            </div>
        </article>
    `;
}

function getSelectedCategories() {
    return [...document.querySelectorAll(".category-filter:checked")].map(input => input.value);
}

function filterEvents() {
    const search = searchInput.value.trim().toLowerCase();
    const categories = getSelectedCategories();
    const location = locationFilter.value;
    const price = priceFilter.value;
    const days = dateFilter.value;
    const now = new Date("2026-09-14T00:00:00");

    let filtered = events.filter(evento => {
        const matchesSearch =
            !search ||
            evento.titulo.toLowerCase().includes(search) ||
            evento.categoria.toLowerCase().includes(search) ||
            evento.empresa.toLowerCase().includes(search) ||
            evento.descricao.toLowerCase().includes(search);

        const matchesCategory = categories.length === 0 || categories.includes(evento.categoria);
        const matchesLocation = location === "todos" || evento.localKey === location;
        const matchesPrice =
            price === "todos" ||
            (price === "gratuito" && evento.preco === 0) ||
            (price === "pago" && evento.preco > 0);

        const eventDate = new Date(evento.data + "T00:00:00");
        const difference = Math.ceil((eventDate - now) / 86400000);
        const matchesDate = days === "todos" || difference <= Number(days);

        return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesDate;
    });

    if (sortFilter.value === "data") filtered.sort((a, b) => new Date(a.data) - new Date(b.data));
    if (sortFilter.value === "titulo") filtered.sort((a, b) => a.titulo.localeCompare(b.titulo));
    if (sortFilter.value === "preco") filtered.sort((a, b) => a.preco - b.preco);

    renderEvents(filtered);
}

function renderEvents(filtered) {
    eventsGrid.innerHTML = filtered.map(createEventCard).join("");

    if (!filtered.length) {
        emptyState.classList.add("visible");
        resultsCount.textContent = "0 eventos encontrados";
    } else {
        emptyState.classList.remove("visible");
        resultsCount.textContent = `${filtered.length} evento${filtered.length === 1 ? "" : "s"} encontrado${filtered.length === 1 ? "" : "s"}`;
    }

    document.querySelectorAll(".registration-trigger").forEach(button => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.eventId);
            const event = events.find(item => item.id === id);
            openRegistrationModal(event);
        });
    });
}

function resetFilters() {
    searchInput.value = "";
    dateFilter.value = "todos";
    locationFilter.value = "todos";
    priceFilter.value = "todos";
    sortFilter.value = "relevancia";
    document.querySelectorAll(".category-filter").forEach(input => input.checked = false);
    filterEvents();
}

function openRegistrationModal(evento) {
    selectedEvent = evento;

    modalTitle.textContent = `Inscrição`;
    modalDescription.textContent = evento.preco === 0
        ? "Confira os dados e confirme sua inscrição."
        : "Confira os dados e escolha a forma de pagamento.";

    modalImage.src = evento.imagem;
    modalImage.alt = evento.titulo;
    modalCategory.textContent = evento.categoria;
    modalEventName.textContent = evento.titulo;
    modalDate.textContent = `${evento.dataLabel} • ${evento.horario}`;
    modalLocation.textContent = evento.local;
    modalPrice.textContent = evento.precoLabel;
    registrationFeedback.textContent = "";

    if (evento.preco === 0) {
        paymentStep.classList.add("hidden");
        freeRegistration.classList.remove("hidden");
        confirmRegistration.innerHTML = `Confirmar inscrição <span>→</span>`;
    } else {
        paymentStep.classList.remove("hidden");
        freeRegistration.classList.add("hidden");
        paymentSubtitle.textContent = "Escolha uma forma de pagamento.";
        confirmRegistration.innerHTML = `Ir para pagamento <span>→</span>`;
    }

    registrationModal.classList.add("open");
    registrationModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeRegistrationModal() {
    registrationModal.classList.remove("open");
    registrationModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function openSuccessModal() {
    successText.textContent = selectedEvent
        ? `Sua inscrição em "${selectedEvent.titulo}" foi registrada com sucesso.`
        : "Sua inscrição foi registrada com sucesso.";

    successModal.classList.add("open");
    successModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeSuccessModal() {
    successModal.classList.remove("open");
    successModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

searchInput.addEventListener("input", filterEvents);
dateFilter.addEventListener("change", filterEvents);
locationFilter.addEventListener("change", filterEvents);
priceFilter.addEventListener("change", filterEvents);
sortFilter.addEventListener("change", filterEvents);

document.querySelectorAll(".category-filter").forEach(input => input.addEventListener("change", filterEvents));

clearFilters.addEventListener("click", resetFilters);
emptyClearButton.addEventListener("click", resetFilters);

clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    filterEvents();
});

profileButton.addEventListener("click", event => {
    event.stopPropagation();
    profileMenu.classList.toggle("open");
});

document.addEventListener("click", () => profileMenu.classList.remove("open"));

mobileFilterButton.addEventListener("click", () => filtersPanel.classList.toggle("open"));

document.querySelectorAll(".payment-method").forEach(button => {
    button.addEventListener("click", () => {
        selectedPayment = button.dataset.payment;

        document.querySelectorAll(".payment-method").forEach(item => {
            item.classList.toggle("active", item === button);
        });

        document.getElementById("pixPanel").classList.toggle("hidden", selectedPayment !== "pix");
        document.getElementById("cardPanel").classList.toggle("hidden", selectedPayment !== "card");
    });
});

closeModal.addEventListener("click", closeRegistrationModal);
closeSuccess.addEventListener("click", closeSuccessModal);

registrationModal.addEventListener("click", event => {
    if (event.target === registrationModal) closeRegistrationModal();
});

successModal.addEventListener("click", event => {
    if (event.target === successModal) closeSuccessModal();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeRegistrationModal();
        closeSuccessModal();
    }
});

confirmRegistration.addEventListener("click", () => {
    if (!selectedEvent) return;

    const name = document.getElementById("modalUserName").value.trim();
    const email = document.getElementById("modalUserEmail").value.trim();

    if (!name || !email) {
        registrationFeedback.textContent = "Preencha seus dados para continuar.";
        return;
    }

    if (selectedEvent.preco > 0 && selectedPayment === "card") {
        const cardNumber = document.getElementById("cardNumber").value.trim();
        const cardName = document.getElementById("cardName").value.trim();
        const cardExpiry = document.getElementById("cardExpiry").value.trim();

        if (!cardNumber || !cardName || !cardExpiry) {
            registrationFeedback.textContent = "Preencha os dados do cartão.";
            return;
        }
    }

    closeRegistrationModal();
    openSuccessModal();
});

filterEvents();
