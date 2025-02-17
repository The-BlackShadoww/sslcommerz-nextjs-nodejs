import { NextResponse, NextRequest } from "next/server";
import sslcommerz from "sslcommerz-lts";
// import { sslConfig } from "../../../config";

export async function GET(req, res) {
    console.log("Payment API called");

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

    // console.log(data);

    const store_id = "abc65033adb77d4c";
    const store_passwd = "abc65033adb77d4c@ssl";
    const is_live = false;

    try {
        const sslcz = new sslcommerz(store_id, store_passwd, is_live);
        console.log(sslcommerz);

        const apiResponse = await sslcz.init(data);
        console.log("This is the apiResponse", apiResponse);

        //TODO Redirect the user to payment gateway
        if (apiResponse.GatewayPageURL) {
            const GatewayPageURL = apiResponse.GatewayPageURL;
            console.log("Redirecting to: ", GatewayPageURL);
            return NextResponse.json({ GatewayPageURL, status: 200 });
        } else {
            return NextResponse.json({
                error: "Session was not successful",
                status: 400,
            });
        }
    } catch (error) {
        // res.status(500).send(error);
        return NextResponse.json({
            error: "Session was not successful",
            status: 500,
        });
    }
}
