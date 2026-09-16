const events = [
    { title: "Hackathon TechWorld", cat: "Programação", date: "20 Set 2026", place: "São Paulo, SP", ins: "284 inscritos", status: "PUBLICADO", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=700&q=80" },
    { title: "AI Summit 2026", cat: "Inteligência Artificial", date: "28 Set 2026", place: "Online", ins: "421 inscritos", status: "PUBLICADO", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=700&q=80" },
    { title: "Frontend Lab", cat: "Tecnologia", date: "02 Nov 2026", place: "São Paulo, SP", ins: "196 inscritos", status: "PUBLICADO", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80" },
    { title: "Future of Technology", cat: "Inovação", date: "22 Out 2026", place: "Online", ins: "383 inscritos", status: "RASCUNHO", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80" }
];
const sponsors = [
    ["CS", "Cloud Systems", "Cloud & Infraestrutura", "96%"],
    ["FA", "Future AI", "Inteligência Artificial", "92%"],
    ["NX", "Nexx Ventures", "Investimentos & Startups", "88%"],
    ["PW", "Pixel Works", "Produtos digitais", "84%"]
];

document.getElementById("eventList").innerHTML = events.map((e, i) => `
<article class="event">
 <div class="thumb"><img src="${e.img}" alt="${e.title}"></div>
 <div><span class="category">${e.cat}</span><h3>${e.title}</h3><div class="meta"><span>${e.date}</span><span>${e.place}</span></div></div>
 <div><span class="status ${e.status === "RASCUNHO" ? "draft" : ""}">${e.status}</span><div class="inscriptions"><strong>${e.ins}</strong></div><button class="manage" data-event="${i}">Gerenciar →</button></div>
</article>`).join("");

document.getElementById("sponsorList").innerHTML = sponsors.map(s => `
<div class="sponsor"><div class="sponsor-info"><div class="sponsor-avatar">${s[0]}</div><div><strong>${s[1]}</strong><span>${s[2]}</span></div></div><span class="match">${s[3]} match</span></div>`).join("");

let timer;
function toast(msg) { const t = document.getElementById("toast"); t.textContent = msg; t.classList.add("toast-show"); clearTimeout(timer); timer = setTimeout(() => t.classList.remove("toast-show"), 2400) }
document.getElementById("createEvent").onclick = () => toast("O formulário de criação de evento será conectado ao backend.");
document.getElementById("quickCreate").onclick = () => toast("O formulário de criação de evento será conectado ao backend.");
document.getElementById("quickSponsor").onclick = () => toast("A central de patrocinadores será conectada ao backend.");
document.getElementById("sponsorsButton").onclick = () => toast("Central de oportunidades de patrocínio preparada.");
document.querySelectorAll(".manage").forEach(b => b.onclick = () => toast('Gerenciamento de "' + events[b.dataset.event].title + '" preparado.'));

const profile = document.getElementById("profileButton"), menu = document.getElementById("profileMenu");
profile.onclick = e => { e.stopPropagation(); menu.classList.toggle("open") };
document.addEventListener("click", () => menu.classList.remove("open"));
