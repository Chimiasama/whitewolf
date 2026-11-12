# Seleção repetida e descrições de recursos

## Relato e reprodução

O relato foi de fechamento ao selecionar Fama novamente. No navegador, o teste com a implementação anterior conseguiu selecionar/remover repetidamente sem encerrar o aplicativo; não houve confirmação de um crash nativo. Foi confirmado que a lista continuava mostrando a opção e mudava seu botão para Remover, misturando seleção e exclusão no mesmo ponto da tela.

## Comportamento corrigido

- Em catálogos de múltiplas escolhas, uma opção escolhida permanece visível como **Selecionado**, com botão desativado. Toques repetidos não a removem nem a adicionam novamente.
- A remoção continua no botão **Remover** do cartão selecionado.
- Vantagens e Defeitos usam transações sobre o estado atual para adicionar, remover e alterar pontos. Uma segunda tentativa de adicionar o mesmo ID é idempotente.
- Os IDs selecionados são deduplicados apenas para renderização, evitando chaves repetidas em dados antigos; esse ajuste não apaga registros ou pontos do personagem.

## Consulta e cobertura

As descrições são abertas pelo ícone **ⓘ** ou segurando o nome, antes e depois da seleção. Não há um botão adicional de descrição nos cartões.

As referências revisadas mostram funcionamento, níveis, limitações e observações. Incluem Fama, Aliados, Contatos, Recursos, Aparência, Linguística e Defeitos associados em V5/W5; Influência, Refúgio e Rebanho em V5; Refúgio Seguro e Emprego em W5. Regras diferentes entre os jogos ficam separadas. O conteúdo revisado também aparece na consulta geral, na ficha e no PDF.

A revisão posterior cobre todas as entradas atualmente selecionáveis, escolhas de Sangue-Ralo e benefícios de predador. Veja `ADVANTAGE_TEXT_AUDIT.md` para fontes, limites e exceções reais dos arquivos fornecidos. O aviso de resumo permanece apenas para entradas externas ou legadas desconhecidas.

Ao conferir as escalas, foram alinhadas as opções de pontos aos básicos: Aliados até 6 pontos totais, Contatos até 3, Refúgio base até 3, Inimigos mortais de 1–2 e Segredo Sombrio de 1. Valores salvos fora dessas escalas não são alterados automaticamente; continuam selecionáveis e identificados como valor salvo a revisar.

## Fontes

- Vampiro: A Máscara, 5ª edição, livro básico em português brasileiro: seção de Vantagens, Qualidades, Defeitos e Antecedentes; conferência cruzada com o básico em inglês, especialmente Allies, Contacts, Fame, Influence, Haven, Herd e Resources.
- Werewolf: The Apocalypse, Fifth Edition, Core Rulebook em inglês: capítulo de personagens, seções Looks, Linguistics, Safe House, Day Job, Allies, Contacts, Fame e Resources.

A interface mantém as referências bibliográficas do catálogo ao final da consulta. Os textos ampliados são explicações em português baseadas nesses livros, não uma transcrição integral de todo o capítulo.

## Testes

Cobrem seleção com toque duplo em tela móvel para os dois jogos, repetição em um botão desativado, remoção explícita, ajuste de pontos, abertura da descrição sem alterar a ficha, os cinco níveis de Fama, a descrição traduzida e a origem comunitária de Focado e a preservação de um valor antigo fora da escala atual.
