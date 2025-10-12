## Papirfly Demo – README

Jednoduchá React aplikace pro sestavení a zobrazení „tile“ gridu s možností měnit rozložení, barvy/pozadí, texty a pořadí dlaždic. Nastavení se ukládá lokálně (persistovaný Zustand store).

### Hlavní funkce

Dvě rozložení gridu: even a mixed

Přidávání, mazání a drag & drop řazení dlaždic (@hello-pangea/dnd)

Každá dlaždice: barva/obrázek pozadí, text a odkaz

Úprava titulku a podtitulku sekce

Omezení počtu renderovaných dlaždic nebo „Load all“

Moderní UI pomocí MUI + SASS

Ukládání stavu přes Zustand (persist) do Local Storage

Akce Update (updateGrid.ts)

### Tech stack

React + TypeScript

Vite

Zustand

@mui/material

@hello-pangea/dnd

SASS

### Lokální spuštění

```
npm i

npm run dev
```
