const mongoose = require('mongoose');

const specializationSchema = mongoose.Schema({
   specialization: {
       type: String,
       require: true
   }
});

module.exports = mongoose.model('Specialization', specializationSchema);