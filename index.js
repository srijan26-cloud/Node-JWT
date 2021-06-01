const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

var PORT = process.env.PORT || 3000;

app.get('/api' , (req , res ) => {
    res.json({ 
        message :"Entered the /api services" 
    })
})


app.post('/api/post' , verifyToken , (req , res ) => {

    jwt.verify(req.token , "secretkey" , ( err , authData) => {
        if(err)
            res.sendStatus(403)
        else{   
            res.json({
            message : "Posts created .. ",
            authData
            })  
        }
    })

})


app.post('/api/login' , (req , res ) => {
    const user = {
        id:1,
        name : "Srijan Chandra",
        email : "srijan.chandra26@gmail.com"
    }

    //secretkey using HMASHA512 encryption
    jwt.sign({user : user} , "secretkey" , (err, token) => {
        res.json({
            token,
        })
    })
})


function verifyToken(req ,res ,next) {
    const bearerHeader = req.headers['authorization']
    //if not correct authorization then it is undefined
    if(typeof bearerHeader !== undefined){
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    }
    else 
        res.sendStatus(403)
}

app.listen(PORT , (req ,res) => {
    console.log(`Listening at ${PORT}`)
})