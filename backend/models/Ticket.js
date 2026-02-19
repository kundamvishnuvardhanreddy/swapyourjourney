const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  from: { 
    type: String, 
    required: true 
  },
  to: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  depTime: { 
    type: String, 
    required: true 
  },
  landmark: { 
    type: String, 
    required: true 
  },
  busType: { 
    type: String, 
    required: true 
  },
  seatNo: { 
    type: String, 
    required: true 
  },
  seatCategory: { 
    type: String, 
    enum: ['Seater', 'Sleeper'],
    required: true 
  },
  actualPrice: { 
    type: Number, 
    required: true 
  },
  sellPrice: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['available', 'booked'],
    default: 'available' 
  },
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  sellerName: { 
    type: String, 
    required: true 
  },
  buyer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  bookedAt: { 
    type: Date 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);