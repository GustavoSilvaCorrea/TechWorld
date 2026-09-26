# REGRAS DE NEGÓCIO MVP - TechWorld

## Escopo

Apenas regras essenciais para o MVP. Regras de segurança, auditoria e casos extremos foram desconsideradas.

---

# 1. USUÁRIOS

**RN-001** — E-mail único na plataforma

**RN-002** — Cadastro obrigatório para participar

**RN-003** — Usuário só edita sua própria conta

**RN-004** — Uma conta = um usuário

**RN-005** — Dados de login ≠ Dados de perfil

---

# 2. PERFIL DO USUÁRIO

**RN-006** — Perfil é público

**RN-007** — Usuário só edita seu próprio perfil

**RN-008** — Conquistas (emblemas, certificados, colocações) aparecem no perfil

**RN-009** — Usuário não pode dar a si mesmo emblemas/certificados oficiais

**RN-010** — Toda conquista deve ter origem identificável

---

# 3. SEGUIR USUÁRIOS E EMPRESAS

**RN-011** — Usuário pode seguir outros usuários

**RN-012** — Usuário pode seguir empresas

**RN-013** — Seguir não cria automático nenhum vínculo de inscrição

**RN-014** — Um usuário não segue a si mesmo

**RN-015** — Não há múltiplas relações de seguimento com a mesma pessoa/empresa

---

# 4. EMPRESAS

**RN-016** — Empresa deve estar cadastrada para organizar eventos

**RN-017** — Empresa tem página pública

**RN-018** — Empresa é entidade independente (não é um usuário)

**RN-019** — Empresa pode ser: organizadora, coorganizadora, ou patrocinadora

**RN-020** — Uma empresa pode ter múltiplos papéis em eventos diferentes

---

# 5. EVENTOS

**RN-021** — Todo evento precisa de pelo menos uma empresa organizadora

**RN-022** — Evento começa em rascunho (privado)

**RN-023** — Evento deve ser aprovado antes de ser publicado

**RN-024** — Eventos aprovados podem ser editados sem nova aprovação

**RN-025** — Evento pode ser cancelado e fica marcado como cancelado

**RN-026** — Evento tem modalidade: presencial, online ou híbrido

**RN-027** — Evento presencial obriga localização física

**RN-028** — Evento online não precisa de localização

**RN-029** — Evento pode ter limite de vagas

**RN-030** — Data fim não pode ser antes da data início

**RN-031** — Estados do evento:  aguardando aprovação → publicado → inscrições abertas → encerrado (ou cancelado)

---

# 6. INSCRIÇÃO EM EVENTOS

**RN-032** — Só usuário cadastrado pode se inscrever

**RN-033** — Inscrição só é aceita se evento está aberto para inscrições

**RN-034** — Um usuário tem no máximo 1 inscrição ativa por evento

**RN-035** — Número de inscrições não pode ultrapassar capacidade do evento

**RN-036** — Inscrição pode ser automática (confirmada na hora) ou manual (precisa aprovação)

**RN-037** — Usuário pode cancelar sua inscrição

**RN-038** — Estar inscrito no evento ≠ Ter presença confirmada

**RN-039** — Estados de inscrição: solicitada → aguardando aprovação → inscrita → confirmada (ou rejeitada/cancelada)

---

# 7. ATIVIDADES DO EVENTO

**RN-040** — Toda atividade pertence a um evento

**RN-041** — Atividade pode ter inscrição separada do evento

**RN-042** — Estar inscrito no evento não garante vaga na atividade

**RN-043** — Atividade pode ter limite de participantes

**RN-044** — Usuário pode cancelar inscrição em atividade

**RN-045** — Horário fim da atividade não pode ser antes do horário início

---

# 8. HACKATHONS

**RN-046** — Hackathon é um tipo de evento

**RN-047** — Pode ser: só individual, só por equipe, ou ambos

**RN-048** — Organizador define tamanho mínimo e máximo de equipe

**RN-049** — Regras do hackathon devem ser visíveis aos participantes

---

# 9. DESAFIOS

**RN-050** — Desafio pertence a um hackathon

**RN-051** — Desafio pode ter uma empresa patrocinadora ou não

---

# 10. EQUIPES

**RN-052** — Equipe só existe quando hackathon permite

**RN-053** — Participante cria equipe ou é convidado por outra

**RN-054** — Convite precisa ser aceito para adicionar membro

**RN-055** — Equipe tem no máximo um líder/responsável

**RN-056** — Líder faz parte da equipe

**RN-057** — Equipe tem estados: em formação → apta → competindo → finalizada (ou desclassificada)

**RN-058** — Tamanho mínimo e máximo devem ser validados

**RN-059** — Organizador pode desclassificar equipe com motivo registrado

---

---

# 12. AVALIAÇÃO E RESULTADO

**RN-066** — Hackathon pode ter múltiplos critérios de avaliação

**RN-067** — Organizador define os critérios

**RN-068** — Equipe pode ser avaliada por vários jurados

**RN-069** — Resultado final é informado pelo organizador

**RN-070** — Ranking pode ficar oculto até organizador liberar

---

# 13. RANKING

**RN-071** — Ranking mostra classificação de participantes/equipes

**RN-072** — Pode haver empate

**RN-073** — Desempate é definido pelo organizador (plataforma não inventa)

**RN-074** — Colocação fica no histórico do usuário

---

# 14. EMBLEMAS

**RN-075** — Emblema é criado para um evento

**RN-076** — Organizador concede emblema a usuário

**RN-077** — Usuário não pode dar a si mesmo emblema

**RN-078** — Emblema tem origem (referência ao evento)

**RN-079** — Emblema concedido fica registrado permanentemente

**RN-080** — Aparecem no perfil público do usuário

---

# 15. CERTIFICADOS

**RN-081** — Certificado é emitido para um evento

**RN-082** — Organizador emite certificados

**RN-083** — Fica registrado no histórico do usuário

**RN-084** — Aparecem no perfil público

---

# 16. PATROCINADORES

**RN-085** — Só empresa cadastrada pode ser patrocinadora

**RN-086** — Evento pode ter múltiplos patrocinadores

**RN-087** — Uma empresa pode patrocinar vários eventos

**RN-088** — Ser organizador ≠ Ser patrocinador

---

# 17. COMUNICADOS

**RN-089** — Organizador cria comunicados sobre o evento

**RN-090** — Pode ser geral (todos participantes) ou segmentado

**RN-091** — Segmentação por: atividade, hackathon, equipe ou grupo

---

# 18. HISTÓRICO E DADOS

**RN-092** — Evento cancelado fica registrado (não é apagado)

**RN-093** — Emblemas concedidos ficam no histórico

**RN-094** — Certificados emitidos ficam no histórico

**RN-095** — Versões antigas de submissão ficam registradas

**RN-096** — Equipe desclassificada fica registrada

---

# 19. INTEGRIDADE DE DADOS

**RN-097** — Não pode existir inscrição sem evento

**RN-098** — Não pode existir atividade sem evento

**RN-099** — Não pode existir equipe sem hackathon

**RN-100** — Não pode existir emblema sem evento

**RN-101** — Não pode existir certificado sem evento

---
