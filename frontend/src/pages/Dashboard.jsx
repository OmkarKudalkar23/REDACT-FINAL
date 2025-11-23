import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import {
  FiSend,
  FiCreditCard,
  FiTrendingUp,
  FiEye,
  FiEyeOff,
  FiArrowUpRight,
  FiArrowDownLeft,
} from "react-icons/fi";
import { MdOutlinePayments } from "react-icons/md";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState("primary");

  const accounts = [
    {
      id: "primary",
      name: "Savings Account",
      balance: 45250.75,
      accountNumber: "****2847",
      type: "Savings",
    },
    {
      id: "checking",
      name: "Checking Account",
      balance: 12340.5,
      accountNumber: "****5921",
      type: "Checking",
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      name: "Amazon Purchase",
      amount: -89.99,
      date: "Today",
      icon: "🛍️",
    },
    {
      id: 2,
      name: "Salary Deposit",
      amount: 5000,
      date: "Yesterday",
      icon: "💰",
    },
    {
      id: 3,
      name: "Netflix Subscription",
      amount: -15.99,
      date: "2 days ago",
      icon: "🎬",
    },
    {
      id: 4,
      name: "Transfer to John",
      amount: -500,
      date: "3 days ago",
      icon: "👤",
    },
  ];

  const quickActions = [
    {
      name: "Send Money",
      path: "/send-money",
      icon: FiSend,
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "Pay Bills",
      path: "/bills",
      icon: MdOutlinePayments,
      color: "from-purple-600 to-purple-700",
    },
    {
      name: "Cards",
      path: "/cards",
      icon: FiCreditCard,
      color: "from-green-600 to-green-700",
    },
    {
      name: "Invest",
      path: "/investments",
      icon: FiTrendingUp,
      color: "from-orange-600 to-orange-700",
    },
  ];

  const currentAccount = accounts.find((acc) => acc.id === selectedAccount);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-blue-50 mb-2">
            Welcome back, John!
          </h1>
          <p className="text-blue-200">
            Manage your finances with ease and security
          </p>
        </div>

        {/* Account Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Primary Account Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-lg shadow-blue-600/20">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-blue-100 text-sm mb-1">Account Type</p>
                <p className="text-lg font-semibold">{currentAccount.type}</p>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
              >
                {showBalance ? (
                  <FiEye className="w-5 h-5" />
                ) : (
                  <FiEyeOff className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="mb-8">
              <p className="text-blue-100 text-sm mb-2">Total Balance</p>
              <p className="text-4xl font-bold">
                {showBalance ? `$${currentAccount.balance.toFixed(2)}` : "••••••"}
              </p>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-blue-100 text-xs mb-1">Account Number</p>
                <p className="text-lg font-mono">{currentAccount.accountNumber}</p>
              </div>
              <img src="/img/logo.png" alt="BankHub" className="w-12 h-12" />
            </div>
          </div>

          {/* Secondary Account Card */}
          {accounts.length > 1 && (
            <div
              onClick={() => setSelectedAccount("checking")}
              className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 text-white shadow-lg cursor-pointer hover:shadow-xl hover:shadow-gray-600/20 transition-all"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <p className="text-gray-300 text-sm mb-1">Account Type</p>
                  <p className="text-lg font-semibold">
                    {accounts[1].type}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-gray-300 text-sm mb-2">Total Balance</p>
                <p className="text-4xl font-bold">
                  ${accounts[1].balance.toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-gray-300 text-xs mb-1">Account Number</p>
                  <p className="text-lg font-mono">{accounts[1].accountNumber}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-blue-50 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.path}
                  to={action.path}
                  className={`bg-gradient-to-br ${action.color} rounded-xl p-6 text-white hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300 transform hover:scale-105`}
                >
                  <Icon className="w-8 h-8 mb-3" />
                  <p className="font-semibold text-sm">{action.name}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-50">
              Recent Transactions
            </h2>
            <Link
              to="/transactions"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 border border-blue-900/20 rounded-lg p-4 flex items-center justify-between hover:border-blue-900/40 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{transaction.icon}</div>
                  <div>
                    <p className="text-blue-50 font-medium">{transaction.name}</p>
                    <p className="text-blue-300 text-sm">{transaction.date}</p>
                  </div>
                </div>

                <div
                  className={`text-lg font-bold ${
                    transaction.amount > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  ${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-900/20 to-green-900/10 border border-green-900/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm mb-1">Monthly Income</p>
                <p className="text-2xl font-bold text-green-400">$5,000.00</p>
              </div>
              <FiArrowDownLeft className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-900/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-200 text-sm mb-1">Monthly Expenses</p>
                <p className="text-2xl font-bold text-red-400">$1,250.50</p>
              </div>
              <FiArrowUpRight className="w-8 h-8 text-red-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-900/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm mb-1">Savings Rate</p>
                <p className="text-2xl font-bold text-blue-400">75%</p>
              </div>
              <FiTrendingUp className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
