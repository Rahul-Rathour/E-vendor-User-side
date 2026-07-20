import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const Invoice = () => {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [invoice, setInvoice] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchInvoice();
    }, []);

    const fetchInvoice = async () => {
        try {
            const res = await api.get(`/invoice/${id}`);

            const orderData = res.data.order;

            setOrder(orderData);
            setInvoice(orderData.invoice);
            setItems(orderData.items || []);
        } catch (err) {
            console.error("Invoice fetch error:", err);
        }
    };

    if (!order) {
        return (
            <p className="text-center mt-10">
                Loading...
            </p>
        );
    }

    if (!invoice) {
        return (
            <p className="text-center mt-10">
                Invoice not generated yet.
            </p>
        );
    }

    const gstTotal =
        Number(invoice.cgst_amount || 0) +
        Number(invoice.sgst_amount || 0) +
        Number(invoice.igst_amount || 0);

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 mt-6 shadow rounded">
            <h2 className="text-2xl font-bold mb-6">
                Invoice
            </h2>

            {/* Invoice Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <p>
                        <strong>Invoice No:</strong>{" "}
                        {invoice.invoice_number}
                    </p>

                    <p>
                        <strong>Invoice Date:</strong>{" "}
                        {invoice.invoice_date}
                    </p>
                </div>

                <div>
                    <p>
                        <strong>Billing Name:</strong>{" "}
                        {invoice.billing_name}
                    </p>

                    <p>
                        <strong>Billing Address:</strong>{" "}
                        {invoice.billing_address}
                    </p>
                </div>
            </div>

            {/* Order Info */}
            <div className="mb-6">
                <p>
                    <strong>Order No:</strong>{" "}
                    {order.order_number}
                </p>

                <p>
                    <strong>Shipping Address:</strong>{" "}
                    {order.shipping_address}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    {order.delivery_status}
                </p>

                <p>
                    <strong>Payment Method:</strong>{" "}
                    {order.payment_method}
                </p>
            </div>

            {/* Items Table */}
            <table className="w-full border border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Product</th>
                        <th className="p-2 border">Color</th>
                        <th className="p-2 border">Size</th>
                        <th className="p-2 border">Qty</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">GST</th>
                        <th className="p-2 border">Total</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item) => {
                        const total =
                            Number(item.price) *
                            Number(item.quantity);

                        return (
                            <tr key={item.id}>
                                <td className="p-2 border">
                                    {item.product?.name}
                                </td>

                                <td className="p-2 border">
                                    {item.color?.color_name}
                                </td>

                                <td className="p-2 border">
                                    {item.size}
                                </td>

                                <td className="p-2 border">
                                    {item.quantity}
                                </td>

                                <td className="p-2 border">
                                    ₹{Number(item.price).toFixed(2)}
                                </td>

                                <td className="p-2 border">
                                    {item.gst}%
                                </td>

                                <td className="p-2 border">
                                    ₹{total.toFixed(2)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Summary */}
            <div className="mt-6 text-right space-y-2">
                <p>
                    <strong>Subtotal:</strong> ₹
                    {Number(order.total_amount).toFixed(2)}
                </p>

                <p>
                    <strong>GST Total:</strong> ₹
                    {gstTotal.toFixed(2)}
                </p>

                <p>
                    <strong>Shipping:</strong> ₹
                    {Number(order.shipping_charges).toFixed(2)}
                </p>

                <p>
                    <strong>Discount:</strong> ₹
                    {Number(order.discount_amount).toFixed(2)}
                </p>

                <h3 className="text-lg font-bold">
                    Grand Total: ₹
                    {Number(invoice.total_amount).toFixed(2)}
                </h3>
            </div>

            {/* Print Button */}
            <div className="text-center mt-6">
                <button
                    onClick={() => window.print()}
                    className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Print Invoice
                </button>
            </div>
        </div>
    );
};

export default Invoice;