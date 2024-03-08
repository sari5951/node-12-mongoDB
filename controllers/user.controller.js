// Register a new User

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.signUp = async (req, res) => {
    const User = require('../classes/User.model.js');
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt);

    // Create an user object
    const user = new User(
        req.body.mobile,
        req.body.email,
        req.body.name,
        hasPassword,
        req.body.status || 1
    );
    // Save User in the json file
    try {
        //json כאן אני צריכה ליצור משתמש ולהכניס לקובץ 
        await user.saveToJson(user);
        // user.id = id;
        delete user.password;
        res.send(user);
    }
    catch (err) {
        res.status(500).send(err);
    }
};

// Login
exports.login = async (req, res) => {
    const User = require('../classes/User.model.js');
    const config = require('config');
    // try {
    console.log(`I in try: req.body.mobile ${req.body.mobile}, req.body.email: ${req.body.email}`);

    // Check user exist
    const user = await User.login(req.body.mobile, req.body.email);
    console.log("user:" + user);
    if (user != undefined) {
        console.log("I in if");

        const validPass = await bcrypt.compare(req.body.password, user.password);
        console.log("I after compare");
        if (!validPass) return res.status(400).send("Mobile/Email or Password is wrong");

        // Create and assign token
        const payload = {
            user: user,
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // Token expiration time (1 hour from now)
        };
        const crypto = require('crypto');

        // Generate a random secret key
        const secretKey = crypto.randomBytes(32).toString('hex');
        const token = jwt.sign(payload, secretKey);
      
        console.log("I after token");
        res.header("auth-token", token).send({ "token": token });
        // res.send("Logged IN");
    }
    else {
        res.status(401).send(`Mobile/Email or Password is wrong`);
    }
    // }
    // catch (err) {
    // if (err instanceof NotFoundError) {
    //     res.status(401).send(`Mobile/Email or Password is wrong`);
    // }
    // else {
    //     let error_data = {
    //         entity: 'User',
    //         model_obj: { param: req.params, body: req.body },
    //         error_obj: err,
    //         error_msg: err.message
    //     };
    //     res.status(500).send("Error retrieving User");
    // }
    // }

};