const jwt = require('jsonwebtoken')
const express = require('express')

const tokenAuthentication = (request, response, next)=> {

    let jwtToken;

    const headerAuthentication = request.headers['authorization']
    if(headerAuthentication !== undefined)
    {
        jwtToken = headerAuthentication.split(' ')[1]
        jwt.verify(jwtToken, "PFX_KEY", async (error, payload)=> {
            if(error)
            {
                return response.status(401).json({message: `Error at token verification: ${error}`})
            }
            else{
                request.id = payload.userId
                next()
            }
        })
    }
    else{
        return response.status(401).json({message: 'Invalid JSON Web Token'})
    }
};

module.exports = tokenAuthentication;