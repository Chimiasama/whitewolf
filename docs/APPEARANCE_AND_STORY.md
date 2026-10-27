# Estilos visuais e ferramentas de crônica

## Escolha de aparência

O jogador escolhe o tema na tela inicial ou em **Mais ações → Tema visual**. **Explorar estilos visuais** abre uma galeria com prévias e aplica a escolha imediatamente. Todas as opções funcionam em V5 e W5:

| Opção | Direção visual |
| --- | --- |
| Minimalista | Tipografia sem serifa, linhas simples e poucos ornamentos |
| Neon | Ciano, atmosfera urbana, superfícies azuladas e brilho discreto |
| Terror | Sombras, ferrugem, textura no cabeçalho e cantos retos |
| Medieval | Pergaminho claro, títulos Cinzel e molduras ornamentadas |
| Noite Carmesim | Vinho e atmosfera gótica |
| Lua e Raízes | Verde profundo e símbolo lunar |
| Papel | Fundo claro, leitura simples e superfícies sem textura |
| Alto contraste | Preto, branco, amarelo e contornos fortes |
| Automático por jogo | Noite Carmesim em V5; Lua e Raízes em W5 |

A preferência usa `whitewolf_theme`, independente do personagem e do JSON. O tema automático é o padrão. Tokens CSS são aplicados no documento, inclusive nos modais renderizados por portal. Não há fontes, imagens ou serviços externos novos. Inter e Cinzel continuam locais. Cores de foco e redução de movimento são preservadas. Alto contraste é um estilo disponível, sem promessa de certificação WCAG.

Para adicionar outro estilo, registrar nome, prévia e descrição em `lib/theme.tsx` e uma paleta/variações em `index.css`. Conferir formulários, catálogo, ficha, modais, celular e impressão; trocar só a cor do título não constitui um tema completo.

## Vínculos e narrativa

**Vínculos e recursos → Vínculos** reúne:

- V5: até três pares de Convicção e Pilar. Pares iniciados precisam estar completos antes da conclusão; zero Convicções continua possível conforme Players Guide. As consequências mecânicas de perder Pilares não são automatizadas.
- W5: Pilares em registros próprios, sem aplicar pares de Convicções de V5. A interface não valida todos os requisitos narrativos de W5; o limite de vinte registros é técnico.
- Crônica: campos específicos de cada jogo, como coterie/refúgio ou alcateia/caern/patrono. São anotações, sem conceder pontos de Antecedentes, Dons ou outros benefícios.
- Narrativa do NPC: papel, motivação, segredo, vínculo e gancho editáveis após a geração.
- Sessão zero: tom, linhas, véus e ferramentas/acordos. Campos opcionais, exportados junto da ficha.

Notas de vínculos antigas continuam disponíveis, sem conversão automática em Convicções. Geração e Potência de Sangue permanecem editáveis nas características avançadas. Novos campos opcionais mantêm o schema v2 e recebem validação estrutural na importação.

## Histórico de experiência

**Vínculos e recursos → Experiência** registra data, descrição e quantidade recebida/gasta. O saldo acompanha o JSON. Quantidades inválidas e gastos acima do saldo são rejeitados. O histórico é manual: não concede características, não aplica custos de evolução e não certifica que o jogador gastou XP conforme cada livro.

## Ficha compacta

Na revisão, o jogador alterna entre **Ficha completa** e **Ficha compacta**. A opção compacta prioriza características, poderes e recursos de sessão com controles de aumentar/diminuir. A preferência usa `whitewolf_sheet_mode`; alterações dos recursos continuam no personagem e no salvamento automático. Não acrescenta rastreadores de dano superficial/agravado.

## Ritual inicial V5

A seção **Poderes → Rituais de Sangue** aparece com Feitiçaria de Sangue 1 ou mais. Permite escolher um Ritual inicial de nível 1, separadamente dos poderes de Disciplina, entre os cinco do básico (pp. 272, 276–277). Referências e nomes ingleses acompanham traduções de trabalho. Trocar a escolha não acumula Rituais gratuitos e preserva entradas externas ao catálogo inicial.

Essa entrega não completa rituais de suplementos, cerimônias de Oblívio nem a revisão integral de todos os poderes existentes. Essas pendências continuam no plano editorial. Não é uma certificação de reprodução perfeita dos livros.
