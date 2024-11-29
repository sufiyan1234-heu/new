import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout, categories, addCategory, editCategory, deleteCategory } = useAuth();
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const handleAddCategory = () => {
    if (!categoryName.trim() || !description.trim()) {
      setError("Both Category Name and Description are required.");
      return;
    }

    if (editId) {
      editCategory(editId, { id: editId, name: categoryName, description });
      setEditId(null);
    } else {

      addCategory(categoryName, description);
    }
    setCategoryName("");
    setDescription("");
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome, <span className="text-blue-600">{user.name}</span>
      </h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 mb-6"
      >
        Logout
      </button>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Categories</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddCategory}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {editId ? "Update Category" : "Add Category"}
          </button>
        </div>
      </div>

      <ul className="space-y-4">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex justify-between items-center bg-gray-100 shadow-md rounded-lg p-4"
          >
            <div>
              <strong className="text-lg text-gray-800">{cat.name}</strong>
              <p className="text-gray-600">{cat.description}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setEditId(cat.id);
                  setCategoryName(cat.name);
                  setDescription(cat.description);
                }}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCategory(cat.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
