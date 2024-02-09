TIN – JavaScript Backend 2/2 (4pkt)
Zaimplementuj poniższe wymagania, w oparciu o poprzednie zadanie. Użyj własnej inwencji do
uzupełnienia „brakujących” elementów wymagań. Implementacje wszystkich wymagań można
przedstawić w ramach jednej aplikacji.
1) Uzupełnij aplikację z poprzedniego zadania (podpunkt c lub d) o prezentację wykorzystania
„Middleware”. Powinien on służyć walidacji danych przyjmowanych z formularza. Walidację
danych można napisać ręcznie lub skorzystać z bibliotek takich jak: „express-validator” lub
„joi”. (2pkt)
2) Uzupełnij „Middleware” z poprzedniego podpunktu o obsługę błędów polegającą na zapisie do
pliku wszystkich powstałych błędów walidacji danych. W każdym wierszu pliku należy
przechowywać dane takie jak: (2pkt)
• Data i godzina dodania
• Rodzaj zapytania (np. POST lub GET)
• Adres URL zapytania
• Treść błędu w dowolnym czytelnym formacie
Materiały pomocnicze:
https://expressjs.com/en/guide/using-middleware.html
https://www.w3schools.com/nodejs/nodejs_filesystem.asp
