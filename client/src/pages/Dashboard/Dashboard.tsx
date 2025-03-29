import { useAuth } from "@context/AuthContext";
import axios from "axios";
import React, { useState, useEffect } from "react";

// Kiểu dữ liệu User
type User = {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
};

const role = ["user", "admin"];
const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<any>([]);
  console.log("CHECK USERS", users);
  const [roles, setRole] = useState<string>("");
  console.log("CHECK ROLE", roles);
  const [id, setId] = useState<number>();
  console.log("CHECK ID", id);
  const handleRoleChange = async (id: number, roles: string) => {
    setId(id);

    setRole(roles);
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/users");

      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleUpdate = async () => {
    const response = await axios.post(
      "http://localhost:8080/api/admin/updateusers",
      { roles, id },
    );
    console.log("CHECK updated role", response.data);
    if (response.status === 200) {
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Quản lý phân quyền người dùng
      </h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ccc",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={thStyle}>Họ tên</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Vai trò</th>
            <th style={thStyle}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  style={{ padding: "4px" }}
                >
                  {role.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
              <td style={tdStyle}>
                <button
                  onClick={handleUpdate}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cập nhật
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Style cho table
const thStyle: React.CSSProperties = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "1px solid #ccc",
};

const tdStyle: React.CSSProperties = {
  padding: "10px",
};

export default Dashboard;
