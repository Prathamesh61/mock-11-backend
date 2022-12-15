const express = require('express');
const { connection } = require('./config/db');
const { userRouter } = require("./routes/userRoute.route")
const app = express();
app.use(express.json());
const cors = require("cors");
const { ProductRouter } = require('./routes/product.route');
const { authentication } = require('./middlewares/Authentication');
app.use(cors());

app.get("/", (req, res) => {
    res.send("Home page");
});
app.use("/user", userRouter);

app.use("/products", authentication, ProductRouter);

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Connection to DB successfully")
    }
    catch (err) {
        console.log("Error connecting to DB")
    }
    console.log("Listening on PORT", process.env.PORT)
})