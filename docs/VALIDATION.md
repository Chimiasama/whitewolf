# Evidências de validação

Data: 27/10/2026. Ambiente Linux, Node.js 24.19.0, npm 11.9.0, Chromium do sistema.

## Executado

- `npm run lint`: aprovado (TypeScript).
- `npm run build`: aprovado; estilos e fontes incluídos localmente. Aviso de chunk JavaScript acima de 500 kB permanece (aprox. 602 kB sem compressão / 174 kB gzip); não foi silenciado.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm test -- --reporter=line`: **8 testes aprovados**, nenhum ignorado, aproximadamente 15 segundos na execução final.
- `python scripts/index-references.py`: 15 fontes, 230.304 linhas, 3.001 âncoras. Isso comprova varredura e indexação, não conferência humana de todas as regras.
- `git diff --check`: sem erros na revisão final.

## Comportamentos exercitados

1. JSON com nome objeto, tribo antiga, versão futura e item nulo: rejeição com mensagem, sem erro React nem tela em branco.
2. Amostragem de 240 NPCs (40 por jogo/escala): reimportação estrutural, narrativa, onze tribos, Renome do patrono, três origens de Dons, ausência de Disciplinas W5 e quantidade de poderes V5.
3. Distribuição de Atributos inválida mesmo com soma 22; ausência de Rito e Renome detectadas.
4. V5 e W5: geração → exportação → recarga → importação → salvamento → carregamento → recuperação do rascunho. Preservação do jogo, perfil, versão e segredo.
5. Exportação visível em viewport 390×844; inspeção de captura mobile e desktop. Largura de rolagem mobile igual à viewport.
6. Idioma do documento pt-BR, fonte Inter e nenhuma requisição externa ao recarregar a interface.
7. Fluxo existente Ravnos até escolha de poderes; screenshot passa a usar diretório do runner; presença de título verificada.
8. Pacotes de Osíris, Bagger e Fazendeiro, identificação de predador comunitário e contabilização de Loresheets no orçamento.

## Limites das evidências

Asserções de estrutura não demonstram validade de todas as regras dos livros. O teste de Ravnos não valida todas as traduções nem completa uma ficha. Não foram testados Android, leitores de tela, todos os navegadores ou todos os NPCs publicados. A aparência completa foi inspecionada na aplicação atual, mas não houve auditoria de contraste WCAG. Os nomes pt-BR novos de W5 não foram confirmados na wiki: tentativas bloqueadas. Catálogos e implementações ainda parciais estão descritos no guia e no plano.

Nenhum arquivo original dos quinze livros foi alterado pela implementação. Push ao GitHub não comprova deploy do aplicativo.

## Revisão de interface de criação

A nova navegação está documentada em [CREATION_UX.md](CREATION_UX.md). A suíte foi ampliada para 14 testes e o teste V5 antigo foi substituído por verificações reais de ordenação predador/poderes e filtragem de requisitos. As evidências da execução anterior descrevem o estado daquele commit; esta revisão não deve ser interpretada como nova conferência de todas as regras dos livros.

Resultado final desta revisão: `npm run lint` e `npm run build` aprovados; `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm test -- --reporter=line` com **14 testes aprovados em 12,3 s**. `git diff --check` sem erros. Na inspeção mobile (390×844), não houve erro JavaScript, a largura da página permaneceu em 390 px e o título deixou de se sobrepor às ações do cabeçalho. A navegação fica fixa no rodapé, com espaço reservado no conteúdo. O aviso de chunk acima de 500 kB permanece.
