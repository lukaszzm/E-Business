# Zad. 5 - Frontend

Należy stworzyć aplikację kliencką wykorzystując bibliotekę React.js.
W ramach projektu należy stworzyć trzy komponenty: Produkty, Koszyk
oraz Płatności. Koszyk oraz Płatności powinny wysyłać do aplikacji
serwerowej dane, a w Produktach powinniśmy pobierać dane o produktach
z aplikacji serwerowej. Aplikacja serwera w jednym z trzech języków:
Kotlin, Scala, Go. Dane pomiędzy wszystkimi komponentami powinny być
przesyłane za pomocą React hooks.

- [x] 3.0 - W ramach projektu należy stworzyć dwa komponenty: Produkty oraz
      Płatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w
      Produktach powinniśmy pobierać dane o produktach z aplikacji
      serwerowej;
- [x] 3.5 - Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing
- [x] 4.0 - Dane pomiędzy wszystkimi komponentami powinny być przesyłane za
      pomocą React hooks
- [x] 4.5 - Należy dodać skrypt uruchamiający aplikację serwerową oraz
      kliencką na dockerze via docker-compose (w głównym katalogu dla przedmiotu)
- [x] 5.0 - Należy wykorzystać axios’a oraz dodać nagłówki pod CORS (konfiguracja na kliencie i serwerze)

## Wymagania

- Node +18
- pnpm

## Uruchomienie

1. Zainstaluj zależności

```bash
pnpm run install
```

2. Dostosuj zmienną do swojego API (plik: src/api/client.ts)

```bash
const BASE_URL = '<URL-do-serwera>'
```

3. Uruchom aplikację

```bash
pnpm run start
```
