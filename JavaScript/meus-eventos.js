const upcomingEvents = [
    { id: "hackathon", title: "Hackathon TechWorld", category: "Programação", description: "Uma competição para desenvolver soluções inovadoras com pessoas que compartilham suas ideias.", date: "20 Set 2026", day: "20 SET", time: "09:00", location: "São Paulo, SP", company: "TechWorld Labs", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80" },
    { id: "aiSummit", title: "AI Summit 2026", category: "Inteligência Artificial", description: "Palestras e discussões sobre o futuro da IA e suas aplicações práticas.", date: "28 Set 2026", time: "14:00", location: "Online", company: "Future AI", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80" },
    { id: "indieGame", title: "Indie Game Night", category: "Games", description: "Uma noite dedicada ao desenvolvimento de jogos independentes e seus criadores.", date: "03 Out 2026", time: "18:30", location: "Rio de Janeiro, RJ", company: "GameForge", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80" }
];

const pastEvents = [
    { id: "frontendWeek", title: "Frontend Week", category: "Tecnologia", date: "12 Ago 2026", location: "Online", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80" },
    { id: "startupConnection", title: "Startup Connection", category: "Startups", date: "26 Jul 2026", location: "São Paulo, SP", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=300&q=80" }
];

function eventCard(event) {
    return `<article class="event-card"><div class="event-image"><img src="${event.image}" alt="${event.title}"><span class="status">CONFIRMADO</span></div><div class="event-body"><span class="event-category">${event.category}</span><h3 class="event-title">${event.title}</h3><p class="event-description">${event.description}</p><div class="event-meta"><div class="event-meta-row"><span>Data</span><span>${event.date}</span></div><div class="event-meta-row"><span>Horário</span><span>${event.time}</span></div><div class="event-meta-row"><span>Local</span><span>${event.location}</span></div></div><div class="event-footer"><span class="event-company">${event.company}</span><a href="detalhes-evento.html?id=${event.id}" class="card-button">Ver evento →</a></div></div></article>`;
}

function renderPage() {
    const next = upcomingEvents[0];
    document.getElementById("upcomingCount").textContent = upcomingEvents.length;
    document.getElementById("completedCount").textContent = pastEvents.length;
    document.getElementById("nextEventDate").textContent = next.day;
    document.getElementById("nextEventName").textContent = next.title;
    document.getElementById("upcomingEvents").innerHTML = upcomingEvents.map(eventCard).join("");
    document.getElementById("nextEvent").innerHTML = `<article class="featured-card"><div class="featured-image"><img src="${next.image}" alt="${next.title}"><span class="status">PRÓXIMO EVENTO</span></div><div class="featured-content"><span class="eyebrow">${next.category}</span><h2>${next.title}</h2><p>${next.description}</p><div class="event-details"><div class="detail"><span>Data</span><strong>${next.date}</strong></div><div class="detail"><span>Horário</span><strong>${next.time}</strong></div><div class="detail"><span>Local</span><strong>${next.location}</strong></div></div><div class="featured-footer"><span class="company">Organizado por ${next.company}</span><a href="detalhes-evento.html?id=${next.id}" class="event-button">Ver detalhes →</a></div></div></article>`;
    document.getElementById("pastEvents").innerHTML = pastEvents.map(event => `<a href="detalhes-evento.html?id=${event.id}" class="history-item"><img class="history-image" src="${event.image}" alt="${event.title}"><div class="history-info"><h3>${event.title}</h3><p>${event.category} · ${event.date} · ${event.location}</p></div><span class="history-badge">PARTICIPADO</span></a>`).join("");
}

const profileButton = document.getElementById("profileButton");
const profileMenu = document.getElementById("profileMenu");
profileButton.addEventListener("click", event => { event.stopPropagation(); const open = profileMenu.classList.toggle("open"); profileButton.setAttribute("aria-expanded", open); });
document.addEventListener("click", () => { profileMenu.classList.remove("open"); profileButton.setAttribute("aria-expanded", "false"); });

renderPage();
