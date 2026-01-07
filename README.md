# 🎵 Frontend – Music API

Dette er frontend-delen af Music API-projektet. Applikationen er bygget i React og kommunikerer med backend-API’et for at håndtere brugere, login, playlists, sangsøgning og admin-funktioner.

## 🚀 Teknologier

- React (Vite)
- React Router
- Context API (ThemeProvider)
- CSS Modules
- Custom API Facade til fetch-kald

## 📦 Funktioner

- Login og registrering
- Søgning efter sange
- Oprettelse og visning af playlists
- Admin-panel til brugeradministration
- Light/Dark theme med localStorage
- Globalt layout med Header, Footer og nested routing

## 🧭 Struktur

Frontend bruger et layout-baseret routing-setup:

- `App.jsx` fungerer som globalt layout (Header, Footer, Outlet)
- Sider findes under `/pages`
- Genanvendelige komponenter findes under `/components`
- API-kald håndteres via `apiFacade.js`
