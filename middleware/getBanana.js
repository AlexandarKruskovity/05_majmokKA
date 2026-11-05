module.exports=(objRep)=>
    {
        const {BananaModel}=objRep;
        return (req,res,next)=>
            {
                const banana=BananaModel.findOne({id:req.params.id});
                if (!banana) {
                    return res.status(404).json({ error: "Banana not found" });
                }
                res.locals.banana = banana;
                return next();
            }
    
    
    
    }