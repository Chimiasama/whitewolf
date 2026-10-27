# Plano de implantação — V5/W5

Base: [guia técnico e editorial](CHARACTER_CREATION_GUIDE.md). Esta revisão substitui o plano anterior; preserva os objetivos e explicita entrega e pendências. Não confundir uma fonte indexada com uma regra disponível no aplicativo.

## 1. Referências e edições — entregue nesta revisão

- Inventário de quinze fontes com hashes, classificação e 3.001 âncoras de criação, narrativa, poderes, vantagens e NPCs.
- Separação V5/W5 e identificação do Player’s Guide de Bully como conteúdo comunitário, distinto do Players Guide oficial.
- Guia de regras-base, glossário pt/en, política editorial, exemplos de leitura de NPCs e processo de aprovação de novas entradas.
- Consulta online tentada; wiki Storyteller e Fandom bloquearam acesso. Novas traduções de W5 são provisórias e mostram inglês.

Aceitação: índice reproduzível; fontes originais sem alteração; conteúdo não revisado não anunciado como oficial.

## 2. Integridade e salvamento — entregue nesta revisão

- Validação de tipos, limites, listas, edição e versão antes de importar; erro visível em vez de tela em branco.
- Schema v2, exportação no celular, leitura dos prefixos de saves existentes e recuperação de rascunho local.
- Legados com identidades antigas ou Dons como Disciplinas exigem revisão, sem conversão automática destrutiva.
- Correção da etapa final ao importar/carregar W5 pela tela inicial.

Aceitação: arquivos malformados rejeitados; NPCs dos dois jogos sobrevivem ao ciclo gerar → exportar → importar → salvar → carregar → recuperar rascunho.

## 3. Regras e NPCs — entregue nesta revisão, com catálogo explicitamente parcial

- Onze tribos W5, patronos, Renome favorecido, seleção de Dons com origem própria e Ritos referenciados.
- Exclusão de categorias antigas de Dons do catálogo de Disciplinas. Nenhuma migração automática de tribos de outras edições.
- Hecata; distribuição de Atributos e Disciplinas convencionais; checagem de especialidades e poderes; orçamento de Vantagens incluindo Loresheets e separando bônus de predador.
- Correções pontuais em Bagger/Osíris e restrições de Fazendeiro/Ventrue. Predadores comunitários identificados.
- Gerador explicitamente NPC, sem promessa de XP legal: motivação, segredo, vínculo e gancho; escalas narrativas. Poderes selecionados novamente com requisitos e quantidade coerentes.
- Remoção da escolha de Loresheets vampíricas no gerador W5. Níveis de Loresheet não concedem automaticamente todos os anteriores.

Aceitação: amostragem dos dois jogos, sem categorias cruzadas, três origens de Dons, Renome do patrono correto e narrativa preservada. Isto não certifica todos os poderes preexistentes nem substitui revisão do Narrador.

## 4. Aparência e acesso — entregue nesta revisão

- Tailwind compilado e fontes locais, sem serviços externos para renderizar o app.
- Idioma pt-BR como padrão, preferência persistida, atributo lang atualizado.
- Foco visível, interação de poderes por teclado, redução de movimento, rótulos associados, etapas maiores e anúncio de notificações.
- Impressão/PDF pelo navegador; botão de Lobisomem com tema verde.

Aceitação: build, TypeScript, testes de navegador e inspeção visual desktop/celular. Exportar JSON continua sendo o backup completo; PDF é apresentação, não formato reimportável.

## 5. Expansão editorial — trabalho restante, não anunciado como concluído

1. Confirmar novas traduções W5 com fontes pt-BR acessíveis; manter inglês e não usar nomes de edições antigas como aliases.
2. Conferir cada entrada de Disciplina/poder/Vantagem já existente, e promover entradas do índice para catálogo revisado com referência individual. Revisar também opções comunitárias.
3. Completar alternativas de predador, os três predadores básicos ausentes, Maldições alternativas, Caitiff avançado e fluxo de Sangue-Fraco com seus Méritos, Defeitos e Fórmulas.
4. Evoluir Dons para todos os requisitos e acessos alternativos; validar Ritos/Talismãs e conteúdo de Wyrmtide sem inventar efeitos a partir de OCR.
5. Estruturar Convicções/Pilares, coterie/alcateia, caern, território, segurança de mesa e preferências de conteúdo. Adicionar edição da narrativa gerada e NPCs humanos/espíritos/fomori com paradas próprias.
6. Histórico de XP para jogadores, ferramentas de busca/filtro, auditoria de acessibilidade completa e comparação visual entre plataformas.

Para cada expansão: referência + resumo autoral + nome pt/en + elegibilidade + testes positivos/negativos + teste de salvamento. Nenhuma opção deve entrar em produção apenas por estar num arquivo com “V5” no nome.

## Publicação e verificação

Executar `npm ci`, `npm run lint`, `npm run build` e `npm test`. Em máquina com Chromium do sistema, usar `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm test`; em outra máquina instalar o Chromium gerenciado pelo Playwright. Não versionar relatórios e screenshots de testes. Registrar o resultado em [VALIDATION.md](VALIDATION.md), revisar o diff e publicar o commit no GitHub. Push não comprova deploy de site nem publicação do ambiente de nuvem.

## Revisão de experiência de criação — implementada

A proposta de simplificação foi aplicada: entrada por intenção, seis etapas, seções menores, navegação não bloqueante, revisão com resolução de pendências, seletores pesquisáveis compartilhados, opções condicionais, filtros de indisponíveis/comunitários, bônus separados, retomada da posição e menu de arquivos. Detalhes e limites em [CREATION_UX.md](CREATION_UX.md). Essa entrega reorganiza a experiência; não declara concluída a expansão editorial da fase 5.

## Predadores dos dois guias e pacote de Perícias — implementado

Os 34 tipos estão disponíveis por padrão, com escolhas de Disciplinas, benefícios e Antecedentes. A escolha Generalista/Equilibrado/Especialista precede a alocação de Perícias. Isso resolve as pendências anteriores dos três predadores básicos e das alternativas de pacotes; detalhes em [PREDATOR_CATALOG.md](PREDATOR_CATALOG.md). As demais pendências de conteúdo permanecem separadas.
