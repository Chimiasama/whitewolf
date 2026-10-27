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

## Regras, referências e estado do catálogo

Consulte o [guia técnico V5/W5](docs/CHARACTER_CREATION_GUIDE.md), o [índice dos livros](docs/REFERENCE_INDEX.md) e o [plano com entregas e pendências](docs/IMPLEMENTATION_PLAN.md). Os catálogos são parciais; o modo aleatório gera NPCs temáticos e não promete orçamento de XP de personagem de jogador. Material comunitário é identificado. Novas traduções de W5 conservam nomes ingleses para conferência.

Os estilos e as fontes são locais. Use `npm ci`, `npm run lint`, `npm run build` e `npm test`. Para testes com Chromium já instalado, defina `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium`; sem isso, execute `npx playwright install chromium` antes dos testes. O índice pode ser atualizado com `python scripts/index-references.py`.

O app salva um rascunho local automaticamente durante a edição. Use **Recuperar rascunho** na página inicial. Isso não substitui exportar JSON: o navegador pode apagar dados locais. Saves W5 de modelos antigos exigem revisão; preserve o arquivo original antes de converter qualquer informação.

## Fluxo de criação simplificado

A criação agora tem seis etapas, permite avançar com pendências e oferece **Resolver** na revisão. Poderes, Ritos e recursos usam seletores com busca; o modo NPC pergunta papel e influência. **Continuar personagem** retoma a etapa e a seção salvas. Veja [como funciona a nova interface](docs/CREATION_UX.md).

Os **34 tipos de predador** do básico e dos dois guias estão incluídos por padrão. As Perícias começam pela escolha Generalista, Equilibrado ou Especialista. Veja [catálogo e escolhas de criação](docs/PREDATOR_CATALOG.md).
