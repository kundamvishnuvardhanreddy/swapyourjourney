const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { ensureAuth } = require('../middleware/auth');

// Public routes
router.get('/available', ticketController.getAvailableTickets);

// Protected routes (require authentication)
router.get('/my-tickets', ensureAuth, ticketController.getOwnTickets);
router.get('/sold', ensureAuth, ticketController.getSoldTickets);
router.get('/purchases', ensureAuth, ticketController.getPurchases);
router.post('/create', ensureAuth, ticketController.createTicket);
router.post('/book/:id', ensureAuth, ticketController.bookTicket);
router.delete('/delete/:id', ensureAuth, ticketController.deleteTicket);

module.exports = router;