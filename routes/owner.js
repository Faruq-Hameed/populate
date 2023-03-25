const express = require('express');
const {Owner, Pet} = require('../models')

const router = express.Router();

//to get all owners
router.get('/', (req, res) => {
    Owner.find()
    .then (owners => {
        if (owners.length === 0) {
            res.status(200).json({ message: 'No owners available at this time' });
            return
        }
        res.status(200).json({allOwners: owners})
    })
    .catch (err => {
        res.status(500).json({message: err.message});
    })
})

//to create a new owner
router.post('/', (req, res) => {
    Owner.create({...req.body})
    .then(owner => {
        res.status(201).json({message: 'Owner created successfully', owner: owner})
    })
    .catch(err => {
        res.status(500).json({message: err.message});
    });
})

module.exports = router