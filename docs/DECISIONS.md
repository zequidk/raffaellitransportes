# Decisões — Raffaelli Transportes

## D1. Stack estática sem build

HTML5, CSS3 e JavaScript vanilla para entrega simples, rápida e de baixa manutenção. Não há dependências de framework, bundler ou instalação.

## D2. Identidade “Confiança Corporativa” + “Sinalização de Estrada”

Paleta aprovada: `#0A1A33` (base), `#12284A` (superfície), `#1F5BFF` (primária), `#7FA6FF` (destaque), `#FFA31A` (CTA) e `#F4F6FA` (claro). Tipografia Barlow Semi Condensed nos títulos e Barlow no texto. O repertório visual usa faixas diagonais, numeração e linhas de estrada.

## D3. 3D com Canvas 2D e CSS 3D, sem Three.js

A cena do hero é desenhada em Canvas 2D com perspectiva simulada; cards usam `perspective`/`rotate3d`. A escolha preserva desempenho mobile e evita ~150 KB de biblioteca. Three.js permanece como evolução futura, condicionada ao resultado.

## D4. Nove cards de carga

Os 13 itens da copy foram agrupados em 9 cards, conforme a própria nota de implementação: grãos, farelos, adubos, tijolos, pedras grês, telhas, pisos, cimento e areia.

## D5. Seção 12 como CTA de rastreamento e segurança

A posição ausente na copy foi preenchida com o conteúdo real de rastreamento e telemetria, criando um CTA intermediário sem inventar novos fatos.

## D6. WhatsApp único com mensagens contextuais

Todos os CTAs usam o número `55996441170` com mensagens pré-preenchidas específicas para cotação geral, carga, frota, contato e motorista.

## D7. Placeholders explícitos para assets pendentes

Fotos da frota/sede e logos dos clientes permanecem como placeholders marcados com `data-placeholder`. Não foram usadas fotos de banco para não simular ativos reais. Depoimentos ficaram fora até haver autorização. A logo oficial foi aplicada conforme D12.

## D8. Números em teste

“+70 caminhões” é o número padrão do site; “20 milhões de toneladas por mês” foi incluído como teste, conforme solicitado.

## D9. SEO dependente do domínio final

`canonical`, `og:url`, `og:image` absoluta e sitemap ficaram pendentes até a definição do domínio. O `title`, a description, o Open Graph e o JSON-LD já estão implementados.

## D10. Movimento com fallback

`prefers-reduced-motion` desativa animações, o marquee vira grade estática e o conteúdo é exibido imediatamente. Um `<noscript>` garante visibilidade dos elementos com reveal sem JavaScript.

## D11. Contraste reforçado

Textos pequenos sobre fundos escuros usam a cor `--ice` (`#A9C4FF`) e opacidades maiores nos leads da seção azul, atendendo melhor aos critérios de contraste.

## D12. Logo oficial com versão clara para fundo escuro

A logo fornecida (`logoraffaelli1.png`, 978×316) tem o script “Transportes” em preto, pensado para fundo claro. Para o header e o rodapé escuros, foi gerada uma versão com os pixels escuros convertidos para branco, preservando o ciano do “Raffaelli”. O favicon usa o “R” isolado da logo sobre fundo azul escuro. A paleta do site (azul + laranja) foi mantida. Caso a empresa forneça o vetor ou a versão oficial para fundo escuro, ela deve substituir a versão derivada.

## D13. Política de Saúde e Segurança na home

A política foi transcrita em HTML e inserida como seção própria entre Quem somos e Clientes, com os 5 pilares em cards. O flyer original não é usado como conteúdo principal para preservar SEO, acessibilidade e responsividade. A seção não tem assinatura, data ou CTA, conforme definição do cliente, e é acessível por links no rodapé e em Quem somos.
