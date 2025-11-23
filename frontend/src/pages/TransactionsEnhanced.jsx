import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NavBar from "../components/Navbar";
import FooterEnhanced from "../components/FooterEnhanced";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(useGSAP);

const TransactionsEnhanced = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const videoRef = useRef(null);

  const [transactions] = useState([
    { id: 1, name: "Amazon Purchase", category: "Shopping", amount: -89.99, date: "2024-01-15", merchant: "Amazon.com", icon: "🛍️" },
    { id: 2, name: "Salary Deposit", category: "Income", amount: 5000, date: "2024-01-14", merchant: "Employer Inc", icon: "💰" },
    { id: 3, name: "Netflix Subscription", category: "Entertainment", amount: -15.99, date: "2024-01-13", merchant: "Netflix", icon: "🎬" },
    { id: 4, name: "Transfer to John", category: "Transfer", amount: -500, date: "2024-01-12", merchant: "John Doe", icon: "👤" },
    { id: 5, name: "Starbucks Coffee", category: "Food & Drink", amount: -5.45, date: "2024-01-11", merchant: "Starbucks", icon: "☕" },
    { id: 6, name: "Gym Membership", category: "Health", amount: -49.99, date: "2024-01-10", merchant: "FitLife Gym", icon: "💪" },
  ]);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from("#transactions-video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      duration: 1.2,
      ease: "power1.inOut",
    })
      .from(".transactions-hero-content", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.6")
      .from(".transaction-item", {
        opacity: 0,
        x: -30,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.4");

    gsap.set("#transactions-video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
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

      {/* Hero Section with Video Background */}
      <div className="relative h-screen w-screen flex items-center justify-center px-5 sm:px-10 pt-20 overflow-hidden">
        {/* Video Background */}
        <div
          id="transactions-video-frame"
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <video
            ref={videoRef}
            src="/videos/hero-3.mp4"
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="transactions-hero-content relative z-10 text-center max-w-3xl">
          <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
            Transaction History
          </p>
          <h1 className="special-font font-zentry font-black text-5xl sm:text-6xl md:text-7xl text-blue-50 mb-6">
            Your Transact<b>i</b>ons
          </h1>
          <p className="font-robert-regular text-blue-100 text-lg max-w-2xl mx-auto">
            Track and analyze all your financial activities in one place
          </p>
        </div>
      </div>

      {/* Analytics Section */}
      <section className="relative py-20 px-5 sm:px-10 border-t border-blue-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
              Track & Analyze
            </p>
            <h2 className="special-font font-zentry font-black text-4xl md:text-5xl text-blue-50">
              Advanced Analytics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "📊", title: "Detailed Reports", description: "Get comprehensive spending insights", video: 0 },
              { icon: "🔍", title: "Smart Search", description: "Find transactions instantly", video: 1 },
              { icon: "📈", title: "Trends", description: "Visualize your spending patterns", video: 2 },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="transaction-item group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm hover:from-blue-900/40 hover:to-purple-900/40 transition-all duration-300 hover:scale-105"
              >
                {/* Video Background */}
                <video
                  src={`/videos/feature-${(idx % 5) + 1}.mp4`}
                  autoPlay
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="special-font font-zentry font-black text-xl text-blue-50 mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-circular-web text-blue-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-20 px-5 sm:px-10">
        <div className="container mx-auto max-w-4xl">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="transaction-item group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
              {/* Video Background */}
              <video
                src="/videos/feature-1.mp4"
                autoPlay
                muted
                loop
                className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />

              <div className="relative z-10">
                <p className="font-circular-web text-blue-200 text-sm mb-2">
                  Total Transactions
                </p>
                <p className="special-font font-zentry font-black text-3xl text-blue-50">
                  {transactions.length}
                </p>
              </div>
            </div>

            <div className="transaction-item group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-green-900/20 to-green-900/10 backdrop-blur-sm">
              {/* Video Background */}
              <video
                src="/videos/feature-2.mp4"
                autoPlay
                muted
                loop
                className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />

              <div className="relative z-10">
                <p className="font-circular-web text-green-200 text-sm mb-2">
                  Total Income
                </p>
                <p className="special-font font-zentry font-black text-3xl text-green-400">
                  +${totalIncome.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="transaction-item group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-red-900/20 to-red-900/10 backdrop-blur-sm">
              {/* Video Background */}
              <video
                src="/videos/feature-3.mp4"
                autoPlay
                muted
                loop
                className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />

              <div className="relative z-10">
                <p className="font-circular-web text-red-200 text-sm mb-2">
                  Total Expenses
                </p>
                <p className="special-font font-zentry font-black text-3xl text-red-400">
                  -${totalExpense.toFixed(2)}
                </p>
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
                  {/* Video Background */}
                  <video
                    src={`/videos/feature-${(transaction.id % 5) + 1}.mp4`}
                    autoPlay
                    muted
                    loop
                    className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{transaction.icon}</div>
                      <div>
                        <p className="text-blue-50 font-bold">{transaction.name}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="font-circular-web text-blue-300 text-sm">
                            {transaction.merchant}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300">
                            {transaction.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-xl font-bold ${
                          transaction.amount > 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="font-circular-web text-blue-300 text-sm">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="font-circular-web text-blue-300 text-lg">
                  No transactions found
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <FooterEnhanced />
    </div>
  );
};

export default TransactionsEnhanced;
