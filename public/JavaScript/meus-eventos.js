const myEvents = [
  {
    id:1,titulo:"Hackathon TechWorld",categoria:"Programação",
    descricao:"Competição prática para desenvolver soluções tecnológicas e disputar posições no ranking.",
    data:"20 Set 2026",horario:"09:00 - 18:00",local:"São Paulo, SP",empresa:"TechWorld Labs",
    status:"inscrito",statusLabel:"INSCRITO",
    imagem:"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
    team:{mode:"mine",name:"Code Warriors",code:"TW-2048",members:[
      {name:"Gustavo Silva",role:"Capitão",me:true},
      {name:"Marina Costa",role:"Membro"},
      {name:"Lucas Alves",role:"Membro"},
      {name:"Ana Beatriz",role:"Membro"}
    ],max:5}
  },
  {
    id:2,titulo:"AI Summit 2026",categoria:"Inteligência Artificial",
    descricao:"Palestras, networking e atividades sobre inteligência artificial e suas aplicações.",
    data:"28 Set 2026",horario:"14:00 - 20:00",local:"Online",empresa:"Future AI",
    status:"andamento",statusLabel:"EM ANDAMENTO",
    imagem:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
    team:{mode:"none",max:1}
  },
  {
    id:3,titulo:"Indie Game Night",categoria:"Games",
    descricao:"Evento para conhecer projetos independentes e participar de desafios de desenvolvimento.",
    data:"03 Ago 2026",horario:"18:30 - 23:00",local:"Rio de Janeiro, RJ",empresa:"GameForge",
    status:"finalizado",statusLabel:"FINALIZADO",
    imagem:"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
    rank:"7º",position:"7º lugar",score:"920 pts",participants:"86",certificateDate:"03 Ago 2026",
    team:{mode:"mine",name:"Pixel Hunters",code:"GH-7721",members:[
      {name:"Carlos Mendes",role:"Capitão"},
      {name:"Gustavo Silva",role:"Membro",me:true},
      {name:"Rafael Lima",role:"Membro"}
    ],max:4},
    ranking:[
      ["1","Team Nova","1.240 pts","TN"],
      ["2","Binary Crew","1.180 pts","BC"],
      ["3","DevStorm","1.095 pts","DS"],
      ["4","Bug Hunters","1.040 pts","BH"],
      ["5","Pixel Kings","995 pts","PK"],
      ["7","Gustavo Silva","920 pts","GS",true]
    ]
  },
  {
    id:4,titulo:"Startup Challenge",categoria:"Startups",
    descricao:"Desafio de inovação com equipes criando propostas para problemas reais de mercado.",
    data:"18 Jul 2026",horario:"08:30 - 17:30",local:"Curitiba, PR",empresa:"Launch Hub",
    status:"finalizado",statusLabel:"FINALIZADO",
    imagem:"https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
    rank:"12º",position:"12º lugar",score:"845 pts",participants:"104",certificateDate:"18 Jul 2026",
    team:{mode:"mine",name:"NextGen",code:"NX-9310",members:[
      {name:"Gustavo Silva",role:"Capitão",me:true},
      {name:"Julia Santos",role:"Membro"}
    ],max:4},
    ranking:[
      ["1","Vision Lab","1.390 pts","VL"],["2","Launchers","1.275 pts","LA"],
      ["3","Rocket Devs","1.170 pts","RD"],["4","Next Level","1.050 pts","NL"],
      ["5","Innova","1.010 pts","IN"],["12","Gustavo Silva","845 pts","GS",true]
    ]
  }
];

const $ = id => document.getElementById(id);
const eventsList=$("eventsList"),emptyState=$("emptyState");
let currentEvent=null;

function card(e){
  return `<article class="my-event-card">
    <div class="event-cover"><img src="${e.imagem}" alt="${e.titulo}"></div>
    <div class="event-info"><span class="eyebrow">${e.categoria}</span><h2>${e.titulo}</h2><p>${e.descricao}</p>
      <div class="event-data"><span>📅 <strong>${e.data}</strong></span><span>◷ <strong>${e.horario}</strong></span><span>⌖ <strong>${e.local}</strong></span><span>Empresa: <strong>${e.empresa}</strong></span></div>
    </div>
    <div class="event-side"><span class="status ${e.status}">${e.statusLabel}</span>
      ${e.status==="finalizado"?'<span class="final-info">✓ Ranking + certificado</span>':''}
      <button class="view-button" data-id="${e.id}" type="button">Ver informações →</button>
    </div>
  </article>`;
}

function render(status="todos"){
  const arr=status==="todos"?myEvents:myEvents.filter(e=>e.status===status);
  eventsList.innerHTML=arr.map(card).join("");
  emptyState.classList.toggle("visible",!arr.length);
  document.querySelectorAll(".view-button").forEach(b=>b.onclick=()=>openEvent(myEvents.find(e=>e.id===+b.dataset.id)));
}

function counts(){
  $("countTodos").textContent=myEvents.length;
  $("countInscritos").textContent=myEvents.filter(e=>e.status==="inscrito").length;
  $("countAndamento").textContent=myEvents.filter(e=>e.status==="andamento").length;
  $("countFinalizados").textContent=myEvents.filter(e=>e.status==="finalizado").length;
}

function openEvent(e){
  currentEvent=e;
  $("modalImage").src=e.imagem;$("modalImage").alt=e.titulo;
  $("modalStatus").textContent=e.statusLabel;$("modalStatus").className=`status-badge status ${e.status}`;
  $("modalCategory").textContent=e.categoria;$("modalTitle").textContent=e.titulo;
  $("modalDescription").textContent=e.descricao;$("modalDate").textContent=e.data;
  $("modalTime").textContent=e.horario;$("modalLocation").textContent=e.local;$("modalCompany").textContent=e.empresa;

  renderTeam(e);
  const final=e.status==="finalizado";
  $("resultSection").style.display=final?"block":"none";
  $("certificateSection").style.display=final?"flex":"none";
  if(final){
    $("modalRank").textContent=e.rank;$("modalScore").textContent=e.score;$("modalParticipants").textContent=e.participants;$("modalPosition").textContent=e.position;
    $("rankingList").innerHTML=(e.ranking||[]).map(r=>`<div class="ranking-row ${r[4]?"me":""}"><span class="ranking-place">${r[0]}º</span><span class="ranking-user"><span class="ranking-avatar">${r[3]}</span>${r[1]}</span><span class="ranking-points">${r[2]}</span></div>`).join("");
  }
  $("eventModal").classList.add("open");$("eventModal").setAttribute("aria-hidden","false");document.body.classList.add("modal-open");
}

function closeEvent(){ $("eventModal").classList.remove("open");$("eventModal").setAttribute("aria-hidden","true");document.body.classList.remove("modal-open"); }

function renderTeam(e){
  const t=e.team;
  $("teamCapacity").textContent=t?.max?`${t.members?.length||0}/${t.max} participantes`:"";
  if(!t || t.mode==="none"){
    $("teamContent").innerHTML=`<div class="team-create"><strong>Este evento não exige equipe.</strong><p>Você participa individualmente neste evento.</p></div>`;
    return;
  }
  $("teamContent").innerHTML=`<div class="team-card"><div class="team-main"><div class="team-avatar">${t.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</div><div><strong>${t.name}</strong><small>${t.members.length}/${t.max} integrantes • código ${t.code}</small></div></div><button type="button" id="openTeamButton">Gerenciar equipe</button></div>
  <div class="team-create"><strong>Quer entrar com outra equipe?</strong><p>Use um código recebido do capitão de outra equipe.</p><button type="button" id="joinTeamButton">Entrar com código</button></div>`;
  $("openTeamButton").onclick=()=>openTeamModal(e);
  $("joinTeamButton").onclick=()=>openTeamModal(e,true);
}

function openTeamModal(e,join=false){
  const t=e.team; currentEvent=e;
  $("teamModalEyebrow").textContent=join?"ENTRAR EM EQUIPE":"MINHA EQUIPE";
  $("teamModalTitle").textContent=join?"Entrar em equipe":t.name;
  $("teamModalSubtitle").textContent=join?"No backend, aqui teremos a entrada por código da equipe.":"Gerencie os participantes da sua equipe para este evento.";
  $("teamCode").textContent=join?"":t.code;
  $("teamCode").style.display=join?"none":"block";
  $("teamMembers").innerHTML=join?`<div class="team-code-card"><span>CÓDIGO DA EQUIPE</span><input id="joinCodeInput" style="margin-top:9px;width:100%;height:40px;padding:0 10px;border:1px solid #29292f;border-radius:8px;background:#0d0d10;color:#f6f6f7" placeholder="Ex.: TW-2048"></div>`:
    t.members.map(m=>`<div class="team-member-row"><div class="member-left"><div class="member-avatar">${m.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</div><div><span class="member-name">${m.name}</span><span class="member-role">${m.role}${m.me?" • você":""}</span></div></div><input type="checkbox" ${m.me?"checked":""} ${m.role==="Capitão"?"disabled":""}></div>`).join("");
  $("leaveTeam").style.display=join?"none":"block";
  $("saveTeam").textContent=join?"Entrar na equipe":"Salvar alterações";
  $("teamFeedback").textContent="";
  $("teamModal").classList.add("open");$("teamModal").setAttribute("aria-hidden","false");document.body.classList.add("modal-open");
}

function closeTeam(){ $("teamModal").classList.remove("open");$("teamModal").setAttribute("aria-hidden","true");document.body.classList.remove("modal-open"); }
function openCertificate(){
  if(!currentEvent) return;
  $("certificateEvent").textContent=currentEvent.titulo;$("certificateDate").textContent=currentEvent.certificateDate;
  closeEvent();$("certificateModal").classList.add("open");$("certificateModal").setAttribute("aria-hidden","false");document.body.classList.add("modal-open");
}
function closeCertificate(){ $("certificateModal").classList.remove("open");$("certificateModal").setAttribute("aria-hidden","true");document.body.classList.remove("modal-open"); }

document.querySelectorAll(".status-tab").forEach(t=>t.onclick=()=>{document.querySelectorAll(".status-tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");render(t.dataset.status)});
$("profileButton").onclick=e=>{e.stopPropagation();$("profileMenu").classList.toggle("open")};
document.addEventListener("click",()=> $("profileMenu").classList.remove("open"));
$("closeModal").onclick=closeEvent;$("closeCertificate").onclick=closeCertificate;$("closeTeam").onclick=closeTeam;
$("eventModal").onclick=e=>{if(e.target===$("eventModal"))closeEvent()};$("certificateModal").onclick=e=>{if(e.target===$("certificateModal"))closeCertificate()};$("teamModal").onclick=e=>{if(e.target===$("teamModal"))closeTeam()};
$("certificateButton").onclick=openCertificate;

$("copyTeamCode").onclick=async()=>{if(!$("teamCode").textContent)return;try{await navigator.clipboard.writeText($("teamCode").textContent);$("teamFeedback").textContent="Código copiado."}catch{ $("teamFeedback").textContent="Código: "+$("teamCode").textContent }};
$("leaveTeam").onclick=()=>{$("teamFeedback").textContent="Ação preparada para o backend: sair da equipe.";};
$("saveTeam").onclick=()=>{$("teamFeedback").textContent=$("saveTeam").textContent==="Entrar na equipe"?"Entrada na equipe preparada para o backend.":"Alterações da equipe preparadas para o backend.";};

document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeEvent();closeTeam();closeCertificate()}});
counts();render();
