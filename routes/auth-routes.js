const router = require("express").Router();
const {ensureAuthenticated} = require("../middleware/auth-middleware");
const {register,verify,login,forgotPassword,resetPassword,changePassword} = require("../controllers/auth-controller")

const {validationRules, validate} = require("../validations/user-validator");
const {validationRules: passwordValidationRules, validate:asswordValidate } = require("../validations/changePassword-validator");
// const {validationRules, validate} = require("../validations/user-validator");
// const {validationRules, validate} = require("../validations/user-validator");

router.post("/login", async(req, res) =>{
    await login(req.body, res);
})

router.post("/register", validationRules(), validate, async(req, res) =>{
    await register(req.body, "user", res);
})

router.post("/verify", async(req, res)=>{
    await verify(req.body, res);
})

router.post("/forgotPassword", async(req, res)=>{
    await forgotPassword(req.body, res);
})

router.post("/resetPassword",passwordValidationRules(), passwordValidate, async(req, res)=>{
    await resetPassword(req.body, res);
})

router.post("/changePassword", ensureAuthenticated, passwordValidationRules(), passwordValidate, async(req, res)=>{
    await changePassword(req.body, res);
})

module.exports = router;