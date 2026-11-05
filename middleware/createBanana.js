module.exports=(objRep)=>
    {
        const{BananaModel}=objRep;
        return (req,res,next)=>
            {
               if(typeof req.body.MonkeyId==='undefined'|| typeof req.body.sweet=='undefined' || typeof req.body.color=='undefined')
                {
                    return res.status(400).json({ error: "Missing banana data" });
                }

                const newBanana=
                {
                    id: uuid(),
                    MonkeyId:req.body.MonkeyId,
                    sweet:req.body.sweet,
                    color:req.body.color
                }
                res.locals.banana=BananaModel.insert(newBanana);
                db.saveDatabase(err=>
                    {
                        if(err)
                        {
                            return next(err);
                        }
                        return next();
                    })


            }


    }