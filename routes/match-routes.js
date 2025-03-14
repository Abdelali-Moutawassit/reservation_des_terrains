const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
   
            res.render('match/indexPage');
  
});
router.get('/pageIndex',(req,res)=>{
    res.render('match/pageIndexUser')
})
router.get('/pageIndexA',(req,res)=>{
    res.render('match/pageIndexAdmin')
})




module.exports = router;