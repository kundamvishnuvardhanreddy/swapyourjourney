const Ticket = require('../models/Ticket');
const User = require('../models/User');

// Get all available tickets
exports.getAvailableTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ status: 'available' })
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(tickets);
  } catch (err) {
    console.error('Get available tickets error:', err);
    res.status(500).json({ msg: "Error fetching tickets" });
  }
};

// Get user's own tickets (seller)
exports.getOwnTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ seller: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(tickets);
  } catch (err) {
    console.error('Get own tickets error:', err);
    res.status(500).json({ msg: "Error fetching your tickets" });
  }
};

// Get sold tickets (seller)
exports.getSoldTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ 
      seller: req.user._id, 
      status: 'booked' 
    })
      .populate('buyer', 'name email phone')
      .sort({ bookedAt: -1 });
    
    res.json(tickets);
  } catch (err) {
    console.error('Get sold tickets error:', err);
    res.status(500).json({ msg: "Error fetching sold tickets" });
  }
};

// Get purchases (buyer)
exports.getPurchases = async (req, res) => {
  try {
    const tickets = await Ticket.find({ buyer: req.user._id })
      .populate('seller', 'name email phone')
      .sort({ bookedAt: -1 });
    
    res.json(tickets);
  } catch (err) {
    console.error('Get purchases error:', err);
    res.status(500).json({ msg: "Error fetching your purchases" });
  }
};

// Create ticket (seller)
exports.createTicket = async (req, res) => {
  try {
    const { from, to, date, depTime, landmark, busType, seatNo, seatCategory, actualPrice, sellPrice } = req.body;

    // Validate required fields
    if (!from || !to || !date || !depTime || !landmark || !busType || !seatNo || !seatCategory || !actualPrice || !sellPrice) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Create new ticket
    const ticket = new Ticket({
      from,
      to,
      date,
      depTime,
      landmark,
      busType,
      seatNo,
      seatCategory,
      actualPrice,
      sellPrice,
      seller: req.user._id,
      sellerName: req.user.name,
      status: 'available'
    });

    await ticket.save();

    res.status(201).json({ 
      success: true, 
      msg: "Ticket created successfully!",
      ticket 
    });
  } catch (err) {
    console.error('Create ticket error:', err);
    res.status(500).json({ msg: "Error creating ticket" });
  }
};

// Book ticket (buyer)
exports.bookTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    if (ticket.status !== 'available') {
      return res.status(400).json({ msg: 'Ticket is already booked' });
    }

    // Prevent seller from buying their own ticket
    if (ticket.seller.toString() === req.user._id.toString()) {
      return res.status(400).json({ msg: 'You cannot book your own ticket' });
    }

    // Update ticket
    ticket.status = 'booked';
    ticket.buyer = req.user._id;
    ticket.bookedAt = new Date();

    await ticket.save();

    res.json({ 
      success: true, 
      msg: "Ticket booked successfully!",
      ticket 
    });
  } catch (err) {
    console.error('Book ticket error:', err);
    res.status(500).json({ msg: "Error booking ticket" });
  }
};

// Delete ticket (seller - only if not booked)
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    // Check if user owns the ticket
    if (ticket.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'You are not authorized to delete this ticket' });
    }

    // Check if ticket is already booked
    if (ticket.status === 'booked') {
      return res.status(400).json({ msg: 'Cannot delete a booked ticket' });
    }

    await Ticket.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Ticket deleted successfully' });
  } catch (err) {
    console.error('Delete ticket error:', err);
    res.status(500).json({ msg: "Error deleting ticket" });
  }
};