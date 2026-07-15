# 🎯 Playbook de disparo — Sitio Programa de Cobranza Fiscal

Todo listo para el día del lanzamiento. Cuando tengas los datos, esto se dispara en 3 pasos.

---

## Paso 0 — Munición: reúne estos datos

Los 8 datos de **texto** (van en `datos-lanzamiento.json`):

| Dato | Ejemplo |
|---|---|
| Razón social del estudio | Estudio Jurídico Boutique SpA |
| RUT | 76.543.210-9 |
| Dirección | Barros Arana 123, Of. 45, Concepción |
| Correo de soporte / retracto | soporte@juridicamente.cl |
| WhatsApp comercial | 56987438047 (sin +, sin espacios) |
| Precio | 249000 (solo número) |
| Fecha de inicio de cohorte | 11 de agosto de 2026 |
| Tiempo de respuesta de tickets | 3 días hábiles |
| Trayectoria: años / defensas | +10 / +200 |

Los **assets** (archivos, no texto — el script te los recuerda):

- Foto real de Víctor/equipo → `assets/img/victor.jpg`
- Los 6 videos (guiones en [`docs/guiones-video.md`](../docs/guiones-video.md))
- 3 testimonios reales de participantes (texto + foto + consentimiento)
- Imagen para compartir en redes → `assets/img/og.jpg` (1200×630)

> **Decisión aparte (no la resuelve el script):** la pasarela de pago (Webpay/Flow/MercadoPago). Hasta integrarla, el checkout queda *simulado* y su banner de aviso se mantiene a propósito.

---

## Paso 1 — Carga: completa el JSON

Abre [`datos-lanzamiento.json`](datos-lanzamiento.json) y reemplaza cada `COMPLETAR`. Puedes ir parcial: lo que dejes sin llenar se queda como placeholder y el script te avisa.

Cuando sea el build final de producción, pon los tres `flags` en `true`:
- `quitar_banners_maqueta` — saca la franja amarilla de "MAQUETA" (menos el checkout).
- `quitar_badges_pendientes` — saca las etiquetas "por confirmar" de lo que ya llenaste.
- `recursos_listos` — solo cuando los PDF/recursos existan de verdad.

---

## Paso 2 — Prueba de fuego: arma y revisa

```bash
cd programa-cobranza-fiscal
python LANZAMIENTO/armar.py --check     # primero solo mira qué falta
python LANZAMIENTO/armar.py             # genera la versión final en dist/
```

El script:
- Copia todo a `dist/` (nunca toca tu maqueta original).
- Reemplaza los datos, cablea el botón de WhatsApp real, limpia banners/badges según los flags.
- Te lista lo que quedó pendiente (datos de texto y assets).

Abre `dist/index.html` en el navegador y revisa que todo se vea bien.

---

## Paso 3 — Disparo: publica

El sitio es estático → GitHub Pages, gratis, HTTPS, mismo método que usamos en peritajes (cuenta **taxdefense**).

```bash
cd programa-cobranza-fiscal/dist
git init -b main
git add -A
git commit -m "Lanzamiento sitio Programa de Cobranza Fiscal"
# crear repo público y subir (gh CLI ya instalado en C:\Program Files\GitHub CLI\):
gh repo create programa-cobranza-fiscal --public --source=. --push
# activar Pages (rama main, raíz):
gh api -X POST repos/taxdefense/programa-cobranza-fiscal/pages -f "source[branch]=main" -f "source[path]=/"
```

URL resultante: `https://taxdefense.github.io/programa-cobranza-fiscal/`

Para dominio propio (`curso.juridicamente.cl`): pon el dominio en el JSON antes de armar, crea un `CNAME` en `dist/` y apunta el DNS. (Te lo dejo hecho el día que tengas el dominio.)

---

## ✅ Checklist previo al disparo (pre-flight)

- [ ] `python LANZAMIENTO/armar.py --check` no reporta datos de texto pendientes
- [ ] Foto real de Víctor puesta (nada de stock ni IA)
- [ ] Al menos el video principal y el del experto grabados y subidos
- [ ] Testimonios reales con consentimiento firmado (o sección oculta hasta tenerlos)
- [ ] `legal.html` revisado por el estudio (razón social, RUT, retracto, privacidad)
- [ ] Pasarela de pago integrada **o** decisión consciente de dejar el checkout como "reserva por WhatsApp"
- [ ] Los 6 nombres de casos reales confirmados para reutilizarse (ya son públicos en el sitio del estudio)
- [ ] Revisado en celular real

> Mientras la pasarela no esté, una alternativa 100% operativa: cambiar el CTA "Confirmar inscripción" por "Reservar mi cupo por WhatsApp" y cerrar la venta a mano. Se hace en 5 minutos; avísame y lo dejo listo.
