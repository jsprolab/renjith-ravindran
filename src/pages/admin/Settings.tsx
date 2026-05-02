import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  AiOutlineLoading3Quarters,
  AiOutlineUser,
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEdit,
  AiOutlineClose,
} from 'react-icons/ai';
import { AdminLayout } from './AdminLayout';

interface AdminUser {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'super_admin';
  lastLogin: string | null;
  createdAt: string;
}

type FormData = { username: string; email: string; password: string; role: 'admin' | 'super_admin' };
const emptyForm: FormData = { username: '', email: '', password: '', role: 'admin' };

interface UserFormProps {
  title: string;
  form: FormData;
  onChange: (f: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitting: boolean;
  submitLabel: string;
  passwordRequired?: boolean;
}

const UserForm = ({ title, form, onChange, onSubmit, onCancel, submitting, submitLabel, passwordRequired = true }: UserFormProps) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <div className="relative">
          <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            required
            minLength={3}
            value={form.username}
            onChange={(e) => onChange({ ...form, username: e.target.value })}
            className="pl-9 pr-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="username"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => onChange({ ...form, email: e.target.value })}
            className="pl-9 pr-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="admin@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password {!passwordRequired && <span className="text-gray-400 font-normal">(leave blank to keep current)</span>}
        </label>
        <div className="relative">
          <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="password"
            required={passwordRequired}
            minLength={passwordRequired ? 6 : undefined}
            value={form.password}
            onChange={(e) => onChange({ ...form, password: e.target.value })}
            className="pl-9 pr-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder={passwordRequired ? 'Min 6 characters' : 'Leave blank to keep current'}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select
          value={form.role}
          onChange={(e) => onChange({ ...form, role: e.target.value as 'admin' | 'super_admin' })}
          className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="admin">Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>
      </div>

      <div className="md:col-span-2 flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting && <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />}
          {submitLabel}
        </button>
      </div>
    </form>
  </div>
);

export const AdminSettings = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [addForm, setAddForm] = useState<FormData>(emptyForm);
  const [editForm, setEditForm] = useState<FormData>(emptyForm);
  const [adminUser, setAdminUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    if (!token || !user) { navigate('/admin'); return; }
    setAdminUser(JSON.parse(user));
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) setUsers(result.data);
      else toast.error(result.message || 'Failed to fetch users');
    } catch {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(addForm),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('User added successfully');
        setUsers([result.data, ...users]);
        setAddForm(emptyForm);
        setShowAddForm(false);
      } else {
        toast.error(result.message || 'Failed to add user');
      }
    } catch {
      toast.error('Failed to add user');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditForm = (user: AdminUser) => {
    setEditingUser(user);
    setEditForm({ username: user.username, email: user.email, password: '', role: user.role });
    setShowAddForm(false);
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setSubmitting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const payload: any = { id: editingUser._id, username: editForm.username, email: editForm.email, role: editForm.role };
      if (editForm.password) payload.password = editForm.password;

      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('User updated successfully');
        setUsers(users.map((u) => (u._id === editingUser._id ? result.data : u)));
        setEditingUser(null);
      } else {
        toast.error(result.message || 'Failed to update user');
      }
    } catch {
      toast.error('Failed to update user');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string, username: string) => {
    if (!window.confirm(`Delete user "${username}"? This cannot be undone.`)) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('User deleted');
        setUsers(users.filter((u) => u._id !== id));
        if (editingUser?._id === id) setEditingUser(null);
      } else {
        toast.error(result.message || 'Failed to delete user');
      }
    } catch {
      toast.error('Failed to delete user');
    }
  };

  return (
    <AdminLayout adminUser={adminUser}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-500 mt-1">Manage admin users</p>
          </div>
          <button
            onClick={() => { setShowAddForm(!showAddForm); setEditingUser(null); }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            {showAddForm ? <AiOutlineClose className="h-4 w-4" /> : <AiOutlinePlus className="h-4 w-4" />}
            {showAddForm ? 'Cancel' : 'Add User'}
          </button>
        </div>

        {/* Add User Form */}
        {showAddForm && (
          <UserForm
            title="New Admin User"
            form={addForm}
            onChange={setAddForm}
            onSubmit={handleAddUser}
            onCancel={() => { setShowAddForm(false); setAddForm(emptyForm); }}
            submitting={submitting}
            submitLabel="Create User"
            passwordRequired
          />
        )}

        {/* Edit User Form */}
        {editingUser && (
          <UserForm
            title={`Edit User — ${editingUser.username}`}
            form={editForm}
            onChange={setEditForm}
            onSubmit={handleEditUser}
            onCancel={() => setEditingUser(null)}
            submitting={submitting}
            submitLabel="Save Changes"
            passwordRequired={false}
          />
        )}

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Admin Users ({users.length})</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin text-blue-600" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-sm">No users found</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className={`hover:bg-gray-50 ${editingUser?._id === user._id ? 'bg-blue-50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <AiOutlineUser className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.username}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'super_admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => editingUser?._id === user._id ? setEditingUser(null) : openEditForm(user)}
                          className={`p-2 transition-colors ${editingUser?._id === user._id ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}
                          title="Edit user"
                        >
                          <AiOutlineEdit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id, user.username)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete user"
                        >
                          <AiOutlineDelete className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
