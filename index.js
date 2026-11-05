require('dotenv').config();
const{initDatabase} = require('./service/db');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

initDataBase((err,result)=>{

if(err)
    {
        return console.error(err);
    }
    const {db,MonkeyModel,BananaModel}=result;
    addRoutes(app,db,MonkeyModel,BananaModel);
    app.use((req,res)=>{
        return res.status(404).json({error:`Endpoint or method not found: ${req.method} ${req.originalUrl}`});

    })
 app.listen(process.env.PORT,function(){
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
 })


})