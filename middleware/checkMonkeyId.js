module.exports = (objRep) => {
    const { bananas } = objRep;
    return (req, res, next) => {
        const bananaId = req.body.MonkeyId;
       
        if (bananaId === undefined || bananaId === null) {
            return next();
        }
        
        if (!Number.isInteger(bananaId)) {
            return res.status(400).json({ error: 'bananaId must be an integer' });
        }
        
        const banana = bananas.find(m => m.id === bananaId);
        if (banana === undefined) {
            return res.status(400).json({ error: 'Banana does not exist' });
        }
        next();
    }
}