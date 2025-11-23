import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NavBar from "../components/Navbar";
import FooterEnhanced from "../components/FooterEnhanced";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(useGSAP);

const TransactionsEnhancedV2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [transactions] = useState([
    { id: 1, name: "Amazon Purchase", category: "Shopping", amount: -89.99, date: "2024-01-15", merchant: "Amazon.com", icon: "🛍️" },
    { id: 2, name: "Salary Deposit", category: "Income", amount: 5000, date: "2024-01-14", merchant: "Employer Inc", icon: "💰" },
    { id: 3, name: "Netflix Subscription", category: "Entertainment", amount: -15.99, date: "2024-01-13", merchant: "Netflix", icon: "🎬" },
    { id: 4, name: "Transfer to John", category: "Transfer", amount: -500, date: "2024-01-12", merchant: "John Doe", icon: "👤" },
    { id: 5, name: "Starbucks Coffee", category: "Food & Drink", amount: -5.45, date: "2024-01-11", merchant: "Starbucks", icon: "☕" },
    { id: 6, name: "Gym Membership", category: "Health", amount: -49.99, date: "2024-01-10", merchant: "FitLife Gym", icon: "💪" },
    { id: 7, name: "Bonus Payment", category: "Income", amount: 2500, date: "2024-01-09", merchant: "TechCorp Inc", icon: "🎁" },
    { id: 8, name: "Electric Bill", category: "Utilities", amount: -145.32, date: "2024-01-08", merchant: "City Power", icon: "⚡" },
  ]);

  // Category breakdown
  const categoryBreakdown = [
    { name: "Shopping", amount: 89.99, percentage: 25, color: "#3B82F6" },
    { name: "Entertainment", amount: 15.99, percentage: 5, color: "#8B5CF6" },
    { name: "Food & Drink", amount: 5.45, percentage: 2, color: "#EC4899" },
    { name: "Health", amount: 49.99, percentage: 14, color: "#EF4444" },
    { name: "Utilities", amount: 145.32, percentage: 41, color: "#F59E0B" },
    { name: "Transfer", amount: 500, percentage: 13, color: "#06B6D4" },
  ];

  useGSAP(() => {
    // Hero content animation
    gsap.from(".transactions-hero-content", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
    });

    // Transaction items animation
    gsap.from(".transaction-item", {
      opacity: 0,
      x: -20,
      duration: 0.4,
      stagger: 0.06,
      ease: "power2.out",
      delay: 0.1,
    });

    // Chart elements animation - fade in only
    gsap.from(".chart-element", {
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.2,
    });

    // Animate bar chart width - set initial width
    gsap.set(".category-bar", { width: 0 });
    gsap.to(".category-bar", {
      width: (index) => {
        return categoryBreakdown[index].percentage + "%";
      },
      duration: 1.2,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.3,
    });
  });

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
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      <NavBar />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10" />

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="relative px-5 sm:px-10 py-20">
          <div className="transactions-hero-content max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
                Transaction History
              </p>
              <h1 className="special-font font-zentry font-black text-5xl text-blue-50 mb-4">
                Your <b>Transactions</b>
              </h1>
              <p className="font-circular-web text-blue-200 max-w-2xl">
                Track all your financial activities with detailed insights and analytics
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="transaction-item group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-green-900/20 to-green-900/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <p className="font-circular-web text-white text-sm mb-2">
                    Total Income
                  </p>
                  <p className="special-font font-zentry font-black text-3xl text-green-400">
                    +${totalIncome.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="transaction-item group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-red-900/20 to-red-900/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <p className="font-circular-web text-white text-sm mb-2">
                    Total Expenses
                  </p>
                  <p className="special-font font-zentry font-black text-3xl text-red-400">
                    -${totalExpense.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="transaction-item group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-blue-900/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <p className="font-circular-web text-white text-sm mb-2">
                    Net Balance
                  </p>
                  <p className="special-font font-zentry font-black text-3xl text-yellow-300">
                    ${(totalIncome - totalExpense).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {/* Pie Chart */}
              <div className="chart-element transaction-item group relative overflow-hidden border-hsla rounded-lg p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <h3 className="special-font font-zentry font-black text-xl text-blue-50 mb-6">
                    Spending by Category
                  </h3>
                  <div className="flex items-center justify-between">
                    {/* Pie Chart */}
                    <div className="w-48 h-48">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {categoryBreakdown.map((item, index) => {
                          const startAngle = categoryBreakdown.slice(0, index).reduce((sum, d) => sum + (d.percentage / 100) * 360, 0);
                          const circumference = 2 * Math.PI * 45;
                          const strokeDashoffset = circumference;
                          const strokeDasharray = (item.percentage / 100) * circumference;
                          
                          return (
                            <circle
                              key={index}
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke={item.color}
                              strokeWidth="10"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              strokeLinecap="round"
                              transform={`rotate(${startAngle} 50 50)`}
                              className="pie-segment-trans"
                              style={{
                                filter: `drop-shadow(0 0 10px ${item.color}40)`,
                              }}
                            />
                          );
                        })}
                      </svg>
                    </div>

                    {/* Legend */}
                    <div className="space-y-2 flex-1 ml-6">
                      {categoryBreakdown.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-blue-200 font-circular-web">
                            {item.name}: {item.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="chart-element transaction-item group relative overflow-hidden border-hsla rounded-lg p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <h3 className="special-font font-zentry font-black text-xl text-blue-50 mb-6">
                    Expense Distribution
                  </h3>
                  <div className="space-y-4">
                    {categoryBreakdown.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-blue-200 font-circular-web">{item.name}</span>
                          <span className="text-sm text-blue-300 font-bold">${item.amount.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-blue-900/30 rounded-full h-2 overflow-hidden">
                          <div
                            className="category-bar h-full rounded-full transition-all duration-500"
                            style={{
                              background: `linear-gradient(to right, ${item.color}, ${item.color}80)`,
                              boxShadow: `0 0 10px ${item.color}40`,
                              width: 0,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-12 space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg pl-6 pr-6 py-4 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all font-circular-web"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-4">
                {[
                  { id: "all", label: "All Transactions" },
                  { id: "income", label: "Income" },
                  { id: "expense", label: "Expenses" },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setFilterType(filter.id)}
                    className={`px-8 py-3 md:px-10 md:py-4 rounded-lg font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 ${
                      filterType === filter.id
                        ? "bg-yellow-300 text-black shadow-lg shadow-yellow-300/50"
                        : "border-hsla border-2 bg-blue-900/20 text-blue-50 hover:bg-blue-900/40 hover:border-yellow-300"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Transactions List */}
            <div className="space-y-4">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="transaction-item group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-r from-blue-900/10 to-purple-900/10 backdrop-blur-sm hover:from-blue-900/20 hover:to-purple-900/20 transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

                    {/* Content */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{transaction.icon}</div>
                        <div>
                          <p className="text-blue-50 font-bold">{transaction.name}</p>
                          <p className="text-blue-300 text-sm font-circular-web">
                            {transaction.merchant} • {transaction.date}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            transaction.amount > 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}{transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-blue-300 text-sm font-circular-web">
                          {transaction.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-blue-300 font-circular-web">No transactions found</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <FooterEnhanced />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-75/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
    </div>
  );
};

export default TransactionsEnhancedV2;
