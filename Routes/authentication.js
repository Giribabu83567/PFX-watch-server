const express = require('express')
const router = express.Router();

const usersData = require('../Models/usersData');

const jwt = require('jsonwebtoken')

const tokenAuthentication = require('../Middleware/tokenAuthen')

/* Signup API */
router.post('/signup', async (request, response) => {

    try {

        const { name, email, gender, mobile, password, confirmPassword } = request.body;

        const isEmailFound = await usersData.findOne({ email: email });
        if (isEmailFound) 
        {
            return response.status(400).json({message: 'User already registered!'})
        }
        else 
        {
           if (password === confirmPassword && name!=='' && email!=='' && gender!=='' && mobile!=='' && password!=='' && confirmPassword!=='') 
           {
                const newUser = new usersData({
                    name: name,
                    email: email,
                    gender: gender,
                    mobile: mobile,
                    password: password,
                    confirmPassword: confirmPassword
                });
                newUser.save()

                return response.status(200).json({message: 'Registration Successfully!'})
           } 
           else 
           {
                return response.status(400).json({message: 'Passwords must be same'})
           }
        }
    }
    catch (error) {
        console.log(`Error at Signup : ${error}`);
        return response.status(500).json({message: 'Internal Server Error at SignUp API'})
    }

});

/* Login API */
router.post('/login', async (request, response)=> {
    try 
    {
       const {email, password} = request.body;

       const isEmailFound = await  usersData.findOne({email: email})
       if (isEmailFound) 
       {
            if (isEmailFound.password === password)
            {
                let payload = {
                    userId: isEmailFound._id
                }
                let token = jwt.sign(payload, "PFX_KEY", {expiresIn: '2hr'})

                return response.status(200).json({message: 'Login Successfully!', token: token})
            } 
            else 
            {
                return response.status(400).json({message: 'Invalid password!'})
            }
       } 
       else 
       {
            return response.status(400).json({message: 'Email not found! Please register'})
       }
    } 
    catch (error) 
    {
        console.log(`Error at Login API : ${error}`)
        return response.status(500).json({message: 'Internal Server Error at Login API'})
    }
});

/* Profile API*/
router.get('/profile', tokenAuthentication, async (request, response)=> {
    try 
    {
        const userDetails = await usersData.findOne({_id: request.id})
        return response.status(200).json({userProfile: userDetails})
    } 
    catch (error) 
    {
        console.log(`Error at Profile API : ${error}`)
        return response.status(500).json({message: 'Internal Server Error at Profile API'})
    }
});

module.exports = router;