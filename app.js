import express from 'express';
import bcrypt from 'bcrypt';
import path from 'path';

const app = express();
const port = 3000;
const users = [];

app.use(express.json());

app.post("/register ", async(req , res)=>{
    try {
        const {email , passwords}=req.body;
        //Find users

        const findUsers = users.find((data)=>email == data.email);
        if(findUsers){
            res.status(400).send("Wrong email or passwords!");
        }

        const hashPasswords = await bcrypt.hash(passwords , 10);
        users.push({email , passwords:hashPasswords});
        res.status(201).send("Registered Successfuly!");
    }
    catch(err){
        res.status(500).send({message : err.message});
    }
});
app.listen(port , ()=>{
    console.log("Server is started in port 3000");
});