module.exports=(objRep) =>
    {
        const {BananaModel}=objRep;
    return (req,res,next)=>
        {
            res.locals.bananas=BananaModel.find();
            return next();
        }   
    
    
    }
