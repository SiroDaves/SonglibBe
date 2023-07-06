const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config({ path: "./.env" });
}

const app = express();
app.use(cors());

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// Connect to MongoDB Atlas
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin'
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const home = require("./routes/app");
const apihome = require("./routes/app");

const category = require("./routes/category");
const product = require("./routes/product");

const user = require("./routes/user");
const user_address = require("./routes/user_address");
const user_cart = require("./routes/user_cart");
const user_profile = require("./routes/user_profile");
const user_wallet = require("./routes/user_wallet");
const user_wishlist = require("./routes/user_wishlist");

app.use(express.json({ extended: false }));

app.use("/", home);
app.use("/api", apihome);

app.use("/api/category", category);
app.use("/api/product", product);

app.use("/api/user", user);
app.use("/api/address", user_address);
app.use("/api/cart", user_cart);
app.use("/api/profile", user_profile);
app.use("/api/wallet", user_wallet);
app.use("/api/wishlist", user_wishlist);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Vidserver is running in port ${PORT}`));
