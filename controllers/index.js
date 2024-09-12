const dbConnect = require("../db/dbconfig");
const {generateAccessToken} = require("../token");

const rootApi = function (req, res) {
    res.send({message:"root api /"});
}

const userLoginApi = async function (req, res) {
    console.log("Login API Calling");
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
    console.log("Register API Calling");
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

const resetPasswordApi = async function (req, res) {
    console.log("Reset Password API Calling");
    const { email , password } = req.body;
    const users = await dbConnect();
    const findUsers = await users.findOne({email: email});          
    if(findUsers) {
        const updateData = await users.updateOne(
            {email: email},
            {$set: { password: password } }
        );
        if (updateData) {
            res.send({ message: "password reset successfully",
                status: 1});
        } else {
            res.send({ message: "password reset failed",
                 status: 0});
        } 
    } 
    else {
        res.send({ message: "user not found!" , status: 0 });
    } 
}; 

const deleteApi= async (req,res)=>{
    console.log("Delete API Calling");
    const username=req.params.email;
      const users = await dbConnect(); 
      const findUsers = await users.findOne({ email: username });
      if (findUsers) {
        const deleteData = await users.deleteOne(
          { email: username }
        );
        if (deleteData) {
          res.send({ message: "user deleted successfully", status: 1 });
        } else {
          res.send({ message: "user deleted failed", status: 0 });
        }
      } else {
        res.send({ message: "User not found!", status: 0 });
      }
  };

const forgetApi = async function (req, res) {
    console.log("Forget Password API Calling");
    const { email , password } = req.body; 
    const users = await dbConnect();
    
    try {
      const findUsers = await users.findOne({ email: email });
      
      if (findUsers) {
        const updateData = await users.updateOne(
          { email: email },
          { $set: { password:password } } 
         );
        
        if (updateData) {
          res.send({ message: "Password reset successfully ", status: 1 });
        } else {
          res.send({ message: "Password reset failed", status: 0 });
        }
      } else {
        res.send({ message: "User not found!", status: 0 });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error", status: 0 });
    }
  };
  


module.exports ={
    rootApi, 
    userLoginApi,
    registerApi,
    resetPasswordApi,
    deleteApi,
    forgetApi
}