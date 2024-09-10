const dbConnect = require("../db/dbconfig");
const {generateAccessToken} = require("../token");

const rootApi = function (req, res) {
    res.send({message:"root api /"});
}

const userLoginApi = async function (req, res) {
    const users = await dbConnect();
    const { email, password } = req.body;
    const userDetails = await users.findOne({ email });
    if (userDetails) {
        if (email === userDetails.email && password === userDetails.password) {
            const userSendData = {
               email: userDetails.email,
               token: generateAccessToken(userDetails._id) 
            };
            res.send({ ...userSendData, message: 'Login successful', status: 200 });
        } else if (email === userDetails.email && password !== userDetails.password) {
            res.send({ message: 'Incorrect password', status: 404 });
        } else if (email !== userDetails.email && password === userDetails.password) {
            res.send({ message: 'Incorrect email', status: 404 });
        }
    } else {
        res.send({ message: 'User not found' });
    }
};

const registerApi = async function (req, res){
    const { firstname, lastname , email , password , dob} = req.body;
    if(email && password && firstname && lastname){
        const users = await dbConnect();
        const findUsers = await users.findOne({ email});
        if(findUsers){
            res.send({ message:"already registred", status: 0});
        } else {
            const insertData = await users.insertOne({
                email,
                password,
                firstname,
                lastname,
                dob,
            });
            if(insertData){
                res.send({
                    status:1,
                    firstname:firstname,
                    lastname:lastname,
                    email: email,
                    password: password,
                    dob:dob,
                });
            } else {
                res.send ({
                    message: "Something went wrong or insert failed",
                    status: 0,
                });
            }
        }
    } else {
        res.send({ message: "Please fill all required fields", status: 0 });
    }
}

module.exports ={
    rootApi,
    userLoginApi,
    registerApi
}