const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const crypto = require("crypto")

const register = async (data, role, res) => {
    try {
        const userTaken = await validateEmail(data.email);
        if(userTaken) {
            return res.status(400).json({
                email: "Email is already taken",
                message: "Registration Failed",
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(data.password, 16);
        const code = crypto.randomInt(100000, 1000000);

        const newUser = new User({
            ...data,
            password: hashedPassword,
            verifictionCode: code,
            role
        })
        await newUser.save();
        return res.status(201).json({
            message: "Account successfully Created",
            success: true,
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }
};

const login = async (data, res) => {
    try {
        let {email, password} = data;
        const user = await User.findOne({email});
        if(!user) {
            res.status(404).json({
                message: "Email Login Attempt",
                email: "Incorrect Email",
                success: false,
            })
        }
        let isMatch = await bcrypt.compare(password, user.password);
    
        if(isMatch) {
            let token = jwt.sign({
                user_id: user._id,
                role: user.role,
                email: user.email,
                name: user.name,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7 days",
            });
            let profile = {
                email: user.email,
                role: user.role,
                name: user.name,
            };
            let result = {
                user: profile,
                token: token,
                expiresIn: 168,
            };
            return res.status(200).json({
                ...result,
                message: "Login Success",
                success: true,
            });
        } else {
            return res.status(403).json({
                message: "Failed Login Attempt",
                email: "Incorrect Password",
                success: false,
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }

}

const verify = async (data, res) => {
    try {
        let {code} = data;
        const user = await User.findOne({verifictionCode: code});
        if(!user) {
            return res.status(404).json({
                message: "Invalid Verification Code",
                success: false,
            })
        }else if(user.isEmailVerified){
            return res.status(404).json({
                message: "Email Already Verified",
                success: false,
            })
        }
        await user.update({isEmailVerified: true});
        return res.status(201).json({
            message: "Email Verification Success",
            success: true,
        })
    }catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

const forgotPassword = async (data, res) => {
    try {
        let {email} = data;
        const user  = await User.findOne({email: email});
        if(!user){
            return res.status(404).json({
                message: "Invalid Email",
                success: false,
            })
        }
    }catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }

    const code = crypto.randomInt(100000, 1000000);
    const passwordResetCode = await bcrypt.hash(code.toString(), 16);
    await user.update({passwordResetCode: passwordResetCode});
    return res.status(404).json({
        message: "Verification Code Sent To Your Email",
        success: false,
    })
}
const resetPassword = async (data, res) => {
    try {
        let {email, code, newPassword} = data;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(500).json({
                message: "Invalid Email",
                success: false,
            });
        }
        let isMatch = await bcrypt.compare(code.toString(),user.resetPassword);
        if(isMatch){
            const hashedPassword = await bcrypt.hash(newPassword, 16);
            await user.update({password: hashedPassword},
               { passwordResetCode: ""});
               return res.status(201).json({
                   message: "Your password has been successfully reset",
                   success: true,
               });
        } else {
            return res.status(404).json({
                message: "Invalid Code",
                success: false,
            });
        }
    }catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

const changePassword = async (data, res) => {
    try {
        let {oldPassword, newPassword} = data;
        const user = await User.findById(req.user._id);
        let isMatch = await bcrypt.compare(oldPassword, user.password);
        if(isMatch){
            const hashedPassword = await bcrypt.hash(newPassword,16);
            await user.update({password: hashedPassword});
            return res.status(201).json({
                message: "Your Password Has Been Reset Successfully",
                success: true,
            });
        }else {
            return res.status(404).json({
                message: "Old Password Is Incorrect",
                success: false,
            })
        }
        }catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

const validateEmail = async (email) => {
    let user = await User.findOne({email});
    if(user) {
        return true;
    }else {
        return false;
    }
}

module.exports = {
    login,
    register,
    verify,
    forgotPassword,
    resetPassword,
    changePassword
}