# Arachnid Descent – Projekt indítása

## 1. Szükséges szoftverek
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) 
- [MySQL](https://www.mysql.com/)

## 2. Környezeti változók
A backend mappában hozz létre egy `.env` fájlt az alábbi tartalommal (töltsd ki a saját adataiddal):

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
SENDGRID_API_KEY=
```

## 3. Backend indítása

```bash
cd backend
npm install
node src/app.js
```

Az alapértelmezett port: **3000**  
Az API elérhető lesz: `http://localhost:3000/api`

## 4. Frontend használata

A frontend statikus HTML/JS/CSS fájlokat tartalmaz. Ezeket bármilyen webszerverrel (pl. [Live Server VSCode plugin], [http-server npm csomag]) vagy akár közvetlenül fájlból is meg lehet nyitni, de a legtöbb funkcióhoz szükséges, hogy a backend fusson.

### Példa egyszerű szerver indítására:
```bash
cd frontend
npx http-server views
```
Ezután a böngészőben nyisd meg: [http://localhost:8080/index.html](http://localhost:8080/index.html