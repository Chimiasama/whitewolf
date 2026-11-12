# Atualização dos livros comunitários — 07/11/2026

## Fontes recebidas e precedência

O PDF `sources/V5_Vampire_Players_Guide_Unofficial.pdf`, de Bully,
substitui integralmente a transcrição anterior em `Vampire5edPlayersGuide02`.
Seu hash está em `data/unofficialGuideSource.json`. A paginação impressa de
5 a 46 coincide com o contador do arquivo. Ele continua sendo conteúdo
comunitário, distinto do Players Guide oficial (`Vampire5edPlayersGuide01`).

O PDF `sources/V5_New_Predator_Types.pdf`, de **Vesper Burjoski**, também está
preservado integralmente, com transcrição em `V5NewPredatorTypes` e hash em
`data/vesperPredatorSource.json`. Como não tem números impressos, as referências
identificam explicitamente páginas do PDF, contando capa e créditos.

Conforme a instrução do usuário, o app em desenvolvimento usa a versão atual;
não há opções duplicadas ou regras antigas mantidas por compatibilidade com
personagens anteriores. Os tipos Oportunista de Bully e de Vesper são realmente
diferentes e mantêm IDs e fontes distintos.

## Principais diferenças de Bully

| Entrada | Regra atual |
|---|---|
| Amnésia | 3 pontos, p. 13; conserva Habilidades e conhecimentos, mas não lembranças pessoais |
| Coração Calmo | 3 pontos, p. 13 |
| Aprendizado Rápido | Só reduz Habilidades e Especializações; não reduz Atributos, p. 14 |
| Humanidade Elevada | 4 pontos, p. 14 |
| Escorregadio | +2 para escapar de agarrões; não concede bônus para esquivar, p. 17 |
| Inestacável | 5 pontos, p. 17 |
| Presença Inspiradora | Uma rerrolagem gratuita por sessão, p. 18 |
| Competência em Disciplina | 5 pontos, p. 21 |
| Aura Frígida / Mácula de Corrupção | Impedem Rubor da Vida, pp. 21–22 |
| Vínculo Verdadeiro | +3 na proteção e Remorso; morte do Pilar provoca frenesi, p. 22 |
| Sede de Inocência | Testes na presença da vítima com Fome 3 ou mais, p. 22 |
| Fé Verdadeira | 5 pontos e Humanidade mínima 8, p. 23 |
| Item Amaldiçoado | 5 pontos, p. 24 |
| Confidente | Auspícios ou Presença; Domador da Besta 3, p. 7 |
| Sequestrador | Refúgio 3 + Cela 1 + Segurança 1; perde Humanidade 1, p. 9 |
| Predador Online | Auspícios ou Ofuscação, p. 10 |
| Pagar pela Presa | Recursos 3 e Rotina 2, p. 10 |
| Vigia na Água | Forasteiro 2 e Raciocínio + Furtividade, p. 11 |
| Lobo em Pele de Cordeiro | Código de Honra 2 + Subestimado 1; Manipulação + Armas Brancas, p. 11 |

As 18 entradas comunitárias foram reconferidas, incluindo Especializações e
paradas. Domador da Besta substitui o antigo conjunto de três Qualidades do
Confidente; não há mais a lacuna de Presença de Apoio nesse pacote.

Os 52 poderes presentes no PDF têm texto revisado, custos, requisitos e
referências atualizados. Foram incluídos Avisar a Alcateia e Queimada Verbal.
Examinar o Recinto é Rapidez 2; Moldar Aura é Ofuscação 3; Vampiro de Energia
exige Oblívio 2; Telecinese exige Auspícios 3. Comando em Objeto admite Compelir
**ou** Mesmerizar. Os requisitos são usados na seleção, evolução e NPCs.

Foram acrescentados os seis Rituais de Feitiçaria de Sangue, pp. 42–43.
Testemunhar o Fim é uma **Cerimônia de Oblívio 3**, p. 45, sem poder pré-requisito
indicado pelo PDF; não é oferecido como poder de Disciplina ou fórmula imitadora.

## Diferenças internas da própria fonte

Não foram corrigidas por suposição:

- Predador Online, p. 10: não há parada de caçada indicada. A consulta explica
  isso e orienta a definir a abordagem na mesa, sem reaproveitar uma parada antiga.
- Esconder e Comer lista Alimentação Eficiente 2, enquanto a Qualidade isolada
  custa 3; Assombração Local lista Mestre de Sabedoria 3, mas a entrada custa 2;
  Vigia na Água lista Sentidos Aguçados 2, mas a entrada custa 1; Oportunista
  lista Excesso de Confiança 2, mas a entrada custa 3. O app mantém os valores
  de cada contexto e exibe a diferença na consulta.
- Vampiro de Energia apresenta resistências diferentes entre Paradas e Sistema;
  Ferramentas da Natureza também apresenta duas paradas diferentes.
- Examinar o Recinto está no capítulo de Rapidez, exige Potência 1 e seu sistema
  usa Auspícios. Os campos foram preservados conforme o PDF.
- Queimada Verbal diz uma cena no Sistema e uma rodada na Duração.
- Vitae Viciante diverge entre fim da cena no Processo e uma noite no Sistema.
- A parada de Rato de Laboratório termina com “or”, sem informar alternativa.
  A combinação completa identificável é Inteligência + Ciência.

Essas diferenças estão explicadas nos textos pertinentes para decisão do Narrador.

## Novos tipos de Vesper

Foram adicionados os **24 tipos**, com duas paradas quando a fonte as oferece,
Especializações, escolhas de Disciplina, alocações, benefícios, Defeitos e
modificadores de Humanidade. O total do catálogo passa de 34 para **58 tipos**.
Foram adicionadas também **Emoções Reanimadas, Dependente, Jejum Intermitente e
Estômago Leve**, com as regras completas da p. 10 do PDF e valores dos pacotes.

As alocações entre três Antecedentes preservam o total do pacote. Máscara não
ultrapassa dois pontos, e o Defeito Rejeitado não pode receber apenas um ponto.
Escolhas “um ou outro” usam um seletor, sem conceder os dois benefícios.
Pacotes de valores incomuns, como Prole Numerosa e Alimentador Remoto,
seguem o que a fonte declara; não foram forçados a um orçamento genérico de 3/2.
