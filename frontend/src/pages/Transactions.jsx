import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { FiSearch, FiFilter, FiDownload } from "react-icons/fi";

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const [transactions] = useState([
    {
      id: 1,
      name: "Amazon Purchase",
      category: "Shopping",
      amount: -89.99,
      date: "2024-01-15",
      status: "Completed",
      merchant: "Amazon.com",
      icon: "🛍️",
    },
    {
      id: 2,
      name: "Salary Deposit",
      category: "Income",
      amount: 5000,
      date: "2024-01-14",
      status: "Completed",
      merchant: "Employer Inc",
      icon: "💰",
    },
    {
      id: 3,
      name: "Netflix Subscription",
      category: "Entertainment",
      amount: -15.99,
      date: "2024-01-13",
      status: "Completed",
      merchant: "Netflix",
      icon: "🎬",
    },
    {
      id: 4,
      name: "Transfer to John",
      category: "Transfer",
      amount: -500,
      date: "2024-01-12",
      status: "Completed",
      merchant: "John Doe",
      icon: "👤",
    },
    {
      id: 5,
      name: "Starbucks Coffee",
      category: "Food & Drink",
      amount: -5.45,
      date: "2024-01-11",
      status: "Completed",
      merchant: "Starbucks",
      icon: "☕",
    },
    {
      id: 6,
      name: "Gym Membership",
      category: "Health",
      amount: -49.99,
      date: "2024-01-10",
      status: "Completed",
      merchant: "FitLife Gym",
      icon: "💪",
    },
    {
      id: 7,
      name: "Gas Station",
      category: "Transport",
      amount: -45.0,
      date: "2024-01-09",
      status: "Completed",
      merchant: "Shell Gas",
      icon: "⛽",
    },
    {
      id: 8,
      name: "Freelance Payment",
      category: "Income",
      amount: 1200,
      date: "2024-01-08",
      status: "Completed",
      merchant: "Client Project",
      icon: "💻",
    },
  ]);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" ||
      (filterType === "income" && transaction.amount > 0) ||
      (filterType === "expense" && transaction.amount < 0);

    return matchesSearch && matchesType;
  });

  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-50 mb-2">Transactions</h1>
          <p className="text-blue-200">View and manage all your transactions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-900/30 rounded-xl p-6">
            <p className="text-blue-200 text-sm mb-2">Total Transactions</p>
            <p className="text-3xl font-bold text-blue-50">
              {transactions.length}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-green-900/10 border border-green-900/30 rounded-xl p-6">
            <p className="text-green-200 text-sm mb-2">Total Income</p>
            <p className="text-3xl font-bold text-green-400">
              +${totalIncome.toFixed(2)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-900/30 rounded-xl p-6">
            <p className="text-red-200 text-sm mb-2">Total Expenses</p>
            <p className="text-3xl font-bold text-red-400">
              -${totalExpense.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg pl-12 pr-4 py-3 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterType === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-900/20 text-blue-200 hover:bg-blue-900/40"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("income")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterType === "income"
                  ? "bg-green-600 text-white"
                  : "bg-blue-900/20 text-blue-200 hover:bg-blue-900/40"
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setFilterType("expense")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterType === "expense"
                  ? "bg-red-600 text-white"
                  : "bg-blue-900/20 text-blue-200 hover:bg-blue-900/40"
              }`}
            >
              Expenses
            </button>

            <button className="ml-auto px-4 py-2 rounded-lg font-medium bg-blue-900/20 text-blue-200 hover:bg-blue-900/40 transition-all flex items-center gap-2">
              <FiDownload className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 border border-blue-900/20 rounded-lg p-4 hover:border-blue-900/40 hover:shadow-lg hover:shadow-blue-600/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{transaction.icon}</div>
                    <div className="flex-1">
                      <p className="text-blue-50 font-semibold">
                        {transaction.name}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-blue-300 text-sm">
                          {transaction.merchant}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-900/30 text-blue-300">
                          {transaction.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        transaction.amount > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-blue-300 text-sm">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-blue-300 text-lg">No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
