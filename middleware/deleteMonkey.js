module.exports = (objRep) => {
    const { monkeyModel, db } = objRep;
    return (req, res, next) => {
        monkeyModel.remove(res.locals.monkey)
        db.saveDatabase(err => {
            if (err) {
                return next(err)
            }
            return next();
        }
        )
    }
}