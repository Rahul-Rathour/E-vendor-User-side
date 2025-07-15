import React, { useState } from 'react';

const ManageAddress = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    altPhone: '',
    addressType: 'Home'
  });

  const [addressList, setAddressList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const isEmpty = Object.values(formData).some(val => val.trim() === '' && val !== formData.landmark && val !== formData.altPhone);
    if (isEmpty) return alert("Please fill all required fields");

    if (editIndex !== null) {
      const updatedList = [...addressList];
      updatedList[editIndex] = formData;
      setAddressList(updatedList);
      setEditIndex(null);
    } else {
      setAddressList([...addressList, formData]);
    }

    setFormData({
      name: '',
      phone: '',
      pincode: '',
      locality: '',
      address: '',
      city: '',
      state: '',
      landmark: '',
      altPhone: '',
      addressType: 'Home'
    });

    setFormOpen(false);
  };

  const handleEdit = (index) => {
    setFormData(addressList[index]);
    setEditIndex(index);
    setFormOpen(true);
  };

  const handleDelete = (index) => {
    const updatedList = addressList.filter((_, i) => i !== index);
    setAddressList(updatedList);
    if (editIndex === index) {
      setFormData({});
      setEditIndex(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Address</h2>

      <button
        onClick={() => {
          setFormOpen(!formOpen);
          setFormData({
            name: '',
            phone: '',
            pincode: '',
            locality: '',
            address: '',
            city: '',
            state: '',
            landmark: '',
            altPhone: '',
            addressType: 'Home'
          });
          setEditIndex(null);
        }}
        className="mb-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {formOpen ? 'Cancel' : 'Add New Location'}
      </button>

      {formOpen && (
        <div className="space-y-4 border rounded p-4 mb-6 bg-blue-50">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile number" className="border p-2 rounded" />
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="border p-2 rounded" />
            <input type="text" name="locality" value={formData.locality} onChange={handleChange} placeholder="Locality" className="border p-2 rounded" />
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City/District/Town" className="border p-2 rounded" />
            <select name="state" value={formData.state} onChange={handleChange} className="border p-2 rounded">
              <option value="">--Select State--</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
              {/* Add more states here */}
            </select>
            <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Landmark (Optional)" className="border p-2 rounded" />
            <input type="text" name="altPhone" value={formData.altPhone} onChange={handleChange} placeholder="Alternate Phone (Optional)" className="border p-2 rounded" />
          </div>

          <textarea name="address" rows="2" value={formData.address} onChange={handleChange} placeholder="Address (Area and Street)" className="w-full border p-2 rounded" />

          <div className="flex space-x-4">
            <label>
              <input type="radio" name="addressType" value="Home" checked={formData.addressType === 'Home'} onChange={handleChange} />
              <span className="ml-1">Home</span>
            </label>
            <label>
              <input type="radio" name="addressType" value="Work" checked={formData.addressType === 'Work'} onChange={handleChange} />
              <span className="ml-1">Work</span>
            </label>
          </div>

          <button onClick={handleSave} className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition">
            {editIndex !== null ? 'Update Address' : 'Save Address'}
          </button>
        </div>
      )}

      {/* Saved Addresses */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Saved Addresses</h3>
        {addressList.length === 0 ? (
          <p className="text-gray-500">No addresses saved.</p>
        ) : (
          <ul className="space-y-4">
            {addressList.map((addr, index) => (
              <li key={index} className="border rounded p-4 bg-gray-50">
                <div className="text-gray-800">
                  <strong>{addr.name}</strong> ({addr.addressType})<br />
                  {addr.address}, {addr.locality}, {addr.city}, {addr.state} - {addr.pincode}<br />
                  Phone: {addr.phone} {addr.altPhone && `| Alt: ${addr.altPhone}`}<br />
                  {addr.landmark && `Landmark: ${addr.landmark}`}
                </div>
                <div className="space-x-4 mt-2">
                  <button onClick={() => handleEdit(index)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(index)} className="text-red-600 hover:underline">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageAddress;
