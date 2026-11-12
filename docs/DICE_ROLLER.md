# Rolador de V5 e W5

## Acesso e escopo

Na etapa Revisão/ficha, use **Rolar dados**. O rolador aparece nas fichas completas, compactas e de NPC. Funciona localmente, usando `crypto.getRandomValues` e amostragem sem viés para d10. Não usa IA nem serviços externos.

A interface oferece Atributo + Habilidade, dois Atributos, parada personalizada, Força de Vontade atual, Humanidade (V5) e checagens de Sangue/Fúria. Os exemplos de ação são sugestões editáveis. Percepção usa Raciocínio + Percepção como sugestão, sem substituir a decisão do Narrador.

Paradas personalizadas permitem testes de Dons, Disciplinas e paradas excepcionais. Modificadores, categoria da ação, especializações, exceções a dados especiais e efeitos que reduzem penalidades são controlados pelo jogador. Modelos simplificados não recebem Fome/Fúria automaticamente; espíritos não gastam FV nem têm uma trilha separada para rolá-la.

## Contagem e resultados

- 6–9 vale um sucesso; 10 também vale um, mas cada par acrescenta mais dois sucessos: dois 10 = quatro, três 10 = cinco, quatro 10 = oito.
- A dificuldade é quantidade de sucessos necessários, não o número da face do dado. Pode ficar em branco, ou ser informada depois da rolagem para reavaliar o resultado sem rolar ou cobrar recursos de novo.
- Dados especiais substituem dados normais até o tamanho da parada; não são somados a ela.
- A parada mínima é de um dado. Os modificadores e a Debilitação são calculados antes da substituição por dados especiais.

### V5

- Um crítico vitorioso com pelo menos um 10 de Fome é **Crítico Bestial**, terminologia do básico brasileiro. Sem dificuldade definida, o resultado é identificado como potencial crítico bestial.
- Um teste fracassado com pelo menos um 1 de Fome é **Falha Bestial**, mesmo que existam sucessos abaixo da dificuldade. Sem dificuldade, zero sucessos permite confirmar a falha; resultados positivos exigem comparação com a dificuldade ou oposição.
- Dados de Fome não podem ser rerrolados com FV. Selecionar 10 normais é permitido e pode desfazer um crítico bestial.
- Força de Vontade, Humanidade e checagens não usam Fome. Checagens não têm críticos nem rerrolagem por FV.
- A Checagem de Sangue aumenta Fome em um ao mostrar 1–5, limitada a cinco. Falhar já em Fome 5 indica que é necessário resolver o frenesi de fome; não o resolve automaticamente.

### W5

- Dois ou mais resultados 1/2 nos dados de Fúria produzem um resultado brutal. Mostramos **Falha brutal ou N sucessos ao ferir ou causar dano**, com N igual aos sucessos normais (incluindo críticos) mais quatro. Não são quatro por par de resultados brutais.
- O Narrador decide se a ação se beneficia da brutalidade. Isso não é deduzido da habilidade nem da categoria física/social/mental.
- Resultados 1/2 em Fúria ficam bloqueados para rerrolagem. Outros resultados dos dados de Fúria podem ser rerrolados com FV, conforme o livro.
- Testes da trilha de FV e checagens não usam Fúria nem permitem rerrolagem por FV.
- Cada checagem de Fúria com 1–5 reduz Fúria em um. Duas checagens podem ser feitas juntas; a Fúria não fica negativa. Em zero, novas checagens são bloqueadas e o texto informa a perda do lobo.
- Frenesi não é inferido de Fúria 5: essa condição exige adjudicação própria. Em frenesi, o usuário deve desativar o gasto de FV e ignorar a penalidade física nas opções avançadas; os demais efeitos entram nos modificadores aplicáveis.

## Dano e Força de Vontade

A trilha explícita `damage` é a fonte de verdade. Fichas antigas sem essa trilha usam a diferença entre capacidade e contador atual como dano superficial já registrado. Nos modelos simplificados, os contadores herdados da ficha-base não eram usados: só as trilhas explícitas representam dano, e mudar a capacidade não cria ferimentos. Alterações das trilhas e dos contadores sincronizam o estado; as fichas completa e compacta mostram o mesmo valor que o rolador.

- Debilitação ocorre quando toda a trilha está preenchida por dano de qualquer tipo ou combinação.
- Vitalidade debilitada aplica −2 em paradas físicas; FV debilitada, −2 em paradas sociais/mentais. O usuário pode ajustar a categoria da ação e reduzir a penalidade conforme um efeito ativo.
- Não há penalidade automática por cada ferimento isolado. Dano superficial já deve ter sofrido as reduções cabíveis antes de ser registrado.
- FV é rolada usando os espaços livres da trilha, com mínimo de um dado; não se aplica novamente a penalidade social/mental à própria rolagem da trilha.
- Cada ação de rerrolagem permite escolher simultaneamente de um a três dados autorizados. Marca um dano superficial de FV, sem dividir por dois. Se a trilha já está cheia de superficial, converte um em agravado; com tudo agravado, impede novos gastos.
- O gasto é uma transação com os dados selecionados. Uma seleção inválida não cobra FV. O resultado usa os novos dados; não preserva os sucessos anteriores dos dados substituídos. O tamanho da parada original não diminui retroativamente ao gastar FV.
- A opção de V5 para ignorar penalidades de Vitalidade cobra um ponto uma vez e mantém o efeito durante o turno indicado. O usuário encerra o efeito com o botão correspondente; não há um gerenciador automático de turnos.
- **Poder Vindo da Dor**, Fortitude 5, exige ativação com Checagem de Sangue e dura uma cena. Corrigimos o texto antigo que dizia ser passivo. A redução da penalidade e os bônus físicos do efeito podem ser indicados no rolador, sem alterar os Atributos permanentes nem as características derivadas.

## Histórico e limites de automação

O rolador mantém os últimos vinte testes enquanto a ficha permanece aberta, com dados originais e alterações das rerrolagens. Fechar o diálogo preserva esse histórico; sair da ficha o encerra. O histórico não é exportado no JSON; dano e recursos acompanham o personagem e seu rascunho normalmente.

Consequências narrativas (Compulsões, Máculas, destruição etc.), defesa do alvo, dano infligido, bônus de forma, ativação e duração de poderes e exceções específicas não são presumidos a partir dos nomes dos testes. As opções avançadas permitem ajustar esses casos, inclusive proibir rerrolagem em testes que não a aceitam. Checagens especiais de Potência de Sangue ou de poderes não ganham uma rerrolagem por FV.

## Fontes

Numeração impressa:

- **Vampiro: A Máscara, 5ª edição, livro básico, português brasileiro**: pp. 118–123 (testes, sucessos e rerrolagens), 126–127 (dano e Debilitação), 157–158 (FV), 205–207 (Fome, Crítico Bestial, Falha Bestial), 260 (Poder Vindo da Dor).
- **Werewolf: The Apocalypse, Fifth Edition, Core Rulebook, inglês**: pp. 118–123 (paradas, sucessos e gasto de FV), 127–128 (dano e Impairment), 133 (dados e checagens de Fúria), 139–140 (frenesi).
