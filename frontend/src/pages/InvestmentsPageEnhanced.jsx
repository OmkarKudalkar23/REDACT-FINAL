import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NavBar from "../components/Navbar";
import FooterEnhanced from "../components/FooterEnhanced";
import { TrendingUp, TrendingDown } from "lucide-react";

gsap.registerPlugin(useGSAP);

const InvestmentsPageEnhanced = () => {
  const [investments] = useState([
    {
      id: 1,
      name: "Tech Growth Fund",
      symbol: "TGF",
      amount: 25000,
      currentValue: 28500,
      change: 3500,
      changePercent: 14,
      allocation: 25,
      riskLevel: "High",
      color: "#3B82F6",
      performance: [45, 52, 48, 65, 72, 85, 92, 105, 115, 128],
    },
    {
      id: 2,
      name: "Dividend Income",
      symbol: "DI",
      amount: 15000,
      currentValue: 16200,
      change: 1200,
      changePercent: 8,
      allocation: 15,
      riskLevel: "Low",
      color: "#10B981",
      performance: [45, 48, 50, 52, 55, 58, 60, 62, 64, 67],
    },
    {
      id: 3,
      name: "Global Index",
      symbol: "GI",
      amount: 35000,
      currentValue: 38750,
      change: 3750,
      changePercent: 10.7,
      allocation: 35,
      riskLevel: "Medium",
      color: "#8B5CF6",
      performance: [45, 50, 48, 55, 60, 65, 70, 75, 80, 85],
    },
    {
      id: 4,
      name: "Bond Portfolio",
      symbol: "BP",
      amount: 20000,
      currentValue: 20800,
      change: 800,
      changePercent: 4,
      allocation: 20,
      riskLevel: "Low",
      color: "#F59E0B",
      performance: [45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
    },
    {
      id: 5,
      name: "Emerging Markets",
      symbol: "EM",
      amount: 12000,
      currentValue: 13500,
      change: 1500,
      changePercent: 12.5,
      allocation: 5,
      riskLevel: "High",
      color: "#EF4444",
      performance: [45, 55, 50, 65, 70, 75, 80, 90, 95, 105],
    },
  ]);

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalGain = totalValue - totalInvested;
  const totalGainPercent = ((totalGain / totalInvested) * 100).toFixed(2);

  useGSAP(() => {
    // Hero content animation
    gsap.from(".investments-hero-content", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
    });

    // Stat cards animation
    gsap.from(".stat-card-inv", {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.2,
    });

    // Chart animation - fade in only
    gsap.from(".chart-container", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.2,
    });

    // Animate allocation bars - set initial width
    gsap.set(".allocation-bar", { width: 0 });
    gsap.to(".allocation-bar", {
      width: (index) => {
        return investments[index].allocation + "%";
      },
      duration: 1.2,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.3,
    });

    // Animate performance bars - set initial width
    gsap.set(".perf-bar", { width: 0 });
    gsap.to(".perf-bar", {
      width: (index) => {
        const inv = investments[index];
        const minPerf = Math.min(...inv.performance);
        const currentPerf = inv.performance[inv.performance.length - 1];
        const perfGain = ((currentPerf - minPerf) / minPerf * 100);
        return Math.min(perfGain, 100) + "%";
      },
      duration: 1.2,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.3,
    });

    // Investment card animation
    gsap.from(".investment-card", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.4,
    });
  });

  const maxPerformance = Math.max(...investments.map((inv) => Math.max(...inv.performance)));

  return (
    <div className="relative min-h-screen w-screen bg-black overflow-x-hidden">
      <NavBar />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10" />

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="relative px-5 sm:px-10 py-20">
          <div className="investments-hero-content max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
                Portfolio Management
              </p>
              <h1 className="special-font font-zentry font-black text-5xl text-blue-50 mb-4">
                Your <b>Investments</b>
              </h1>
              <p className="font-circular-web text-blue-200 max-w-2xl">
                Track your investment portfolio with advanced analytics and performance metrics
              </p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="stat-card-inv group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-blue-900/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <p className="font-circular-web text-blue-200 text-sm mb-2">
                    Total Invested
                  </p>
                  <p className="special-font font-zentry font-black text-2xl text-blue-50">
                    ${totalInvested.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="stat-card-inv group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-green-900/20 to-green-900/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <p className="font-circular-web text-green-200 text-sm mb-2">
                    Current Value
                  </p>
                  <p className="special-font font-zentry font-black text-2xl text-green-400">
                    ${totalValue.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="stat-card-inv group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-purple-900/20 to-purple-900/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <p className="font-circular-web text-purple-200 text-sm mb-2">
                    Total Gain
                  </p>
                  <p className="special-font font-zentry font-black text-2xl text-purple-400">
                    ${totalGain.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="stat-card-inv group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <p className="font-circular-web text-yellow-200 text-sm mb-2">
                    Return %
                  </p>
                  <p className="special-font font-zentry font-black text-2xl text-yellow-400">
                    +{totalGainPercent}%
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {/* Performance Summary */}
              <div className="chart-container investment-card group relative overflow-hidden border-hsla rounded-lg p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <h3 className="special-font font-zentry font-black text-xl text-white mb-6">
                    Performance Overview
                  </h3>
                  <div className="space-y-4">
                    {investments.map((inv, idx) => {
                      const minPerf = Math.min(...inv.performance);
                      const currentPerf = inv.performance[inv.performance.length - 1];
                      const perfGain = ((currentPerf - minPerf) / minPerf * 100).toFixed(1);

                      return (
                        <div key={inv.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: inv.color }}
                              />
                              <span className="text-sm text-white font-circular-web">
                                {inv.symbol} - {inv.name}
                              </span>
                            </div>
                            <span className="text-sm font-bold text-green-400">
                              +{perfGain}%
                            </span>
                          </div>
                          <div className="w-full bg-blue-900/30 rounded-full h-3 overflow-hidden">
                            <div
                              className="perf-bar h-full rounded-full transition-all duration-1000"
                              style={{
                                background: `linear-gradient(to right, ${inv.color}, ${inv.color}80)`,
                                width: 0,
                                boxShadow: `0 0 8px ${inv.color}40`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Allocation Chart */}
              <div className="chart-container investment-card group relative overflow-hidden border-hsla rounded-lg p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <h3 className="special-font font-zentry font-black text-xl text-white mb-6">
                    Portfolio Allocation
                  </h3>
                  <div className="space-y-4">
                    {investments.map((inv) => (
                      <div key={inv.id}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-blue-200 font-circular-web">
                            {inv.name}
                          </span>
                          <span className="text-sm font-bold text-blue-50">
                            {inv.allocation}%
                          </span>
                        </div>
                        <div className="w-full bg-blue-900/30 rounded-full h-3 overflow-hidden">
                          <div
                            className="allocation-bar h-full rounded-full transition-all duration-500"
                            style={{
                              background: `linear-gradient(to right, ${inv.color}, ${inv.color}80)`,
                              boxShadow: `0 0 10px ${inv.color}40`,
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

            {/* Investment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
              {investments.map((inv) => (
                <div
                  key={inv.id}
                  className="investment-card group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-blue-200 font-circular-web mb-1">
                          {inv.name}
                        </p>
                        <p className="text-xs text-blue-300">{inv.symbol}</p>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${inv.color}20` }}
                      >
                        {inv.changePercent > 0 ? (
                          <TrendingUp size={16} color={inv.color} />
                        ) : (
                          <TrendingDown size={16} color={inv.color} />
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-blue-300 mb-1">Current Value</p>
                      <p className="text-lg font-bold text-blue-50">
                        ${inv.currentValue.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-blue-300">Gain</p>
                        <p
                          className="text-sm font-bold"
                          style={{ color: inv.change > 0 ? "#10B981" : "#EF4444" }}
                        >
                          {inv.change > 0 ? "+" : ""}{inv.change.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-blue-300">Return</p>
                        <p
                          className="text-sm font-bold"
                          style={{ color: inv.changePercent > 0 ? "#10B981" : "#EF4444" }}
                        >
                          {inv.changePercent > 0 ? "+" : ""}{inv.changePercent}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-blue-900/30">
                      <p className="text-xs text-blue-300 mb-1">Risk Level</p>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                          inv.riskLevel === "High"
                            ? "bg-red-900/30 text-red-400"
                            : inv.riskLevel === "Medium"
                            ? "bg-yellow-900/30 text-yellow-400"
                            : "bg-green-900/30 text-green-400"
                        }`}
                      >
                        {inv.riskLevel}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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

export default InvestmentsPageEnhanced;
