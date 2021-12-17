const router = require("express").Router();
const {ensureAuthenticated, ensureAuthorized} = require("../middleware/auth-middleware");
const {addOne,removeOne,updateOne,getAll,getOne,getTopVideos} = require("../controllers/videos-controller")

router.get("/videos", async(req, res) =>{
    await getAll(req, res);
})

router.post("/videos", ensureAuthenticated, ensureAuthorized(["admin"]), async(req, res)=>{
    await addOne(req, res);
})

router.put("/videos/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async(req, res)=>{
    await updateOne(req, res);
})

router.get("/videos/:id", async(req, res)=>{
    await getOne(req, res);
})

router.delete("/videos/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async(req, res)=>{
    await removeOne(req, res);
})

router.get("/videos/top", async(req, res)=>{
    await getTopVideos(req, res);
})

module.exports = router;