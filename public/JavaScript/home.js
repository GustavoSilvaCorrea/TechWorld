const myEventsContainer =
    document.getElementById("myEvents");

const recommendedEventsContainer =
    document.getElementById("recommendedEvents");

const profileButton =
    document.getElementById("profileButton");

const profileMenu =
    document.getElementById("profileMenu");


/*
    DADOS TEMPORÁRIOS

    Futuramente essas informações
    virão do Node.js / banco de dados.
*/


const myEvents = [

    {
        titulo: "Hackathon TechWorld",
        categoria: "Programação",
        descricao:
            "Uma competição para desenvolver soluções inovadoras.",
        data: "20 Set 2026",
        horario: "09:00",
        local: "São Paulo, SP",
        empresa: "TechWorld Labs",
        imagem:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80"
    },

    {
        titulo: "AI Summit 2026",
        categoria: "Inteligência Artificial",
        descricao:
            "Palestras e discussões sobre o futuro da IA.",
        data: "28 Set 2026",
        horario: "14:00",
        local: "Online",
        empresa: "Future AI",
        imagem:
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80"
    },

    {
        titulo: "Indie Game Night",
        categoria: "Games",
        descricao:
            "Uma noite dedicada ao desenvolvimento de jogos independentes.",
        data: "03 Out 2026",
        horario: "18:30",
        local: "Rio de Janeiro, RJ",
        empresa: "GameForge",
        imagem:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80"
    }

];


const recommendedEvents = [

    {
        titulo: "DevOps Experience",
        categoria: "Tecnologia",
        descricao:
            "Práticas modernas para desenvolvimento e infraestrutura.",
        data: "11 Out 2026",
        horario: "10:00",
        local: "Belo Horizonte, MG",
        empresa: "Cloud Systems",
        imagem:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80"
    },

    {
        titulo: "Startups & Innovation",
        categoria: "Startups",
        descricao:
            "Empreendedores e especialistas falando sobre inovação.",
        data: "17 Out 2026",
        horario: "13:00",
        local: "Curitiba, PR",
        empresa: "Launch Hub",
        imagem:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80"
    },

    {
        titulo: "Future of Technology",
        categoria: "Inovação",
        descricao:
            "Um panorama das tecnologias que estão mudando o mundo.",
        data: "22 Out 2026",
        horario: "19:00",
        local: "Online",
        empresa: "TechWorld",
        imagem:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
    }

];


/*
    CRIA CARD
*/

function createEventCard(evento) {

    return `

        <article class="event-card">

            <div class="event-image">

                <img
                    src="${evento.imagem}"
                    alt="${evento.titulo}"
                >

                <span class="event-status">
                    CONFIRMADO
                </span>

            </div>


            <div class="event-body">

                <span class="event-category">
                    ${evento.categoria}
                </span>


                <h3 class="event-title">
                    ${evento.titulo}
                </h3>


                <p class="event-description">
                    ${evento.descricao}
                </p>


                <div class="event-meta">

                    <div class="event-meta-row">
                        <span>Data</span>
                        <span>${evento.data}</span>
                    </div>

                    <div class="event-meta-row">
                        <span>Horário</span>
                        <span>${evento.horario}</span>
                    </div>

                    <div class="event-meta-row">
                        <span>Local</span>
                        <span>${evento.local}</span>
                    </div>

                </div>


                <div class="event-footer">

                    <span class="event-company">
                        ${evento.empresa}
                    </span>

                    <button
                        class="event-button"
                        type="button"
                    >
                        Ver evento →
                    </button>

                </div>

            </div>

        </article>

    `;

}


/*
    MOSTRAR EVENTOS
*/

function renderEvents(container, events) {

    container.innerHTML = "";

    events.forEach((evento) => {

        container.innerHTML +=
            createEventCard(evento);

    });

}


renderEvents(
    myEventsContainer,
    myEvents
);


renderEvents(
    recommendedEventsContainer,
    recommendedEvents
);


/*
    MENU DO PERFIL
*/

profileButton.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        profileMenu.classList.toggle("open");

    }
);


document.addEventListener(
    "click",
    () => {

        profileMenu.classList.remove("open");

    }
);