# Evidências de validação

Data: 27/10/2026. Ambiente Linux, Node.js 24.19.0, npm 11.9.0, Chromium do sistema.

## Executado

- `npm run lint`: aprovado (TypeScript).
- `npm run build`: aprovado; estilos e fontes incluídos localmente. Aviso de chunk JavaScript acima de 500 kB permanece (aprox. 602 kB sem compressão / 174 kB gzip); não foi silenciado.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm test -- --reporter=line`: **8 testes aprovados**, nenhum ignorado, aproximadamente 15 segundos na execução final.
- `python scripts/index-references.py`: 15 fontes, 230.304 linhas, 3.001 âncoras. Isso comprova varredura e indexação, não conferência humana de todas as regras.
- `git diff --check`: sem erros na revisão final.

## Comportamentos exercitados

1. JSON com nome objeto, tribo antiga, versão futura e item nulo: rejeição com mensagem, sem erro React nem tela em branco.
2. Amostragem de 240 NPCs (40 por jogo/escala): reimportação estrutural, narrativa, onze tribos, Renome do patrono, três origens de Dons, ausência de Disciplinas W5 e quantidade de poderes V5.
3. Distribuição de Atributos inválida mesmo com soma 22; ausência de Rito e Renome detectadas.
4. V5 e W5: geração → exportação → recarga → importação → salvamento → carregamento → recuperação do rascunho. Preservação do jogo, perfil, versão e segredo.
5. Exportação visível em viewport 390×844; inspeção de captura mobile e desktop. Largura de rolagem mobile igual à viewport.
6. Idioma do documento pt-BR, fonte Inter e nenhuma requisição externa ao recarregar a interface.
7. Fluxo existente Ravnos até escolha de poderes; screenshot passa a usar diretório do runner; presença de título verificada.
8. Pacotes de Osíris, Bagger e Fazendeiro, identificação de predador comunitário e contabilização de Loresheets no orçamento.

## Limites das evidências

Asserções de estrutura não demonstram validade de todas as regras dos livros. O teste de Ravnos não valida todas as traduções nem completa uma ficha. Não foram testados Android, leitores de tela, todos os navegadores ou todos os NPCs publicados. A aparência completa foi inspecionada na aplicação atual, mas não houve auditoria de contraste WCAG. Os nomes pt-BR novos de W5 não foram confirmados na wiki: tentativas bloqueadas. Catálogos e implementações ainda parciais estão descritos no guia e no plano.

Nenhum arquivo original dos quinze livros foi alterado pela implementação. Push ao GitHub não comprova deploy do aplicativo.

## Revisão de interface de criação

A nova navegação está documentada em [CREATION_UX.md](CREATION_UX.md). A suíte foi ampliada para 14 testes e o teste V5 antigo foi substituído por verificações reais de ordenação predador/poderes e filtragem de requisitos. As evidências da execução anterior descrevem o estado daquele commit; esta revisão não deve ser interpretada como nova conferência de todas as regras dos livros.

Resultado final desta revisão: `npm run lint` e `npm run build` aprovados; `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm test -- --reporter=line` com **14 testes aprovados em 12,3 s**. `git diff --check` sem erros. Na inspeção mobile (390×844), não houve erro JavaScript, a largura da página permaneceu em 390 px e o título deixou de se sobrepor às ações do cabeçalho. A navegação fica fixa no rodapé, com espaço reservado no conteúdo. O aviso de chunk acima de 500 kB permanece.

## Predadores e pacotes de Perícias

`npm run lint` e `npm run build` aprovados; suíte Chromium com **19 testes aprovados em 19,9 s**. Inclui os 34 tipos, opções padrão dos dois guias, transições sem acumular benefícios, importação dos pacotes e confirmação/cancelamento de mudança de distribuição de Perícias. Veja [PREDATOR_CATALOG.md](PREDATOR_CATALOG.md). O aviso de chunk acima de 500 kB permanece.

## Temas, narrativa e ficha de sessão

TypeScript e build aprovados; suíte completa com **23 testes aprovados em 27,5 s**. Quatro testes novos exercitam as nove opções de aparência, galeria, persistência e independência do jogo; exportação/importação de Convicções, crônica, sessão zero e XP; saldo insuficiente; Pilares próprios de W5; edição de narrativa de NPC; alternância de ficha compacta/completa e atualização de Fome; seleção de Ritual inicial de Feitiçaria de Sangue e rejeição dos novos campos malformados.

Inspeção de capturas desktop dos estilos Medieval, Neon, Terror e Papel, galeria e Minimalista no celular. Corrigidos fundos de superfícies antigas e indicadores de etapas para seguir os tokens do tema. Essa inspeção não equivale a auditoria WCAG. O build deixa de incluir o fundo JPEG antigo de aproximadamente 625 kB; o chunk principal JavaScript continua acima de 500 kB (aprox. 632 kB / 187 kB gzip).

Funcionalidades e limites em [APPEARANCE_AND_STORY.md](APPEARANCE_AND_STORY.md). Nenhuma nova revisão integral dos livros é declarada nesta entrega.

## Compras com experiência — V5 e W5

`npm run lint` e build aprovados; suíte completa com **33 testes aprovados em 32,0 s**, sem testes ignorados. Dez testes novos cobrem:

- 40 XP, Força 3 → 4 por 20 XP, prévia, débito, atualização e recibo; salvamento, exportação e reimportação preservam a compra e a conclusão da criação.
- Ficha antiga habilita evolução sem sessão zero, aprovação ou justificativa; compra de Perícia que estava em zero.
- W5: Renome evolui mesmo com marcador de Vexame, conforme política solicitada; Rito custa 5 XP; catálogos dos jogos não se cruzam; largura mobile 390 px.
- Compras sequenciais 2 → 3 → 4 por 15 + 20 XP; teto 5, saldo insuficiente, prévia obsoleta/duplo clique, datas inválidas e operação malsucedida sem alteração do original.
- Disciplina do clã ×5, fora do clã ×7, Caitiff ×6, poder incluído, pré-requisitos/Amálgama; Alquimia, fórmula extra, Ritual, especialidade, Vantagem, Humanidade e teto de Potência por geração.
- Custo do próximo Dom pela quantidade total conhecida; origem, Renome e duplicação; amostra de 120 NPCs W5 sem repetir o mesmo Dom por acessos distintos.
- Loresheets V5 revisadas, dois níveis independentes na criação e evolução, preservação de legado e desconto de Talento Verdadeiro; Méritos comunitários Fast Learner, Discipline Competence e Alchemy Expert, incluindo importação de Mérito de 6 pontos.

Inspeção visual da tela de XP no celular; campos receberam bordas visíveis e saldo no topo da compra. O aviso de chunk acima de 500 kB permanece (aprox. 651 kB / 194 kB gzip). Catálogos ainda parciais e caern coletivo estão explicitados em [EXPERIENCE_ADVANCEMENT.md](EXPERIENCE_ADVANCEMENT.md); estes testes não certificam todo o conteúdo dos livros.

## Reconstrução da ampliação — 27/10/2026

Validação executada no GitHub Actions, sem acessar o workspace indisponível. Commit de código validado: `9838ccb6c5dc61433209cbf3ae1f421bf918fe46`.

- `npm ci`, `npm run lint` (TypeScript) e `npm run build`: aprovados.
- Suíte completa: **46 testes aprovados em 1,2 minuto**, com dois workers, sem testes ignorados.
- Execução: https://github.com/Chimiasama/whitewolf/actions/runs/40576991805
- Regressões novas: cardinalidade/identidade dos catálogos; poder obrigatório de cerimônia e duplicação; XP inicial por idade e proteção contra concessão repetida; dano superficial/agravado e overflow; modelos de NPC e importação; fórmulas de imitação; Dons avançados; sobretaxa Hecata; Comércio entre Iguais; criação de espírito pela interface, edição de Poder/dano e recuperação de rascunho.
- Verificações anteriores de compras, salvamento, exportação/importação, geração, temas e criação permanecem aprovadas. Expectativas de tamanho do catálogo e título da aba foram atualizadas para a ampliação.
- O workflow web usa Chrome instalado no runner Ubuntu 24.04; elimina a espera pela instalação de outro navegador.
- APK Android é verificado pelo workflow Android CI, separado da suíte web. Não equivale a publicação em loja.

Escopo e limites em [EXPANDED_RULES.md](EXPANDED_RULES.md). O caern coletivo continua excluído; testes não certificam todos os efeitos situacionais ou traduções dos livros.
