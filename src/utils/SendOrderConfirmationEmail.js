import emailjs from "@emailjs/browser";

export const SendOrderConfirmationEmail = async ({
    customerName,
    customerEmail,
    orderNumber,
    totalAmount,
    shippingAddress,
}) => {
    try {
        const response = await emailjs.send(
            "YOUR_SERVICE_ID",      // EmailJS Service ID
            "YOUR_TEMPLATE_ID",     // EmailJS Template ID
            {
                customer_name: customerName,
                customer_email: customerEmail,
                order_number: orderNumber,
                total_amount: totalAmount,
                shipping_address: shippingAddress,
            },
            "YOUR_PUBLIC_KEY"       // EmailJS Public Key
        );

        console.log("Email sent:", response);
        return true;
    } catch (error) {
        console.error("Email Error:", error);
        return false;
    }
};