const router = require("express").Router();
const {ensureAuthenticated} = require("../middleware/auth-middleware");
const {updateOne,getOne} = require("../controllers/profile-controller")

router.put("/profile", ensureAuthenticated, async(req, res)=>{
    await updateOne(req, res);
})

router.get("/profile", ensureAuthenticated, async(req, res)=>{
    await getOne(req, res);
})


module.exports = router;