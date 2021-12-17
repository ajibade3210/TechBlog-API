const router = require("express").Router();
const {ensureAuthenticated} = require("../middleware/auth-middleware");
const {addOne,removeOne} = require("../controllers/comments-controller")

router.post("/comments", ensureAuthenticated, async(req, res)=>{
    await addOne(req, res);
})

router.delete("/comments/:id", ensureAuthenticated, async(req, res)=>{
    await removeOne(req, res);
})


module.exports = router;