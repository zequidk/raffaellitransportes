# Arquitetura — Raffaelli Transportes

## Visão geral

Site institucional de uma página, estático, sem framework e sem etapa de build. Toda a experiência é entregue por três arquivos principais: `index.html`, `assets/css/styles.css` e `assets/js/main.js`.

## Estrutura

```text
/
├── index.html
├── robots.txt
├── project-status.md
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/
│       ├── apple-touch-icon.png
│       ├── favicon-32.png
│       ├── favicon.png
│       ├── logo-raffaelli.png
│       ├── og-image.png
│       └── truck.svg
└── docs/
    ├── ARCHITECTURE.md
    ├── CHANGELOG.md
    ├── DECISIONS.md
    └── TAREFAS.md
```

## Tecnologias

- HTML5 semântico
- CSS3 (Grid, Flexbox, custom properties, `clamp()`, `prefers-reduced-motion`)
- JavaScript moderno (ES2020+, sem dependências)
- Canvas 2D para a cena de estrada em perspectiva
- Google Fonts: Barlow Semi Condensed (títulos) e Barlow (texto)
- Google Maps Embed para o mapa da seção de contato

## Marca

- `logo-raffaelli.png`: versão clara da logo oficial (ciano + branco) para fundos escuros, em 600×194
- `favicon.png`, `favicon-32.png` e `apple-touch-icon.png`: derivados do “R” da logo
- `og-image.png`: imagem social 1200×630 com a logo oficial
- O arquivo original é raster (978×316); uma versão vetorial é recomendada para o futuro

## Seções da página

1. Header fixo com menu e CTA
2. Hero
3. Faixa de números
4. Problema
5. Quebra de paradigma
6. Nosso jeito
7. Cargas (9 cards)
8. Frota
9. Quem somos
10. Política de Saúde e Segurança
11. Clientes
12. Como funciona
13. Rastreamento e segurança
14. Trabalhe conosco
15. Contato
16. CTA final
17. Rodapé

## Integrações

- **WhatsApp:** links `https://wa.me/55996441170?text=...` com mensagens contextuais por seção e por carga
- **E-mail:** `mailto:logistica@raffaellitransportes.com`
- **Instagram:** `https://www.instagram.com/raffaelli_transportes`
- **Mapa:** iframe do Google Maps com carregamento tardio

## SEO

- `title` e `meta description` definidos
- Open Graph e Twitter Card
- JSON-LD `Organization` com razão social, CNPJ, fundação, endereço, área atendida e Instagram
- H1 único, hierarquia de títulos, `alt` descritivo e links rastreáveis
- `robots.txt` liberado para indexação

## Desempenho

- Zero bibliotecas de terceiros em CSS/JS
- Imagens em SVG e imagem social PNG
- Canvas com device pixel ratio limitado a 2, pausa fora da viewport e com a aba oculta
- `loading="lazy"` na ilustração da frota e no mapa
- Animações baseadas em transform/opacity e IntersectionObserver

## Acessibilidade

- Skip link, landmarks e navegação por teclado
- `aria-expanded`, `aria-controls` e rótulos dinâmicos no menu
- Foco visível customizado
- Contraste reforçado para textos pequenos sobre fundos escuros
- `prefers-reduced-motion` desativa animações e transições
- Fallback via `<noscript>` mantém todo o conteúdo visível sem JavaScript

## Deploy

Qualquer hospedagem estática (Netlify, Vercel, Cloudflare Pages, Hostinger, cPanel). Basta publicar a raiz do projeto. Para preview local, executar um servidor HTTP na pasta do projeto.
