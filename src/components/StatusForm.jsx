import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";

function StatusForm() {
  const [formData, setFormData] = useState({
    productCode: "",
    productName: "",
    importDate: "",
    stock: 0,
    cost: 0,
    price: 0,
    profit: 0,
    loss: 0,
  });

  // Calculate profit and loss dynamically
  const calculateProfitAndLoss = () => {
    const profit = formData.price > formData.cost ? formData.price - formData.cost : 0;
    const loss = formData.cost > formData.price ? formData.cost - formData.price : 0;
    return { profit, loss };
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "stock" || name === "cost" || name === "price" ? Number(value) : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { profit, loss } = calculateProfitAndLoss();
    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...formData,
        profit,
        loss,
      });
      console.log("Document written with ID: ", docRef.id);
      alert("สินค้าเพิ่มเรียบร้อยแล้ว!");
      setFormData({
        productCode: "",
        productName: "",
        importDate: "",
        stock: 0,
        cost: 0,
        price: 0,
        profit: 0,
        loss: 0,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า!");
    }
  };

  const { profit, loss } = calculateProfitAndLoss();

  return (
    <div className="flex justify-center items-center h-screen bg-pink-200">
      <div className="bg-white rounded-lg shadow-md p-8 w-[500px]">
        <h1 className="text-center text-3xl font-bold text-pink-500 mb-6">STATUS</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Product Code */}
          <div>
            <label className="block text-blue-500 font-medium mb-1">รหัสสินค้า</label>
            <input
              type="text"
              name="productCode"
              placeholder="กรอกรหัสสินค้า"
              value={formData.productCode}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Product Name */}
          <div>
            <label className="block text-blue-500 font-medium mb-1">ชื่อสินค้า</label>
            <input
              type="text"
              name="productName"
              placeholder="กรอกชื่อสินค้า"
              value={formData.productName}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Import Date */}
          <div>
            <label className="block text-blue-500 font-medium mb-1">วันที่นำเข้า</label>
            <input
              type="date"
              name="importDate"
              value={formData.importDate}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Stock */}
          <div>
            <label className="block text-blue-500 font-medium mb-1">จำนวนคงเหลือ</label>
            <input
              type="number"
              name="stock"
              placeholder="0"
              value={formData.stock}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Cost */}
            <div>
              <label className="block text-blue-500 font-medium mb-1">ราคาต้นทุน</label>
              <input
                type="number"
                name="cost"
                placeholder="0"
                value={formData.cost}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* Price */}
            <div>
              <label className="block text-blue-500 font-medium mb-1">ราคาขาย</label>
              <input
                type="number"
                name="price"
                placeholder="0"
                value={formData.price}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Profit */}
            <div>
              <label className="block text-blue-500 font-medium mb-1">กำไรต่อชิ้น</label>
              <input
                type="number"
                name="profit"
                value={profit}
                className="input input-bordered w-full"
                disabled
              />
            </div>
            {/* Loss */}
            <div>
              <label className="block text-blue-500 font-medium mb-1">ขาดทุนต่อชิ้น</label>
              <input
                type="number"
                name="loss"
                value={loss}
                className="input input-bordered w-full"
                disabled
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn bg-gradient-to-r from-pink-500 to-purple-500 text-white w-full mt-4"
          >
            เพิ่มสินค้า
          </button>
        </form>
      </div>
    </div>
  );
}

export default StatusForm;
