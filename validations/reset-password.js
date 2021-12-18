const {check, validationResult} = require("express-validator");

const validationRules = () => {
    return [
        check("oldPassword").trim().isLength({min:6 , max: 16}).withMessage
        ("oldPassword must be between 6 and 16 characters"),
        check("newPassword").trim().isLength({min:6 , max: 16}).withMessage
        ("newPassword must be between 6 and 16 characters")
    ]
};

const validate = (req, res, next ) => {
    const errors = validationRules(req);

    if(errors.isEmpty()){
        return next();
    }

    const resultErrors = [];
    errors.array().map((err)=> resultErrors.push({[err.param] : err.msg}));

    resultErrors.push({message: "Action Unsuccessful"});
    resultErrors.push({success: false});

    const errorObject = Object.assign({}, ...resultErrors);
    return res.status(422).json(errorObject)
};

module.exports = {
    validationRules,
    validate
}

