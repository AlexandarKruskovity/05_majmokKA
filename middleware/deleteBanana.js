module.exports = (objRep) => {
    const { BananaModel, db } = objRep;
    return (req, res, next) => {
        BananaModel.remove(res.locals.banana);
        db.saveDatabase(err => {
            if (err) {
                return next(err);
            }
            return next();
        }
        )
    }
}