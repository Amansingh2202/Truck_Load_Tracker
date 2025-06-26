const express = require('express');
const Truck = require('../models/truck');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all trucks 
router.get('/', authMiddleware(['Admin', 'Dispatcher', 'Viewer']), async (req, res) => {
  try {
    const trucks = await Truck.find();
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trucks', error });
  }
});

// Update truck status 
router.put('/:id/status', authMiddleware(['Admin']), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const truck = await Truck.findByIdAndUpdate(id, { status }, { new: true });
    if (!truck) return res.status(404).json({ message: 'Truck not found' });

    res.json(truck);
  } catch (error) {
    res.status(500).json({ message: 'Error updating truck status', error });
  }
});

// Add a new truck 
router.post('/add', authMiddleware(['Admin']), async (req, res) => {
  const { truckId, driverName, status } = req.body;

  try {
    const truck = new Truck({ truckId, driverName, status });
    await truck.save();
    res.status(201).json({ message: 'Truck added successfully', truck });
  } catch (error) {
    res.status(500).json({ message: 'Error adding truck', error });
  }
});

module.exports = router;