const router = require("express").Router();
const {ensureAuthenticated, ensureAuthorized} = require("../middleware/auth-middleware");
const {addOne,removeOne,updateOne,getAll,getOne} = require("../controllers/categories-controller")

router.get("/categories", async(req, res) =>{
    await getAll(req, res);
})

router.post("/categories", ensureAuthenticated, ensureAuthorized(["admin"]), async(req, res)=>{
    await addOne(req, res);
})

router.put("/categories/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async(req, res)=>{
    await updateOne(req, res);
})

router.get("/categories/:id", async(req, res)=>{
    await getOne(req, res);
})

router.delete("/categories/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async(req, res)=>{
    await removeOne(req, res);
})


module.exports = router;