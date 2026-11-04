import { 
    getMonkeys, createMonkey, getMonkey, deleteMonkey, updateMonkey, getMonkeyIndex,
    getBananas, createBanana, getBanana, deleteBanana, updateBanana, getBananaIndex,
    checkMonkeyId, deleteMonkeyBananas
} from '../middleware/MonkeysAndBananas.js';

function addRoutes(app) {
    app.get('/monkey', getMonkeys);
    app.post('/monkey', createMonkey);
    app.get('/monkey/:id', getMonkeyIndex, getMonkey);
    app.delete('/monkey/:id', getMonkeyIndex, deleteMonkeyBananas, deleteMonkey);
    app.patch('/monkey/:id', getMonkeyIndex, updateMonkey);

    app.get('/banana', getBananas);
    app.post('/banana', checkMonkeyId, createBanana);
    app.get('/banana/:id', getBananaIndex, getBanana);
    app.delete('/banana/:id', getBananaIndex, deleteBanana);
    app.patch('/banana/:id', getBananaIndex, checkMonkeyId, updateBanana);
}

export { addRoutes };
