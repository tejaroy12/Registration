const express = require("express");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json()); // Ensure req.body is parsed

const userDetails = []; // Temporary storage (Replace with DB in production)

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    // Properly checking if user exists
    const userExists = userDetails.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    userDetails.push({ username, password: hashedPassword });

    return res.status(201).json({ message: "User registered successfully" });
});

// Start the server


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
