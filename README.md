# Portfólio — Carlos Eust

Site estático de portfólio de Carlos Eust Harmbacher da Silva, desenvolvedor Full Stack e estudante de Engenharia de Software.

**Site publicado:** [shaw771.github.io/main_portifolio](https://shaw771.github.io/main_portifolio/)

## Conteúdo

- Apresentação profissional e currículo
- Biografia e áreas de atuação
- Habilidades técnicas
- Links para LinkedIn, GitHub, e-mail e WhatsApp

## Tecnologias

- HTML5 semântico
- CSS3 e Bootstrap (arquivos locais em `assets/dist`)
- JavaScript para o seletor de tema
- Font Awesome para ícones

## Estrutura

```text
.
├── index.html                 # Página e metadados SEO
├── robots.txt                 # Regras de rastreamento
├── sitemap.xml                # URL pública indexável
├── navbar-fixed.css           # Ajustes da navegação fixa
└── assets/
    ├── dist/                  # Bootstrap e estilos de apoio
    ├── img/                   # Foto de perfil, favicon e imagem social
    ├── js/color-modes.js      # Persistência e troca de tema
    ├── style/style.css        # Estilos específicos do portfólio
    └── Currículo Carlos Eust.pdf
```

## Executar localmente

O projeto não exige compilação. Abra `index.html` no navegador ou inicie um servidor estático na raiz:

```powershell
python -m http.server 8000
```

Acesse `http://localhost:8000`.

## SEO implementado

- Idioma `pt-BR`, estrutura semântica e um único `h1`.
- Título, descrição, URL canônica, favicon e cor do tema.
- Metadados Open Graph e Twitter Card.
- Dados estruturados JSON-LD (`WebSite` e `Person`).
- Texto alternativo e dimensões explícitas para a foto principal.
- `robots.txt` e `sitemap.xml` na raiz do site.

### Manutenção de SEO

As URLs canônica, social, dados estruturados, `robots.txt` e `sitemap.xml` usam `https://shaw771.github.io/main_portifolio/`. Se o site mudar de domínio, altere todas essas ocorrências em conjunto. Para cada nova página pública, inclua uma URL no sitemap, uma canonical própria e título/descrição exclusivos.

Depois de publicar, envie o sitemap pelo [Google Search Console](https://search.google.com/search-console/) para acompanhar a indexação. Isso exige acesso à conta proprietária do domínio.

## Publicação

Faça commit e push. Confirme nas configurações do repositório que o GitHub Pages publica a branch desejada e valide os endpoints públicos `/robots.txt` e `/sitemap.xml`.

## Licença

Uso pessoal. Todos os direitos reservados a Carlos Eust Harmbacher da Silva.
