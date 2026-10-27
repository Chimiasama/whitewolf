# Ampliação V5/W5 reconstruída
Base: fd2e5b3. Reconstrução a partir das fontes do repositório, sem recuperar o workspace anterior.

## Catálogos e aquisição
- W5: 127 identidades de Dons, 182 acessos nativos/de augúrio/de tribo, com patamares avançados e identidade única. Na interseção de acessos elegíveis vale o menor requisito. IDs anteriores preservados. Renome 9 no último bloco de Silver Fangs corrige o cabeçalho extraído como “Renown 3”; canções iniciais de Galliard preservadas no patamar 2 apesar da extração intercalada.
- V5: 47 entradas de rituais (básico, Players Guide, Cults e Forbidden Religions), níveis 1–5; 10 cerimônias de Cults com poder obrigatório de Oblívio e custo nível ×3. Na criação, uma entrada nível 1 de cada categoria, com requisitos.
- Adicionados poderes necromânticos que habilitam cerimônias, nove fórmulas do Players Guide e fórmulas de imitação de poderes níveis 1–4, adquiridas no nível de Alquimia imediatamente superior.
- 25 Loresheets do básico com cinco níveis independentes. Todas apresentam resumos autorais e referência de página. Benefícios situacionais não são aplicados automaticamente; os descontos de XP explicitamente implementados ficam no motor de evolução.
- Comércio entre Iguais (Baixo Clã 4) registra a Disciplina escolhida e aplica taxa de clã; mantém os descontos anteriores de Helena e Méritos comunitários.
- 14 Maldições alternativas do Players Guide; efeitos descritos para consulta. Hecata/Decay acrescenta gravidade ao custo de XP de Refúgio, Recursos e Lacaios reconhecidos pelo ID do catálogo.
- Variantes de rituais de Cults e Players Guide mantêm IDs e fonte distintos: não são efeitos cumulativos certificados.

## Criação e fichas
Em Vínculos e recursos, aplicar idade concede o XP inicial uma única vez: neófito 15; ancilla 35, geração 10–11, Potência 2, −1 Humanidade e orçamento 9/4. O orçamento base é concluído antes de gastar XP no fluxo de evolução. O jogador pode salvar rascunho a qualquer momento.
Escolhas textuais de idiomas, tabus, dependências, contatos e outros benefícios são preservadas no JSON e exibidas na ficha. Sessão zero e requisitos narrativos continuam opcionais.
Duas trilhas por recurso registram dano superficial e agravado. Informe dano final após resistência; overflow converte superficial em agravado. Contadores legados de recursos ficam separados e não recebem migração presumida.
NPCs humanos, carniçais, espíritos e fomori usam blocos editáveis de paradas. Não recebem clã, tribo, augúrio ou Dons de jogador. Espírito tem Vitalidade Poder ×2; dano de Força de Vontade deve ser registrado na Vitalidade, conforme W5.
Importação valida os novos campos sem apagar dados de fichas antigas.

## Limites explícitos
Caern coletivo fora do escopo. Não automatizados: ritos de conjuração em cena, ingredientes, tempo de estudo, descontos pertencentes a outro personagem, efeitos situacionais de Loresheets, compensação dos Defeitos de Hecata, Amálgamas/condições especiais das imitações, poderes próprios de espíritos/fomori e progressão de carniçais.
Nomes novos em inglês são mantidos quando a tradução não foi conferida; traduções em português são de trabalho. Catálogo não significa automatização integral dos sistemas dos livros.
O histórico da sessão anterior menciona 44 testes; esse número não é usado como evidência desta reconstrução. A validação desta versão será registrada separadamente no GitHub Actions.
