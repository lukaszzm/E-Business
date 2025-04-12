# Zad. 4 - GO
Należy stworzyć projekt w echo w Go. Należy wykorzystać gorm do
stworzenia 5 modeli, gdzie pomiędzy dwoma musi być relacja. Należy
zaimplementować proste endpointy do dodawania oraz wyświetlania danych
za pomocą modeli. Jako bazę danych można wybrać dowolną, sugerowałbym
jednak pozostać przy sqlite.
- [x] 3.0 - Należy stworzyć aplikację we frameworki echo w j. Go, która będzie
  miała kontroler Produktów zgodny z CRUD
- [x] 3.5 - Należy stworzyć model Produktów wykorzystując gorm oraz
  wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast
  listy)
- [x] 4.0 - Należy dodać model Koszyka oraz dodać odpowiedni endpoint
- [x] 4.5 - Należy stworzyć model kategorii i dodać relację między kategorią,
  a produktem
- [x] 5.0 - pogrupować zapytania w gorm’owe scope'y

## Wymagania
- GO v1.24
- SQLite

## Uruchomienie
1. Zainstaluj zależności
```bash
go mod tidy
```
2. Uruchom aplikację
```bash
go run main.go
```