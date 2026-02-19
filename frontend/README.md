# Swap Your Journey - Bus Ticket Marketplace

A modern MERN stack application for buying and selling bus tickets. Users can list their unused bus tickets for sale and buyers can purchase them at discounted prices.

## 🎯 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Password Reset**: Email-based password recovery system
- **Dual Roles**: Switch between buyer and seller modes
- **Ticket Management**: Create, view, and delete ticket listings
- **Payment Integration**: Simulated payment gateway (UPI & Card)
- **Real-time Updates**: Track your tickets, sales, and purchases
- **Modern UI**: Dark theme with stunning animations and transitions

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Nodemailer (Email service)
- bcryptjs (Password hashing)

### Frontend
- React 18
- React Router DOM
- Axios
- Pure CSS (No external UI libraries)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **Gmail Account** (for password reset emails)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd swap-your-journey
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/swapyourjourney
JWT_SECRET=yourSuperStrongSecretKey12345
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

**Important: Gmail App Password Setup**
1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Scroll down to "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password to `EMAIL_PASS`

#### Start MongoDB

```bash
# On Windows
mongod

# On Mac/Linux
sudo mongod
```

#### Start Backend Server

```bash
npm start
# Or for development with auto-reload:
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend will run on `http://localhost:3000`

## 📱 Usage

### For Sellers:
1. Sign up and login
2. Choose "Seller" role
3. Create ticket listings with details
4. View your listed tickets
5. Track sold tickets and buyer information

### For Buyers:
1. Sign up and login
2. Choose "Buyer" role
3. Browse available tickets
4. Book tickets with simulated payment
5. View purchase history

### Payment Simulation:
- **UPI**: Use any valid UPI format (e.g., `user@bank`)
- **Card**: Use any 16-digit card number, MM/YY, CVV
- 70% of payments succeed randomly

## 🎨 Features Breakdown

### Authentication
- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Password reset via email
- ✅ Protected routes

### Ticket Operations
- ✅ Create new ticket listings
- ✅ View all available tickets
- ✅ Book tickets instantly
- ✅ Delete unboo tickets
- ✅ View sales history (sellers)
- ✅ View purchase history (buyers)

### User Experience
- ✅ Role switching (buyer/seller)
- ✅ Responsive design
- ✅ Modern dark UI
- ✅ Smooth animations
- ✅ Form validation
- ✅ Error handling

## 📁 Project Structure

```
swap-your-journey/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── ticketController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Ticket.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── ticketRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Navbar.css
    │   │   ├── PaymentModal.js
    │   │   └── PaymentModal.css
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Signup.js
    │   │   ├── ForgotPassword.js
    │   │   ├── ResetPassword.js
    │   │   ├── RoleSwitcher.js
    │   │   ├── TicketList.js
    │   │   ├── CreateTicket.js
    │   │   ├── MyTickets.js
    │   │   ├── MySoldTickets.js
    │   │   ├── MyPurchases.js
    │   │   ├── Profile.js
    │   │   └── [CSS files]
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## 🔒 Security Features

- Passwords hashed with bcryptjs
- JWT token-based authentication
- Protected API routes
- Input validation
- XSS protection

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongo --version

# Start MongoDB service
# Windows: Start MongoDB service from Services
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port Already in Use
```bash
# Kill process on port 5000
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -ti:5000 | xargs kill
```

### Email Not Sending
- Verify Gmail app password is correct
- Check if 2-Step Verification is enabled
- Ensure "Less secure app access" is OFF (use app passwords instead)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Tickets
- `GET /api/tickets/available` - Get all available tickets
- `GET /api/tickets/my-tickets` - Get user's tickets (seller)
- `GET /api/tickets/sold` - Get sold tickets (seller)
- `GET /api/tickets/purchases` - Get purchases (buyer)
- `POST /api/tickets/create` - Create ticket (seller)
- `POST /api/tickets/book/:id` - Book ticket (buyer)
- `DELETE /api/tickets/delete/:id` - Delete ticket (seller)

## 🌟 Future Enhancements

- Real payment gateway integration
- Ticket verification system
- Rating and review system
- Advanced search and filters
- Real-time notifications
- Chat between buyer and seller
- Mobile app version

## 👨‍💻 Developer

Built with ❤️ using MERN Stack

## 📄 License

This project is open source and available under the MIT License.