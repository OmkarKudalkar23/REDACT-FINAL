import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiPlus,
  FiX,
  FiArrowUpRight,
} from "react-icons/fi";

const Investments = () => {
  const [investments] = useState([
    {
      id: 1,
      name: "Tech Growth Fund",
      symbol: "TGF",
      amount: 5000,
      currentValue: 5750,
      change: 750,
      changePercent: 15.0,
      icon: "📈",
    },
    {
      id: 2,
      name: "Blue Chip Index",
      symbol: "BCI",
      amount: 3000,
      currentValue: 3180,
      change: 180,
      changePercent: 6.0,
      icon: "📊",
    },
    {
      id: 3,
      name: "Dividend Yield ETF",
      symbol: "DYE",
      amount: 2000,
      currentValue: 1920,
      change: -80,
      changePercent: -4.0,
      icon: "💵",
    },
    {
      id: 4,
      name: "International Bonds",
      symbol: "IBO",
      amount: 4000,
      currentValue: 4120,
      change: 120,
      changePercent: 3.0,
      icon: "🌍",
    },
  ]);

  const [showInvestModal, setShowInvestModal] = useState(false);

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalValue = investments.reduce(
    (sum, inv) => sum + inv.currentValue,
    0
  );
  const totalGain = totalValue - totalInvested;
  const gainPercent = ((totalGain / totalInvested) * 100).toFixed(2);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-50 mb-2">Investments</h1>
          <p className="text-blue-200">Grow your wealth with smart investments</p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-900/30 rounded-xl p-6">
            <p className="text-blue-200 text-sm mb-2">Total Invested</p>
            <p className="text-3xl font-bold text-blue-50">
              ${totalInvested.toFixed(2)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-purple-900/10 border border-purple-900/30 rounded-xl p-6">
            <p className="text-purple-200 text-sm mb-2">Current Value</p>
            <p className="text-3xl font-bold text-purple-400">
              ${totalValue.toFixed(2)}
            </p>
          </div>

          <div className={`bg-gradient-to-br ${totalGain >= 0 ? "from-green-900/20 to-green-900/10 border border-green-900/30" : "from-red-900/20 to-red-900/10 border border-red-900/30"} rounded-xl p-6`}>
            <p className={`text-sm mb-2 ${totalGain >= 0 ? "text-green-200" : "text-red-200"}`}>
              Total Gain/Loss
            </p>
            <p
              className={`text-3xl font-bold ${totalGain >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {totalGain >= 0 ? "+" : ""}${totalGain.toFixed(2)}
            </p>
          </div>

          <div className={`bg-gradient-to-br ${gainPercent >= 0 ? "from-green-900/20 to-green-900/10 border border-green-900/30" : "from-red-900/20 to-red-900/10 border border-red-900/30"} rounded-xl p-6`}>
            <p className={`text-sm mb-2 ${gainPercent >= 0 ? "text-green-200" : "text-red-200"}`}>
              Return %
            </p>
            <p
              className={`text-3xl font-bold ${gainPercent >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {gainPercent >= 0 ? "+" : ""}
              {gainPercent}%
            </p>
          </div>
        </div>

        {/* Investments List */}
        <div>
          <h2 className="text-xl font-bold text-blue-50 mb-4">
            Your Investments
          </h2>
          <div className="space-y-3">
            {investments.map((investment) => (
              <div
                key={investment.id}
                className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 border border-blue-900/20 rounded-lg p-4 hover:border-blue-900/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{investment.icon}</div>
                    <div className="flex-1">
                      <p className="text-blue-50 font-semibold">
                        {investment.name}
                      </p>
                      <p className="text-blue-300 text-sm">
                        Symbol: {investment.symbol}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-blue-50 font-semibold">
                      ${investment.currentValue.toFixed(2)}
                    </p>
                    <div
                      className={`flex items-center justify-end gap-1 text-sm font-medium ${
                        investment.change >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {investment.change >= 0 ? (
                        <FiTrendingUp className="w-4 h-4" />
                      ) : (
                        <FiTrendingDown className="w-4 h-4" />
                      )}
                      {investment.change >= 0 ? "+" : ""}
                      {investment.change.toFixed(2)} ({investment.changePercent}%)
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 bg-blue-900/20 rounded-full h-2 overflow-hidden">
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

                <div className="mt-3 flex justify-between text-xs text-blue-300">
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

        {/* Investment Options */}
        <div>
          <h2 className="text-xl font-bold text-blue-50 mb-4">
            Investment Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: "Mutual Funds",
                description: "Diversified investment portfolios",
                icon: "📈",
              },
              {
                name: "Stocks",
                description: "Individual company shares",
                icon: "📊",
              },
              {
                name: "Bonds",
                description: "Fixed income securities",
                icon: "🏦",
              },
              {
                name: "ETFs",
                description: "Exchange-traded funds",
                icon: "💼",
              },
            ].map((option, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-lg p-4 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/20 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-blue-50 font-semibold">{option.name}</p>
                    <p className="text-blue-300 text-sm">
                      {option.description}
                    </p>
                  </div>
                  <span className="text-2xl">{option.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invest Button */}
        <button
          onClick={() => setShowInvestModal(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          <FiPlus className="w-5 h-5" />
          Start New Investment
        </button>
      </div>

      {/* Investment Modal */}
      {showInvestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-blue-950 to-black border border-blue-900/30 rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-blue-50">
                Start Investment
              </h3>
              <button
                onClick={() => setShowInvestModal(false)}
                className="text-blue-300 hover:text-blue-50"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-blue-50 text-sm font-medium mb-2">
                  Investment Type
                </label>
                <select className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600">
                  <option>Select an option</option>
                  <option>Mutual Funds</option>
                  <option>Stocks</option>
                  <option>Bonds</option>
                  <option>ETFs</option>
                </select>
              </div>

              <div>
                <label className="block text-blue-50 text-sm font-medium mb-2">
                  Investment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-50">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg pl-8 pr-4 py-2 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-blue-50 text-sm font-medium mb-2">
                  Investment Duration
                </label>
                <select className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600">
                  <option>Select duration</option>
                  <option>3 Months</option>
                  <option>6 Months</option>
                  <option>1 Year</option>
                  <option>3 Years</option>
                  <option>5+ Years</option>
                </select>
              </div>

              <div className="bg-blue-900/20 border border-blue-900/30 rounded-lg p-4">
                <p className="text-blue-300 text-sm mb-2">
                  Expected Returns (Annual)
                </p>
                <p className="text-2xl font-bold text-green-400">8-12%</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowInvestModal(false)}
                  className="flex-1 bg-blue-900/30 hover:bg-blue-900/50 text-blue-50 font-semibold py-2 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowInvestModal(false)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <FiArrowUpRight className="w-4 h-4" />
                  Invest Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Investments;
