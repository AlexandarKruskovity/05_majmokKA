const uuid=require('uuid');
const getMonkiesMW=require('../middleware/getMonkies');
const getMonkeyMW=require('../middleware/getMonkey');
const createMonkeyMW=require('../middleware/createMonkey');
const updateMonkeyMW=require('../middleware/updateMonkey');
const deleteMonkeyMW=require('../middleware/deleteMonkey');

const getBananasMW=require('../middleware/getBananas');
const getBananaMW=require('../middleware/getBanana');
const createBananaMW=require('../middleware/createBanana');
const updateBananaMW=require('../middleware/updateBanana');
const deleteBananaMW=require('../middleware/deleteBanana');
const getBananaByMonkeyIDMW=require('../middleware/checkMonkeyId');

const renderMW=require('../middleware/render');
const searchMW=require('../middleware/search');


   function addRoutes(app, db, monkeysModel, bananasModel) { 
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

    let bananas = [
        {
            id: 1,
            color: "yellow",
            sweet: false,
            monkeyId: 1
        },
        {
            id: 2,
            color: "yellow",
            sweet: true,
            monkeyId: 2
        },
        {
            id: 3,
            color: "green",
            sweet: true,
            monkeyId: 3
        }, {
            id: 4,
            color: "green",
            sweet: false,
            monkeyId: 4
        }
    ]

    const objRep = {
        monkeys,
        bananas,
        monkeysModel,
        bananasModel,
        nextMonkeyId: 4,
        nextBananaId: 5,
        db
    }

//Böngésző majmok
    app.get('/',getMonkiesMW(objRep),renderMW(objRep,'index'));
    app.get('/newMonkey',renderMW(objRep,'newMonkey'));
    app.post('/newMonkey',createMonkeyMW(objRep),(req,res,next)=> res.redirect('/'));
    app.get('/deleteMonkey/:id',getMonkeyMW(objRep),deleteMonkeyMW(objRep),(req,res,next)=> res.redirect('/'));
    app.post('/updateMonkey/:id',getMonkeyMW(objRep),renderMW(objRep,'newMonkey'));
    app.post('/updateMonkey/:id',getMonkeyMW(objRep),updateMonkeyMW(objRep),(req,res,next)=> res.redirect('/'));
    app.get('/monkey/:id',getMonkeyMW(objRep),renderMW(objRep,'monkey'));

//Böngésző banánok
    app.get('/',getBananasMW(objRep),renderMW(objRep,'index'));
    app.get('/newBanana',renderMW(objRep,'newBanana'));
    app.post('/newBanana',createBananaMW(objRep),(req,res,next)=> res.redirect('/'));
    app.get('/deleteBanana/:id',getBananaMW(objRep),deleteBananaMW(objRep),(req,res,next)=> res.redirect('/'));
    app.post('/updateBanana/:id',getBananaMW(objRep),renderMW(objRep,'newBanana'));
    app.post('/updateBanana/:id',getBananaMW(objRep),updateBananaMW(objRep),(req,res,next)=> res.redirect('/'));
    app.get('/getBananaBy',getBananaMW(objRep),renderMW(objRep,'banana'));

//JSON majmok
    app.get('/api/monkeys',getMonkiesMW(objRep),(req,res,next)=> res.json(res.locals.monkeys));
    app.post('/api/monkey',createMonkeyMW(objRep),(req,res,next)=> res.json(res.locals.monkey).status(201));
    app.get('/api/monkey/:id',getMonkeyMW(objRep),(req,res,next)=> res.json(res.locals.monkey));
    app.delete('/api/monkey/:id',getMonkeyMW(objRep),deleteMonkeyMW(objRep),(req,res,next)=> res.json(res.locals.monkey));;
    app.patch('/api/monkey/:id',getMonkeyMW(objRep),updateMonkeyMW(objRep),(req,res,next)=> res.json(res.locals.monkey));
    app.post('/api/search',searchMW(objRep),(req,res,next)=> res.json(res.locals.monkeys));
    //JSON banánok
     app.get('/api/bananas',getBananasMW(objRep),(req,res,next)=> res.json(res.locals.bananas));
    app.post('/api/banana',createBananaMW(objRep),(req,res,next)=> res.json(res.locals.banana).status(201));
    app.get('/api/banana/:id',getBananaMW(objRep),(req,res,next)=> res.json(res.locals.banana));
    app.delete('/api/banana/:id',getBananaMW(objRep),deleteBananaMW(objRep),(req,res,next)=> res.json(res.locals.banana));;
    app.patch('/api/banana/:id',getBananaMW(objRep),updateBananaMW(objRep),(req,res,next)=> res.json(res.locals.banana));
    app.post('/api/search',searchMW(objRep),(req,res,next)=> res.json(res.locals.bananas));
    





}






