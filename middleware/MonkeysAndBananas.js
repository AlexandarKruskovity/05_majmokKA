
const monkeys = [
    { id: 1, name: 'Joe', sex: 'male', species: 'gibbon' },
    { id: 2, name: 'Josephine', sex: 'female', species: 'gorilla' },
    { id: 3, name: 'Lajos', sex: 'male', species: 'orangutan' }
];

let bananas = [
    { id: 1, color: "yellow", sweet: false, monkeyId: null },
    { id: 2, color: "yellow", sweet: true, monkeyId: null },
    { id: 3, color: "green", sweet: true, monkeyId: null },
    { id: 4, color: "green", sweet: false, monkeyId: null }
];

let globalMonkeyId = monkeys.length + 1;
let globalBananaId = bananas.length + 1;


const getMonkeys = (req, res, next) => {
    console.table(monkeys);
    return res.json(monkeys);
};

const getMonkeyIndex = (req, res, next) => {
    const monkeyIdAsNumber = parseInt(req.params.id, 10);
    const monkey = monkeys.find(m => m.id === monkeyIdAsNumber);

    if (!monkey) {
        return res.status(404).json({
            Error: `Requested monkeyID not found! ${req.params.id}`
        });
    }
    
    res.locals.monkey = monkey;
    return next();
};

const getMonkey = (req, res, next) => {
    res.status(200).json(res.locals.monkey);
};

const createMonkey = (req, res, next) => {
    if (!req.body.name || !req.body.sex || !req.body.species) {
        return res.status(400).json({ Error: `Missing name, sex or species` });
    }
    const newMonkey = {
        id: globalMonkeyId,
        name: req.body.name,
        sex: req.body.sex,
        species: req.body.species
    };
    monkeys.push(newMonkey);
    globalMonkeyId++;
    return res.status(201).json(newMonkey);
};

const deleteMonkey = (req, res, next) => {
    const targetMonkey = res.locals.monkey;
    const index = monkeys.indexOf(targetMonkey);
    if (index !== -1) {
        monkeys.splice(index, 1);
    }
    
    return res.status(200).json(targetMonkey);
};

const updateMonkey = (req, res, next) => {
    const monkey = res.locals.monkey;
    if (req.body.name !== undefined) monkey.name = req.body.name;
    if (req.body.sex !== undefined) monkey.sex = req.body.sex;
    if (req.body.species !== undefined) monkey.species = req.body.species;
    if (req.body.bananaId !== undefined) monkey.bananaId = req.body.bananaId;

    if (req.body.name === undefined && req.body.sex === undefined && req.body.species === undefined) {
        return res.status(400).json({ error: 'Missing name, sex or species' });
    }
    return res.status(200).json(monkey);
};


const getBananas = (req, res, next) => {
    console.table(bananas);
    return res.json(bananas);
};

const getBananaIndex = (req, res, next) => {
    const bananaIdAsNumber = parseInt(req.params.id, 10);
    const banana = bananas.find(b => b.id === bananaIdAsNumber);

    if (!banana) {
        return res.status(404).json({
            Error: `Requested bananaID not found! ${req.params.id}`
        });
    }
    res.locals.banana = banana;
    return next();
};

const getBanana = (req, res, next) => {
    res.status(200).json(res.locals.banana);
};

const createBanana = (req, res, next) => {
    if (req.body.color === undefined || req.body.sweet === undefined) {
        return res.status(400).json({ Error: `Missing color or sweet` });
    }
    const newBanana = {
        id: globalBananaId,
        color: req.body.color,
        sweet: req.body.sweet,
        monkeyId: req.body.monkeyId ?? null
    };

    bananas.push(newBanana);
    globalBananaId++;
    return res.status(201).json(newBanana);
};

const deleteBanana = (req, res, next) => {
    const targetBanana = res.locals.banana;
    const index = bananas.indexOf(targetBanana);
    if (index !== -1) {
        bananas.splice(index, 1);
    }
    return res.status(200).json(targetBanana);
};

const updateBanana = (req, res, next) => {
    const banana = res.locals.banana;
    if (req.body.color !== undefined) banana.color = req.body.color;
    if (req.body.sweet !== undefined) banana.sweet = req.body.sweet;
    if (req.body.monkeyId !== undefined) banana.monkeyId = req.body.monkeyId;

    if (req.body.color === undefined && req.body.sweet === undefined) {
        return res.status(400).json({ error: 'Missing color, sweet!' });
    }
    return res.status(200).json(banana);
};


const checkMonkeyId = (req, res, next) => {
    const monkeyId = req.body.monkeyId;
    if (monkeyId === undefined || monkeyId === null) {
        return next();
    }
    if (!Number.isInteger(monkeyId)) {
        return res.status(400).json({ error: 'monkeyId must be an integer' });
    }
    const monkeyExists = monkeys.some(m => m.id === monkeyId);
    if (!monkeyExists) {
        return res.status(400).json({ error: 'Monkey does not exist' });
    }
    next();
};

const deleteMonkeyBananas = (req, res, next) => {
    const monkeyID = res.locals.monkey.id;
    bananas = bananas.filter(b => b.monkeyId !== monkeyID);
    next();
};

module.exports = {
    getMonkeys, getMonkeyIndex, getMonkey, createMonkey, deleteMonkey, updateMonkey,
    getBananas, getBananaIndex, getBanana, createBanana, deleteBanana, updateBanana,
    checkMonkeyId, deleteMonkeyBananas
};
