import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import NavBar from "../components/Navbar";
import FooterEnhanced from "../components/FooterEnhanced";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(ScrollTrigger);

const DashboardEnhanced = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const accounts = [
    { name: "Premium Checking", balance: 45250.75, type: "Checking", icon: "💳", accountNumber: "****5432", interestRate: "0.5%" },
    { name: "High-Yield Savings", balance: 125340.50, type: "Savings", icon: "💰", accountNumber: "****8765", interestRate: "4.5%" },
    { name: "Investment Account", balance: 287500.00, type: "Investment", icon: "📈", accountNumber: "****1234", interestRate: "Varies" },
  ];

  const featureVideos = [
    "/videos/feature-1.mp4",
    "/videos/feature-2.mp4",
    "/videos/feature-3.mp4",
    "/videos/feature-4.mp4",
    "/videos/hero-5.mp4",
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

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Hero video animation
    tl.from("#hero-video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      duration: 1.2,
      ease: "power1.inOut",
    })
      .from(".dashboard-hero-content", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.6")
      .from(".dashboard-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.4");

    // Scroll trigger for video frame
    gsap.set("#hero-video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });

    gsap.from("#hero-video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#hero-video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const handleVideoChange = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % featureVideos.length);
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      <NavBar />

      {/* Hero Section with Video Background */}
      <div className="relative h-screen w-screen flex items-center justify-center px-5 sm:px-10 pt-20 overflow-hidden">
        {/* Video Background */}
        <div
          id="hero-video-frame"
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <video
            ref={videoRef}
            src="/videos/hero-1.mp4"
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="dashboard-hero-content relative z-10 text-center max-w-3xl">
          <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
            Welcome Back, John
          </p>
          <h1 className="special-font font-zentry font-black text-5xl sm:text-6xl md:text-7xl text-blue-50 mb-6">
            Your F<b>i</b>nancial Dashboard
          </h1>
          <p className="font-robert-regular text-blue-100 text-lg max-w-2xl mx-auto mb-8">
            Manage your finances with cutting-edge technology. Access all your banking needs in one unified platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/send-money"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-300 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-105"
            >
              <span>Send Money</span>
              <TiLocationArrow />
            </Link>
            <Link
              to="/investments"
              className="inline-flex items-center gap-2 px-6 py-3 border-hsla bg-blue-900/20 text-blue-50 font-bold rounded-lg hover:bg-blue-900/40 transition-all duration-300 hover:scale-105"
            >
              <span>Invest Now</span>
              <TiLocationArrow />
            </Link>
          </div>
        </div>
      </div>

      {/* Account Balance Section */}
      <section className="relative py-20 px-5 sm:px-10">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
              Your Accounts
            </p>
            <h2 className="special-font font-zentry font-black text-4xl md:text-5xl text-blue-50">
              Account Overv<b>i</b>ew
            </h2>
          </div>

          {/* Account Tabs */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
            {accounts.map((account, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAccount(idx)}
                className={`px-6 py-3 rounded-lg font-bold whitespace-nowrap transition-all duration-300 ${
                  selectedAccount === idx
                    ? "bg-yellow-300 text-black scale-105"
                    : "border-hsla bg-blue-900/20 text-blue-50 hover:bg-blue-900/40"
                }`}
              >
                {account.name}
              </button>
            ))}
          </div>

          {/* Main Balance Card with Video Background */}
          <div className="border-hsla rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm mb-12 relative group">
            {/* Video Background */}
            <video
              src={featureVideos[selectedAccount % featureVideos.length]}
              autoPlay
              muted
              loop
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40" />

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="font-circular-web text-blue-200 text-sm mb-2">
                    {accounts[selectedAccount].type} Account
                  </p>
                  <h3 className="special-font font-zentry font-black text-5xl md:text-6xl text-blue-50">
                    {balanceVisible ? `$${accounts[selectedAccount].balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "••••••"}
                  </h3>
                </div>
                <button
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all duration-300 text-sm hover:scale-105"
                >
                  {balanceVisible ? "Hide" : "Show"}
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="font-circular-web text-blue-300 text-xs mb-1">Account Type</p>
                  <p className="text-blue-50 font-bold">{accounts[selectedAccount].type}</p>
                </div>
                <div>
                  <p className="font-circular-web text-blue-300 text-xs mb-1">Account Number</p>
                  <p className="text-blue-50 font-bold">****5432</p>
                </div>
                <div>
                  <p className="font-circular-web text-blue-300 text-xs mb-1">Interest Rate</p>
                  <p className="text-green-400 font-bold">2.5% APY</p>
                </div>
                <div>
                  <p className="font-circular-web text-blue-300 text-xs mb-1">Last Updated</p>
                  <p className="text-blue-50 font-bold">Today</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Send Money", icon: "💸", href: "/send-money", color: "from-blue-600" },
              { title: "Invest Now", icon: "📈", href: "/investments", color: "from-purple-600" },
              { title: "Manage Cards", icon: "💳", href: "/cards", color: "from-pink-600" },
            ].map((action, idx) => (
              <Link
                key={idx}
                to={action.href}
                className="dashboard-card group relative overflow-hidden rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm hover:from-blue-900/40 hover:to-purple-900/40 transition-all duration-300 hover:scale-105"
              >
                {/* Video Background */}
                <video
                  src={featureVideos[idx]}
                  autoPlay
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{action.icon}</div>
                  <h3 className="special-font font-zentry font-black text-xl text-blue-50 mb-2">
                    {action.title}
                  </h3>
                  <p className="font-circular-web text-blue-300 text-sm mb-4">
                    {action.title === "Send Money" && "Transfer funds instantly"}
                    {action.title === "Invest Now" && "Grow your wealth"}
                    {action.title === "Manage Cards" && "Control your cards"}
                  </p>
                  <div className="flex items-center gap-2 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-bold">Explore</span>
                    <TiLocationArrow className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Transactions Section */}
      <section className="relative py-20 px-5 sm:px-10 border-t border-blue-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-circular-web text-sm uppercase text-blue-50 mb-2">
                  Activity
                </p>
                <h2 className="special-font font-zentry font-black text-4xl md:text-5xl text-blue-50">
                  Recent Transact<b>i</b>ons
                </h2>
              </div>
              <Link
                to="/transactions"
                className="hidden md:inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-400 font-bold transition-colors"
              >
                <span>View All</span>
                <TiLocationArrow />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {recentTransactions.map((transaction, idx) => (
              <div
                key={transaction.id}
                className="dashboard-card group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-r from-blue-900/10 to-purple-900/10 backdrop-blur-sm hover:from-blue-900/20 hover:to-purple-900/20 transition-all duration-300 hover:translate-x-2"
              >
                {/* Video Background */}
                <video
                  src={featureVideos[idx % featureVideos.length]}
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
                      <p className="font-circular-web text-blue-300 text-sm">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-xl font-bold ${
                      transaction.amount > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/transactions"
            className="md:hidden mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3 border-hsla bg-blue-900/20 hover:bg-blue-900/40 text-blue-50 font-bold rounded-lg transition-all duration-300"
          >
            <span>View All Transactions</span>
            <TiLocationArrow />
          </Link>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative py-20 px-5 sm:px-10 border-t border-blue-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
              Your Stats
            </p>
            <h2 className="special-font font-zentry font-black text-4xl md:text-5xl text-blue-50">
              F<b>i</b>nancial Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`dashboard-card group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br ${stat.color} to-transparent backdrop-blur-sm hover:scale-105 transition-all duration-300`}
              >
                {/* Video Background */}
                <video
                  src={featureVideos[idx % featureVideos.length]}
                  autoPlay
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-15 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-3xl">{stat.icon}</div>
                    <span className="text-xs font-bold text-green-400 bg-green-900/30 px-2 py-1 rounded">
                      {stat.trend}
                    </span>
                  </div>
                  <p className="font-circular-web text-blue-200 text-sm mb-2">
                    {stat.label}
                  </p>
                  <p className="special-font font-zentry font-black text-2xl text-blue-50">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-5 sm:px-10 border-t border-blue-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
              Banking Services
            </p>
            <h2 className="special-font font-zentry font-black text-4xl md:text-5xl text-blue-50">
              All Your Banking Needs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Send Money", description: "Transfer funds instantly to anyone", icon: "💸", href: "/send-money", videoIdx: 0 },
              { title: "Pay Bills", description: "Manage and pay all your bills", icon: "💳", href: "/bills", videoIdx: 1 },
              { title: "View Transactions", description: "Track all your financial activity", icon: "📋", href: "/transactions", videoIdx: 2 },
              { title: "Manage Cards", description: "Control your debit and credit cards", icon: "🎫", href: "/cards", videoIdx: 3 },
              { title: "Invest", description: "Grow your wealth with investments", icon: "📈", href: "/investments", videoIdx: 4 },
              { title: "Settings", description: "Manage your account preferences", icon: "⚙️", href: "/settings", videoIdx: 0 },
            ].map((feature, idx) => (
              <Link
                key={idx}
                to={feature.href}
                className="dashboard-card group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm hover:from-blue-900/40 hover:to-purple-900/40 transition-all duration-300 hover:scale-105"
              >
                {/* Video Background */}
                <video
                  src={featureVideos[feature.videoIdx]}
                  autoPlay
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-25 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="special-font font-zentry font-black text-xl text-blue-50 mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-robert-regular text-blue-200 text-sm mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-bold">Explore</span>
                    <TiLocationArrow className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterEnhanced />
    </div>
  );
};

export default DashboardEnhanced;
