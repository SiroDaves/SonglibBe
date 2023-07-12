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

const book = require("./routes/book");
const draft = require("./routes/draft");
const edit = require("./routes/edit");
const listed = require("./routes/listed");
const org = require("./routes/org");
const song = require("./routes/song");
const user = require("./routes/user");

app.use(express.json({ limit: '50mb', extended: true }));

app.use("/", home);
app.use("/api", apihome);

app.use("/api/book", book);
app.use("/api/draft", draft);
app.use("/api/edit", edit);
app.use("/api/listed", listed);
app.use("/api/org", org);
app.use("/api/song", song);
app.use("/api/user", user);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Songlib Server is running in port ${PORT}`));
