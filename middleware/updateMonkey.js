module.exports = (objRep) => {
    const { monkeyModel } = objRep;
    return (req, res, next) => {
        if (typeof req.body.name !== 'undefined') {
            res.locals.monkey.name = req.body.name;
        }
        if (typeof req.body.species !== 'undefined') {
            res.locals.monkey.species = req.body.species;
        }
        if (typeof req.body.sex !== 'undefined') {
            res.locals.monkey.sex = req.body.sex;
        }
        if ((typeof req.body.name !== 'undefined') && (typeof req.body.species !== 'undefined') && (typeof req.body.sex !== 'undefined')) {
           return res.status(400).json({ error: "Missing majmok data" });
        }
        majmokModel.update(res.locals.monkey);
        db.body.saveDatabase(err => {
            if (err) {
                return next(err)
            }
            return next();
        })
    }


}