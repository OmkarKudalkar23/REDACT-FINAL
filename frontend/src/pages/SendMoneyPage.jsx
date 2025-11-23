import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(useGSAP);

const SendMoneyPage = () => {
  const [step, setStep] = useState(1);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const containerRef = useRef(null);

  const [recipients] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      accountNumber: "****5432",
      bankName: "BankHub",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Mike Chen",
      accountNumber: "****8765",
      bankName: "BankHub",
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emma Wilson",
      accountNumber: "****1234",
      bankName: "Other Bank",
      avatar: "EW",
    },
  ]);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".send-money-hero", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    })
      .from(".send-money-content", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4");
  });

  const handleSubmit = () => {
    if (selectedRecipient && amount) {
      setStep(3);
      setTimeout(() => {
        setStep(1);
        setSelectedRecipient(null);
        setAmount("");
        setNote("");
      }, 3000);
    }
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      <NavBar />

      {/* Hero Section */}
      <div className="send-money-hero relative min-h-screen w-screen flex items-center justify-center px-5 sm:px-10 pt-20">
        <div className="text-center max-w-3xl">
          <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
            Money Transfer
          </p>
          <h1 className="special-font font-zentry font-black text-5xl sm:text-6xl md:text-7xl text-blue-50 mb-6">
            Send Money <b>Instantly</b>
          </h1>
          <p className="font-robert-regular text-blue-100 text-lg max-w-2xl mx-auto mb-8">
            Transfer funds to anyone, anywhere. Fast, secure, and transparent transactions at your fingertips.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-circular-web">
            <div className="px-4 py-2 bg-blue-900/20 rounded-full text-blue-200">⚡ Instant Transfer</div>
            <div className="px-4 py-2 bg-blue-900/20 rounded-full text-blue-200">🔒 Secure & Encrypted</div>
            <div className="px-4 py-2 bg-blue-900/20 rounded-full text-blue-200">💰 Zero Fees</div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="relative py-20 px-5 sm:px-10 border-t border-blue-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
              Why Choose Us
            </p>
            <h2 className="special-font font-zentry font-black text-4xl md:text-5xl text-blue-50">
              Fast & Secure Transfers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⚡", title: "Instant", description: "Money arrives in seconds" },
              { icon: "🔒", title: "Secure", description: "Bank-level encryption" },
              { icon: "💰", title: "No Fees", description: "Zero hidden charges" },
              { icon: "🌍", title: "Global", description: "Send anywhere worldwide" },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm hover:from-blue-900/40 hover:to-purple-900/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="special-font font-zentry font-black text-xl text-blue-50 mb-2">
                  {benefit.title}
                </h3>
                <p className="font-circular-web text-blue-300 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="send-money-content relative py-20 px-5 sm:px-10">
        <div className="container mx-auto max-w-4xl">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-8 mb-16">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                    step >= s
                      ? "bg-yellow-300 text-black"
                      : "bg-blue-900/30 text-blue-300 border border-blue-900/50"
                  }`}
                >
                  {step > s ? "✓" : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 rounded transition-all duration-300 ${
                      step > s ? "bg-yellow-300" : "bg-blue-900/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Select Recipient */}
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <p className="font-circular-web text-lg text-blue-50 mb-8">
                  Select a Recipient
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recipients.map((recipient) => (
                    <button
                      key={recipient.id}
                      onClick={() => {
                        setSelectedRecipient(recipient);
                        setStep(2);
                      }}
                      className="border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm hover:from-blue-900/40 hover:to-purple-900/40 transition-all duration-300 text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-black font-bold">
                          {recipient.avatar}
                        </div>
                        <div>
                          <p className="text-blue-50 font-bold">
                            {recipient.name}
                          </p>
                          <p className="text-blue-300 text-sm">
                            {recipient.accountNumber}
                          </p>
                          <p className="text-blue-400 text-xs">
                            {recipient.bankName}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Select</span>
                        <TiLocationArrow />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Enter Amount */}
          {step === 2 && selectedRecipient && (
            <div className="space-y-8">
              {/* Recipient Summary */}
              <div className="border-hsla rounded-lg p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
                <p className="font-circular-web text-blue-200 text-sm mb-4">
                  Sending to
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-black font-bold text-lg">
                    {selectedRecipient.avatar}
                  </div>
                  <div>
                    <p className="text-blue-50 font-bold text-lg">
                      {selectedRecipient.name}
                    </p>
                    <p className="text-blue-300 text-sm">
                      {selectedRecipient.accountNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block font-circular-web text-blue-50 text-sm mb-4">
                  Enter Amount
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-50 text-3xl font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg pl-14 pr-6 py-6 text-4xl font-bold text-blue-50 placeholder-blue-400 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block font-circular-web text-blue-50 text-sm mb-4">
                  Add a Note (Optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-6 py-4 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all resize-none"
                  placeholder="What's this transfer for?"
                  rows="3"
                />
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <p className="font-circular-web text-blue-50 text-sm mb-4">
                  Quick Amounts
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {[50, 100, 500, 1000].map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className="border-hsla rounded-lg py-3 bg-blue-900/20 hover:bg-yellow-300 hover:text-black text-blue-50 font-bold transition-all duration-300"
                    >
                      ${quickAmount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-hsla rounded-lg py-4 bg-blue-900/20 hover:bg-blue-900/40 text-blue-50 font-bold transition-all duration-300"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!amount}
                  className="flex-1 rounded-lg py-4 bg-yellow-300 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Review Transfer</span>
                  <TiLocationArrow />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-8 animate-pulse">
                <span className="text-4xl">✓</span>
              </div>
              <h2 className="special-font font-zentry font-black text-4xl text-blue-50 mb-4">
                Transfer Successful!
              </h2>
              <p className="font-robert-regular text-blue-200 text-center mb-2">
                ${amount} has been sent to {selectedRecipient?.name}
              </p>
              <p className="font-circular-web text-blue-300 text-sm">
                Redirecting to dashboard...
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SendMoneyPage;
