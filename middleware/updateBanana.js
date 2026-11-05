module.exports = (objRep) => {
    const { BananaModel } = objRep;
    return (req, res, next) => {
        if (typeof req.body.sweet !== 'undefined') {
            res.locals.banana.sweet = req.body.sweet;
        }
        if (typeof req.body.color !== 'undefined') {
            res.locals.banana.color = req.body.color;
        }
        if (typeof req.body.sex !== 'undefined') {
            res.locals.banana.sex = req.body.sex;
        }
        if ((typeof req.body.sweet !== 'undefined') && (typeof req.body.color !== 'undefined') && (typeof req.body.sex !== 'undefined')) {
           return res.status(400).json({ error: "Missing banana data" });
        }
        BananaModel.update(res.locals.banana);
        db.saveDatabase(err => {
            if (err) {
                return next(err)
            }
            return next();
        })
    }


}