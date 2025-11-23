import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import NavBar from "../components/Navbar";
import FooterEnhanced from "../components/FooterEnhanced";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(ScrollTrigger);

const DashboardEnhancedV3 = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(0);
  const containerRef = useRef(null);

  const accounts = [
    { name: "Premium Checking", balance: 45250.75, type: "Checking", icon: "💳", accountNumber: "****5432", interestRate: "0.5%" },
    { name: "High-Yield Savings", balance: 125340.50, type: "Savings", icon: "💰", accountNumber: "****8765", interestRate: "4.5%" },
    { name: "Investment Account", balance: 287500.00, type: "Investment", icon: "📈", accountNumber: "****1234", interestRate: "Varies" },
  ];

  const recentTransactions = [
    { id: 1, name: "Apple Store", amount: -249.99, date: "Today, 2:45 PM", icon: "🛍️", category: "Shopping", merchant: "Apple Inc." },
    { id: 2, name: "Monthly Salary", amount: 8500.00, date: "Today, 9:00 AM", icon: "💼", category: "Income", merchant: "TechCorp Inc." },
    { id: 3, name: "Netflix Premium", amount: -19.99, date: "Yesterday, 11:30 PM", icon: "🎬", category: "Entertainment", merchant: "Netflix" },
    { id: 4, name: "Starbucks Coffee", amount: -5.45, date: "Yesterday, 8:15 AM", icon: "☕", category: "Food & Drink", merchant: "Starbucks" },
    { id: 5, name: "Gym Membership", amount: -79.99, date: "2 days ago", icon: "💪", category: "Health", merchant: "FitLife Gym" },
    { id: 6, name: "Electric Bill Payment", amount: -145.32, date: "2 days ago", icon: "⚡", category: "Utilities", merchant: "City Power Co." },
  ];

  const stats = [
    { label: "Monthly Spending", value: "$3,245.50", icon: "📊", color: "from-red-900/20", trend: "+12%" },
    { label: "Savings Rate", value: "38%", icon: "📈", color: "from-green-900/20", trend: "+2%" },
    { label: "Investments", value: "$287,500", icon: "💎", color: "from-purple-900/20", trend: "+8.5%" },
    { label: "Credit Score", value: "785", icon: "⭐", color: "from-yellow-900/20", trend: "+15pts" },
  ];

  // Chart data
  const spendingData = [
    { month: "Jan", amount: 2500, color: "#3B82F6" },
    { month: "Feb", amount: 2800, color: "#8B5CF6" },
    { month: "Mar", amount: 2200, color: "#EC4899" },
    { month: "Apr", amount: 3100, color: "#F59E0B" },
    { month: "May", amount: 2900, color: "#10B981" },
    { month: "Jun", amount: 3245, color: "#06B6D4" },
  ];

  const categoryData = [
    { category: "Shopping", percentage: 35, color: "#3B82F6" },
    { category: "Food", percentage: 20, color: "#10B981" },
    { category: "Entertainment", percentage: 15, color: "#8B5CF6" },
    { category: "Utilities", percentage: 18, color: "#F59E0B" },
    { category: "Health", percentage: 12, color: "#EF4444" },
  ];

  // Bank metrics
  const bankMetrics = [
    { label: "Account Health", value: "95%", color: "#10B981", icon: "💚" },
    { label: "Fraud Detection", value: "Active", color: "#3B82F6", icon: "🛡️" },
    { label: "Loan Eligibility", value: "$500K", color: "#F59E0B", icon: "📋" },
    { label: "Rewards Points", value: "12,450", color: "#EC4899", icon: "🎁" },
  ];

  // Customer insights
  const customerInsights = [
    { metric: "Account Age", value: "5 Years", icon: "📅" },
    { metric: "Transactions/Month", value: "24", icon: "📊" },
    { metric: "Average Balance", value: "$156,363", icon: "💰" },
    { metric: "Savings Goal", value: "On Track", icon: "🎯" },
  ];

  useGSAP(() => {
    // Hero content animation
    gsap.from(".dashboard-hero-content", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
    });

    // Card fade-in only (no fade-out)
    gsap.from(".dashboard-card", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.1,
    });

    // Animate chart bars - set initial height
    gsap.set(".chart-bar", { height: 0 });
    gsap.to(".chart-bar", {
      height: (index) => {
        const maxHeight = 200;
        const percentage = (spendingData[index].amount / 3500) * 100;
        return (percentage / 100) * maxHeight;
      },
      duration: 1.2,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.3,
    });

    // Animate metric bars - set initial width
    gsap.set(".metric-bar", { width: 0 });
    gsap.to(".metric-bar", {
      width: (index) => {
        return categoryData[index].percentage + "%";
      },
      duration: 1.2,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.3,
    });
  });

  const maxSpending = Math.max(...spendingData.map(d => d.amount));

  return (
    <div className="relative min-h-screen w-screen bg-black overflow-x-hidden">
      <NavBar />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10" />

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="relative h-auto px-5 sm:px-10 py-20">
          <div className="dashboard-hero-content max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
                Welcome Back
              </p>
              <h1 className="special-font font-zentry font-black text-5xl text-white mb-4">
                Your Financial <b>Dashboard</b>
              </h1>
              <p className="font-circular-web text-white max-w-2xl">
                Track your accounts, spending, investments, and banking metrics in one beautiful interface
              </p>
            </div>

            {/* Accounts Section */}
            <div className="mb-12">
              <h2 className="special-font font-zentry font-black text-2xl text-white mb-6">
                Your Accounts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {accounts.map((account, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedAccount(index)}
                    className={`dashboard-card group relative overflow-hidden border-hsla rounded-lg p-8 cursor-pointer transition-all duration-300 ${
                      selectedAccount === index
                        ? "bg-gradient-to-br from-yellow-900/30 to-yellow-900/10 border-yellow-300/50 scale-105"
                        : "bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-900/30 hover:border-yellow-300/30"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-4xl">{account.icon}</div>
                        <span className="text-xs font-bold text-green-400 bg-green-900/30 px-2 py-1 rounded">
                          Active
                        </span>
                      </div>
                      <p className="font-circular-web text-white text-sm mb-2">
                        {account.name}
                      </p>
                      <p className="special-font font-zentry font-black text-3xl text-white mb-4">
                        ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <div className="flex justify-between text-xs text-white/70">
                        <span>{account.accountNumber}</span>
                        <span>{account.interestRate} APY</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank Metrics */}
            <div className="mb-12">
              <h2 className="special-font font-zentry font-black text-2xl text-white mb-6">
                Bank Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {bankMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="dashboard-card group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <p className="text-2xl">{metric.icon}</p>
                        <span className="text-xs font-bold text-white bg-blue-900/30 px-2 py-1 rounded">
                          Live
                        </span>
                      </div>
                      <p className="font-circular-web text-white text-sm mb-2">
                        {metric.label}
                      </p>
                      <p className="special-font font-zentry font-black text-2xl text-white">
                        {metric.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {/* Spending Chart */}
              <div className="dashboard-card group relative overflow-hidden border-hsla rounded-lg p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <h3 className="special-font font-zentry font-black text-xl text-white mb-6">
                    Monthly Spending
                  </h3>
                  <div className="flex items-end justify-around h-64 gap-2">
                    {spendingData.map((data, index) => (
                      <div key={index} className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg chart-bar" 
                          style={{
                            height: 0,
                            background: `linear-gradient(to top, ${data.color}, ${data.color}80)`,
                            boxShadow: `0 0 20px ${data.color}40`
                          }}
                        />
                        <span className="text-xs text-white font-circular-web">{data.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-sm text-white font-circular-web">Average: $2,791.17</p>
                  </div>
                </div>
              </div>

              {/* Category Distribution */}
              <div className="dashboard-card group relative overflow-hidden border-hsla rounded-lg p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <h3 className="special-font font-zentry font-black text-xl text-white mb-6">
                    Spending Distribution
                  </h3>
                  <div className="space-y-4">
                    {categoryData.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-white font-circular-web">
                            {item.category}
                          </span>
                          <span className="text-sm font-bold text-white">
                            {item.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-blue-900/30 rounded-full h-3 overflow-hidden">
                          <div
                            className="metric-bar h-full rounded-full transition-all duration-500"
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

            {/* Customer Insights */}
            <div className="mb-12">
              <h2 className="special-font font-zentry font-black text-2xl text-white mb-6">
                Customer Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {customerInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="dashboard-card group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-green-900/20 to-green-900/10 backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                    <div className="relative z-10">
                      <p className="text-3xl mb-3">{insight.icon}</p>
                      <p className="font-circular-web text-white text-sm mb-2">
                        {insight.metric}
                      </p>
                      <p className="special-font font-zentry font-black text-2xl text-white">
                        {insight.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`dashboard-card group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br ${stat.color} to-transparent backdrop-blur-sm hover:scale-105 transition-all duration-300`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                  <div className="relative z-10">
                    <p className="text-3xl mb-2">{stat.icon}</p>
                    <p className="font-circular-web text-white text-sm mb-2">
                      {stat.label}
                    </p>
                    <p className="special-font font-zentry font-black text-2xl text-white mb-2">
                      {stat.value}
                    </p>
                    <p className="text-xs font-bold text-green-400">{stat.trend}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Transactions */}
            <div className="dashboard-card group relative overflow-hidden border-hsla rounded-lg p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="special-font font-zentry font-black text-2xl text-white">
                    Recent Transactions
                  </h2>
                  <Link
                    to="/transactions"
                    className="text-yellow-300 hover:text-yellow-400 font-bold transition-colors flex items-center gap-2"
                  >
                    View All <TiLocationArrow />
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-blue-900/20 rounded-lg hover:bg-blue-900/40 transition-all duration-300 group/item"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{transaction.icon}</div>
                        <div>
                          <p className="text-white font-bold">{transaction.name}</p>
                          <p className="text-white text-sm font-circular-web">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${transaction.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                          {transaction.amount > 0 ? "+" : ""}{transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-white text-sm font-circular-web">{transaction.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

export default DashboardEnhancedV3;
