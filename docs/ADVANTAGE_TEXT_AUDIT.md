# Auditoria dos textos de Vantagens e Defeitos — V5 e W5

Cobertura do catálogo selecionável: 121 entradas de Vampiro e 54 de Lobisomem
(incluindo os novos Antecedentes base de Máscara e Pacto Espiritual necessários
para contextualizar suas Qualidades). Há ainda 16 escolhas específicas de
Sangue-Ralo e definições compartilhadas pelos benefícios de todos os pacotes de
predador disponíveis. A auditoria automatizada percorre os catálogos efetivos,
incluindo escolhas opcionais desses pacotes, e exige texto e referência.

## Fontes e redação

- `docs/Vampiro5edptbr`, especialmente pp. 175–194: fonte prioritária brasileira.
  O OCR foi revisado com `docs/Vapire5edenglish`. Nomes confirmados incluem
  Sabujo de Sangue, Esôfago de Ferro e Sangue Agregador.
- `docs/Vampire5edPlayersGuide01`, p. 121: Duas Vezes Amaldiçoado. Fraco de Vontade agora segue o guia comunitário atual, p. 16, conforme a precedência indicada pelo usuário.
- `docs/Vampire5edPlayersGuide02`, pp. 13–24: **V5 Player’s Guide — Bully,
  conteúdo comunitário**, não o Players Guide oficial. A interface identifica
  essa origem. A tradução conserva valores, exceções e limitações da fonte.
- `docs/V5NewPredatorTypes`, pp. 3–10 do PDF: Vesper Burjoski, 24 tipos e quatro novas características comunitárias.
- `docs/Werewolf5ed`, pp. 98–105: traduções de trabalho das opções de W5.
- `docs/Werewolf5edWyrmtide`, pp. 28–29: traduções de trabalho das opções de
  personagem do suplemento.

Os textos ficam em `data/advantageFullTexts.json` e
`data/thinBloodReferences.json`. São redações revisadas/reconstituídas e
traduções em português dos arquivos fornecidos, não reprodução da diagramação
nem transcrição diplomática do OCR. Incluem sistemas, frequências, custos,
exceções, riscos e contexto aplicáveis. O texto revisado substitui as descrições
antigas divergentes também no catálogo retornado e nas consultas. As traduções
de fontes inglesas continuam abertas à revisão do usuário.

A consulta é compartilhada entre criação, biblioteca, ficha pronta e PDF.
Benefícios concedidos por predador também podem ser consultados pelo ⓘ.
Os valores já salvos não são alterados: escalas fora do catálogo revisado aparecem
como valor salvo a revisar; novas compras usam a escala verificada.

## Correções relevantes

- Focado, Humanidade Elevada, Faz-Tudo, Predador Alfa, Fé Verdadeira e vários
  Defeitos eram atribuídos incorretamente a outros livros ou ao básico. Suas
  fontes foram corrigidas para o guia comunitário quando apropriado.
- Mestre de Sabedoria concede Especializações de Ocultismo por nível de
  Ocultismo na fonte comunitária, não o bônus genérico de Erudição do antigo
  resumo.
- Assombrado de personagem é o Defeito comunitário de cinco pontos. Não se
  confunde com Assombrado de Refúgio, cujo efeito e custo são distintos.
- Item Místico tem escala de um a cinco pontos, em vez de uma única opção de
  dois. Evitado custa dois pontos. Os valores antigos dos personagens permanecem.
- Fama e Recursos em W5 têm suas próprias regras; não recebem benefícios de
  caça de vampiro. Escravo da Lua exige glabro ou hispo e as respectivas
  Checagens de Fúria. Pacto Espiritual separa Poder, Companheiro e Hospedeiro.
- Bibliografia corrigida é aplicada por `scripts/update-advantage-references.py`
  após a geração automática, evitando perder a auditoria ao reconstruir o índice.

## Fontes sem correspondência oficial W5

O PDF atual de Bully substitui Presença de Apoio por Domador da Besta no pacote de Confidente. A antiga lacuna foi resolvida pela atualização da fonte. Detalhes: `COMMUNITY_BOOK_UPDATE.md`.

1. **Herança Selvagem — Pele Espessa**, opção antiga do app: sua regra existente
   é Vitalidade 4 + Vigor por três pontos. Não foi localizada nos livros W5
   fornecidos. Continua preservada e identificada como regra da casa, sem página
   fictícia. Isso não constitui validação como regra oficial.
2. **Influência em W5**: o app já oferecia o Antecedente de V5. Ele continua
   disponível como adaptação explícita com a fonte brasileira de V5, não como
   texto do básico de W5.

Essas duas exceções de W5 impedem afirmar que absolutamente todas as opções antigas têm um
texto oficial completo correspondente nos livros. Todos os demais itens do
catálogo e pacotes têm suas definições consultáveis; divergências internas do guia atual de Bully estão em `COMMUNITY_BOOK_UPDATE.md`. As exceções acima exibem
exatamente a informação verificável e sua situação.
