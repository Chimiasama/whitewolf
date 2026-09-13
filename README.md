# White Wolf 5ª Edição — Criador de Personagens

Aplicativo React/Vite para criar personagens de RPG de **Vampiro: A Máscara 5ª edição** e **Lobisomem 5ª edição** em um fluxo guiado, temático e bilíngue.

> Este é um projeto de ferramenta de fã/não oficial. Ele não substitui os livros oficiais e deve ser usado como apoio de criação, organização e inspiração em mesa.

## Funcionalidades

- Seleção inicial entre Vampiro e Lobisomem.
- Criação manual em etapas com validações de progresso.
- Geração aleatória por nível de experiência.
- Ficha final com trilhas, atributos, perícias, poderes e resumo narrativo.
- Upload de retrato do personagem.
- Salvamento local, carregamento, importação e exportação JSON.
- Conteúdo bilíngue em inglês e português.

## Fluxo de criação

### Vampiro

1. Conceito, nome, Ambição, Desejo e senhor.
2. Clã.
3. Atributos.
4. Perícias.
5. Tipo de predador, Disciplinas, Vantagens, Defeitos, Especialidades, Loresheets e Touchstones.
6. Ficha final.

### Lobisomem

1. Conceito, nome, Ambição, Desejo e mentor.
2. Tribo.
3. Augúrio.
4. Atributos.
5. Perícias.
6. Dons, Vantagens, Defeitos, Especialidades, Loresheets, Rituais, Talismãs e vínculos narrativos da alcatéia.
7. Ficha final.

## Roadmap

O plano completo de melhorias está em [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md). Ele cobre documentação, checklist de pendências, salvamento neutro, terminologia de alcatéia, campos narrativos, modo Narrador/NPC, separação entre Disciplinas e Dons, validações avançadas, exportação e segurança de mesa.

## Rodando localmente

**Pré-requisitos:** Node.js.

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Rode o app:
   ```bash
   npm run dev
   ```

## Scripts úteis

- `npm run dev` — inicia o Vite em desenvolvimento.
- `npm run build` — gera build de produção.
- `npm run lint` — executa `tsc --noEmit`.
- `npm run cap:sync` — build + sincronização Capacitor.
- `npm run cap:open` — abre projeto Android.
- `npm run cap:run` — executa no Android via Capacitor.

## Salvamento e portabilidade

O app salva personagens no navegador e permite exportar/importar JSON. Novas versões devem preservar compatibilidade com saves antigos sempre que possível.
