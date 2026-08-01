import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import moment from 'moment';
import DashboardLayout from '../layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuTrash2, LuUsers, LuTrendingUp, LuTrendingDown } from 'react-icons/lu';

export default function AdminDashboard() {
  useUserAuth();

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes] = await Promise.all([
        axiosInstance.get(API_PATHS.ADMIN.GET_STATS),
        axiosInstance.get(API_PATHS.ADMIN.GET_ALL_USERS),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`Delete ${name}? This also removes their transactions.`)) return;
    try {
      await axiosInstance.delete(API_PATHS.ADMIN.DELETE_USER(id));
      toast.success("User deleted");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <DashboardLayout activeMenu="Admin">
      <div className="my-5 mx-auto">
        <h2 className="text-lg text-slate-100 mb-4">Admin Dashboard</h2>

        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : (
          <>
            {/* platform statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800/60">
                <div className="flex items-center gap-2 text-slate-400 text-sm"><LuUsers /> Total Users</div>
                <p className="text-2xl text-slate-100 mt-2">{stats?.totalUsers ?? 0}</p>
              </div>
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800/60">
                <div className="flex items-center gap-2 text-slate-400 text-sm"><LuTrendingUp /> Total Income (all users)</div>
                <p className="text-2xl text-slate-100 mt-2">£{stats?.totalIncomeAllUsers ?? 0}</p>
              </div>
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800/60">
                <div className="flex items-center gap-2 text-slate-400 text-sm"><LuTrendingDown /> Total Expense (all users)</div>
                <p className="text-2xl text-slate-100 mt-2">£{stats?.totalExpenseAllUsers ?? 0}</p>
              </div>
            </div>

            {/* list of users n deletion*/}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800/60">
              <h5 className="text-lg text-slate-100 mb-4">Registered Users</h5>
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Email</th>
                    <th className="pb-2">Role</th>
                    <th className="pb-2">Joined</th>
                    <th className="pb-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-b border-slate-800/50 text-slate-200">
                      <td className="py-2">{u.fullName}</td>
                      <td className="py-2">{u.email}</td>
                      <td className="py-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-teal-400/20 text-teal-400' : 'bg-slate-800 text-slate-400'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-2">{moment(u.createdAt).format("Do MMM YYYY")}</td>
                      <td className="py-2 text-right">
                        <button onClick={() => handleDeleteUser(u._id, u.fullName)}
                          className="text-slate-400 hover:text-red-400">
                          <LuTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

