# Marca — Programa Cobranza Fiscal · Defensor del Contribuyente

> **Fuente única de verdad de la identidad.** Ante cualquier duda de color, tipografía
> o tono, manda este archivo. El código canónico de los tokens vive en
> [`assets/css/estilo.css`](assets/css/estilo.css). Si un HTML se aparta de esto
> (p. ej. usa `#087f94` o Inter), está desviado y debe corregirse.

## Decisión de identidad (14-jul-2026)

Manda el **brand book** de defensordelcontribuyente.cl, no las maquetas recientes.
El `index.html` V10 todavía usa colores/tipografía divergentes (`#087f94` + Inter):
se reconcilia al propagar, después de iterar el diseño en Claude Design.

## Tokens de color

| Rol | Token | Valor |
|---|---|---|
| Acento único (marca) | `--brand` / `--brand-text` | `#0F758A` |
| CTA principal (ámbar) | `--accent` | `#F6A821` |
| CTA hover | `--accent-dark` | `#DD9110` |
| Teal oscuro | `--brand-dark` | `#0b5a6b` |
| Teal profundo (fondos) | `--brand-deep` | `#0d2a32` |
| Teal suave (chips/tints) | `--brand-soft` / `--brand-tint` | `#e3f0f3` / `#f0f7f9` |
| Texto | `--ink` / `--ink-soft` | `#32373c` / `#5b6167` |
| Superficies | `--surface` / `--surface-alt` | `#ffffff` / `#f7f8fa` |
| Separador | `--separator` | `#DFDFDF` |
| WhatsApp | `--whatsapp` | `#25d366` |

**Regla:** un solo acento (teal) bloqueado en todo el sitio. El ámbar es exclusivo del CTA.

## Tipografía

- Familia: **Nunito Sans** (`ui-sans-serif, system-ui` de respaldo).
- Títulos: peso 900, `letter-spacing:-0.02em`, line-height 1.1.
- Cuerpo: line-height 1.7. Eyebrow: 12px, 800, mayúsculas, `letter-spacing:.16em`, en teal.

## Forma (Shape Lock)

- Cards: radio **16px**. Inputs: **10px**. Botones: **pill** (999px), extrabold.
- Sombras **teñidas al teal**, nunca negro puro (ver `--shadow-card`, `--shadow-cta`).
- Movimiento: `--ease: cubic-bezier(.16,1,.3,1)`.

## Tono de voz

- Español de Chile, cercano —"amigo en un almuerzo"—, cero jerga corporativa.
- Educativo y honesto: **posibilidades, no promesas**. El contribuyente es el protagonista.
- Nunca prometer resultados ni eliminar deuda "garantizado".

## Reglas legales del programa (no negociables)

- El programa **enseña, orienta y acompaña**. **No incluye representación administrativa ni judicial.**
- Alcance: **1 RUT** y materias asociadas a la cobranza fiscal.
- Garantía incondicional de **10 días**.
- Todo copy debe poder convivir con el deslinde del footer (no patrocinio, no promesa de resultado).

## Para iterar en Claude Design

Pega el bloque de tokens y tono de arriba como contexto, y pide explícitamente:
"usa el teal `#0F758A` como acento único, Nunito Sans, y el ámbar `#F6A821` solo para el CTA".
Así el diseño nace alineado a la marca y no hay que corregir colores después.
