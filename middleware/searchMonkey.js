module.exports = (objRep) => {
    const { monkeyModel } = objRep;
    return (req, res, next) => {
        if (typeof req.body.search === 'undefined') {
            return res.status(400).json({ error: "Missing search data" });
        }

        const search = req.body.search;
        res.locals.monkeys = monkeyModel.find({ name: { $contains: search } });
        return next();
    }





}