# Zad. 6 - Testy

Należy stworzyć 20 przypadków testowych w jednym z rozwiązań:

- Cypress JS (JS) -> Wybrana opcja
- Selenium (Kotlin, Python, Java, JS, Go, Scala)

Testy mają w sumie zawierać minimum 50 asercji (3.5). Mają również
uruchamiać się na platformie Browserstack (5.0). Proszę pamiętać o
stworzeniu darmowego konta via https://education.github.com/pack.

\*\*Testy zostały wykonane w oparciu o platformę: https://www.saucedemo.com"

- [x] 3.0 - Należy stworzyć 20 przypadków testowych w CypressJS lub Selenium
      (Kotlin, Python, Java, JS, Go, Scala) -> CypressJS
- [x] 3.5 - Należy rozszerzyć testy funkcjonalne, aby zawierały minimum 50
      asercji
- [x] 4.0 - Należy stworzyć testy jednostkowe do wybranego wcześniejszego
      projektu z minimum 50 asercjami (do testów jednostkowych wykorzystana została biblioteka vitest i testowane
      były funkcje pomocnicze wymyślone na potrzeby tego projektu, aby zachować przejrzystość)
- [x] 4.5 - Należy dodać testy API, należy pokryć wszystkie endpointy z
      minimum jednym scenariuszem negatywnym per endpoint
- [x] 5.0 - Należy uruchomić testy funkcjonalne na Browserstacku (testy zostały uruchomione w oparciu o browserstack-cypress-cli)

## Wymagania

- Node.js
- yarn
- browserstack (tylko do testów z wykorzystaniem tej platformy)

## Uruchomienie

1. Zainstaluj zależności

```bash
yarn install
```

2. Uruchomienie testów e2e

```bash
yarn e2e
```

3. Uruchomienie testów jednostkowych

```bash
yarn test
```

4. Uruchomienie testów z wykorzystaniem browserstack (nalezy najpierw podać swój access token w plikach konfiguracyjnych - browserstack.json oraz browserstack.mobile.json)

```bash
yarn e2e:browserstack
yarn e2e:browserstack:mobile
```
