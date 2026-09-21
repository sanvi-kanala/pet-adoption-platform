const Pet = require('../Model/PetModel');
const fs = require('fs');
const path = require('path');
const { redisClient } = require('../redisClient');

const getCacheKey = (status) => `pets:${status}`;

const postPetRequest = async (req, res) => {
  try {
    const { name, age, area, justification, email, phone, type } = req.body;
    const { filename } = req.file;

    const pet = await Pet.create({
      name,
      age,
      area,
      justification,
      email,
      phone,
      type,
      filename,
      status: 'Pending'
    });

    // Invalidate pending pets cache
    await redisClient.del(getCacheKey('Pending'));

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, phone, status } = req.body;

    const existingPet = await Pet.findById(id);

    if (!existingPet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const oldStatus = existingPet.status;

    const pet = await Pet.findByIdAndUpdate(
      id,
      { email, phone, status },
      { new: true }
    );

    // Invalidate both old and new status caches
    await redisClient.del(getCacheKey(oldStatus));
    await redisClient.del(getCacheKey(status));

    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const allPets = async (reqStatus, req, res) => {
  try {
    const cacheKey = getCacheKey(reqStatus);

    // Check Redis cache
    const cachedPets = await redisClient.get(cacheKey);

    if (cachedPets) {
      console.log(`Redis cache HIT: ${cacheKey}`);
      return res.status(200).json(JSON.parse(cachedPets));
    }

    console.log(`Redis cache MISS: ${cacheKey}`);

    // Fetch from MongoDB
    const data = await Pet.find({
      status: reqStatus
    }).sort({
      updatedAt: -1
    });

    if (data.length > 0) {
      // Store result in Redis for 5 minutes
      await redisClient.setEx(
        cacheKey,
        300,
        JSON.stringify(data)
      );

      return res.status(200).json(data);
    }

    return res.status(404).json({
      error: 'No data found'
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const pet = await Pet.findByIdAndDelete(id);

    if (!pet) {
      return res.status(404).json({
        error: 'Pet not found'
      });
    }

    const filePath = path.join(
      __dirname,
      '../images',
      pet.filename
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Invalidate cache
    await redisClient.del(getCacheKey(pet.status));

    res.status(200).json({
      message: 'Pet deleted successfully'
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  postPetRequest,
  approveRequest,
  deletePost,
  allPets
};