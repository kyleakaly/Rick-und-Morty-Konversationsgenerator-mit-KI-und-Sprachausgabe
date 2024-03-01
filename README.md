Konversationsgenerator von Rick und Morty

Dieses Projekt ist ein Generator für zufällige Konversationen zwischen den Charakteren Rick und Morty. Es ermöglicht dem Benutzer, eine Idee über ein Formular im Frontend einzugeben, die dann an das Backend gesendet wird. Das Backend verwendet die OpenAI-API, um eine Konversation zwischen Rick und Morty basierend auf der bereitgestellten Idee zu generieren. Anschließend wird die generierte Konversation an ElevenLabs gesendet, um in Sprache umgewandelt zu werden. Schließlich wird die Konversation im Frontend wiedergegeben, wobei die Charaktere sprechen und sich auf dem Bildschirm bewegen, während der Text der Konversation synchron mit der Stimme angezeigt wird.

Installation

1. Klone dieses Repository auf deinen lokalen Rechner.
2. Navigiere zum Backend-Verzeichnis und führe `npm install` aus, um die Backend-Abhängigkeiten zu installieren.
3. Navigiere zum Frontend-Verzeichnis und führe `npm install` aus, um die Frontend-Abhängigkeiten zu installieren.
4. Erstelle eine `.env`-Datei im Backend-Verzeichnis und setze die erforderlichen Umgebungsvariablen. Zum Beispiel:
```
API_KEY_OPEN_AI=DEIN_OPENAI_API_SCHLÜSSEL
KEY_ELEVENLABS=DEIN_ELEVENLABS_SCHLÜSSEL
FRONTEND_URL=DEINE_FRONTEND_URL
```
5. Stelle sicher, dass du über ein gültiges Konto bei OpenAI verfügst, um einen API-Schlüssel zu erhalten.

Verwendung

1. Starte den Express-Server im Backend-Verzeichnis mit `npm start`.
2. Starte die Frontend-Anwendung im Entwicklungsmodus im Frontend-Verzeichnis mit `npm run dev`.

Projektstruktur

- `backend/`: Enthält den Code des Express-Servers und die Logik zur Interaktion mit der OpenAI- und ElevenLabs-API.
- `frontend/`: Enthält den Code des Frontends, einschließlich der Svelte-Komponenten und der Logik zum Senden und Empfangen von Daten vom Backend.
- `index.js`: Eingangsdatei für das Backend.
- `package.json`: Konfigurationsdatei für Node.js für das Backend.
- `vite.config.js`: Konfigurationsdatei für Vite für das Frontend.

Verwendete Technologien

Backend

- Node.js
- Express
- Axios
- dotenv

Frontend

- Svelte
- Vite
- svelte-spa-router

Wichtig: Die Webanwendung ist nur für eine Bildschirmauflösung von 2K (2560x1440) im Design optimiert. Wenn Sie die Anwendung nutzen möchten, können Sie ein benutzerdefiniertes CSS in dem Ordner 'frontend/src/app.css' mit einem Media Query erstellen

Das Projektbild
![rick and morty conversacional](https://github.com/kyleakaly/Rick-und-Morty-Konversationsgenerator-mit-KI-und-Sprachausgabe/assets/101314155/0d71420b-a4c6-4f0b-96e4-72ccdb6c3a92)

Beitragen

Du bist herzlich eingeladen, zu diesem Projekt beizutragen! Du kannst Issues melden, um Fehler zu melden oder Verbesserungsvorschläge zu machen, oder Pull Requests mit deinen eigenen Beiträgen einreichen.

Lizenz

Dieses Projekt ist unter der ISC-Lizenz lizenziert. Weitere Details findest du in der LICENSE-Datei in diesem Repository.
