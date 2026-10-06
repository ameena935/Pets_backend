const Pet=require('../models/Pet');

exports.getPets=async(req, res, next) => {
    try{
        const filter={};
        if (req.query.species) filter.species=req.query.species;

        let query=Pet.find(filter);

        if (req.query.sort==="age") query=query.sort({age:1});

        const pets=await query;
        res.status(200).json(pets);
    }catch(err){
        next(err);
    }
};

exports.getAvailablePets=async(req, res, next) => {
    try{
        const pets=await Pet.find({adopted:false});
        res.status(200).json(pets);
    }catch(err){
        next(err);
    }
};

exports.getPet=async(req, res, next) => {
    try {
        const pet=await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ 
                message:"Pet not found" 
            });
        }
        res.status(200).json(pet);
    } catch (err) {
        next(err);
    }
};

exports.createPet=async(req, res, next) => {
    try {
        const pet = new Pet(req.body);
        const savedPet = await pet.save();
        res.status(201).json(savedPet);
    } catch (err) {
        next(err);
    }
};

exports.updatePet=async(req, res, next) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
            new: true,runValidators: true
        });
        if (!pet) {
            return res.status(404).json({ 
                message:"Pet not found" 
            });
        }
        res.status(200).json(pet);
    } catch (err) {
        next(err);
    }
};

exports.deletePet=async (req, res, next) => {
    try {
        const pet=await Pet.findByIdAndDelete(req.params.id);
        if (!pet) {
            return res.status(404).json({
                message:"Pet not found"
            });
        }
        res.status(200).json({
            message:"Pet has deleted successfully!!"    
        });
    } catch (err) {
        next(err);
    }
};