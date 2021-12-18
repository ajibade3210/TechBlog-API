const {check, validationResult} = require("express-validator");

const validationRules = () => {
    return [
        check("title").trim().isLength({min:2, max:256}).withMessage
        ("Title must be between 2 and 256 long"),
        check("body").trim().isLength({min:2, max:256}).withMessage
        ("Body must be between 2 and 256 long")
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

