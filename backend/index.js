const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 
const app = express();
app.use(cors());
app.use(express.json());

const cyclesmodel = require("./models/cyclemodel");
const usermodel = require("./models/usersmodel");
const checkoutModel = require("./models/checkout");


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





app.get("/products",verifytoken, (req, res) => {
  cyclesmodel
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error" });
    });
});

app.get("/checkout",verifytoken,(req,res)=>{
  checkoutModel.find().then((data)=>  {
    res.send(data)
  }
  ).catch((err)=>{
    res.status(500).send({message:"Error"})
  })
})

app.post("/checkout/:value",verifytoken,(req,res)=>{
let value=req.params.value
  checkoutModel.find([{paymentStatus:"pending"},{$set:{paymentStatus:value}}]).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.status(500).send({message:"Error"})
  })
})

app.post("/checkout", verifytoken, (req, res) => {
  const { userId, cartData, shippingAddress, paymentMethod } = req.body;

  usermodel.findById(userId)
    .then((user) => {
      if (!user) return res.status(404).send({ message: "User not found" });

      let totalAmount = 0;

      const cyclePromises = cartData.map((item) => {
        return cyclesmodel
          .findById(item.cycleId)
          .then((cycle) => {
            if (cycle) {
              totalAmount += cycle.price;
            }
          })
          .catch((err) => {
            // Log any errors
            console.error(err);
          });
      });

      Promise.all(cyclePromises)
        .then(() => {
          checkoutModel.create({
            user: userId,
            cartData: cartData.map((item) => ({
              cycle: item.cycleId,
              price: item.price,
            })),
            shippingAddress,
            paymentMethod,
            totalAmount,
            paymentStatus: paymentMethod === "Online" ? "Paid" : "Pending",
          })
            .then((checkout) => {
              res.status(201).send({ message: "Checkout successful", checkout });
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send({ message: "Error during checkout" });
            });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send({ message: "Error calculating total amount" });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: "Error finding user" });
    });
});



app.post("/create-checkout-session", verifytoken, (req, res) => {
  const { cartData, shippingAddress, userId } = req.body;

  let totalAmount = 0;
  
  // Calculate total amount for payment
  cartData.forEach((item) => {
    totalAmount += item.price;
  });

  stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cartData.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item.price * 100, // Convert price to cents
      },
      quantity: 1, // Each product is considered as 1 quantity
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
      console.log("Stripe session created:", session); // Log session details
      res.status(200).send({ sessionId: session.id });
    })
    .catch((error) => {
      console.error("Error creating Stripe checkout session:", error); // Log errors
      res.status(500).send({ message: "Failed to create checkout session", error: error.message });
    });
});




app.get("/success", (req, res) => {
  const sessionId = req.query.session_id;

  if (!sessionId) {
    return res.status(400).send("Session ID missing.");
  }

  // Retrieve the Stripe session using the sessionId
  stripe.checkout.sessions.retrieve(sessionId)
    .then((session) => {
      console.log("Stripe session details:", session);  // Log full session details

      // Check if payment status is 'paid'
      if (session.payment_status === "paid") {
        const userId = session.metadata.userId;
        const cartData = JSON.parse(session.metadata.cartData);
        const shippingAddress = JSON.parse(session.metadata.shippingAddress);

        console.log("UserId:", userId);
        console.log("Cart Data:", cartData);
        console.log("Shipping Address:", shippingAddress);

        // Calculate total amount from session
        const totalAmount = session.amount_total / 100;  // Convert from cents to dollars

        // Save checkout details to your database
        checkoutModel.create({
          user: userId,
          cartData: cartData.map(item => ({
            cycle: item.cycleId, // Ensure you're using the correct cycle ID
            price: item.price,
          })),
          shippingAddress: shippingAddress,
          paymentMethod: "Online",
          paymentStatus: "Paid",  // Mark the payment as 'Paid' in the database
          totalAmount: totalAmount,
        })
        .then(() => {
          res.send("Payment was successful. Thank you for your purchase!");
        })
        .catch((error) => {
          console.error("Error saving checkout data:", error);
          res.status(500).send("An error occurred while processing the checkout.");
        });
      } else {
        console.log("Payment status is not paid. Status:", session.payment_status);
        res.send("Payment was not completed. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error retrieving Stripe session:", error);
      res.status(500).send("An error occurred during payment processing.");
    });
});


// Use express.raw() for Stripe webhook
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET; // Webhook secret stored in environment variable
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    // Validate the webhook signature and parse the event
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    console.log("Webhook verified:", event);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("Payment successful, session details:", session);

    // Extract relevant details from the session
    const userId = session.metadata.userId;
    const cartData = JSON.parse(session.metadata.cartData);
    const shippingAddress = JSON.parse(session.metadata.shippingAddress);

    // Calculate total amount
    const totalAmount = session.amount_total / 100;  // Convert from cents to dollars

    // TODO: Save the session details to your database
    checkoutModel.create({
      user: userId,
      cartData: cartData.map(item => ({
        cycle: item.cycleId, // Make sure you use the correct cycle ID
        price: item.price,
      })),
      shippingAddress: shippingAddress,
      paymentMethod: "Online",
      paymentStatus: "Paid",
      totalAmount: totalAmount,
    })
    .then(() => {
      console.log("Checkout data saved successfully.");
    })
    .catch((error) => {
      console.error("Error saving checkout data:", error);
      res.status(500).send("An error occurred while processing the checkout.");
      return;
    });
  }

  // Respond with a success message
  res.status(200).send("Webhook received.");
});




app.get("/cancel", (req, res) => {
  console.log("Payment was cancelled by the user.");

  // Return a response to the user after cancellation
  res.send("Payment was cancelled. Please try again.")
 
});


app.get("/products/:category",verifytoken,(req,res)=>{
    cyclesmodel.find({category:req.params.category}).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({message:"error"})
    })
})


app.get("/bicycle/:name",verifytoken,(req,res)=>{
  let name=req.params.name;
  cyclesmodel.find({$and:[{name:{$regex:name,$options:'i'}},{category:"Bicycles"}]}).then((data)=>{
      res.send(data)
  }).catch((err)=>{
      res.send({message:err});
  })
})

app.get("/Accessories/:name",verifytoken,(req,res)=>{
  let name=req.params.name;
  cyclesmodel.find({$and:[{name:{$regex:name,$options:'i'}},{category:"Accessories"}]}).then((data)=>{
      res.send(data)
  }).catch((err)=>{
      res.send({message:err});
  })
})

app.get("/products/accessories/:value",verifytoken,(req,res)=>{
  let value=req.params.value;
  cyclesmodel.find({$and:[{category:"Accessories"},{price:{$lte:value}}]}).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
})

app.get("/products/bicycles/:value",verifytoken,(req,res)=>{
  let value=req.params.value;
  cyclesmodel.find({$and:[{category:"Bicycles"},{price:{$lte:value}}]}).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
})

app.post("/updateproducts",verifytoken,(req,res)=>{
  let newproducts=req.body;
  cyclesmodel.create(newproducts).then((data)=>{
      res.send(data)
  }).catch((err)=>{
      res.send(err)
  })
})


app.delete("/deleteproducts/:name",verifytoken,(req,res)=>{
  let name = req.params.name;
  cyclesmodel.deleteOne({name:name}).then((data)=>{
      res.send({message:"Product Deleted"})
  }).catch((err)=>{
      res.send(err)
  })
})

app.put("/updatepaymentstatus/:orderid/:status",(req,res)=>{
  let status=req.params.status;
  checkoutModel.updateOne({_id:req.params.orderid},{$set:{paymentStatus:status}}).then((data)=>{
    res.send({message:"Payment Status Updated"})
  }).catch((err)=>{
    res.send({meesage:err})
  })
})



app.post("/sendmail",(req,res)=>{
  let userdetails=req.body;
  const transporter= nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:"sara18ec118@gmail.com",
      pass:process.env.GMAIL_PASS
    }
  })
  const mailOptions ={
  from:userdetails.email,
  to:"sara18ec118@gmail.com",
  replyTo:userdetails.email,
  subject:userdetails.subject,
  text:userdetails.message
}

transporter.sendMail(mailOptions,(err,data)=>{
  if(err){
    res.send({message:"failed to send mail",error:err})
  }
  else{
    res.send({message:"Mail sent"})
  }
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
