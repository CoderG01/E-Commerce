const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51NkO1nSJXKszfcMq8DKbTaxwWGBkHciNdBmsi88SdKvphJF8NkvTkSnyH4NeYHbwyH5gQajaxFt6i3D7IKHmz10z00INDq585j"
);

app.use(express.json());
app.use(cors());

// CHECKOUT API
app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.title,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });

  res.json({ id: session.id });
});

app.listen("1000", () => {
  console.log("server start");
});
