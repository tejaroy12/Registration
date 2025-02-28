const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
app.use(express.json())

let userDetails = [];

app.post("/register",async(req,res) => {
    const {username,password} = req.body 
    if (!username || !password){
        res.send("username or password Required")
    }
    if (userDetails.find(users =>{users.username === username})) {
        res.send("user already exists")
    }else{
        const hashedPassword = await bcrypt.hash(password,10)
        userDetails.push({username,password:hashedPassword})
        res.send("user Registered successfully")
    }
    })
    app.get("/",(req,res)=>{
        res.send("Hi Tejesh")
    })
    
    app.post("/login",async (req,res) => {
        const {username,password} = req.body
        const user = userDetails.find(users => users.username === username)

        if(user){
            const isMatch = await bcrypt.compare(password,user.password)
            if (isMatch === true){
                res.status(200).send("Login successful")
            }else{
                res.send("Invalid Password")
            }
        }else{
            res.send("invalid username")
        }
    })

    app.listen(3000,()=>{
        console.log("server running")
    })
