import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NavBar from "../components/Navbar";
import FooterEnhanced from "../components/FooterEnhanced";

gsap.registerPlugin(useGSAP);

const InvestmentsPage = () => {
  const [investments] = useState([
    {
      id: 1,
      name: "Tech Growth Fund",
      symbol: "TGF",
      amount: 25000,
      currentValue: 28750,
      change: 3750,
      changePercent: 15.0,
      icon: "📈",
      category: "Stocks",
      allocation: "35%",
      riskLevel: "High",
    },
    {
      id: 2,
      name: "Blue Chip Index",
      symbol: "BCI",
      amount: 30000,
      currentValue: 31800,
      change: 1800,
      changePercent: 6.0,
      icon: "📊",
      category: "Index Fund",
      allocation: "40%",
      riskLevel: "Medium",
    },
    {
      id: 3,
      name: "Dividend Yield ETF",
      symbol: "DYE",
      amount: 20000,
      currentValue: 19200,
      change: -800,
      changePercent: -4.0,
      icon: "💵",
      category: "ETF",
      allocation: "25%",
      riskLevel: "Low",
    },
    {
      id: 4,
      name: "International Bonds",
      symbol: "IBO",
      amount: 15000,
      currentValue: 15450,
      change: 450,
      changePercent: 3.0,
      icon: "🌍",
      category: "Bonds",
      allocation: "20%",
      riskLevel: "Low",
    },
    {
      id: 5,
      name: "Real Estate Investment Trust",
      symbol: "REIT",
      amount: 12000,
      currentValue: 13200,
      change: 1200,
      changePercent: 10.0,
      icon: "🏢",
      category: "Real Estate",
      allocation: "15%",
      riskLevel: "Medium",
    },
  ]);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".investments-hero", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    })
      .from(".investment-item", {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.4");
  });

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalValue = investments.reduce(
    (sum, inv) => sum + inv.currentValue,
    0
  );
  const totalGain = totalValue - totalInvested;
  const gainPercent = ((totalGain / totalInvested) * 100).toFixed(2);

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      <NavBar />

      {/* Hero Section */}
      <div className="investments-hero relative min-h-screen w-screen flex items-center justify-center px-5 sm:px-10 pt-20">
        <div className="text-center max-w-3xl">
          <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
            Investment Portfolio
          </p>
          <h1 className="special-font font-zentry font-black text-5xl sm:text-6xl md:text-7xl text-blue-50 mb-6">
            Grow Your Wealth
          </h1>
          <p className="font-robert-regular text-blue-100 text-lg max-w-2xl mx-auto">
            Track and manage your investment portfolio with real-time insights
          </p>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative py-20 px-5 sm:px-10 border-t border-blue-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
              Investment Options
            </p>
            <h2 className="special-font font-zentry font-black text-4xl md:text-5xl text-blue-50">
              Diversify Your Portfolio
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📈", title: "Stocks", description: "Invest in top companies" },
              { icon: "💰", title: "Bonds", description: "Stable fixed income" },
              { icon: "🏠", title: "Real Estate", description: "Property investments" },
              { icon: "💎", title: "Crypto", description: "Digital assets" },
            ].map((option, idx) => (
              <div
                key={idx}
                className="border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm hover:from-blue-900/40 hover:to-purple-900/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className="special-font font-zentry font-black text-xl text-blue-50 mb-2">
                  {option.title}
                </h3>
                <p className="font-circular-web text-blue-300 text-sm">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-20 px-5 sm:px-10">
        <div className="container mx-auto max-w-4xl">
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-blue-900/10 backdrop-blur-sm">
              <p className="font-circular-web text-blue-200 text-sm mb-2">
                Total Invested
              </p>
              <p className="special-font font-zentry font-black text-2xl text-blue-50">
                ${totalInvested.toFixed(2)}
              </p>
            </div>

            <div className="border-hsla rounded-lg p-6 bg-gradient-to-br from-purple-900/20 to-purple-900/10 backdrop-blur-sm">
              <p className="font-circular-web text-purple-200 text-sm mb-2">
                Current Value
              </p>
              <p className="special-font font-zentry font-black text-2xl text-purple-400">
                ${totalValue.toFixed(2)}
              </p>
            </div>

            <div className={`border-hsla rounded-lg p-6 bg-gradient-to-br ${totalGain >= 0 ? "from-green-900/20 to-green-900/10" : "from-red-900/20 to-red-900/10"} backdrop-blur-sm`}>
              <p className={`font-circular-web text-sm mb-2 ${totalGain >= 0 ? "text-green-200" : "text-red-200"}`}>
                Total Gain/Loss
              </p>
              <p className={`special-font font-zentry font-black text-2xl ${totalGain >= 0 ? "text-green-400" : "text-red-400"}`}>
                {totalGain >= 0 ? "+" : ""}${totalGain.toFixed(2)}
              </p>
            </div>

            <div className={`border-hsla rounded-lg p-6 bg-gradient-to-br ${gainPercent >= 0 ? "from-green-900/20 to-green-900/10" : "from-red-900/20 to-red-900/10"} backdrop-blur-sm`}>
              <p className={`font-circular-web text-sm mb-2 ${gainPercent >= 0 ? "text-green-200" : "text-red-200"}`}>
                Return %
              </p>
              <p className={`special-font font-zentry font-black text-2xl ${gainPercent >= 0 ? "text-green-400" : "text-red-400"}`}>
                {gainPercent >= 0 ? "+" : ""}
                {gainPercent}%
              </p>
            </div>
          </div>

          {/* Investments List */}
          <div>
            <h2 className="special-font font-zentry font-black text-2xl text-blue-50 mb-6">
              Your Investments
            </h2>
            <div className="space-y-4">
              {investments.map((investment) => (
                <div
                  key={investment.id}
                  className="investment-item border-hsla rounded-lg p-6 bg-gradient-to-r from-blue-900/10 to-purple-900/10 backdrop-blur-sm hover:from-blue-900/20 hover:to-purple-900/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{investment.icon}</div>
                      <div className="flex-1">
                        <p className="text-blue-50 font-bold">
                          {investment.name}
                        </p>
                        <p className="font-circular-web text-blue-300 text-sm">
                          Symbol: {investment.symbol}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-blue-50 font-bold">
                        ${investment.currentValue.toFixed(2)}
                      </p>
                      <div
                        className={`flex items-center justify-end gap-1 text-sm font-bold ${
                          investment.change >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {investment.change >= 0 ? "↑" : "↓"}
                        {investment.change >= 0 ? "+" : ""}
                        {investment.change.toFixed(2)} ({investment.changePercent}%)
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="bg-blue-900/20 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${
                        investment.change >= 0
                          ? "bg-gradient-to-r from-green-600 to-green-500"
                          : "bg-gradient-to-r from-red-600 to-red-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          100,
                          (investment.currentValue / investment.amount) * 100
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="mt-3 flex justify-between text-xs font-circular-web text-blue-300">
                    <span>Invested: ${investment.amount.toFixed(2)}</span>
                    <span>
                      Return:{" "}
                      {(
                        ((investment.currentValue - investment.amount) /
                          investment.amount) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterEnhanced />
    </div>
  );
};

export default InvestmentsPage;
