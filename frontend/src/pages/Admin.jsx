import { useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { MdDashboard, MdPeople, MdAccountBalance, MdSettings } from "react-icons/md";

gsap.registerPlugin(useGSAP);

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useGSAP(() => {
    gsap.from(".admin-header", {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.from(".admin-card", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.2,
    });
  });

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <MdDashboard /> },
    { id: "users", label: "Users", icon: <MdPeople /> },
    { id: "accounts", label: "Accounts", icon: <MdAccountBalance /> },
    { id: "settings", label: "Settings", icon: <MdSettings /> },
  ];

  const stats = [
    { label: "Total Users", value: "12,543", change: "+2.5%" },
    { label: "Active Accounts", value: "8,234", change: "+1.2%" },
    { label: "Total Transactions", value: "45,678", change: "+5.8%" },
    { label: "Revenue", value: "$234,567", change: "+3.4%" },
  ];

  const recentTransactions = [
    { id: 1, user: "John Doe", amount: "$1,234", type: "Transfer", status: "Completed" },
    { id: 2, user: "Jane Smith", amount: "$567", type: "Deposit", status: "Pending" },
    { id: 3, user: "Mike Johnson", amount: "$2,345", type: "Withdrawal", status: "Completed" },
    { id: 4, user: "Sarah Williams", amount: "$890", type: "Transfer", status: "Failed" },
  ];

  return (
    <div className="relative min-h-screen w-screen bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-violet-900/20" />

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-blue-950/40 border-r border-blue-75/20 transition-all duration-300 z-40 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-75/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-75 to-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            {sidebarOpen && <span className="text-blue-50 font-bold">BankHub</span>}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-blue-75/30 text-blue-75 border border-blue-75/50"
                  : "text-blue-100 hover:bg-blue-900/20"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-all duration-300">
            <FiLogOut className="text-xl" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Header */}
        <div className="admin-header sticky top-0 z-30 bg-blue-950/40 border-b border-blue-75/20 backdrop-blur-sm">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-blue-50 hover:text-blue-75 transition-colors"
              >
                {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
              <h1 className="text-2xl font-bold text-blue-50">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-75 to-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="admin-card bg-blue-900/20 border border-blue-75/30 rounded-lg p-6 hover:border-blue-75/60 transition-all duration-300"
                  >
                    <p className="text-blue-100 text-sm mb-2">{stat.label}</p>
                    <h3 className="text-3xl font-bold text-blue-50 mb-2">{stat.value}</h3>
                    <p className="text-green-400 text-sm">{stat.change} from last month</p>
                  </div>
                ))}
              </div>

              {/* Recent Transactions */}
              <div className="admin-card bg-blue-900/20 border border-blue-75/30 rounded-lg p-6">
                <h2 className="text-xl font-bold text-blue-50 mb-6">Recent Transactions</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-75/20">
                        <th className="text-left py-3 px-4 text-blue-100 font-semibold">User</th>
                        <th className="text-left py-3 px-4 text-blue-100 font-semibold">Amount</th>
                        <th className="text-left py-3 px-4 text-blue-100 font-semibold">Type</th>
                        <th className="text-left py-3 px-4 text-blue-100 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-blue-75/10 hover:bg-blue-900/20 transition-colors">
                          <td className="py-3 px-4 text-blue-50">{transaction.user}</td>
                          <td className="py-3 px-4 text-blue-50 font-semibold">{transaction.amount}</td>
                          <td className="py-3 px-4 text-blue-100">{transaction.type}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                transaction.status === "Completed"
                                  ? "bg-green-900/30 text-green-400"
                                  : transaction.status === "Pending"
                                  ? "bg-yellow-900/30 text-yellow-400"
                                  : "bg-red-900/30 text-red-400"
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="admin-card bg-blue-900/20 border border-blue-75/30 rounded-lg p-6">
              <h2 className="text-xl font-bold text-blue-50 mb-4">Users Management</h2>
              <p className="text-blue-100">User management interface coming soon...</p>
            </div>
          )}

          {/* Accounts Tab */}
          {activeTab === "accounts" && (
            <div className="admin-card bg-blue-900/20 border border-blue-75/30 rounded-lg p-6">
              <h2 className="text-xl font-bold text-blue-50 mb-4">Accounts Management</h2>
              <p className="text-blue-100">Accounts management interface coming soon...</p>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="admin-card bg-blue-900/20 border border-blue-75/30 rounded-lg p-6">
              <h2 className="text-xl font-bold text-blue-50 mb-4">Settings</h2>
              <p className="text-blue-100">Settings interface coming soon...</p>
            </div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-75/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
    </div>
  );
};

export default Admin;
