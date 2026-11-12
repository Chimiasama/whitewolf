# Referências na interface e tela cheia

As informações de regras terminam em “Onde consultar nos livros”, com título,
idioma e páginas impressas. O cadastro `data/bookReferences.json` é independente
dos textos explicativos e dos IDs das fichas; consultar não modifica personagens.

O básico brasileiro e o Guia Suplementar brasileiro têm prioridade quando a
entrada correspondente foi conferida. Fontes disponíveis somente em inglês
mantêm os títulos originais, com explicação em português. Clãs adicionais, opções
de suplementos e conteúdo comunitário conservam suas fontes específicas.

Os números de linha dos arquivos OCR não são números de página. O gerador
`scripts/build-book-references.py` usa marcadores de páginas impressas e intervalos
que delimitam a passagem. Há também referências a seções verificadas e ajustes
manuais de títulos intercalados pela extração em colunas. As opções não localizadas
estão listadas em `BOOK_REFERENCE_AUDIT.md`; a interface não inventa páginas para elas.
O script recebe um snapshot dos catálogos resolvidos como argumento JSON.

Os IDs de contexto distinguem, por exemplo, um poder de uma Disciplina e as
Características de Vampiro das de Lobisomem. Uma fórmula de imitação remete à
regra de Alquimia e ao poder imitado, sem afirmar que exista uma fórmula com
aquele título no livro.

## Android

O APK inicia em modo imersivo: a barra de status e a navegação do sistema ficam
ocultas. Um gesto na borda revela temporariamente as barras, preservando o acesso
às funções do telefone. O modo é reaplicado quando a atividade recupera foco.

O plugin SystemBars do Capacitor 8 fornece os insets do recorte/câmera ao CSS.
Cabeçalho, rodapé e diálogos usam esses valores, com fallback para `env()` no
navegador. O aplicativo no navegador não tenta encobrir a interface do sistema
operacional; o modo imersivo é aplicado na atividade Android.
