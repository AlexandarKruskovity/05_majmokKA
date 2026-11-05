module.exports=(objRep) =>
    {
        const {monkeyModel}=objRep;
    return (req,res,next)=>
        {
            res.locals.monkeys=monkeyModel.find();
            return next();
        }   
    
    
    }
