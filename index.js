require('dotenv').config();
const{initDatabase} = require('./service/db');
const db = new loki('majmok.db');
const express = require('express');
const app = express();

app.use(express.json());

let globalId = 6;

const monkeys = [
    { id: 1, name: 'Lajos', sex: 'Male', species: 'Capuchin' },
    { id: 2, name: 'Mari', sex: 'Female', species: 'Cebus' },
    { id: 3, name: 'Bözsi', sex: 'Female', species: 'Cebus' },
    { id: 4, name: 'Dave', sex: 'Male', species: 'Capuchin' },
    { id: 5, name: 'Peti', sex: 'Male', species: 'Cebus' }
];

const bananas = [
    { id: 1, monkeyId: 1, sweet: true, color: 'yellow' },
    { id: 2, monkeyId: 2, sweet: false, color: 'green' },
    { id: 3, monkeyId: null, sweet: true, color: 'red' },
    { id: 4, monkeyId: 4, sweet: false, color: 'blue' },
    { id: 5, monkeyId: null, sweet: true, color: 'purple' }
];

const getMonkeys = (req, res, next) => {
    console.table(monkeys);
    return res.status(200).json(monkeys);
};

const createMonkey = (req, res, next) => {
    if (
        typeof req.body.name === 'undefined' ||
        typeof req.body.sex === 'undefined' ||
        typeof req.body.species === 'undefined'
    ) {
        return res.status(400).json({
            message: 'Missing name or sex or species'
        });
    }

    const newMonkey = {
        id: globalId,
        name: req.body.name,
        sex: req.body.sex,
        species: req.body.species
    };

    monkeys.push(newMonkey);
    globalId++;

    return res.status(201).json(newMonkey);
};

const getMonkeyIndex = (req, res, next) => {
    const monkeyIdAsNumber = parseInt(req.params.id);

    let foundMonkeyId = -1;

    for (let i = 0; i < monkeys.length; i++) {
        if (monkeys[i].id === monkeyIdAsNumber) {
            foundMonkeyId = i;
            break;
        }
    }

    if (foundMonkeyId === -1) {
        return res.status(404).json({
            message: 'Monkey not found'
        });
    }

    res.locals.Id = foundMonkeyId;
    next();
};

const getMonkey = (req, res, next) => {
    return res.status(200).json(monkeys[res.locals.Id]);
};

const deleteMonkey = (req, res, next) => {
    const deletedMonkey = monkeys.splice(res.locals.Id, 1);
    return res.status(200).json(deletedMonkey);
};

const updateMonkey = (req, res, next) => {
    if (typeof req.body.name !== 'undefined') {
        monkeys[res.locals.Id].name = req.body.name;
    }

    if (typeof req.body.sex !== 'undefined') {
        monkeys[res.locals.Id].sex = req.body.sex;
    }

    if (typeof req.body.species !== 'undefined') {
        monkeys[res.locals.Id].species = req.body.species;
    }

    if (
        typeof req.body.name === 'undefined' &&
        typeof req.body.sex === 'undefined' &&
        typeof req.body.species === 'undefined'
    ) {
        return res.status(400).json({
            message: 'Missing name or sex or species'
        });
    }

    return res.status(200).json(monkeys[res.locals.Id]);
};

const searchMonkey = (req, res, next) => {
    if (typeof req.body.search === 'undefined') {
        return res.status(400).json({
            message: 'Missing name'
        });
    }

    const searchText = req.body.search;

    return res.status(200).json(
        monkeys.filter(
            monkey =>
                monkey.name.includes(searchText) ||
                monkey.sex.includes(searchText) ||
                monkey.species.includes(searchText)
        )
    );
};

app.get('/monkeys', getMonkeys);
app.post('/monkeys', createMonkey);
app.get('/monkeys/:id', getMonkeyIndex, getMonkey);
app.delete('/monkeys/:id', getMonkeyIndex, deleteMonkey);
app.patch('/monkeys/:id', getMonkeyIndex, updateMonkey);
app.post('/monkeys/search', searchMonkey);

const getBananas = (req, res, next) => {
    console.table(bananas);
    return res.status(200).json(bananas);
};

const createBanana = (req, res, next) => {
    if (
        typeof req.body.sweet === 'undefined' || typeof req.body.color === 'undefined'
    ) {
        return res.status(400).json({
            message: 'Missing sweet or color'
        });
    }

    const newBanana = {
        id: globalId,
        monkeyId: req.body.monkeyId || null,
        sweet: req.body.sweet,
        color: req.body.color
    };

    bananas.push(newBanana);
    globalId++;

    return res.status(201).json(newBanana);
};

const getBananaIndex = (req, res, next) => {
    const bananaId = parseInt(req.params.id);

    let foundBananaId = -1;

    for (let i = 0; i < bananas.length; i++) {
        if (bananas[i].id === bananaId) {
            foundBananaId = i;
            break;
        }
    }

    if (foundBananaId === -1) {
        return res.status(404).json({
            message: 'Banana not found'
        });
    }

    res.locals.Id = foundBananaId;
    next();
};

const getBanana = (req, res, next) => {
    return res.status(200).json(bananas[res.locals.Id]);
};

const deleteBanana = (req, res, next) => {
    const deletedBanana = bananas[res.locals.Id];

    bananas.splice(res.locals.Id, 1);

    return res.status(200).json(deletedBanana);
};

const updateBanana = (req, res, next) => {
    if (typeof req.body.sweet !== 'undefined') {
        bananas[res.locals.Id].sweet = req.body.sweet;
    }

    if (typeof req.body.color !== 'undefined') {
        bananas[res.locals.Id].color = req.body.color;
    }

    if (
        typeof req.body.sweet === 'undefined' &&
        typeof req.body.color === 'undefined'
    ) {
        return res.status(400).json({
            message: 'Missing sweet or color'
        });
    }

    return res.status(200).json(bananas[res.locals.Id]);
};

const searchBanana = (req, res, next) => {
    if (typeof req.body.search === 'undefined') {
        return res.status(400).json({
            message: 'Missing search'
        });
    }

    const searchText = req.body.search;

    return res.status(200).json(
        bananas.filter(
            banana =>
                banana.color.includes(searchText) ||
                banana.sweet.toString().includes(searchText)
        )
    );
};

const getBananasByMonkeyId = (req, res, next) => {
    const monkeyId = parseInt(req.params.id);
    if(monkeyId === undefined || monkeyId=== null) {
        next();
        
    }
    if(!number.isInteger(monkeyId)) {
        return res.status(400).json({
            error: 'Invalid monkey ID'
        });
    }
    const monekey=monkeys.find(monkey => monkey.id === monkeyId);
    if(monkey===undefined) {
        return res.status(404).json({error: 'Monkey not found'
});
    }
    next();
};

app.get('/bananas', getBananas);
app.post('/bananas', getBananasByMonkeyId,createBanana);
app.get('/bananas/:id', getBananaIndex, getBanana);
app.delete('/bananas/:id', getBananaIndex, deleteBanana);
app.patch('/bananas/:id', getBananaIndex,getBananasByMonkeyId, updateBanana);
app.post('/bananas/search', searchBanana);
app.get('/bananas/monkey/:id', getBananasByMonkeyId);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});