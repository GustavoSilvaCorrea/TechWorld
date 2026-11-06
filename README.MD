# TechWorld — controllers + Supabase

Este pacote é uma base de integração para o MVP do TechWorld. O repositório original tem páginas HTML/JavaScript e `server.js`; confira a estrutura existente antes de substituir arquivos do projeto.

## Instalação

```bash
npm install
cp .env.example .env
npm start
```

Preencha `SUPABASE_URL` e `SUPABASE_ANON_KEY` no `.env`. Use a chave publicável/anon. Nunca coloque a `service_role` em código que possa ser publicado.

## Endpoints

- `GET /api/eventos` — lista eventos publicados. Filtros opcionais: `?busca=java&tipo=HACKATHON&modalidade=ONLINE`
- `GET /api/eventos/:id` — detalhes do evento
- `POST /api/eventos` — cria evento
- `PATCH /api/eventos/:id` — atualiza evento
- `DELETE /api/eventos/:id` — muda o status para CANCELADO
- `POST /api/inscricoes` — inscreve usuário em evento
- `GET /api/inscricoes/usuario/:usuarioId` — inscrições do usuário
- `GET /api/inscricoes/evento/:eventoId` — inscrições de um evento
- `PATCH /api/inscricoes/:id/cancelar` — cancela inscrição
- `GET /api/empresas` e `GET /api/empresas/:id` — consulta empresas
- `POST /api/empresas` e `PATCH /api/empresas/:id` — cria/atualiza empresa
- `GET /api/usuarios/:id` — consulta perfil
- `GET /api/health` — teste da API

## Atenção antes de produção

1. Este é um esqueleto de integração, não uma API pronta para exposição pública. Como usa a chave anon, o Supabase aplica as políticas RLS; crie políticas apropriadas para cada tabela.
2. As rotas de escrita precisam de autenticação e autorização (quem é dono do evento, qual usuário pode cancelar inscrição etc.). Não publique as rotas de escrita sem esses controles.
3. A verificação de vagas feita na controller é suficiente para demonstrar o fluxo, mas não impede sozinha duas inscrições simultâneas na última vaga. Para produção, implemente uma função PostgreSQL/RPC transacional.
4. A tabela `usuarios` do SQL anterior tem `id BIGINT` independente do Supabase Auth. O fluxo de login deve usar Supabase Auth e o perfil precisa de uma relação segura com `auth.users`. Não armazene senha em `usuarios.senha_hash`.
5. O endpoint POST de usuários retorna 501 intencionalmente: o cadastro de autenticação deve ser feito com `supabase.auth.signUp()` e o perfil gravado depois de adaptar o schema. Não invente senha nem grave senha em texto puro.
6. Se o projeto já tiver um `server.js`, não o sobrescreva sem comparar: incorpore os `app.use(...)` das rotas no servidor existente.
7. CORS está aberto para desenvolvimento. Em produção, limite ao domínio do projeto.
