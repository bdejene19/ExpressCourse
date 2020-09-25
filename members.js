// This file can be placed in server.js file or anywhere => this is the benefit to express
// this is a full CRUD (create, read, update, and delete) api np

const express = require('express');

// can create router now => now when use router. instead of app.<e.g. get>
const router = express.Router();

const members = require('../../Members')


// get all members in api
router.get('/', (req, res) => 
    // sending json file of members as response 
    res.json(members)); 

// get single member from api by id
// lets say you want to get a single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        console.log(found)
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(404).json({msg: `no member with the id of ${req.params.id}`})
    }
})

// Create a member
// note: you can use the same route as long as they are different methods
router.post('/', (req, res) => {
    const newMember = {
        id: 4,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    // return error message when they don't enter a name or email
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'please include name and email'})
    };

    // pushing new member to hard coded members array

    members.push(newMember);
    // now you need to send a response (what ever you want to respond with)
    res.json(members);
})

// Update a member:
// when updating => most often a put request
router.put("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            member.name = updMember.name;
            member.email = updMember.email;
        });
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }

    res.json(members);
});


// delete a member from api

router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const deletedMember = req.body;
        res.json({
            msg: `Member: ${deletedMember}`,
            updatedMembers: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
    res.json(members);
});

module.exports = router;