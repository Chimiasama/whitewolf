# Ficha para jogar, testes rápidos e PDF

## Navegação

Concluir a criação e salvar abre a ficha de jogo. Abrir um arquivo salvo ou importar JSON também abre a ficha, sem etapas de construção, lista de pendências ou rodapé de avançar/voltar. Um arquivo ainda incompleto é identificado como personagem salvo que pode ser revisado.

**Editar personagem** abre a edição explicitamente. Os dados existentes, inclusive XP e dano, permanecem no personagem. **Voltar à ficha** retorna ao modo de jogo; salvar uma ficha concluída também retorna à ficha. Os controles de condição atual continuam disponíveis para jogar, enquanto as características permanentes de NPCs simplificados só são editadas no editor.

O botão Salvar atualiza o arquivo que foi aberto, sem exigir escolher seu nome novamente. Para um personagem novo ou importado, pede um nome na primeira gravação. **Mais ações → Salvar uma cópia** permite gravar outro arquivo. O rascunho automático continua separado do arquivo salvo e mantém a origem para continuar a sessão.

## Testes rápidos

Tocar no nome de uma habilidade da ficha abre o rolador com essa habilidade selecionada. Atributos também oferecem um atalho, e Força de Vontade tem um botão de teste. As informações de regras continuam no ícone de informação e no gesto de segurar.

No teste comum, o jogador vê atributo, habilidade, dificuldade, quantidade de dados normais e de Fome/Fúria, e o botão Rolar teste. **Mais opções** reúne os demais tipos de teste, sugestões, modificadores, especializações, categoria, efeitos ativos e exceções. Os resultados mostram o essencial; explicações e referências podem ser expandidas.

Os valores da ficha e as regras de dados especiais, Debilitação e gastos de FV permanecem os mesmos. Um novo atalho limpa modificadores específicos do teste anterior, preservando o efeito de ignorar Vitalidade que já foi pago para o turno. O histórico permanece disponível ao fechar o diálogo e alternar o modo de ficha.

## PDF real

Os botões Salvar PDF e Imprimir/salvar PDF geram um documento PDF independente, com texto selecionável e uma fonte incorporada que preserva a acentuação portuguesa. Não dependem de `window.print()` ou de capturar a tela.

Organização:

1. Identificação, clã/tribo, Senhor/mentor, atributos, habilidades, especializações, Vantagens, Defeitos, níveis de Disciplinas ou Renome/Dons e condição atual.
2. Foto, Ambição, Desejo, Convicções, Pilares, história, crônica, narrativa, relacionamentos, caern e acordos da mesa, conforme os campos preenchidos.
3. Poderes realmente selecionados, com descrição, sistema, custo e referências disponíveis; Dons, Ritos/rituais e talismãs em W5. Inclui ainda detalhes de recursos, Loresheets, Maldição/Compulsão e XP.

Textos extensos continuam em páginas adicionais, respeitando margens e rodapé numerado. O campo **História do personagem** fica na aba Crônica do editor e acompanha o JSON e o PDF. Dados ausentes não são inventados. A foto é incorporada quando válida; um problema na foto é informado sem perder o restante da ficha.

No navegador, o PDF é baixado diretamente. No Android, é gravado no cache privado e enviado ao compartilhamento nativo como arquivo PDF, permitindo escolher o destino disponível para salvar ou compartilhar. Não envia o documento a um serviço externo automaticamente.

A fonte DejaVu Sans e a licença de redistribuição estão em `public/fonts`. Os plugins oficiais Capacitor Filesystem e Share cuidam do arquivo no Android.

## Validação

Testes de interface verificam conclusão, reabertura, edição explícita, teste por habilidade, opções recolhidas e download de um PDF verdadeiro. A conferência manual com `pdftotext` verifica a acentuação, ordem das seções e descrição dos poderes selecionados; os testes de rolagem anteriores continuam cobrindo as regras de V5 e W5.
