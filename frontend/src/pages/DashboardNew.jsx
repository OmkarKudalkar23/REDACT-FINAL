import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(ScrollTrigger);

const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.8) * 15;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const DashboardCard = ({ title, description, icon, href, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <Link to={href} className="relative size-full block">
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
        <div>
          <div className="text-4xl mb-3">{icon}</div>
          <h1 className="special-font font-zentry font-black text-2xl md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-sm font-circular-web">
              {description}
            </p>
          )}
        </div>

        {!isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">explore</p>
          </div>
        )}
      </div>
    </Link>
  );
};

const DashboardNew = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(0);

  const accounts = [
    { name: "Savings Account", balance: 45250.75, type: "Savings", icon: "💰" },
    { name: "Checking Account", balance: 12340.50, type: "Checking", icon: "💳" },
    { name: "Investment Account", balance: 87500.00, type: "Investment", icon: "📈" },
  ];

  const recentTransactions = [
    { id: 1, name: "Amazon Purchase", amount: -89.99, date: "Today", icon: "🛍️" },
    { id: 2, name: "Salary Deposit", amount: 5000, date: "Yesterday", icon: "💰" },
    { id: 3, name: "Netflix Subscription", amount: -15.99, date: "2 days ago", icon: "🎬" },
    { id: 4, name: "Starbucks Coffee", amount: -5.45, date: "3 days ago", icon: "☕" },
  ];

  const stats = [
    { label: "Monthly Spending", value: "$2,450.50", icon: "📊", color: "from-red-900/20" },
    { label: "Savings Rate", value: "42%", icon: "📈", color: "from-green-900/20" },
    { label: "Investments", value: "$87,500", icon: "💎", color: "from-purple-900/20" },
    { label: "Credit Score", value: "750", icon: "⭐", color: "from-yellow-900/20" },
  ];

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".dashboard-hero", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    })
      .from(".dashboard-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.4");
  });

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      <NavBar />

      {/* Hero Section */}
      <div className="dashboard-hero relative h-screen w-screen flex items-center justify-center px-5 sm:px-10 pt-20">
        <div className="text-center max-w-3xl">
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-300 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300"
            >
              <span>Send Money</span>
              <TiLocationArrow />
            </Link>
            <Link
              to="/investments"
              className="inline-flex items-center gap-2 px-6 py-3 border-hsla bg-blue-900/20 text-blue-50 font-bold rounded-lg hover:bg-blue-900/40 transition-all duration-300"
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
                    ? "bg-yellow-300 text-black"
                    : "border-hsla bg-blue-900/20 text-blue-50 hover:bg-blue-900/40"
                }`}
              >
                {account.name}
              </button>
            ))}
          </div>

          {/* Main Balance Card */}
          <div className="border-hsla rounded-lg p-8 md:p-12 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm mb-12">
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
                className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all duration-300 text-sm"
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

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Link
              to="/send-money"
              className="dashboard-card border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm hover:from-blue-900/40 hover:to-purple-900/40 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">💸</div>
              <h3 className="special-font font-zentry font-black text-xl text-blue-50 mb-2">
                Send Money
              </h3>
              <p className="font-circular-web text-blue-300 text-sm mb-4">
                Transfer funds instantly
              </p>
              <div className="flex items-center gap-2 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-bold">Explore</span>
                <TiLocationArrow className="w-4 h-4" />
              </div>
            </Link>

            <Link
              to="/investments"
              className="dashboard-card border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm hover:from-blue-900/40 hover:to-purple-900/40 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">📈</div>
              <h3 className="special-font font-zentry font-black text-xl text-blue-50 mb-2">
                Invest Now
              </h3>
              <p className="font-circular-web text-blue-300 text-sm mb-4">
                Grow your wealth
              </p>
              <div className="flex items-center gap-2 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-bold">Explore</span>
                <TiLocationArrow className="w-4 h-4" />
              </div>
            </Link>

            <Link
              to="/cards"
              className="dashboard-card border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm hover:from-blue-900/40 hover:to-purple-900/40 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">💳</div>
              <h3 className="special-font font-zentry font-black text-xl text-blue-50 mb-2">
                Manage Cards
              </h3>
              <p className="font-circular-web text-blue-300 text-sm mb-4">
                Control your cards
              </p>
              <div className="flex items-center gap-2 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-bold">Explore</span>
                <TiLocationArrow className="w-4 h-4" />
              </div>
            </Link>
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
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="dashboard-card border-hsla rounded-lg p-6 bg-gradient-to-r from-blue-900/10 to-purple-900/10 backdrop-blur-sm hover:from-blue-900/20 hover:to-purple-900/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
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
                className={`dashboard-card border-hsla rounded-lg p-6 bg-gradient-to-br ${stat.color} to-transparent backdrop-blur-sm hover:scale-105 transition-all duration-300`}
              >
                <div className="text-3xl mb-4">{stat.icon}</div>
                <p className="font-circular-web text-blue-200 text-sm mb-2">
                  {stat.label}
                </p>
                <p className="special-font font-zentry font-black text-2xl text-blue-50">
                  {stat.value}
                </p>
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
              {
                title: "Send Money",
                description: "Transfer funds instantly to anyone",
                icon: "💸",
                href: "/send-money",
              },
              {
                title: "Pay Bills",
                description: "Manage and pay all your bills",
                icon: "💳",
                href: "/bills",
              },
              {
                title: "View Transactions",
                description: "Track all your financial activity",
                icon: "📋",
                href: "/transactions",
              },
              {
                title: "Manage Cards",
                description: "Control your debit and credit cards",
                icon: "🎫",
                href: "/cards",
              },
              {
                title: "Invest",
                description: "Grow your wealth with investments",
                icon: "📈",
                href: "/investments",
              },
              {
                title: "Settings",
                description: "Manage your account preferences",
                icon: "⚙️",
                href: "/settings",
              },
            ].map((feature, idx) => (
              <Link
                key={idx}
                to={feature.href}
                className="dashboard-card border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm hover:from-blue-900/40 hover:to-purple-900/40 transition-all duration-300 group"
              >
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DashboardNew;
