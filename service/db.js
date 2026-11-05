const loki=require('lokijs');
constdb=new loki('majmok.db');
 

function initDatabase(callback){
    db.loadDatabase({},err=>
        {
            if (err)
                {
                    return callback(err)
                }
                let majmok=db.getCollection('majmok');
                if(majmok===null)
                {
                    majmok=db.addCollection('majmok');
                }
                let bananok=db.getCollection('bananok');
                if(bananok===null)
                {
                    bananok=db.addCollection('bananok');
                }
                db.saveDatabase(err=>{
                    if(err)
                    {
                        return callback(err,{db,majmok,bananok});
                    }

        })
    })
}
module.exports.initDatabase=initDatabase;