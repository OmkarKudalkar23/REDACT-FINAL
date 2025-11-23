import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiSend,
  FiCreditCard,
  FiTrendingUp,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { MdOutlinePayments } from "react-icons/md";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: FiHome },
    { name: "Send Money", path: "/send-money", icon: FiSend },
    { name: "Transactions", path: "/transactions", icon: FiFileText },
    { name: "Bills & Payments", path: "/bills", icon: MdOutlinePayments },
    { name: "Cards", path: "/cards", icon: FiCreditCard },
    { name: "Investments", path: "/investments", icon: FiTrendingUp },
    { name: "Settings", path: "/settings", icon: FiSettings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-blue-950 to-black border-r border-blue-900/30 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img src="/img/logo.png" alt="BankHub" className="w-10 h-10" />
            <span className="text-xl font-bold text-blue-50">BankHub</span>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-blue-100 hover:bg-blue-900/30 hover:text-blue-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-all duration-300">
            <FiLogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-gradient-to-r from-blue-950 to-black border-b border-blue-900/30 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-blue-50 hover:text-blue-75 transition-colors"
          >
            {sidebarOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>

          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-xl font-bold text-blue-50">BankHub</h1>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <p className="text-sm font-medium text-blue-50">John Doe</p>
              <p className="text-xs text-blue-200">Premium Member</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
              JD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-black">
          <div className="p-6">{children}</div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
