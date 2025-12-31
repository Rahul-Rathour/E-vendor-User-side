import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";

const InvoicePage = () => {
  const { state } = useLocation();
  const [user, setUser] = useState(null);
  const [homeset, setHomeset] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get user ID from localStorage (you can change this as per your auth system)
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.id) {
          // navigate("/login");
          console.error("User not found");
          return;
        }

        const homesetting = await api.get(`/home-setting`);
        const response = await api.get(`/user/${storedUser.id}`);
        if (response.data.status) {
          setUser(response.data.data);
          setHomeset(homesetting.data);
        } else {
          console.error("User not found");
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUser();
  }, []);
  if (!state) return <p>No invoice data found.</p>;
  const { totalAmt, shippingCharge, shippingAddress, cart, order_number } = state;
  const finalTotal = totalAmt + shippingCharge;

  const discount = totalAmt * 0.01; // 1% discount (you can modify)
  const taxableAmount = totalAmt - discount;
  const sgst = taxableAmount * 0.06;
  const cgst = taxableAmount * 0.09;
  const grandTotal = taxableAmount + sgst + cgst + shippingCharge;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl mt-10 border border-gray-300 rounded">
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">INVOICE</h1>
          <p>Invoice No.: <strong>{order_number}</strong></p>
          <p>Invoice Date: <strong>08-03-2021</strong></p>

        </div>

        <div className="text-right">
          <p className="text-xl font-semibold">Due Amount - <span className="text-blue-600">₹{grandTotal.toLocaleString()}</span></p>
          <h2 className="text-lg font-bold">{homeset?.title}</h2>
          <p>{homeset?.address}</p>
          <p>Phone: {homeset?.mobile}</p>
          <p>GSTIN: 898989898989</p>
        </div>
      </div>

      {/* Bill / Ship Details */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* <div className="border p-4 rounded">
          <h3 className="font-bold text-lg mb-2">BILL TO</h3>
          <p>{user?.name}</p>
          <p>{shippingAddress}</p>
          <p>Phone: 8888888888</p>
          <p>GSTIN: 6869686969696969</p>
        </div> */}

        <div className="border p-4 rounded">
          <h3 className="font-bold text-lg mb-2">SHIP TO</h3>
          <p>{user?.name}</p>
          <p>{shippingAddress}</p>
          <p>{user?.phone}</p>
          <p>GSTIN: 6869686969696969</p>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">SL NO.</th>
              <th className="border p-2">DESCRIPTION</th>
              <th className="border p-2">HSN NO.</th>
              <th className="border p-2">QTY</th>
              <th className="border p-2">RATE</th>
              <th className="border p-2">AMOUNT</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{item.product.name}</td>
                <td className="border p-2 text-center">2541</td>
                <td className="border p-2 text-center">{item.quantity}</td>
                <td className="border p-2 text-right">₹{item.product.price}</td>
                <td className="border p-2 text-right">
                  ₹{(item.product.price * item.quantity).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="mt-6 text-sm border-t pt-4">
        <div className="flex justify-between py-1">
          <span className="font-semibold">TOTAL</span>
          <span>₹{totalAmt.toLocaleString()}</span>
        </div>

        <div className="flex justify-between py-1">
          <span>DISCOUNT @ 1%</span>
          <span>₹{discount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between py-1 font-semibold">
          <span>TAXABLE AMOUNT</span>
          <span>₹{taxableAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between py-1">
          <span>SGST @ 6%</span>
          <span>₹{sgst.toFixed(2)}</span>
        </div>

        <div className="flex justify-between py-1">
          <span>CGST @ 9%</span>
          <span>₹{cgst.toFixed(2)}</span>
        </div>

        <div className="flex justify-between py-1">
          <span>Shipping Charge</span>
          <span>₹{shippingCharge}</span>
        </div>

        <div className="flex justify-between mt-3 text-lg font-bold text-blue-600">
          <span>PAYABLE AMOUNT</span>
          <span>₹{grandTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-8 text-xs text-gray-600 border-t pt-4">
        <p>• Please include the Invoice number in your payment notes.</p>
        <p>• To be paid in maximum 7 days after receiving the invoice.</p>
      </div>

      {/* Signature */}
      <div className="text-right mt-10 font-semibold">
        Authorized Sign.
      </div>

      {/* Footer */}
      <div className="text-center mt-6 text-sm">
        <p>If you have any queries regarding this invoice contact us:</p>
        <p className="font-semibold">+91-{homeset?.mobile} | {homeset?.email}</p>
        <p className="mt-2 text-gray-700 font-semibold">THANK YOU FOR BUSINESS WITH {homeset?.title}</p>
      </div>
    </div>
  );
};

export default InvoicePage;
