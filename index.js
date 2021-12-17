require("dotenv").config();
const cors = require("cors");
const express = require("express");
const paginate = require("express-paginate");
const passport = require("passport");
const { connect } = require("mongoose");

const app = express();
const router = require("./routes/index");
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(passport.initialize());
require("./middleware/passport-middleware")(passport);

app.use(paginate.middleware(process.env.LIMIT, process.env.MAX_LIMIT));
app.use(router);

const runApp = async () =>{
    try{
        await connect(process.env.MONGO_DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`Successfully Connected to DB ${process.env.MONGO_DB}`);
        app.listen(process.env.PORT, () =>{
            console.log(`Server started successfully on PORT ${process.env.PORT}`);
        })
    }catch(err) {
        console.log(err);
        runApp()
    }
}


runApp();