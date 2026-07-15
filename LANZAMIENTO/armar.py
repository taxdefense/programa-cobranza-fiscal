#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Arma la versión de producción del sitio del Programa de Acompañamiento en
Cobranza Fiscal a partir de datos-lanzamiento.json.

- Copia la maqueta a dist/ (NO toca los archivos originales).
- Reemplaza los placeholders por los datos reales que hayas completado.
- Opcionalmente quita banners de maqueta y etiquetas "por confirmar".
- Valida y te dice qué quedó pendiente.

Uso:
    python LANZAMIENTO/armar.py            # arma dist/
    python LANZAMIENTO/armar.py --check    # solo reporta, no genera nada

Sin dependencias externas. Requiere Python 3.8+.
"""
import json, re, shutil, sys
from pathlib import Path

# La consola de Windows suele usar cp1252; forzamos UTF-8 para los acentos.
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
DATOS = Path(__file__).resolve().parent / "datos-lanzamiento.json"
INCOMPLETO = ("COMPLETAR", "", None)

# Archivos y carpetas que van a producción (lo demás se excluye)
COPIAR_HTML = sorted(ROOT.glob("*.html"))
COPIAR_EXTRA = ["robots.txt", "sitemap.xml"]
COPIAR_DIRS = ["assets"]


def clp(n):
    return "$" + f"{int(n):,}".replace(",", ".")


def falta(v):
    return v is None or (isinstance(v, str) and v.strip().startswith("COMPLETAR")) or v in ("", 0)


def cargar():
    if not DATOS.exists():
        sys.exit(f"No encuentro {DATOS}. Complétalo primero.")
    return json.loads(DATOS.read_text(encoding="utf-8"))


def construir_reemplazos(d, pendientes):
    """Devuelve lista de (buscar, reemplazar). Solo incluye datos completos."""
    R = []
    m, o, t, tr = d["marca"], d["oferta"], d["tickets"], d["trayectoria"]

    def add(valor, buscar, etiqueta, transform=lambda x: x):
        if falta(valor):
            pendientes.append(etiqueta)
        else:
            R.append((buscar, transform(valor)))

    # Precio (aparece 4 veces con el mismo string)
    if falta(o.get("precio_clp")):
        pendientes.append("Precio (oferta.precio_clp)")
    else:
        R.append(("$249.000", clp(o["precio_clp"])))

    add(o.get("fecha_inicio"), "11 de agosto de 2026", "Fecha de inicio (oferta.fecha_inicio)")
    add(m.get("razon_social"), "[RAZÓN SOCIAL DEL ESTUDIO]", "Razón social (marca.razon_social)")
    add(m.get("rut"), "[XX.XXX.XXX-X]", "RUT (marca.rut)")
    add(m.get("direccion"), "[DIRECCIÓN]", "Dirección (marca.direccion)")
    add(m.get("correo_soporte"), "[CORREO DE SOPORTE]", "Correo de soporte (marca.correo_soporte)")
    add(t.get("tiempo_respuesta"), "[TIEMPO DE RESPUESTA POR DEFINIR]", "Tiempo de respuesta tickets (tickets.tiempo_respuesta)")
    add(tr.get("anios"), "<b>+10</b>", "Años de trayectoria (trayectoria.anios)", lambda v: f"<b>{v}</b>")
    add(tr.get("defensas"), "<b>+200</b>", "Defensas (trayectoria.defensas)", lambda v: f"<b>{v}</b>")

    # Dominio (canonical, sitemap, robots)
    dom = m.get("dominio")
    if not falta(dom) and dom != "curso.juridicamente.cl":
        R.append(("curso.juridicamente.cl", dom))

    return R


def cablear_whatsapp(texto, num):
    """Convierte el botón placeholder de WhatsApp en un enlace real wa.me."""
    if falta(num):
        return texto, False
    msg = "Hola, tengo una consulta sobre el Programa de Acompañamiento en Cobranza Fiscal."
    from urllib.parse import quote
    href = f"https://wa.me/{num}?text={quote(msg)}"
    viejo = ('href="#" class="btn btn-wa" data-evt="whatsapp_click" '
             'onclick="alert(\'MAQUETA: aquí se abre WhatsApp comercial. '
             'Número por confirmar con Víctor.\'); return false;"')
    nuevo = f'href="{href}" class="btn btn-wa" data-evt="whatsapp_click" target="_blank" rel="noopener"'
    if viejo in texto:
        texto = texto.replace(viejo, nuevo)
        texto = texto.replace(' <span class="badge-prov" style="margin-left:6px">número por confirmar</span>', "")
        return texto, True
    return texto, False


def quitar_badges(texto, recursos_listos):
    """Elimina las etiquetas 'por confirmar/por definir/valor provisional'.
    Conserva 'propuesta de recurso' salvo que recursos_listos sea true."""
    def repl(mm):
        contenido = mm.group(1).lower()
        if "propuesta de recurso" in contenido and not recursos_listos:
            return mm.group(0)
        return ""
    # elimina <span class="badge-prov" ...>...</span> (y un espacio previo)
    return re.sub(r'\s*<span class="badge-prov"[^>]*>(.*?)</span>', repl, texto)


def quitar_banner(texto, nombre):
    """Quita la franja de maqueta. NO la quita en el checkout: sigue simulado
    hasta integrar la pasarela real (honestidad)."""
    if nombre in ("inscripcion.html", "confirmacion.html"):
        return texto
    return re.sub(r'\s*<div class="sim-banner"[^>]*>.*?</div>', "", texto, flags=re.S)


def main():
    solo_check = "--check" in sys.argv
    d = cargar()
    flags = d.get("flags", {})
    pendientes = []
    R = construir_reemplazos(d, pendientes)

    if not solo_check:
        if DIST.exists():
            shutil.rmtree(DIST)
        DIST.mkdir()
        for dirname in COPIAR_DIRS:
            if (ROOT / dirname).exists():
                shutil.copytree(ROOT / dirname, DIST / dirname)
        for extra in COPIAR_EXTRA:
            if (ROOT / extra).exists():
                shutil.copy2(ROOT / extra, DIST / extra)

    wa_ok = False
    for archivo in COPIAR_HTML:  # siempre se lee de los archivos fuente
        html = archivo.read_text(encoding="utf-8")
        for buscar, reemplazar in R:
            html = html.replace(buscar, reemplazar)
        html, hecho = cablear_whatsapp(html, d["marca"].get("whatsapp"))
        wa_ok = wa_ok or hecho
        if flags.get("quitar_badges_pendientes"):
            html = quitar_badges(html, flags.get("recursos_listos", False))
        if flags.get("quitar_banners_maqueta"):
            html = quitar_banner(html, archivo.name)
        if not solo_check:
            (DIST / archivo.name).write_text(html, encoding="utf-8")

    # También el dominio en sitemap.xml y robots.txt
    dom = d["marca"].get("dominio")
    if not solo_check and not falta(dom) and dom != "curso.juridicamente.cl":
        for extra in COPIAR_EXTRA:
            p = DIST / extra
            if p.exists():
                p.write_text(p.read_text(encoding="utf-8").replace("curso.juridicamente.cl", dom), encoding="utf-8")

    if falta(d["marca"].get("whatsapp")):
        pendientes.append("WhatsApp comercial (marca.whatsapp)")

    # Reporte
    print("=" * 60)
    print("ARSENAL — Armado del sitio Programa de Cobranza Fiscal")
    print("=" * 60)
    print(f"Reemplazos de datos aplicados: {len(R)}")
    print(f"Botón WhatsApp cableado: {'sí' if wa_ok else 'no (falta número)'}")
    if not solo_check:
        # verifica placeholders que hayan quedado
        restos = set()
        for archivo in sorted(DIST.glob("*.html")):
            for m in re.findall(r'\[[A-ZÁÉÍÓÚÑ][^\]]{2,60}\]', archivo.read_text(encoding="utf-8")):
                restos.add(m)
        print(f"\nSalida generada en: {DIST}")
        if restos:
            print("Placeholders de texto aún presentes:")
            for r in sorted(restos):
                print("   [pendiente]", r)

    print("\n— Datos de TEXTO pendientes de completar en el JSON:")
    if pendientes:
        for p in pendientes:
            print("   [FALTA]", p)
    else:
        print("   [OK] ninguno, todos los datos de texto están completos")

    print("\n— Assets que requieren ARCHIVO (no se llenan en el JSON):")
    for k, v in d.get("_assets_pendientes_requieren_archivo", {}).items():
        if k.startswith("_"):
            continue
        print(f"   - {k}: {v}")

    print("\n— Recordatorio: el checkout sigue SIMULADO hasta integrar la")
    print("  pasarela de pago real (Webpay u otra). Eso es integración aparte,")
    print("  no lo resuelve este script. Ver LANZAMIENTO/DISPARO.md.")
    print("=" * 60)


if __name__ == "__main__":
    main()
