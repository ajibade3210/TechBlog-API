const router = require("express").Router();
const {ensureAuthenticated, ensureAuthorized} = require("../middleware/auth-middleware");
const {addOne,removeOne,updateOne,getAll,getOne,getTopStories, getOneBySlug} = require("../controllers/stories-controller")

router.get("/stories", async(req, res) =>{
    await getAll(req, res);
})

router.post("/stories", ensureAuthenticated, ensureAuthorized(["admin"]), async(req, res)=>{
    await addOne(req, res);
})

router.put("/stories/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async(req, res)=>{
    await updateOne(req, res);
})

router.get("/stories/:id", async(req, res)=>{
    await getOne(req, res);
})

router.delete("/stories/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async(req, res)=>{
    await removeOne(req, res);
})

router.get("/stories/top", async(req, res)=>{
    await getTopStories(req, res);
})
router.get("/stories/slug/:slug", async(req, res)=>{
    await getOneBySlug(req, res);
})


module.exports = router;