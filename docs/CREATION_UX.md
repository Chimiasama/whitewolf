# Criação guiada: fluxo simplificado

## Entrada

A página inicial oferece **Criar personagem**, **Criar NPC** e **Continuar personagem** quando há um rascunho válido. A escolha de jogo fica dentro da ação iniciada. **Meus personagens** reúne arquivos salvos e importação. O rascunho exibe nome e jogo, e retoma a etapa e a seção salvas neste navegador.

NPCs recebem papel narrativo e influência antes da geração. O papel selecionado é utilizado pelo gerador; influência não representa orçamento de XP. A ficha continua exigindo revisão temática pelo Narrador.

## Seis etapas

| Etapa | Conteúdo |
|---|---|
| Identidade | Nome, conceito, objetivos, Senhor/mentor e retrato |
| Natureza | Clã/perfil V5; tribo e augúrio W5 |
| Capacidades | Atributos, Perícias e especialidades em seções separadas |
| Poderes | Alimentação antes de Disciplinas em V5; caminho próprio de Sangue-Fraco; Dons, Rito e Renome em W5 |
| Vínculos e recursos | Vantagens, Defeitos, Loresheets V5 e vínculos, em seções separadas |
| Revisão | Pendências com ação **Resolver**, ficha e conclusão |

É possível avançar com pendências. **Salvar rascunho** não certifica que o personagem está completo. **Concluir criação** exige que as verificações implementadas não apontem pendências e abre o salvamento com nome, preservando a confirmação de sobrescrita. Não é uma certificação de equivalência integral com todos os livros: permanecem os limites editoriais documentados no guia técnico.

A barra de progresso só marca como preenchidas as etapas sem pendências detectadas; visitar uma etapa não a conclui. No celular, o resumo de etapa substitui a barra de rótulos pequenos. A navegação sequencial e as ações de resolução continuam disponíveis.

## Seleção de conteúdo

O componente `CatalogPicker` centraliza busca sem distinção de acentos, opções selecionadas, remoção, detalhes expansíveis e filtros. É utilizado para poderes, predadores, especialidades de predador, Vantagens, Defeitos, Loresheets, Dons, Ritos e escolhas de Sangue-Fraco. Conteúdo indisponível fica oculto por padrão e pode ser consultado com sua justificativa. Predadores dos dois guias são incluídos por padrão, independentemente de origem comunitária; opções já selecionadas permanecem visíveis para não esconder dados importados.

Os custos de Vantagens/Defeitos podem ser ajustados após a seleção. Os totais mostram o orçamento comum e excluem bônus do predador, exibidos separadamente. Os níveis de Loresheets continuam consumindo o orçamento de Vantagens.

Poderes exibem quantidade escolhida, nível, requisitos e sistema nos detalhes, sem abrir uma cadeia de modais. Dons e Ritos W5 preservam referências e nomes ingleses nos detalhes. Os limites do catálogo não são ocultados pela reformulação visual.

## Escolhas condicionais

- Sangue-Fraco não recebe a seção de predador. A seleção desse perfil inicializa geração 14 e Potência de Sangue 0.
- Maldição herdada aparece apenas com o Defeito correspondente.
- Alquimia fica disponível por Alquimista; outras Disciplinas permanentes requerem Afinidade. Pendências continuam sendo verificadas pelo modelo de regras existente.
- Dons tribais e de augúrio requerem a escolha da respectiva origem na etapa Natureza.
- Renome W5 usa o patrono e a escolha do ponto adicional, em vez de quinze botões de pontos sem orientação.
- Trocar de clã remove benefícios de predador e escolhas de Disciplinas que dependiam da configuração anterior. Atributos, Perícias e identidade são preservados.

## Persistência e apresentação

O formato de personagem continua no schema v2. A posição da interface usa uma chave independente, `whitewolf_flow_v1`; não altera arquivos JSON exportados nem migra regras antigas silenciosamente. Falhas no salvamento automático são informadas. Exportação e demais operações ficam em **Mais ações**, acessível também no celular.

O tema escuro e os acentos de jogo permanecem, com fundo uniforme nos formulários, menos ornamentos/animações, tipografia de leitura nos subtítulos e foco visível. Nenhum novo serviço externo é necessário.

## Validação desta revisão

Build e TypeScript; 14 testes de navegador incluindo navegação livre, resolução de pendências, retomada na etapa, NPC por papel, conclusão/salvamento, predador antes de poderes, busca e filtros, incompatibilidades de Sangue-Fraco, seleção de Rito/Renome, custo de Vantagens e persistência dos dois jogos. Inspeção visual desktop e celular; verificação de largura mobile e ausência de erros JavaScript.

Os testes de integridade anteriores foram mantidos e adaptados à nova navegação. O teste antigo de Ravnos, cujo nome prometia tradução de nível 5 sem verificá-la, foi substituído por asserções explícitas do fluxo V5 e dos requisitos do catálogo.

A etapa Perícias agora começa pela escolha explícita de pacote. Veja [catálogo e regras de escolha](PREDATOR_CATALOG.md).
