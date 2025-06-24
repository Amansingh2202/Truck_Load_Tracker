const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  truckId: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  status: { type: String, enum: ['In Transit', 'Delivered', 'Idle'], required: true },
});

module.exports = mongoose.model('Truck', truckSchema);