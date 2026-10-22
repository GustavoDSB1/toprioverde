# Top Rio Verde — Financiamento de Veículos

Site institucional da **Top Rio Verde**: financiamento de caminhões (a partir de 1986), primeiro caminhão,
refinanciamento e carros novos e usados. Correspondente autorizado Banco Daycoval.

🌐 **No ar:** https://toprioverde.pages.dev

## Estrutura

| Arquivo | Função |
|---|---|
| `index.html` | Página |
| `styles.css` | Visual e responsividade |
| `script.js` | Menu, animações e links de WhatsApp/Instagram (bloco `CONFIG` no topo) |
| `gtm.js` | Google Tag Manager (GTM-N35N8RJ7) |
| `assets/` | Logos em SVG |
| `_headers` | Cabeçalhos de segurança do Cloudflare Pages |
| `publicar.ps1` | Publica o site no Cloudflare Pages |
| `SEGURANCA.md` | Checklist de segurança e plano de recuperação |

## Rodar localmente

```bash
python -m http.server 5500
```

Abra http://localhost:5500

## Publicar

```powershell
powershell -ExecutionPolicy Bypass -File .\publicar.ps1
```
