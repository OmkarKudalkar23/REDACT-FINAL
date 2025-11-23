import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NavBar from "../components/Navbar";
import FooterEnhanced from "../components/FooterEnhanced";
import { FiCheck, FiArrowRight } from "react-icons/fi";

gsap.registerPlugin(useGSAP);

const SendMoneyOptimized = () => {
  const [step, setStep] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const accounts = [
    { id: 1, name: "Premium Checking", balance: 45250.75, accountNumber: "****5432", icon: "💳" },
    { id: 2, name: "Savings Account", balance: 125340.50, accountNumber: "****8765", icon: "💰" },
    { id: 3, name: "Investment Account", balance: 287500.00, accountNumber: "****1234", icon: "📈" },
  ];

  const recipients = [
    { id: 1, name: "Sarah Johnson", accountNumber: "9876543210", bankName: "BankHub", avatar: "SJ" },
    { id: 2, name: "Mike Chen", accountNumber: "1234567890", bankName: "BankHub", avatar: "MC" },
    { id: 3, name: "Emma Wilson", accountNumber: "5555666677", bankName: "Other Bank", avatar: "EW" },
    { id: 4, name: "John Smith", accountNumber: "9999888877", bankName: "Global Bank", avatar: "JS" },
  ];

  const quickAmounts = [100, 500, 1000, 5000];

  useGSAP(() => {
    gsap.from(".send-hero-content", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.from(".send-card", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.2,
    });
  });

  const handleSendMoney = () => {
    if (selectedAccount && selectedRecipient && amount) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setStep(1);
        setSelectedAccount(null);
        setSelectedRecipient(null);
        setAmount("");
        setNote("");
      }, 2500);
    }
  };

  return (
    <div className="relative min-h-screen w-screen bg-black overflow-x-hidden">
      <NavBar />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10" />

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        <section className="relative px-5 sm:px-10 py-20">
          <div className="send-hero-content max-w-4xl mx-auto">
            <div className="mb-12">
              <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
                Transfer Funds
              </p>
              <h1 className="special-font font-zentry font-black text-5xl text-blue-50 mb-4">
                Send <b>Money</b>
              </h1>
              <p className="font-circular-web text-blue-200">
                Transfer funds between your accounts or to other bank accounts
              </p>
            </div>

            {/* Step Indicator */}
            <div className="flex justify-between items-center mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      step >= s
                        ? "bg-yellow-300 text-black"
                        : "bg-blue-900/30 text-blue-300 border border-blue-900/50"
                    }`}
                  >
                    {step > s ? <FiCheck /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${
                        step > s ? "bg-yellow-300" : "bg-blue-900/30"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Select Account */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="special-font font-zentry font-black text-2xl text-blue-50 mb-6">
                  Select Your Account
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      onClick={() => {
                        setSelectedAccount(account);
                        setStep(2);
                      }}
                      className={`send-card group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                        selectedAccount?.id === account.id
                          ? "scale-105 ring-2 ring-yellow-300 shadow-2xl shadow-yellow-300/50"
                          : "hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
                      }`}
                    >
                      {/* Gradient Background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br transition-all duration-300 ${
                          account.id === 1
                            ? "from-blue-600 to-blue-800"
                            : account.id === 2
                            ? "from-purple-600 to-purple-800"
                            : "from-cyan-600 to-cyan-800"
                        }`}
                      />

                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-64">
                        {/* Top Section */}
                        <div>
                          <div className="flex justify-between items-start mb-8">
                            <div>
                              <p className="text-white/80 text-sm font-circular-web mb-2 uppercase tracking-wider">
                                {account.type}
                              </p>
                              <p className="text-5xl">{account.icon}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white/60 text-xs font-circular-web">Click to Select</p>
                              <p className="text-2xl">→</p>
                            </div>
                          </div>

                          {/* Account Number */}
                          <p className="text-white text-2xl font-mono tracking-widest mb-6">
                            {account.accountNumber.slice(0, 4)} •••• ••••
                          </p>
                        </div>

                        {/* Bottom Section */}
                        <div>
                          <p className="text-white/60 text-xs font-circular-web mb-2 uppercase tracking-wider">
                            Available Balance
                          </p>
                          <p className="text-white text-4xl font-black mb-4">
                            ${account.balance.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                          </p>
                          <div className="flex justify-between items-center pt-4 border-t border-white/20">
                            <span className="text-white/80 text-xs font-circular-web">
                              {account.name}
                            </span>
                            <span className="text-white/80 text-xs font-circular-web">
                              {account.interestRate} APY
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/10 to-transparent" />

                      {/* Selection Indicator */}
                      {selectedAccount?.id === account.id && (
                        <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
                          <span className="text-black font-black text-lg">✓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Recipient */}
            {step === 2 && (
              <div className="space-y-6">
                <button
                  onClick={() => setStep(1)}
                  className="text-blue-300 hover:text-yellow-300 transition-colors flex items-center gap-2 mb-4"
                >
                  ← Back
                </button>
                <h2 className="special-font font-zentry font-black text-2xl text-blue-50 mb-6">
                  Select Recipient
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {recipients.map((recipient) => (
                    <div
                      key={recipient.id}
                      onClick={() => setSelectedRecipient(recipient)}
                      className={`send-card group relative overflow-hidden border-hsla rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                        selectedRecipient?.id === recipient.id
                          ? "bg-gradient-to-br from-yellow-900/30 to-yellow-900/10 border-yellow-300/50 scale-105"
                          : "bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-900/30 hover:border-yellow-300/30 hover:scale-102"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                            {recipient.avatar}
                          </div>
                          <div>
                            <p className="text-blue-50 font-bold">{recipient.name}</p>
                            <p className="text-blue-300 text-xs">{recipient.bankName}</p>
                          </div>
                        </div>
                        <p className="text-blue-300 text-xs font-mono">Account: {recipient.accountNumber}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedRecipient && (
                  <button
                    onClick={() => setStep(3)}
                    className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Continue <FiArrowRight />
                  </button>
                )}
              </div>
            )}

            {/* Step 3: Enter Amount */}
            {step === 3 && (
              <div className="space-y-6">
                <button
                  onClick={() => setStep(2)}
                  className="text-blue-300 hover:text-yellow-300 transition-colors flex items-center gap-2 mb-4"
                >
                  ← Back
                </button>
                <h2 className="special-font font-zentry font-black text-2xl text-blue-50 mb-6">
                  Enter Amount
                </h2>

                {/* Selected Info */}
                <div className="send-card group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                  <div className="relative z-10">
                    <p className="text-blue-300 text-sm mb-4">From: {selectedAccount?.name}</p>
                    <p className="text-blue-300 text-sm mb-4">To: {selectedRecipient?.name}</p>
                  </div>
                </div>

                {/* Amount Input */}
                <div className="send-card group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                  <div className="relative z-10">
                    <label className="block text-blue-200 font-circular-web text-sm mb-3">
                      Amount
                    </label>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl text-yellow-300">$</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="flex-1 bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-3 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 text-2xl font-bold"
                      />
                    </div>

                    {amount && (
                      <p className="text-blue-300 text-sm">
                        Available: ${(selectedAccount?.balance || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick Amounts */}
                <div>
                  <p className="text-blue-200 font-circular-web text-sm mb-3">Quick Amounts</p>
                  <div className="grid grid-cols-4 gap-2">
                    {quickAmounts.map((quickAmount) => (
                      <button
                        key={quickAmount}
                        onClick={() => setAmount(quickAmount.toString())}
                        className="send-card bg-blue-900/20 border border-blue-900/30 hover:bg-blue-900/40 hover:border-yellow-300 text-blue-50 font-bold py-3 rounded-lg transition-all duration-300"
                      >
                        ${quickAmount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div className="send-card group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                  <div className="relative z-10">
                    <label className="block text-blue-200 font-circular-web text-sm mb-3">
                      Note (Optional)
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Add a note for the recipient..."
                      className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-3 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 font-circular-web"
                      rows="3"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-blue-900/30 hover:bg-blue-900/50 text-blue-50 font-bold py-4 rounded-lg transition-all duration-300 border border-blue-900/50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSendMoney}
                    disabled={!amount || parseFloat(amount) <= 0}
                    className="bg-yellow-300 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold py-4 rounded-lg transition-all duration-300"
                  >
                    Send Money
                  </button>
                </div>
              </div>
            )}

            {/* Success Message */}
            {showSuccess && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-black/80 backdrop-blur-sm rounded-lg p-12 text-center max-w-md">
                  <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheck className="text-green-400 text-3xl" />
                  </div>
                  <h3 className="special-font font-zentry font-black text-2xl text-blue-50 mb-2">
                    Transfer Successful!
                  </h3>
                  <p className="text-blue-300 font-circular-web mb-4">
                    ${amount} sent to {selectedRecipient?.name}
                  </p>
                  <p className="text-blue-400 text-sm font-circular-web">
                    Transaction ID: TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </div>
              </div>
            )}
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

export default SendMoneyOptimized;
