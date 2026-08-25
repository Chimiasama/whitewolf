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
- Integração opcional com Gemini para história, ganchos de trama e descrição de retrato.

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
2. Configure a chave do Gemini em `.env.local` se quiser usar geração por IA:
   ```bash
   GEMINI_API_KEY=sua_chave_aqui
   ```
   > **Aviso de segurança:** este é um app 100% client-side (sem backend), então a chave configurada
   > aqui é embutida no bundle JavaScript publicado — tanto na versão web quanto no APK Android via
   > Capacitor. Qualquer pessoa pode extraí-la inspecionando o build. Use uma chave dedicada a este
   > projeto, com cota/orçamento limitado, e nunca reaproveite uma chave usada em outros sistemas.
   > Corrigir isso de forma definitiva exigiria um backend/proxy que guarde a chave no servidor.
3. Rode o app:
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
