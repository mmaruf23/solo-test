import Sidebar from "@/components/organism/Sidebar";
import { deleteUser, getAllUsers, getUsersByRole, updateRole } from "@/services/user";
import { useEffect, useRef, useState } from "react";

export default function UserPage() {

  const [users, setUsers] = useState();
  const [selectUser, setSelectUser] = useState();
  const selectRef = useRef();


  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const response = await getAllUsers();
    if (response.status) {
      setUsers(response.data.content);
    } else {
      console.log(response.message);
    }
  }

  async function handleDelete(username) {
    const response = await deleteUser(username);
    if (response.status) {
      getUsers();
    } else {
      console.log(response.message);

    }
  }

  async function handleUpdate(username, oldRole, newRole) {
    if (newRole == oldRole) {
      console.log("gak jadi update");

      setSelectUser(false);
      return;
    };


    const response = await updateRole(username, newRole);
    if (response.status) {
      getUsers();
      setSelectUser(false);
    } else {
      console.log(response.message);
      setSelectUser(false);
    }
  }

  async function handleChange(role) {
    if (!role) {
      getUsers();
      return;
    }
    const response = await getUsersByRole(role);
    if (response.status) {
      setUsers(response.data.content);
    } else {
      console.log(response.message);

    }

  }


  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 bg-gray-100 min-h-screen flex-grow">
        <h2 className="text-2xl font-bold mb-4">Manajemen Pengguna</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="role" className="text-gray-700 font-semibold">
            Filter Role
          </label>
          <select
            onChange={(e) => handleChange(e.target.value)}
            name="role"
            id="role"
            className="p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">ALL</option>
            <option value="ADMIN">Admin</option>
            <option value="CUSTOMER">Customer</option>
          </select>
        </div>

        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Nama</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4"><span className="rounded bg-green-500 text-white py-1 px-3">Role</span></th>
              <th className="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">
                  <button onClick={() => setSelectUser(user)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                  <button onClick={() => handleDelete(user.username)} className="bg-red-500 text-white px-3 py-1 rounded">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectUser &&
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Update Role {selectUser.name}</h2>
          <div className="space-y-3">
            <select
              ref={selectRef}
              name="role"
              id="role"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              defaultValue={selectUser.role}
            >
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            <button onClick={() => handleUpdate(selectUser.username, selectUser.role, selectRef.current.value)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Simpan
            </button>
          </div>
        </div>
      }

    </div>
  );
};
