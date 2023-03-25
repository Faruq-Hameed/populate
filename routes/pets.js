const express = require('express');
const {Owner, Pet} = require('../models')

const router = express.Router();

//to get a particular pet
router.get('/:id', async(req, res) => {
    try{
        const aPet = await Pet.findById(req.params.id)
        
        if(!aPet){
            throw new Error( 'No pets found')
        }
        //populate the pet object with name. id will be added except it is removed 
        const populatedPet = await aPet.populate('owner', 'name')
        res.status(200).send({ data: populatedPet})
    }
    catch(err){
        res.status(500).json({message: err.message});
        
    }
//model.find().pop
})

//to create a new pet which must belong to an owner
router.post('/:ownerId',async (req, res) => {
    try{
        const owner = await Owner.findById(req.params.ownerId);
        if(!owner){
            return res.status(401).send({message: 'Owner not found'});
        }
        //creating a new pet and the new pet with the pet Id will be returned
        const pet = await Pet.create({name: req.body.name, owner: owner._id})

        // adding the new pet id to the owner pet list
        owner.pets.push(pet._id);
        owner.save();
        
        res.status(201).json({message: 'pet created successfully and added to your pets list', pet})

    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

module.exports = router