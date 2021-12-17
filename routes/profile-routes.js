const router = require("express").Router();
const {ensureAuthenticated} = require("../middleware/auth-middleware");
const {updateOne,getOne} = require("../controllers/profile-controller")

router.put("/profile", ensureAuthenticated, async(req, res)=>{
     /*  #swagger.tags = ['Profile']
        #swagger.security = [{
        "Authorization": []
        }]
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/UpdateUserModel" }
    } */

    await updateOne(req, res);
})

router.get("/profile", ensureAuthenticated, async(req, res)=>{
     /*  #swagger.tags = ['Profile']
        #swagger.security = [{
        "Authorization": []
        }]
    */

    await getOne(req, res);
})


module.exports = router;