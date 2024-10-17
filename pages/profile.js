import React, { useEffect, useState } from 'react';
import { supabase } from "../lib/initSupabase";
import Layout from "../components/Layout";

const Profile = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    if (user.email === 'admin@admin.com') {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users'); // Rota da API criada
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
      });
      if (error) throw error;
      alert('User added successfully');
      fetchUsers(); // Atualiza a lista de usuários
    } catch (error) {
      alert(error.message);
    }
  };

  const editUser = async (userId) => {
    try {
      const { error } = await supabase.auth.api.updateUserById(userId, { email: editEmail });
      if (error) throw error;
      alert('User updated successfully');
      setEditingUser(null); // Finaliza a edição
      fetchUsers(); // Atualiza a lista de usuários
    } catch (error) {
      alert(error.message);
    }
  };

  const removeUser = async (user) => {
    try {
      // Chamada para a API de exclusão de usuário
      const { error } = await users.auth.deleteUser(user);
      
      // Verifica se ocorreu algum erro
      if (error) throw error;
      
      alert('User removed successfully');
      fetchUsers(); // Atualiza a lista de usuários
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout title={"Profile"}>
      <h1>Profile</h1>
      <p>Id: {user.id}</p>
      <p>Email: {user.email}</p>

      {user.email === 'admin@admin.com' ? (
        <>
          <h3>List of Users</h3>
          <ul>
            {users && users.length > 0 ? (
              users.map((user) => (
                <li key={user.id}>
                  {editingUser === user.id ? (
                    <>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder="Edit user email"
                      />
               
                    </>
                  ) : (
                    <>
                      {user.email}
                      <button onClick={() => {
                        setEditingUser(user.id);
                        setEditEmail(user.email);
                      }}>Edit</button>
                     
                    </>
                  )}
                </li>
              ))
            ) : (
              <li>No users found.</li>
            )}
          </ul>

          <h3>Add New User</h3>
          <input
            type="email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            placeholder="New user email"
          />
          <input
            type="password"
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
            placeholder="New user password"
          />
          <button onClick={addUser}>Add User</button>
        </>
      ) : (
        <p>Bem Vindo!</p>
      )}
    </Layout>
  );
};

export default Profile;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: '/login' } };
  }

  return { props: { user } };
}
