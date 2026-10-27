# Evolução de personagens com experiência — V5 e W5

## Fluxo entregue

Na ficha, **Evoluir com XP** abre **Vínculos e recursos → Experiência**. O jogador registra o XP recebido ou seu saldo acumulado e escolhe uma compra. A prévia apresenta a característica, pontos atuais/futuros, fórmula, custo, saldo resultante e referência. A confirmação aplica característica e débito em uma única atualização. O histórico recebe data, custo, alvo, valores anterior/posterior e referência; observação é opcional.

Exemplo verificado: saldo 40 XP; Força 3 → 4; custo 4 × 5 = 20 XP; novo saldo 20 XP. Comprar 2 → 4 exige duas operações (15 + 20 XP). O app não permite saltar pontos, saldo negativo ou aumentar além do limite.

## Regras consultadas

| Compra | V5 | W5 |
| --- | --- | --- |
| Atributo | novo nível × 5 | novo nível × 5 |
| Perícia | novo nível × 3 | novo nível × 3 |
| Especialidade | 3 XP; exige Perícia com pontos | 3 XP; exige Perícia com pontos |
| Vantagem | 3 XP por ponto novo | 3 XP por ponto novo |
| Disciplina | clã × 5; fora do clã × 7; Caitiff × 6 | não se aplica |
| Ritual de Sangue | nível do Ritual × 3 | não se aplica |
| Fórmula adicional | nível da fórmula × 3 | não se aplica |
| Potência de Sangue | novo nível × 10, limitada pela geração | não se aplica |
| Humanidade | novo nível × 10; autorização narrativa fica com o Narrador | não se aplica |
| Renome | não se aplica | novo nível × 5 |
| Dom | não se aplica | quantidade de Dons após a compra × 2 |
| Rito | não se aplica | 5 XP |
| Loresheet | 3 XP por ponto; cada nível é uma compra independente | não oferecida como catálogo de V5 |

Fontes: `docs/Vapire5edenglish`, tabela pp. 138/152 (L6075, L7221), especialidades p. 159, Loresheets pp. 151/190, geração p. 214 (L12203), Humanidade p. 242 (L14426), Disciplinas p. 244 (L14486), Rituais p. 272 (L18016) e Alquimia p. 283 (L19365). `docs/Werewolf5ed`, tabela e evolução p. 110 (L7316–7415), aprendizado de Dons p. 147 (L9597).

Atributos, Perícias, Disciplinas e cada tipo de Renome têm teto normal 5. Potência usa os máximos por geração do básico (13ª/12ª: 3; 11ª/10ª: 4; 9ª: 5; 8ª: 6; 7ª: 7; 6ª: 8; 5ª: 9; 4ª: 10; Sangue-Fraco: 0). Humanidade chega a 10. Não se compram gerações com XP.

## Mecânicas específicas

- Cada novo ponto de Disciplina inclui a escolha de um poder novo, do nível adquirido ou inferior; pré-requisito e Amálgama são conferidos. Não há cobrança separada pelo poder. Poderes existentes precisam estar completos antes de comprar o próximo ponto.
- Alquimia inclui uma fórmula gratuita por novo ponto. Fórmulas adicionais são compras separadas, sem consumir outro ponto de Disciplina. O Players Guide 01, seção Thin-Blood Alchemy (L5641), permite aprender Alquimia na evolução mesmo sem o Mérito inicial, com taxa de clã. Afinidade permite evoluir a Disciplina permanente escolhida pelo Sangue-Fraco na taxa externa (básico, p. 184).
- Vantagens fixas são adquiridas pelo custo total em pontos: uma Vantagem de 3 pontos custa 9 XP. Melhorias entre níveis disponíveis cobram somente a diferença. A lista do catálogo limita os níveis disponíveis. Méritos de 6 pontos do Guide 02 podem ser importados/salvos.
- Dons exigem origem acessível e Renome total; o mesmo Dom com acessos de tribo/augúrio distintos continua sendo um único Dom. A criação e o gerador também evitam essa duplicação.
- Compras repetidas de especialidade, Ritual, Rito, Dom ou nível de Loresheet são rejeitadas. Aumentos posteriores de características recalculam o custo pelo novo nível.
- Vexame, acordos com espíritos, tempo de estudo, Ressonância e condições narrativas ficam com o Narrador. Não há checkbox de aprovação nem justificativa obrigatória. Sessão zero é opcional e não interfere no XP.

## Modificadores implementados

O conteúdo comunitário continua habilitado, conforme a orientação do projeto:

- **Aprendizado Rápido / Fast Learner**, Guide 02 de Bully, p. 11: Atributos ×4, Perícias ×2 e especialidades 2 XP, conforme os exemplos explícitos da fonte.
- **Competência em Disciplina / Discipline Competence**, Guide 02, seção homônima: registra a Disciplina favorecida e usa a taxa de clã nas compras dela.
- **Alchemy Expert**, Guide 02, seção Supernatural: permite Alquimia a vampiros plenos, com taxa externa.
- **Talento Verdadeiro / Real Talent**, Descendente de Helena 2, básico p. 391: registra Ofícios, Etiqueta ou Performance; a compra da Perícia escolhida custa metade do valor aplicável, arredondado para baixo.

Combinações que dependam de interpretação de mesa e descontos externos, como um Instrutor Especialista pertencente a outro personagem, não são inferidos. O registro manual de XP continua disponível para ajustes definidos pela mesa. Isso não constitui implementação de todos os modificadores de todos os suplementos.

## Ficha concluída e compatibilidade

A conclusão salva `creationCompletedAt` no schema v2. Depois disso, a verificação deixa de exigir a distribuição exata da criação; a ficha pode ter Atributos, Perícias, Renome e poderes maiores sem aparecer como uma criação inválida. Os editores gratuitos de Natureza, Capacidades e Poderes dão acesso à evolução, e os recursos passam a oferecer história e XP. Identidade, anotações e rastreadores de sessão continuam editáveis.

Fichas antigas em jogo podem usar **Esta ficha já está pronta: habilitar evolução**, sem preencher sessão zero ou reconstruir o orçamento inicial. O botão identifica o estágio da ficha; não certifica suas regras nem reembolsa alterações antigas. Salvamento local e exportação/importação preservam o estágio, saldo, compras e escolhas de benefícios.

O motor em `lib/advancement.ts` recalcula o custo sobre o estado atual, compara a prévia, rejeita reaplicação de compra obsoleta e só retorna o novo personagem após validar o débito. IDs duplicados e datas inválidas são rejeitados pelo registro. Não há servidor nem proteção contra edição deliberada de JSON; a conferência da ficha continua com a mesa.

## Correção das Fichas de Conhecimento

O catálogo anterior continha oito entradas ligadas a Lobisomem na seção V5. Elas deixaram de ser oferecidas como Loresheets de Vampiro. O catálogo revisado começa por quatro fichas com cinco níveis cada: Bahari (p. 382), Theo Bell (p. 383), Descendente de Hardestadt (p. 390, Ventrue) e Descendente de Helena (p. 391, Toreador). Descrições são resumos autorais; traduções são de trabalho e mostram o título inglês nos detalhes.

Entradas antigas permanecem no JSON e são exibidas como legadas. Não são apagadas nem recebem outro significado automaticamente. Níveis diferentes da mesma Loresheet coexistem, e comprar o nível 2 não concede o 1. O gerador respeita as restrições de clã das novas entradas.

Os demais benefícios dessas Loresheets são mostrados na ficha para consulta; bônus situacionais, distribuição de pontos concedidos por benefícios e efeitos temporários ainda não são aplicados automaticamente às outras características.

## Pendências mecânicas reais

1. Completar os catálogos: Dons além das opções iniciais, rituais de níveis superiores e suplementos, cerimônias de Oblívio, fórmulas e demais Loresheets V5.
2. Estruturar o caern coletivo: valor novo ×5, contribuições de vários personagens, Ritos e características do caern (W5, pp. 110, 190). Não cobrar essa despesa coletiva como se fosse um Atributo pessoal.
3. Conferir outros modificadores de XP, escolhas internas de Méritos/Defeitos e exceções específicas de suplementos. Não aplicar descontos presumidos a partir do nome de uma vantagem.
4. Expandir a criação avançada por idade/XP inicial, regras alternativas de Maldição e os demais requisitos mecânicos dos catálogos.
5. Rastreadores de dano superficial/agravado e modelos adicionais de NPCs continuam separados desta compra de características.

Itens narrativos opcionais não bloqueiam essas entregas. A implantação atual automatiza os custos e transações acima, dentro dos catálogos disponíveis; não declara reprodução integral de todo o acervo.
