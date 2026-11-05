module.exports = (objRep, templatefile) =>{
    return (req, res, next)=>{
        return res.render(templatefile, res.locals);
    }
}