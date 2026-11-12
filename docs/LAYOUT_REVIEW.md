# Revisão de layout responsivo

O cabeçalho usava uma linha flexível em que o grupo de ações podia consumir
quase toda a largura e reduzir a marca abaixo da largura do texto. A marca
passou a ocupar uma linha própria em telas estreitas, com ações em três
colunas; no desktop, marca e ações usam colunas independentes.

Outros ajustes:

- Rodapé com colunas explícitas, botões de altura uniforme e suporte às áreas
  seguras de celulares. O conteúdo reserva a altura real do rodapé.
- Cabeçalho e ferramentas fixas respeitam a altura medida do cabeçalho, inclusive
  com texto ampliado. Mudanças de largura dos controles não são animadas.
- Abas, seletores e nomes longos podem quebrar linha, preservando os botões
  de informação, escolha e remoção.
- Diálogos têm título e fechamento separados, altura limitada à janela e corpo
  rolável. O formulário de salvar empilha os controles em telas estreitas.
- Campos com tamanho de texto legível, limites flexíveis e espaçamento uniforme.
- Mantidos os temas, as escolhas das fichas e o comportamento das regras.

Verificação visual e de navegador: etapas V5 e W5 nas larguras de 320, 390,
768 e 1280 pixels; menus, armazenamento, catálogos, diálogos longos e fonte
base ampliada para 20 pixels. As oito paletas concretas foram exercitadas;
o modo automático continua escolhendo a paleta do jogo.

Os testes em `tests/responsive_layout.spec.ts` medem colisões entre marca,
ações e botões do rodapé, extrapolação horizontal nas seis etapas e limites
dos diálogos e menus. Capturas de revisão ficam em `/workspace/outputs/layout`.
