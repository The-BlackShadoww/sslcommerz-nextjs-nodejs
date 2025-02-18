import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT;
console.log(port);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//TODO Settings
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cors());

//TODO SSlCommerz configurations
import sslcommerz from "sslcommerz-lts";
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; //! true for live, false for sandbox

//TODO sslcommerz init
app.get("/init", async (req, res) => {
    const data = {
        total_amount: 100,
        currency: "BDT",
        tran_id: "REF123", //! use unique tran_id for each api call
        // success_url: `${process.env.ROOT}/ssl-payment-success/${custom_tran_id}`,
        success_url: `${process.env.ROOT}/ssl-payment-success`,
        fail_url: `${process.env.ROOT}/ssl-payment-fail`,
        cancel_url: `${process.env.ROOT}/ssl-payment-cancel`,
        ipn_url: `${process.env.ROOT}/ssl-payment-notification`,
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: "Customer Name",
        cus_email: "customer@example.com",
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
    };

    const sslcz = new sslcommerz(store_id, store_passwd, is_live);

    sslcz.init(data).then((apiResponse) => {
        console.log(apiResponse);
        //TODO Redirect the user to payment gateway
        if (apiResponse.GatewayPageURL) {
            let GatewayPageURL = apiResponse.GatewayPageURL;
            res.send({ url: GatewayPageURL });
            // res.redirect(GatewayPageURL);
            console.log("Redirecting to: ", GatewayPageURL);
        } else {
            return res
                .status(400)
                .json({ error: "Session was not successful" });
        }
    });
});

app.post("/ssl-payment-success", async (req, res) => {
    res.redirect("http://localhost:3000");
    // res.sendFile(path.join(__dirname, "public", "success.html"));
});

app.post("/ssl-payment-fail", (req, res) => {
    res.sendFile(path.join(__basedir + "/public/fail.html"));
});

app.post("/ssl-payment-cancel", (req, res) => {
    res.sendFile(path.join(__basedir + "/public/cancel.html"));
});

app.post("/ssl-payment-notification", (req, res) => {
    console.log("IPN: ", req.body);
    res.json({ status: "success" });
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
