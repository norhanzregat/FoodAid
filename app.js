const express = require('express');

//import express from 'express';
const app = express();
app.use(express.json());
const users = []

//http methods
// 1. GET ==> retrive data
app.get('/', (request, response) => {
    response.send('Wlcome to Home')

});

app.get('/users', (request, response) => {
    if (users.length == 0) {
        response.status(404).send("No Users Found!")
        return
    }
    response.status(200).send(users);

});

/**
 200 ==> 
 201 ==> 
 204==>      in world files 

 */

//POST ==> create data
app.post('/users', (request, response) => {
    const user = request.body;
    const findUser = users.find((x) => x.id === user.id);
    if (findUser) {
        response.status(400).send('User already exists')
        return
    }
    users.push(user)
    response.status(201).send('Created')

});

//DELETE 
app.delete('/users/:id' , (request , response)=>{
    const {id} = request.params
    const findUserIndex = users.findIndex((x) => x.id ===id)
    if(findUserIndex == -1){
        response.status(400).send('User not founds')
        return

    }
    users.splice(findUserIndex , 1)
    response.status(200).send("User Delated Successfuly!")
});

app.listen(3000, () => {
    console.log("Started on port 3000");
})