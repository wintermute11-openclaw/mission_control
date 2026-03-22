import sys
import subprocess

# review_agent.py - Skript zur einfachen Code-Review mit Linter-Check

# Nutzung: python3 review_agent.py <code_file>

code_file = sys.argv[1] if len(sys.argv) > 1 else None

if not code_file:
    print("Usage: python3 review_agent.py <code_file>")
    sys.exit(1)

# Beispiel: ESLint für JavaScript-Code (du kannst andere Linter/Checks einsetzen)
try:
    print(f"Starte Review für {code_file}...")
    result = subprocess.run(["eslint", code_file], capture_output=True, text=True)
    if result.returncode != 0:
        print("Fehler/Warnings gefunden:")
        print(result.stdout)
        # Hier kannst du Logik ergänzen, um automatische Fixes anzustoßen
    else:
        print("Keine Probleme gefunden.")
except FileNotFoundError:
    print("Bitte installiere eslint für Node.js, um diesen Review-Script zu verwenden.")

# Beispiel: Rückgabe statischer Review-Kommentare (als Platzhalter)
print("Review abgeschlossen.")
