#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Arma la versión de producción del sitio (dist/) a partir de la maqueta.

Desde la V6 los datos comerciales (precio, garantía, contactos, cifras) ya
están integrados en el sitio: este script solo aplica los flags del build
final y reporta lo que sigue pendiente.

Uso:
    python LANZAMIENTO/armar.py            # genera dist/
    python LANZAMIENTO/armar.py --check    # solo reporta

Sin dependencias externas. Python 3.8+.
"""
import json, re, shutil, sys
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
DATOS = Path(__file__).resolve().parent / "datos-lanzamiento.json"
COPIAR_EXTRA = ["robots.txt", "sitemap.xml"]


def quitar_badges(texto, recursos_listos):
    """Elimina etiquetas 'por definir'. Conserva 'propuesta de recurso'
    salvo que recursos_listos sea true."""
    def repl(m):
        if "propuesta de recurso" in m.group(1).lower() and not recursos_listos:
            return m.group(0)
        return ""
    return re.sub(r'\s*<span class="badge-prov"[^>]*>(.*?)</span>', repl, texto)


def quitar_banner(texto, nombre):
    """Quita la franja de maqueta, EXCEPTO en el checkout simulado."""
    if nombre in ("inscripcion.html", "confirmacion.html"):
        return texto
    return re.sub(r'\s*<div class="sim-banner"[^>]*>.*?</div>', "", texto, flags=re.S)


def main():
    solo_check = "--check" in sys.argv
    d = json.loads(DATOS.read_text(encoding="utf-8"))
    flags = d.get("flags", {})

    if not solo_check:
        if DIST.exists():
            shutil.rmtree(DIST)
        DIST.mkdir()
        if (ROOT / "assets").exists():
            shutil.copytree(ROOT / "assets", DIST / "assets")
        for extra in COPIAR_EXTRA:
            if (ROOT / extra).exists():
                shutil.copy2(ROOT / extra, DIST / extra)

    for archivo in sorted(ROOT.glob("*.html")):
        html = archivo.read_text(encoding="utf-8")
        if flags.get("quitar_badges_pendientes"):
            html = quitar_badges(html, flags.get("recursos_listos", False))
        if flags.get("quitar_banners_maqueta"):
            html = quitar_banner(html, archivo.name)
        if not solo_check:
            (DIST / archivo.name).write_text(html, encoding="utf-8")

    print("=" * 60)
    print("ARSENAL — Build del sitio Programa de Cobranza Fiscal")
    print("=" * 60)
    if not solo_check:
        print(f"Salida generada en: {DIST}")
    print(f"Flags: banners={'fuera' if flags.get('quitar_banners_maqueta') else 'visibles'} · "
          f"badges={'fuera' if flags.get('quitar_badges_pendientes') else 'visibles'}")

    print("\n— Pendientes de texto:")
    for k, v in d.get("_pendientes_de_texto", {}).items():
        print(f"   - {k}: {v}")

    print("\n— Assets pendientes (reemplazan imágenes transitorias y videos):")
    for k, v in d.get("_assets_pendientes_requieren_archivo", {}).items():
        if not k.startswith("_"):
            print(f"   - {k}: {v}")

    print("\n— Recordatorio: el checkout sigue SIMULADO hasta integrar la")
    print("  pasarela de pago real. Ver LANZAMIENTO/DISPARO.md.")
    print("=" * 60)


if __name__ == "__main__":
    main()
