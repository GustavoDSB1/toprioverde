# Segurança — Site Top Rio Verde

Site: https://toprioverde.pages.dev · Hospedagem: Cloudflare Pages · Última revisão: 15/10/2026

**Contexto:** o site é **100% estático** (HTML, CSS e JS). Não tem login, banco de dados, formulário nem API
própria. Os únicos cookies são os do Google Tag Manager/Google Ads (rastreamento de anúncios). Todo contato acontece pelo WhatsApp e pelo Instagram. Por isso vários itens da lista "não se aplicam":
não existe a parte do sistema que eles protegem. Isso é uma vantagem, porque o que não existe não pode ser atacado.

Legenda: ✅ atendido · ➖ não se aplica (sem backend) · ⚠️ ação do responsável pela conta

| # | Requisito | Status | Como está |
|---|---|---|---|
| 1 | HTTPS | ✅ | Certificado TLS automático da Cloudflare; HTTP redireciona 301 para HTTPS; **HSTS** de 1 ano (`_headers`); `upgrade-insecure-requests` na CSP. |
| — | Expiration | ✅ | Certificado renovado automaticamente pela Cloudflare. Sem sessões/tokens para expirar. Cache: HTML revalida sempre, `assets/` 1 dia. |
| 2 | Hashed Passwords | ➖ | Site não tem login nem armazena senhas. |
| 3 | MFA | ⚠️ | Ativar 2FA na **conta Cloudflare** e no **e-mail da conta**, que são a "porta" do site. |
| 4 | Rate Limit | ✅ | Proteção DDoS da Cloudflare ativa por padrão; site estático em CDN, sem endpoint para abusar. |
| 5 | Input Validation | ➖ | Não há campos de entrada. |
| 6 | Data Sanitization | ✅ | JS usa só `textContent` e `encodeURIComponent`, sem `innerHTML`, `eval` ou `document.write`. SVGs verificados (sem scripts). |
| 7 | SQL Injection | ➖ | Sem banco de dados. |
| 8 | Migrations | ➖ | Sem banco de dados. |
| 9 | Rollback | ✅ | Cloudflare guarda todas as publicações: **Workers & Pages → toprioverde → Deployments → ⋯ → Rollback**. |
| 10 | Access Control | ✅ | `frame-ancestors 'none'` + `X-Frame-Options: DENY` (anti-clickjacking); `Permissions-Policy` bloqueia câmera, microfone, localização e pagamento; `Cross-Origin-Opener/Resource-Policy`. |
| 11 | Session | ➖ | Sem sessões nem login. Cookies apenas de terceiros (Google Ads/Analytics, via Tag Manager). Recomendado: aviso de cookies (LGPD). |
| 12 | Secrets | ✅ | Nenhuma chave/token no código. `publicar.ps1` envia só uma *allowlist* de arquivos; `.gitignore` bloqueia `.env`, `.claude/`, `.wrangler/`. |
| 13 | CORS | ✅ | Removido o `Access-Control-Allow-Origin: *` padrão da Cloudflare. |
| 14 | Logs | ✅ | Cloudflare registra tráfego; Google Tag Manager (GTM-N35N8RJ7) mede visitas e conversões. Cliques no WhatsApp geram o evento `clique_whatsapp` (com `local_do_botao`) e no Instagram `clique_instagram`. |
| 15 | Backups | ⚠️ | Cópia local + histórico de publicações na Cloudflare. Recomendado: versionar com Git e manter um repositório privado. |
| 16 | Cryptography | ✅ | TLS 1.2/1.3 gerenciado pela Cloudflare. O site não faz criptografia própria (não precisa). |
| 17 | Dependency | ✅ | Zero bibliotecas JS/npm no site. Dependências externas: Google Fonts e Google Tag Manager/Ads, liberados na CSP somente para os domínios oficiais do Google. O snippet do GTM fica em `gtm.js` (sem script inline). Tags "HTML personalizado" e variáveis "JavaScript personalizado" do GTM são bloqueadas pela CSP de propósito; use os modelos prontos. |
| 18 | PMP (Princípio do Mínimo Privilégio) | ✅ / ⚠️ | CSP `default-src 'none'`: o navegador só carrega o que foi listado. ⚠️ O login do Wrangler neste PC tem permissões amplas; para publicar, prefira um API Token só com *Cloudflare Pages: Edit*, ou rode `npx wrangler logout` depois. |
| 19 | Monitoramento | ⚠️ | Opcional: monitor de disponibilidade gratuito (ex.: UptimeRobot) apontando para o site, e notificações da Cloudflare. |
| 20 | Recovery Plan | ✅ | Ver abaixo. |

## Cabeçalhos de segurança ativos (`_headers`)

`Strict-Transport-Security` · `Content-Security-Policy` · `X-Frame-Options` · `X-Content-Type-Options` ·
`Referrer-Policy` · `Permissions-Policy` · `Cross-Origin-Opener-Policy` · `Cross-Origin-Resource-Policy`

Para testar: https://securityheaders.com/?q=toprioverde.pages.dev

## Plano de recuperação

| Situação | O que fazer |
|---|---|
| Publicação quebrou o site | Painel Cloudflare → toprioverde → Deployments → versão anterior → **Rollback** (segundos). |
| Arquivos locais perdidos | Baixar a última versão publicada no painel, ou restaurar do repositório Git/backup. |
| Conta Cloudflare comprometida | Recuperar o Gmail → trocar a senha da Cloudflare → revogar tokens e sessões → revisar Deployments → republicar com `publicar.ps1`. |
| Cloudflare fora do ar | Os arquivos são estáticos: dá para subir a mesma pasta no Netlify ou no GitHub Pages em minutos. |

## Como publicar uma atualização

```powershell
powershell -ExecutionPolicy Bypass -File .\publicar.ps1
```
