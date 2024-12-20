const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Your Stripe secret key
const path = require("path"); // Required for serving the React build

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../bolt-cycles/build'))); 


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../bolt-cycles/build', 'index.html'));
});


const cyclesmodel = require("./models/cyclemodel");
const usermodel = require("./models/usersmodel");
const checkoutModel = require("./models/checkout"); // Assuming you have a checkout model



// User Registration
app.post("/register", (req, res) => {
  let user = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(user.password, salt, (err, phash) => {
        if (!err) {
          user.password = phash;
          usermodel
            .create(user)
            .then(() => {
              res.status(201).send({ message: "User registered" });
            })
            .catch((err) => {
              res.status(500).send({ message: "Some problem" });
            });
        }
      });
    }
  });
});



// User Login
app.post("/login", (req, res) => {
  let userCred = req.body;
  usermodel
    .findOne({ email: userCred.email })
    .then((user) => {
      if (user != null) {
        bcrypt.compare(userCred.password, user.password, (err, result) => {
          if (result === true) {
            jwt.sign({ email: userCred.email,role: user.role },process.env.JWT_SECRET, (err, token) => {
              if (!err) {
                res.status(200).send({
                  message: "Login success",
                  token: token,
                  userid: user._id,
                  name: user.name,
                  role: user.role,
                });
              }
            });
          } else {
            res.status(403).send({ message: "Wrong password" });
          }
        });
      } else {
        res.status(404).send({ message: "Email does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Some problem" });
    });
});

// Token Verification Middleware
function verifytoken(req, res, next) {
  if (req.headers.authorization != undefined) {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,process.env.JWT_SECRET, (err, data) => {
      if (!err) {
        next();
      } else {
        res.status(403).send({ message: "Send token" });
      }
    });
  }
}




// Get Cycles
app.get("/cycle", (req, res) => {
  cyclesmodel
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error" });
    });
});

app.get("/checkout",(req,res)=>{
  checkoutModel.find().then((data)=>  {
    res.send(data)
  }
  ).catch((err)=>{
    res.status(500).send({message:"Error"})
  })
})

app.post("/checkout/:value",(req,res)=>{
let value=req.params.value
  checkoutModel.find([{paymentStatus:"pending"},{$set:{paymentStatus:value}}]).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.status(500).send({message:"Error"})
  })
})

// Checkout Route (for saving checkout data to MongoDB)
// POST request to checkout route
// Handle checkout
app.post("/checkout", (req, res) => {
  // Destructure the request body to get the user ID, cart data, shipping address, and payment method
  const { userId, cartData, shippingAddress, paymentMethod } = req.body;

  // Find the user by ID
  usermodel.findById(userId)
    .then((user) => {
      // If the user is not found, send a 404 response
      if (!user) return res.status(404).send({ message: "User not found" });

      // Initialize the total amount to 0
      let totalAmount = 0;
      // Map through the cart data to get the cycle ID and price
      const cyclePromises = cartData.map((item) => {
        // Find the cycle by ID
        return cyclesmodel
          .findById(item.cycleId)
          .then((cycle) => {
            // If the cycle is found, add the price to the total amount
            if (cycle) {
              totalAmount += cycle.price;
            }
          })
          .catch((err) => {
            // Log any errors
            console.error(err);
          });
      });

      // Wait for all the cycles to be found
      Promise.all(cyclePromises)
        .then(() => {
          // Create a new checkout model with the user ID, cart data, shipping address, payment method, total amount, and payment status
          const checkout = new checkoutModel({
            user: userId,
            cartData: cartData.map((item) => ({
              cycle: item.cycleId,
              price: item.price,
            })),
            shippingAddress,
            paymentMethod,
            totalAmount,
            paymentStatus: paymentMethod === "Online" ? "Paid" : "Pending",
          });

          // Save the checkout model
          return checkout.save();
        })
        .then((checkout) => {
          // Send a 201 response with a success message and the checkout data
          res.status(201).send({ message: "Checkout successful", checkout });
        })
        .catch((error) => {
          // Log any errors and send a 500 response with an error message
          console.error(error);
          res.status(500).send({ message: "Error during checkout" });
        });
    })
    .catch((error) => {
      // Log any errors and send a 500 response with an error message
      console.error(error);
      res.status(500).send({ message: "Error finding user" });
    });
});

// Create Stripe Checkout Session
app.post("/create-checkout-session", (req, res) => {
  // Destructure the request body to get the cart data, shipping address, and user ID
  const { cartData, shippingAddress, userId } = req.body;

  // Initialize the total amount to 0
  let totalAmount = 0;
  // Map through the cart data to get the price
  cartData.forEach((item) => {
    // Add the price to the total amount
    totalAmount += item.price;
  });

  // Create a new Stripe checkout session with the payment method types, line items, mode, success URL, cancel URL, and metadata
  stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cartData.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    })),
    mode: "payment",
    success_url: process.env.STRIPE_SUCCESS_URL + "?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: process.env.STRIPE_CANCEL_URL,
    metadata: {
      userId: userId,
      cartData: JSON.stringify(cartData),
      shippingAddress: JSON.stringify(shippingAddress),
    },
  })
    .then((session) => {
      // Send a 200 response with the session ID
      res.status(200).send({ sessionId: session.id });
    })
    .catch((error) => {
      // Log any errors and send a 500 response with an error message
      console.error("Error creating Stripe checkout session:", error);
      res.status(500).send({ message: "Failed to create checkout session", error: error.message });
    });
});

// Handle success URL
app.get("/success", (req, res) => {
  // Get the session ID from the query parameters
  const sessionId = req.query.session_id;

  if (!sessionId) {
    return res.status(400).send("Session ID missing.");
  }

  stripe.checkout.sessions.retrieve(sessionId)
    .then((session) => {
      if (!session) {
        return res.status(404).send("Session not found.");
      }

      if (session.payment_status === "paid") {
        const userId = session.metadata.userId;
        const cartData = JSON.parse(session.metadata.cartData);

        const checkout = new checkoutModel({
          user: userId,
          cartData: cartData.map((item) => ({
            cycle: item.cycleId,
            price: item.price,
          })),
          shippingAddress: JSON.parse(session.metadata.shippingAddress),
          paymentMethod: "Online",
          paymentStatus: "Paid",
          totalAmount: session.amount_total / 100,
        });

        return checkout.save()
          .then(() => {
           res.redirect("https://bolt-cycles001.onrender.com/success")
          });
      } else {
        res.send("Payment was not completed. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error retrieving Stripe session:", error);
      res.status(500).send("An error occurred during payment processing.");
    });
});



app.get("/cancel", (req, res) => {
  // You can handle the cancellation logic here, e.g., log the cancellation,
  // notify the user, or redirect them to a different page
  console.log("Payment was cancelled by the user.");

  // Return a response to the user after cancellation
  res.redirect("https://bolt-cycles001.onrender.com/cancel")
 
});


app.get("/cycle/:category",(req,res)=>{
    cyclesmodel.find({category:req.params.category}).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({message:"error"})
    })
})


app.get("/bicycle/:name",(req,res)=>{
  let name=req.params.name;
  cyclesmodel.find({$and:[{name:{$regex:name,$options:'i'}},{category:"Bicycles"}]}).then((data)=>{
      res.send(data)
  }).catch((err)=>{
      res.send({message:err});
  })
})

app.get("/Accessories/:name",(req,res)=>{
  let name=req.params.name;
  cyclesmodel.find({$and:[{name:{$regex:name,$options:'i'}},{category:"Accessories"}]}).then((data)=>{
      res.send(data)
  }).catch((err)=>{
      res.send({message:err});
  })
})

app.get("/cycles/:value",(req,res)=>{
  let value=req.params.value;
  cyclesmodel.find({price:{$lte:value}}).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
})

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Start Server
const PORT = process.env.PORT || 8000; 
app.listen(8000, () => {
  console.log(`Server running on ${PORT}`);
});
