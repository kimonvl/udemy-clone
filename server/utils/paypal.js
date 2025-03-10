import paypal from "paypal-rest-sdk"
import dotenv from "dotenv";
dotenv.config({});

paypal.configure({
    mode: "sandbox",
    // @ts-ignore
    client_id: process.env.PAYPAL_CLIENT_ID,
    // @ts-ignore
    client_secret: process.env.PAYPAL_CLIENT_SECRER,
})

export default paypal