# Test API

## Installation

1. `npm install` ausführen
2. In der Datenbank `CREATE DATABASE firstTaskApi;` ausführen
3. `npm start` ausführen um die API erstmals zu starten. Dies legt in der DB die nötigen Tabellen an.
4. API Prozess wieder beenden
5. `npm run migration` ausführen
6. `npm start` API neu starten

## API

### Login
*POST* http://localhost:3000/auth/login \
*Body*: 
```
{
  "username": "admin",
  "password": "admin"
}
```

### Content
Für alle Requests muss ein valider accessToken mitgeschickt werden.
Diesen im Request Header "Authorization": "Bearer <token>" in den Requests angeben.

Folgend die Schnittstellen, mit denen Artikel gelistet und gepflegt werden können.
Ein Artikel hat folgende Struktur und Constraints:
```
{
  "id": number
  "articleNumber": string, // (Länge: min 3, max 20)
  "name": string, // (Länge: min 1, max 100)
  "description": string, // (Länge: min 0, max 10000)
  "price": number, // (min 0)
  "propertyOne": string, // (Länge: min 1, max 100)
  "propertyTwo": string, // (Länge: min 1, max 100)
  "propertyThree": string, // (Länge: min 0)
  "propertyFour": string, // (Länge: min 0)
  "propertyFive": string // (Länge: min 0)
}
```


#### Alle Artikel Listen
*GET* http://localhost:3000/article?&articleNumber=[articleNumber]&name=[name]&description=[description] \
*Returns*: Liste von Artikeln \
*Beschreibung*: Query Parameter articleNumber, name, description dienen als Filter und können auch weggelassen werden 

#### Einen einzelnen Artikel abrufen
*GET* http://localhost:3000/article/<articleNumber> \
*Returns*: Einen Artikel

#### Einen Artikel speichern
*POST* http://localhost:3000/article \
*Body*:
```
{
  "id": number (optional)
  "articleNumber": string,
  "name": string,
  "description": string,
  "price": number,
  "propertyOne": string,
  "propertyTwo": string,
  "propertyThree": string,
  "propertyFour": string,
  "propertyFive": string
}
```
*Returns*: Artikel \
*Beschreibung*: Wenn die id angegeben wird, wird ein bestehender Artikel geupdatet. Wenn nicht angegeben wird ein neuer
Datensatz angelegt.

#### Einen Artikel löschen
*DELETE* http://localhost:3000/article/<articleNumber> \
*Returns*: void
