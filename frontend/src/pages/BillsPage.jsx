import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NavBar from "../components/Navbar";
import FooterEnhanced from "../components/FooterEnhanced";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(useGSAP);

const BillsPage = () => {
  const [bills, setBills] = useState([
    {
      id: 1,
      name: "Electricity Bill",
      provider: "City Power Co",
      amount: 145.50,
      dueDate: "2024-02-05",
      status: "Pending",
      icon: "⚡",
      accountNumber: "ACC-2024-001",
      lastPaid: "2024-01-05",
    },
    {
      id: 2,
      name: "Internet & Phone",
      provider: "FastNet ISP",
      amount: 89.99,
      dueDate: "2024-02-01",
      status: "Pending",
      icon: "📡",
      accountNumber: "ACC-2024-002",
      lastPaid: "2024-01-01",
    },
    {
      id: 3,
      name: "Water & Sewage",
      provider: "Water Authority",
      amount: 65.00,
      dueDate: "2024-02-10",
      status: "Pending",
      icon: "💧",
      accountNumber: "ACC-2024-003",
      lastPaid: "2024-01-10",
    },
    {
      id: 4,
      name: "Gas Bill",
      provider: "National Gas",
      amount: 95.75,
      dueDate: "2024-01-28",
      status: "Paid",
      icon: "🔥",
      accountNumber: "ACC-2024-004",
      lastPaid: "2024-01-28",
    },
    {
      id: 5,
      name: "Homeowners Insurance",
      provider: "SafeHome Insurance",
      amount: 250.00,
      dueDate: "2024-02-15",
      status: "Pending",
      icon: "🏠",
      accountNumber: "ACC-2024-005",
      lastPaid: "2024-01-15",
    },
    {
      id: 6,
      name: "Car Insurance",
      provider: "DriveGuard Insurance",
      amount: 180.00,
      dueDate: "2024-02-20",
      status: "Pending",
      icon: "🚗",
      accountNumber: "ACC-2024-006",
      lastPaid: "2024-01-20",
    },
  ]);

  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".bills-hero", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    })
      .from(".bill-item", {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.4");
  });

  const handlePayBill = (bill) => {
    setSelectedBill(bill);
    setShowPayModal(true);
  };

  const handleConfirmPayment = () => {
    if (selectedBill) {
      setBills(
        bills.map((bill) =>
          bill.id === selectedBill.id ? { ...bill, status: "Paid" } : bill
        )
      );
      setShowPayModal(false);
      setSelectedBill(null);
    }
  };

  const pendingBills = bills.filter((bill) => bill.status === "Pending");
  const paidBills = bills.filter((bill) => bill.status === "Paid");
  const totalPending = pendingBills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      <NavBar />

      {/* Hero Section */}
      <div className="bills-hero relative min-h-screen w-screen flex items-center justify-center px-5 sm:px-10 pt-20">
        <div className="text-center max-w-3xl">
          <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
            Bill Management
          </p>
          <h1 className="special-font font-zentry font-black text-5xl sm:text-6xl md:text-7xl text-blue-50 mb-6">
            Pay Your B<b>i</b>lls
          </h1>
          <p className="font-robert-regular text-blue-100 text-lg max-w-2xl mx-auto">
            Manage and pay all your bills with ease and convenience
          </p>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative py-20 px-5 sm:px-10 border-t border-blue-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
              Smart Payments
            </p>
            <h2 className="special-font font-zentry font-black text-4xl md:text-5xl text-blue-50">
              Never Miss a Payment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🔔", title: "Reminders", description: "Get notified before due dates" },
              { icon: "⏰", title: "Auto Pay", description: "Set up automatic payments" },
              { icon: "💳", title: "Multiple Cards", description: "Pay from any card" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm hover:from-blue-900/40 hover:to-purple-900/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="special-font font-zentry font-black text-xl text-blue-50 mb-2">
                  {feature.title}
                </h3>
                <p className="font-circular-web text-blue-300 text-sm">
                  {feature.description}
                </p>
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
            <div className="border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
              <p className="font-circular-web text-blue-200 text-sm mb-2">
                Total Bills
              </p>
              <p className="special-font font-zentry font-black text-3xl text-blue-50">
                {bills.length}
              </p>
            </div>

            <div className="border-hsla rounded-lg p-6 bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 backdrop-blur-sm">
              <p className="font-circular-web text-yellow-200 text-sm mb-2">
                Pending Amount
              </p>
              <p className="special-font font-zentry font-black text-3xl text-yellow-400">
                ${totalPending.toFixed(2)}
              </p>
            </div>

            <div className="border-hsla rounded-lg p-6 bg-gradient-to-br from-green-900/20 to-green-900/10 backdrop-blur-sm">
              <p className="font-circular-web text-green-200 text-sm mb-2">
                Paid This Month
              </p>
              <p className="special-font font-zentry font-black text-3xl text-green-400">
                ${paidBills.reduce((sum, bill) => sum + bill.amount, 0).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Pending Bills */}
          {pendingBills.length > 0 && (
            <div className="mb-12">
              <h2 className="special-font font-zentry font-black text-2xl text-blue-50 mb-6">
                Pending Bills ({pendingBills.length})
              </h2>
              <div className="space-y-4">
                {pendingBills.map((bill) => (
                  <div
                    key={bill.id}
                    className="bill-item border-hsla rounded-lg p-6 bg-gradient-to-r from-blue-900/10 to-purple-900/10 backdrop-blur-sm hover:from-blue-900/20 hover:to-purple-900/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{bill.icon}</div>
                        <div className="flex-1">
                          <p className="text-blue-50 font-bold">{bill.name}</p>
                          <p className="font-circular-web text-blue-300 text-sm">
                            {bill.provider}
                          </p>
                          <p className="font-circular-web text-blue-400 text-xs mt-2">
                            Due: {new Date(bill.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-400">
                          ${bill.amount.toFixed(2)}
                        </p>
                        <button
                          onClick={() => handlePayBill(bill)}
                          className="mt-3 px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all duration-300 text-sm"
                        >
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Paid Bills */}
          {paidBills.length > 0 && (
            <div>
              <h2 className="special-font font-zentry font-black text-2xl text-blue-50 mb-6">
                Paid Bills ({paidBills.length})
              </h2>
              <div className="space-y-4">
                {paidBills.map((bill) => (
                  <div
                    key={bill.id}
                    className="bill-item border-hsla rounded-lg p-6 bg-gradient-to-r from-green-900/10 to-green-900/5 backdrop-blur-sm opacity-75"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{bill.icon}</div>
                        <div className="flex-1">
                          <p className="text-blue-50 font-bold">{bill.name}</p>
                          <p className="font-circular-web text-blue-300 text-sm">
                            {bill.provider}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">
                          ${bill.amount.toFixed(2)}
                        </p>
                        <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                          ✓ Paid
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Payment Modal */}
      {showPayModal && selectedBill && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="border-hsla rounded-lg p-8 bg-gradient-to-br from-blue-950 to-black backdrop-blur-sm max-w-md w-full">
            <h3 className="special-font font-zentry font-black text-2xl text-blue-50 mb-6">
              Confirm Payment
            </h3>

            <div className="border-hsla rounded-lg p-6 bg-blue-900/20 backdrop-blur-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{selectedBill.icon}</div>
                <div>
                  <p className="text-blue-50 font-bold">{selectedBill.name}</p>
                  <p className="font-circular-web text-blue-300 text-sm">
                    {selectedBill.provider}
                  </p>
                </div>
              </div>

              <div className="border-t border-blue-900/30 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-circular-web text-blue-300">Amount</span>
                  <span className="text-blue-50 font-bold">
                    ${selectedBill.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-circular-web text-blue-300">Due Date</span>
                  <span className="text-blue-50 font-bold">
                    {new Date(selectedBill.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowPayModal(false)}
                className="flex-1 border-hsla rounded-lg py-3 bg-blue-900/20 hover:bg-blue-900/40 text-blue-50 font-bold transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 rounded-lg py-3 bg-yellow-300 hover:bg-yellow-400 text-black font-bold transition-all duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterEnhanced />
    </div>
  );
};

export default BillsPage;
