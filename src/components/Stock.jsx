import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import db from "../firebase";

function Stock() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      alert("ลบสินค้าสำเร็จ!");
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
      alert("เกิดข้อผิดพลาดในการลบสินค้า!");
    }
  };

  // Handle edit product
  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setUpdatedData({ ...product });
  };

  // Handle save after editing
  const handleSave = async (id) => {
    try {
      await updateDoc(doc(db, "products", id), updatedData);
      alert("แก้ไขสินค้าสำเร็จ!");
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, ...updatedData } : product
        )
      );
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product: ", error);
      alert("เกิดข้อผิดพลาดในการแก้ไขสินค้า!");
    }
  };

  // Handle input changes in editing mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-200">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-8 w-full max-w-[900px] overflow-x-auto">
        <h1 className="text-center text-3xl font-bold text-pink-500 mb-6">STOCK</h1>
        <table className="table-auto w-full border-collapse border border-black">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm">รหัสสินค้า</th>
              <th className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm">ชื่อสินค้า</th>
              <th className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm hidden md:table-cell">
                วันที่นำเข้า
              </th>
              <th className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm">จำนวนสินค้า</th>
              <th className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm">คงเหลือ</th>
              <th className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm hidden md:table-cell">
                ราคาสินค้า
              </th>
              <th className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm">แก้ไข</th>
              <th className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm">ลบ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm">
                  {editingProduct === product.id ? (
                    <input
                      type="text"
                      name="productCode"
                      value={updatedData.productCode}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    product.productCode
                  )}
                </td>
                <td className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm">
                  {editingProduct === product.id ? (
                    <input
                      type="text"
                      name="productName"
                      value={updatedData.productName}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    product.productName
                  )}
                </td>
                <td className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm hidden md:table-cell">
                  {editingProduct === product.id ? (
                    <input
                      type="date"
                      name="importDate"
                      value={updatedData.importDate}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    product.importDate
                  )}
                </td>
                <td className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm">
                  {editingProduct === product.id ? (
                    <input
                      type="number"
                      name="stock"
                      value={updatedData.stock}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    product.stock
                  )}
                </td>
                <td className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm">
                  {product.remaining}
                </td>
                <td className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm hidden md:table-cell">
                  {editingProduct === product.id ? (
                    <input
                      type="number"
                      name="price"
                      value={updatedData.price}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm">
                  {editingProduct === product.id ? (
                    <button
                      onClick={() => handleSave(product.id)}
                      className="btn bg-green-500 text-white"
                    >
                      บันทึก
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(product)}
                      className="btn bg-yellow-500 text-white"
                    >
                      แก้ไข
                    </button>
                  )}
                </td>
                <td className="border border-black px-2 sm:px-4 py-2 text-xs sm:text-sm">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn bg-red-500 text-white"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Stock;
