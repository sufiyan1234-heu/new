import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [categories, setCategories] = useState([]);

  const register = (name, email, password) => {
    const newUser = { name, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
    } else {
      alert("No user found with this email. Please register first.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const addCategory = (name, description) => {
    setCategories([...categories, { id: Date.now(), name, description }]);
  };

  const editCategory = (id, updatedCategory) => {
    setCategories(categories.map((cat) => (cat.id === id ? updatedCategory : cat)));
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        categories,
        addCategory,
        editCategory,
        deleteCategory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
