# Catálogo de predadores e pacotes de Perícias

## Política do projeto

Por decisão do usuário, os tipos de predador do básico e dos dois guias são opções padrão. A origem comunitária do Guia 02 é registrada como referência bibliográfica, sem filtro, bloqueio ou exigência adicional de aprovação na interface.

## Inventário conferido

| Fonte | Quantidade | Entradas (nomes originais para conferência) |
|---|---:|---|
| Básico V5, pp. 175–178 | 10 | Alleycat, Bagger, Blood Leech, Cleaver, Consensualist, Farmer, Osiris, Sandman, Scene Queen, Siren |
| Players Guide 01, pp. 107–109 | 6 | Extortionist, Graverobber, Grim Reaper, Montero, Pursuer, Trapdoor |
| Player's Guide 02 — Bully, pp. 4–8 | 18 | Business Owner, Confidant, Corporate Leech, Eat the Rich, Hide and Eat, Kidnapper, Lab Rat, Hospital Hunter, Local Haunt, Lurker in the Crowd, Manic Pixie Predator, Online Predator, Opportunist, Pack Hunter, Pay for Blood, Street Feeder, Watcher from the Water, Wolf in Sheep's Clothing |

Total: **34 tipos**, sem IDs repetidos. As opções continuam respeitando as incompatibilidades de clã e Potência de Sangue previstas nas regras. O leitor de texto dos guias intercala colunas: por exemplo, os benefícios de Confidant surgem depois de Eat the Rich, e os de Lurker depois de Online Predator. Os pacotes foram associados pelo contexto, não pela simples proximidade das linhas.

## Implementação

- `data/predators.ts` completa e referencia o catálogo existente, preservando IDs antigos. Acrescenta os três tipos ausentes do básico e os seis do Guia 01.
- `lib/predatorRules.ts` resolve escolhas e aplica transições. O formulário, os benefícios e o orçamento usam o mesmo pacote efetivo.
- As duas alternativas de Disciplina de cada tipo estão representadas. A Feitiçaria de Sangue de Bagger/Osiris é limitada a Tremere/Banu Haqim conforme a nota do Guia 01.
- Blood Leech aumenta a Potência de Sangue em 1 e oferece a escolha da consequência social. Trocar o predador remove esse modificador.
- Scene Queen, Grim Reaper, Trapdoor e Online Predator oferecem as alternativas de seus benefícios/Defeitos.
- Osiris permite distribuir três pontos entre Fama/Rebanho e dois entre Inimigos/Defeito Mítico.
- Extortionist distribui três pontos entre Contatos/Recursos; Pay for Blood entre Recursos/Influência.
- Trapdoor permite Servidor, Rebanho ou segundo ponto de Refúgio, e Defeito Assustador ou Assombrado.
- Os benefícios são adicionais ao orçamento comum e identificados como concedidos pelo predador. Remoção/troca usa os IDs dos benefícios e preserva pontos base de Disciplinas.
- Campos aditivos no schema v2: `predatorDiscipline`, `predatorChoices`, `predatorAllocations`. A importação valida seus formatos; a validação de criação verifica as escolhas e a soma dos pontos.
- As traduções das novas entradas são de trabalho; o registro mantém nome original e fonte. Os efeitos de caça em mesa não são simulados por esse formulário.

## Perícias

Antes de distribuir pontos, o jogador escolhe **Generalista**, **Equilibrado** ou **Especialista**. O alocador passa a usar somente os valores do pacote selecionado, sem tentar adivinhar o pacote por uma união de distribuições.

| Pacote | Distribuição |
|---|---|
| Generalista | Uma Perícia em 3, oito em 2, dez em 1 |
| Equilibrado | Três Perícias em 3, cinco em 2, sete em 1 |
| Especialista | Uma Perícia em 4, três em 3, três em 2, três em 1 |

A escolha é persistida em `skillPath`. Saves sem esse campo continuam importáveis; o usuário escolhe o pacote ao editar. Uma distribuição compatível é preservada. Se a troca exigir apagar pontos, o formulário solicita confirmação; cancelar mantém a seleção e os pontos. Especialidades são preservadas para revisão.

## Verificação

TypeScript e build aprovados; **19 testes de navegador aprovados**, incluindo:

- 34 tipos presentes e 18 entradas do Guia 02 visíveis sem filtro;
- duas opções de Disciplina por pacote;
- aplicação, repetição, remoção e importação dos pacotes, preservando pontos base;
- mudanças de Disciplina, distribuição de Antecedentes e modificadores de Humanidade;
- escolha e persistência do pacote de Perícias;
- cancelamento e confirmação de troca incompatível;
- regressões dos fluxos V5/W5, salvamento e importação.

Essas verificações cobrem as escolhas de criação aqui descritas, não uma auditoria completa de todos os poderes e regras dos livros.
