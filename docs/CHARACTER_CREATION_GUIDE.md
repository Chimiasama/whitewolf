# Guia técnico e editorial de personagens — V5 e W5

## Escopo e critérios de confiança

Este documento orienta criação de personagens de jogador e NPCs originais. Regras dos dois jogos nunca se completam por analogia. Fonte primária: os quinze livros extraídos em `docs`, todos identificados por hash e indexados integralmente em [REFERENCE_INDEX.md](REFERENCE_INDEX.md) e [reference-manifest.json](reference-manifest.json). A indexação não equivale a conferência editorial integral de todos os poderes. Há OCR, páginas em duas colunas e números deslocados: é proibido converter uma extração diretamente em regra executável sem revisão contextual.

Classes de evidência:

1. **Conferida**: regra contextual lida, referência registrada, verificação implementada quando declarada abaixo.
2. **Indexada**: trecho localizado automaticamente, pronto para revisão; não entra automaticamente no catálogo do app.
3. **Adaptação autoral**: resumo, tradução de trabalho ou arquétipo original. Identificar como tal.
4. **Legada**: texto/modelo anterior não validado contra a quinta edição. Não é fonte de regras.

Não reproduzir livros inteiros na interface, não inventar efeitos para preencher lacunas e não confundir NPC publicado com personagem inicial legal. Os arquivos fornecidos permanecem intactos. Referências por página só quando identificadas no próprio texto; para OCR use também arquivo e linha, e confira o contexto.

## Catálogo de fontes e aplicação

| Arquivo em docs | Jogo | Categoria | Utilização |
|---|---|---|---|
| Vapire5edenglish | V5 | Básico | Criação pp. 135–151; Atributos/Perícias pp. 155–174; predadores pp. 175–178; Vantagens/Defeitos pp. 179–199; Disciplinas pp. 243–287. Autoridade para mecânica básica. |
| Vampiro5edCompaniomptbr | V5 | Companion em português | Ravnos, Salubri, Tzimisce; mortais e carniçais; terminologia publicada em português. Conferir atualizações com Players Guide, sem acumular duas versões da mesma regra. |
| Vampire5edPlayersGuide01 | V5 | Expansão e consolidação | Clãs, maldições alternativas, criação resumida pp. 64–65, poderes, predadores, Caitiff, Sangue-Fraco, personagens mortais/carniçais, relações e jogo em grupo. |
| Vampire5edPlayersGuide02 | V5 | **Comunitário / opcional** | Créditos: Bully, Storytellers Vault Community Content Agreement, 2021. NÃO é continuação do Players Guide oficial. Predadores, Vantagens e poderes deste arquivo exigem habilitação editorial; não podem sobrescrever regras oficiais. |
| Vampire5edChicagobyNight | V5 | Cenário, clã e elenco | Lasombra, intriga urbana, biografias, ambições, Convicções, Pilares, Disciplinas e relações. NPCs não determinam orçamento de criação. |
| Vampire5edCultsoftheBloddGods | V5 | Clã/cultos | Hecata, necromancia, Oblívio, cerimônias, cultos e Loresheets. Adesão religiosa não é uma característica racial automática do clã. |
| Vampire5edForbiddenReligions | V5 | Cultos e histórias | Crenças, vínculos, custos sociais, rituais e dilemas. Opções excepcionais exigem aprovação da crônica. |
| Vampire5edAnarch | V5 | Facção e ambiente | Política, território, sobrevivência, relações entre ideologia e prática; evitar caricatura de rebeldes sem sociedade. |
| Vapire5edCamarilla | V5 | Facção e ambiente | Hierarquia, favores, domínio, Máscara, instituições e pressão social. Seita não deve ser inferida rigidamente pelo clã. |
| Vampire5edSabat | V5 | Antagonistas | Horror fanático, doutrina e antagonismo. Não importar automaticamente Caminhos e opções de antagonistas como criação de jogador V5 padrão. |
| Vampire5edSecondInquisition | V5 | Antagonistas humanos | Redes institucionais, vigilância, acesso, recursos e vulnerabilidades. Separar humanos, carniçais e vampiros. |
| Vampire5edFallofLondom | V5 | Campanha | Personagens e poderes específicos da campanha; exceções de enredo não viram padrões de criação. Cuidado com spoilers. |
| Vampire5edLettheStreetsRunRed | V5 | Crônicas | Personagens ligados a problemas locais, ganchos, relações e consequências. Cuidado com spoilers. |
| Werewolf5ed | W5 | Básico | Augúrios/tribos pp. 55–81; criação pp. 83–111; formas/Fúria pp. 133–141; Dons pp. 145–179; Ritos pp. 180–187; Talismãs pp. 188–190; antagonistas e exemplos posteriores. |
| Werewolf5edWyrmtide | W5 | Antagonistas e organizações | Pentex, empresas, fomori, agentes e ameaças; usar interesses, relações e efeitos ambientais, sem converter todo adversário em Garou. |

A existência de uma opção em suplemento não a habilita para todas as crônicas. Registrar livro, página/linha, jogo, tipo de personagem, elegibilidade e estatuto editorial de cada entrada.

## Terminologia em português e barreira entre edições

Em 27/10/2026 foram tentadas consultas a `https://wiki.storyteller.com.br/index.php?title=Lobisomem:_O_Apocalipse` (proxy HTTP 403) e `https://whitewolf.fandom.com/pt-br/wiki/Lobisomem:_O_Apocalipse_5ª_Edição` (resposta de bloqueio do proprietário). Não houve leitura bem-sucedida dessas páginas. Não declarar validação pela wiki. O Companion pt-BR é a referência local publicada para termos V5. Wiki é apoio terminológico, nunca autoridade para substituir regras da edição.

| Inglês | Português de trabalho | Política |
|---|---|---|
| Clan / Sire / Embrace | Clã / Senhor / Abraço | Conferir Companion pt-BR; IDs independem de rótulos |
| Bane / Compulsion | Maldição / Compulsão | Não traduzir ambos como fraqueza |
| Hunger / Humanity / Blood Potency | Fome / Humanidade / Potência de Sangue | V5 |
| Thin-Blood / Caitiff | Sangue-Fraco / Caitiff | Exceções próprias, não clãs convencionais |
| Touchstone / Conviction | Pilar / Convicção | V5 relaciona Pilar a Convicção; W5 tem função própria |
| Gift / Rite / Talisman | Dom / Rito / Talismã | W5; não são Disciplina, Ritual de Sangue ou Vantagem genérica |
| Pack / Auspice / Renown | Alcateia / Augúrio / Renome | Padronizar alcateia sem acento; Glória, Honra e Sabedoria |
| Patron Spirit / Favor / Ban | Espírito patrono / Favor / Tabu | W5; não Maldição de clã |
| Galestalkers | Espreitadores da Ventania | Tradução de trabalho, manter inglês visível; não usar Wendigo como sinônimo |
| Ghost Council | Conselho Fantasma | Tradução de trabalho, manter inglês visível; não usar Uktena como sinônimo |
| Hart Wardens | Guardiões do Cervo | Tradução de trabalho, manter inglês visível; não importar Fianna |
| Glass Walkers | Andarilhos do Asfalto | Uma única tribo; não duplicar com “Fiandeiros de Vidro” |

Cria de Fenris não é opção padrão das onze tribos jogáveis do básico W5. Sua existência como antagonismo/contexto não autoriza sua inclusão no seletor. A mesma regra vale para outras tribos desviantes. Não fazer migração semântica automática de Wendigo→Galestalkers ou Uktena→Ghost Council: personagens precisam de revisão e consentimento. Não importar Gnose, Raça, posto ou Dons de edições anteriores como se fossem W5.

## Criação de jogador V5

Referências: básico pp. 135–151 e Players Guide pp. 64–65 (âncora `Vampire5edPlayersGuide01`, “1 CORE CONCEPT”).

1. Definir crônica, tom, limites, coterie, conceito, identidade mortal, Abraço, Senhor e relações. Clã informa herança sobrenatural, não profissão nem personalidade obrigatória. Seita é escolha contextual.
2. Atributos: distribuição **4,3,3,3,2,2,2,2,1**, não apenas soma 22. Vitalidade = Vigor + 3; Força de Vontade = Autocontrole + Determinação.
3. Perícias: Generalista (um 3, oito 2, dez 1), Equilibrado (três 3, cinco 2, sete 1), Especialista (um 4, três 3, três 2, três 1). Não misturar os pacotes.
4. Especialidades: uma gratuita em Acadêmicos, Ofícios, Performance e Ciência quando a Perícia tiver pontos; mais uma gratuita em Perícia com pontos; benefícios de predador são adicionais.
5. Disciplinas convencionais: duas do clã, com 2 e 1 pontos. Poderes individuais respeitam nível, quantidade, pré-requisitos e amálgamas. Não permitir 3 em uma só por equivalência de soma. Caitiff escolhe duas Disciplinas sem pressupor linhagem convencional.
6. Tipo de predador: registrar opções de especialidade/Disciplina, modificadores de Humanidade e Vantagens/Defeitos. Não somar seus benefícios ao orçamento base como se substituíssem 7/2. Sangue-Fraco nunca recebe pontos de Disciplina por predador; recém-criados podem não ter predador estabelecido (Players Guide p. 64).
7. Vantagens/Defeitos base: 7/2; contabilizar separadamente predador, Loresheets e ajustes de idade. Respeitar custos e restrições de cada entrada, não apenas quantidade de itens.
8. Convicções e Pilares: normalmente 1–3 vínculos; Players Guide permite zero Convicções com consequências. Um Pilar ligado a cada Convicção. Humanidade base 7, modificada pelo predador e, quando aplicável, idade.
9. Ambição de longo prazo e Desejo de sessão; Desejo pode ser escolhido depois conforme Players Guide. O app mantém campos narrativos, mas obrigatoriedade rígida de Desejo não é regra universal.
10. Geração/Potência: crias 12ª/13ª e Potência 1, ou Sangue-Fraco 14ª–16ª e Potência 0; neófitos 15 XP; ancillae 35 XP, +2 Vantagens, +2 Defeitos e −1 Humanidade. Não confundir XP com aumento arbitrário de um atributo. Essas faixas não devem datar automaticamente a biografia usando o ano real da máquina.

Custos de evolução: Atributo novo nível ×5; Perícia ×3; especialidade 3; Disciplina de clã ×5, fora de clã ×7, Caitiff ×6; Ritual/Formula nível ×3; Vantagem 3/ponto; Potência de Sangue novo nível ×10. Registrar gastos em histórico; o modo NPC não promete esse orçamento.

Clãs convencionais a contemplar: Banu Haqim, Brujah, Gangrel, Hecata, Lasombra, Malkavian, Ministry/Ministério, Nosferatu, Ravnos, Salubri, Toreador, Tremere, Tzimisce e Ventrue. Hecata: Auspícios, Fortitude e Oblívio; não usar Necromancia de edições anteriores como Disciplina V5 independente. Caitiff e Sangue-Fraco são perfis separados. Maldições alternativas do Players Guide não acumulam com a original sem regra explícita.

Disciplinas: Animalismo, Auspícios, Celeridade, Dominação, Fortitude, Ofuscação, Potência, Presença, Metamorfose, Feitiçaria de Sangue e Oblívio; Alquimia de Sangue-Fraco tem condições e fórmulas próprias. Cada poder precisa de ID, nomes pt/en, jogo/edição, nível, custo, teste, duração, pré-requisitos, amálgamas, referência e estado de revisão. Loresheets: pagar o nível escolhido não concede automaticamente todos os níveis anteriores; custos contam no orçamento de Vantagens. Rituais e cerimônias têm catálogos e condições próprios. O índice localiza as entradas de custo/teste em todos os suplementos; não representa disponibilidade automática no app.

## Criação de jogador W5

Referência primária: resumo p. 83, Dons p. 146, Ritos p. 180.

1. Causa, conceito, Primeira Mudança, relação com Gaia, Umbra, comunidade, território, alcateia e Pilares. Não transplantar a hierarquia política de V5.
2. Escolher augúrio: Ragabash (questionamento), Theurge (espíritos), Philodox (juízo), Galliard (memória/expressão) ou Ahroun (combate). São funções, não classes que proíbem outras competências.
3. Escolher uma das onze tribos e seu pacto com patrono. Atributos, Perícias, especialidades e derivados seguem os pacotes indicados no básico, não uma conversão de ficha antiga.
4. Vantagens 7 / Defeitos 2. Renome: **2 no tipo favorecido pelo patrono e 1 em outro**.
5. Escolher **um Dom nativo, um do augúrio e um da tribo**, mais **um Rito**. Dons possuem Renome total mínimo e elegibilidade, não pontos de “Disciplina de tribo”. Um mesmo Dom pode ter diferentes acessos; utilizar o menor requisito aplicável conforme p. 146.
6. Cada Dom possui Renome associado, custo, ação, parada, sistema, duração e possíveis restrições de forma. Não presumir que Renome associado é o mesmo que Renome total mínimo. Um Dom por turno conforme regra geral; nem todo Dom funciona em forma humana/lupina.
7. Separar Fúria, Harano, Hauglosk e Vexame. Formas hominídea, glabro, crinos, hispo e lupina têm efeitos próprios. Não derivar efeitos só de cor ou rótulo.
8. Ritos têm mestre, participantes, parada, dificuldade, efeitos e condições; Talismãs não são Ritos. Caern é entidade compartilhada com características, não objeto individual gratuito.

| Tribo (identidade inglesa) | Patrono | Renome inicial 2 | Tema |
|---|---|---|---|
| Black Furies | Górgona | Glória | Justiça e oposição a opressão sistêmica |
| Bone Gnawers | Rato | Honra | Comunidade, solidariedade e sobrevivência |
| Children of Gaia | Unicórnio | Sabedoria | Mistérios de Gaia, cura e consciência |
| Galestalkers | Vento Norte | Honra | Caça, persistência e rastreamento |
| Ghost Council | Serpente Chifruda | Sabedoria | Conhecimento, tabus e consequências |
| Glass Walkers | Aranha | Sabedoria | Tecnologia, construção e interconexão |
| Hart Wardens | Cervo | Glória | Hospitalidade, comunidade e território |
| Red Talons | Grifo | Honra | Defesa do mundo selvagem |
| Shadow Lords | Trovão | Glória | Estratégia, ameaça e poder |
| Silent Striders | Coruja | Sabedoria | Viagem, informação e observação |
| Silver Fangs | Falcão | Honra | Liderança, inspiração e responsabilidade |

## NPCs: coerência temática primeiro

NPCs podem usar paradas simplificadas ou ficha completa. **Não é necessário reconstruir XP**; é necessário justificar competências, poderes e recursos pela história e pela função na crônica. Os níveis do gerador indicam presença narrativa, não faixa de XP nem posto W5.

Ficha editorial mínima: jogo/edição; natureza (vampiro, Garou, mortal, carniçal, espírito, fomor etc.); papel na história; objetivo; limite moral; contradição/segredo; aparência e voz; vínculo com jogadores; recursos; competência dominante; vulnerabilidade; gancho; referência de inspiração. Não atribuir Disciplinas a agentes humanos nem Dons a todos os inimigos de W5. Não misturar Fome e Fúria como equivalentes narrativos.

Método: escolher função → estabelecer desejo e custo → definir vínculos → selecionar competências dominantes → escolher poderes que sustentem essa função → acrescentar vulnerabilidade → verificar se o tema do jogo está presente → revisar estereótipos. Clã, tribo, etnia e gênero não substituem personalidade.

Exemplos de leitura:

- **Khadija**, Chicago by Night: trecho anterior a “AICHA RANA”, próximo de L6345. Ambição de confiança junto ao príncipe, etiqueta/política/finanças e Disciplinas de mobilidade/controle/discrição dão suporte à negociação. Aproveitar o padrão “poder social com dependência política”, sem copiar nome ou biografia.
- **Aicha Rana**, mesmo livro: entrada imediatamente seguinte, L6362 em diante. Contradição entre monstruosidade e gentileza como base para cenas e vínculos; não reduzir Banu Haqim a assassino automático.
- **Gustavo Castano**, Wyrmtide: L2215–2255 aproximadamente; comando mercenário, dependência e desconforto com o trabalho. Paradas elevadas de liderança e persuasão sustentam sua função. Exemplo de humano institucionalmente perigoso, não de Garou adversário.
- Arquétipos tribais do básico W5, pp. 61–81: exemplos de identidade e ocupação articuladas com Gaia. Um músico não precisa ser Galliard nem um tecnólogo precisa ser tratado como caricatura urbana.

No app, templates originais de corte/culto/território para V5 e território/mediação espiritual/crise veterana para W5 geram papel, motivação, segredo, vínculo e gancho. São **inspiração autoral**, não reprodução nem conversão dos NPCs acima. A ficha ainda exige revisão do Narrador para alinhar todas as estatísticas à função escolhida; criaturas não humanas/Garou de Wyrmtide não estão implementadas pelo gerador.

## Contrato de dados, salvamento e apresentação

- `schemaVersion: 2`; IDs estáveis independentes de tradução. Versões futuras desconhecidas devem falhar com mensagem, não ser silenciosamente rebaixadas.
- Importação valida antes do estado React: tipos, limites, listas, enumerações e imagem local. JSON limitado a 8 MB; sem execução de conteúdo ou confiança em casts TypeScript.
- Dons ficam em `gifts`, com origem; Disciplinas em `disciplines`/`disciplinePowers`. Legados W5 com tribos antigas ou Dons codificados como Disciplinas são recusados para revisão. Preservar o arquivo original; não remapear automaticamente identidades.
- `profile: player|npc` torna explícita a política. NPC não tem promessa de orçamento de XP. Importação estrutural não certifica legalidade mecânica.
- Estilos Tailwind compilados e fontes locais; sem dependência de CDN em tempo de execução. Tipografia ornamental apenas em títulos; contraste e foco visíveis, redução de movimento e impressão.
- Exportação visível no celular. Armazenamento local não é sincronização nem backup remoto; exportar periodicamente. Não armazenar retratos externos que façam rastreamento ao abrir a ficha.

## O que esta entrega implementa e o que ainda exige curadoria

Implementado: validação estrutural/versionamento; separação inicial de Dons W5; onze tribos e patronos; Renome inicial correto no gerador; seleção inicial parcial de Dons referenciados e Rito escolhido em catálogo referenciado; Hecata no catálogo; correção da distribuição convencional V5; validações adicionais de atributos/especialidades/poderes; modo NPC identificado com narrativa original; estilos/fontes locais; impressão, movimento reduzido, idioma e backup móvel; testes de regressão.

**Não declarado completo**: todas as opções de suplementos, revisão de cada poder preexistente, todas as alternativas de acesso a Dons, validação automática de cada Rito/Talismã, fluxo próprio de Sangue-Fraco com seus Méritos/Defeitos/Fórmulas, orçamento/histórico de XP de jogadores, editor de Convicções/Pilares estruturados, criaturas de Wyrmtide, auditoria WCAG completa e confirmação externa dos novos nomes pt-BR. O seletor W5 se identifica como parcial; o índice não é catálogo jogável. Não habilitar opções só para esconder essas lacunas.

## Como revisar uma nova entrada

Criar ficha editorial com referência e edição; ler a seção e exceções; conferir número/coluna no original; traduzir mantendo nome inglês; distinguir regra publicada de adaptação; escrever teste de elegibilidade e pelo menos um caso proibido; revisar no formulário, ficha e ciclo exportar/importar; somente então disponibilizar no seletor. Mudança de regra requer nota de migração e preservação de saves antigos.

### Auditoria de material comunitário e predadores

Os predadores além dos sete perfis básicos já existentes são marcados no app como comunitários/opcionais, com referência ao arquivo de Bully. A marcação não significa revisão integral de suas mecânicas. No catálogo básico corrigiram-se Garganta de Ferro de Bagger, Humanidade de Fazendeiro e o pacote de Osíris (3 pontos entre Fama/Rebanho, 2 entre os Defeitos pertinentes, sem perda de Humanidade). O app oferece uma alocação fixa desse pacote e uma escolha fixa de Disciplina de vários predadores; alternativas completas continuam exigindo expansão do editor. Blood Leech, Cleaver e Scene Queen estão no básico, mas ainda não no seletor: catálogo parcial não deve ser apresentado como catálogo completo.
