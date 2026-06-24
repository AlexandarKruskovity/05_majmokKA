const express = require('express')          // Betölti az Express keretrendszert, amivel HTTP szervert és route-okat tudsz készíteni.
const bodyParser = require('body-parser')   // Betölti a body-parser modult (régebbi megoldás a request body feldolgozására, itt igazából nem használod).

const app = express()                       // Létrehoz egy Express alkalmazás példányt, ez lesz maga a szervered „app” objektuma.

//bodyParser.json helyett...
app.use(express.json());                    // App szintű middleware: minden bejövő kérés JSON törzsét beolvassa, és JS objektummá teszi a req.body-ban.



// Milyen entitások lesznek?
const monkeys = [
    {
        id: 1,
        name: 'Joe',
        sex: 'male',
        species: 'gibbon'
    },
    {
        id: 2,
        name: 'Josephine',
        sex: 'female',
        species: 'gorilla'
    },
    {
        id: 3,
        name: 'Lajos',
        sex: 'male',
        species: 'orangutan'
    }
]

const bananas = [
    {
        id: 1,
        color: "yellow",
        sweet: false
    },
    {
        id: 2,
        color: "yellow",
        sweet: true
    },
    {
        id: 3,
        color: "gree",
        sweet: false
    }, {
        id: 4,
        color: "gree",
        sweet: false
    }
]
let globalMonkeyId = monkeys.length + 1;
let globalBananaId = bananas.length + 1;


const getMonkeys = (req, res, next) => {
    console.table(monkeys);
    return res.json(monkeys);
}
const getBananas = (req, res, next) => {
    console.table(bananas);
    return res.json(bananas);
}
const getMonkeyIndex = (req, res, next) => {
    const monkeyIdAsNumber = parseInt(req.params.id, 10);
    let foundId = -1;
    for (let i = 0; i < monkeys.length; i++) {
        if (monkeys[i].id === monkeyIdAsNumber) {
            foundId = i;
            break;
        }
    }

    if (foundId === -1) {
        return res.status(404).json({
            Error: `Requested monkeyID not found! ${req.params.id}`
        });
    }
    res.locals.monkeyId = foundId
    return next();
}
const getBananaIndex = (req, res, next) => {
    const bananaIdAsNumber = parseInt(req.params.id, 10);
    let foundId = -1;
    for (let i = 0; i < array.length; i++) {
        if (bananas[i].id === bananaIdAsNumber) {
            foundId = i;
            break;
        }
    }

    if (foundId === -1) {
        return res.status(404).json({
            Error: `Requested bananaID not found! ${req.params.id}`
        });
    }
    res.locals.bananaId = foundId
    return next();
}
const createMonkey = (req, res, next) => {
    if (typeof req.body.name == 'undefined' || typeof req.body.sex == 'undefined' || typeof req.body.species == 'undefined') {
        req.status(400).json({ Error: `Missing name, sex or species` })
    }
    const newMonkey = {
        id: globalMonkeyId,
        name: req.body.name,
        sex: req.body.sex,
        species: req.body.species
    }
    monkeys.push(newMonkey);
    globalMonkeyId++;
    return res.status(200).json(newMonkey)

}
const deleteMonkey = (req, res, next) => {
    const deleteMonkeyById = books[res.locals.monkeyId];
    monkeys.splice(res.locals.monkeyId, 1);
    return res.json({ deleteMonkeyById })
}

const updateMonkey = (req, res, next) => {
    if (typeof req.body.name !== 'undefined') {
        monkeys[res.locals.monkeyId].name = req.body.name;
    }
    if (typeof req.body.sex !== 'undefined') {
        monkeys[res.locals.monkeyId].sex = req.body.sex;
    }
    if (typeof req.body.species !== 'undefined') {
        monkeys[res.locals.monkeyId].species = req.body.species;
    }
    if ((typeof req.body.name === 'undefined') && (typeof req.body.sex === 'undefined') && (typeof req.body.species === 'undefined')) {
        return res.status(400).json({ error: 'Missing name, sex or species' })
    }
    return res.status(200).json(monkeys[res.locals.monkeyId]);
}
app.get('/monkey', getMonkeys); // Minden majom lekérdezése
//Egy adott majom indexe, plusz kiegészítéssel:  //Itt kiegészült egy mw-rel: mert fél sor, ezért került ide a második függvény
app.get('/monkey/:id', getMonkeyIndex, (req, res, next) => res.json(monkeys[res.locals.id]));
app.put('/monkey', createMonkey);
app.delete('/monkey/:id', getMonkeyIndex, deleteMonkey);
app.patch('/monkey/:id', getMonkeyIndex, updateMonkey);
//app.post('/search/', search);

app.get('/banana', getBananas); // Minden banán
app.get('/banana/:id', getBananaIndex, (req, res, next) => res.json(bananas[res.locals.id]));
//app.put('/banana', createBanana);
//app.delete('/banana/:id', getBananaIndex, deleteBanana);
//app.patch('/banana/:id', getBananaIndex, updateBanana);








app.use(function (req, res) {               // Globális middleware: minden kérésre lefut, ha előbb nem fogja el más route.
    res.setHeader('Content-Type', 'text/plain')                         // Beállítja a válasz tartalomtípusát sima szövegre.
    res.write('you posted:\n')                                          // Kiír egy kezdősor szöveget a válaszba.
    res.end(String(JSON.stringify(req.body, null, 2)));                 // A beérkezett body-t JSON-ként formázva kiírja, majd lezárja a választ.
})

var server = app.listen(6001, function () { // Elindítja az HTTP szervert a 6001-es porton.
    console.log('Server running on :6001'); // Konzolra kiír egy üzenetet, hogy a szerver fut és melyik porton érhető el.
});