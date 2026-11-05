module.exports = (objRep) => {
    const { monkeyModel, db, uuid } = objRep;
    return (req, res, next) => {
        if (typeof req.body.majmok.name == 'undefined' ||
            typeof req.body.majmok.sex == 'undefined' ||
            typeof req.body.majmok.species == 'undefined'
        ) {
            return res.status(400).json({ error: "Missing majmok data" });
        }
        const newMonkey =
        {
            id: uuid(),
            name: req.body.majmok.name,
            sex: req.body.majmok.sex,
            species: req.body.majmok.species
        };
        res.locals.monkey = monkeyModel.insert(newMonkey);
        db.saveDatabase(err => {
            if (err) {
                return next(err)

            }
            return next();
        })



    }




}