const loki=require('lokijs');
constdb=new loki('library.db');
 

function initDatabase(callback){
    db.loadDatabase({},err=>
        {
            if (err)
                {
                    return callback(err)
                }
                let MonkeyModel=db.getCollection('majmok');
                if(MonkeyModel===null)
                {
                    MonkeyModel=db.addCollection('majmok');
                }
                let BananaModel=db.getCollection('bananok');
                if(BananaModel===null)
                {
                    BananaModel=db.addCollection('bananok');
                }
                db.saveDatabase(err=>{
                    if(err)
                    {
                        return callback(err,{db,MonkeyModel,BananaModel});
                    }

        })
    })
}
module.exports.initDatabase=initDatabase;