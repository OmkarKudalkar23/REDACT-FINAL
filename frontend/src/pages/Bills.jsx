import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { FiPlus, FiX, FiCheck, FiClock } from "react-icons/fi";

const Bills = () => {
  const [bills, setBills] = useState([
    {
      id: 1,
      name: "Electricity Bill",
      provider: "City Power Co",
      amount: 125.5,
      dueDate: "2024-02-05",
      status: "Pending",
      frequency: "Monthly",
      icon: "⚡",
    },
    {
      id: 2,
      name: "Internet Bill",
      provider: "FastNet ISP",
      amount: 79.99,
      dueDate: "2024-01-25",
      status: "Paid",
      frequency: "Monthly",
      icon: "📡",
    },
    {
      id: 3,
      name: "Water Bill",
      provider: "Water Authority",
      amount: 45.0,
      dueDate: "2024-02-10",
      status: "Pending",
      frequency: "Monthly",
      icon: "💧",
    },
    {
      id: 4,
      name: "Mobile Bill",
      provider: "TeleCom Plus",
      amount: 49.99,
      dueDate: "2024-01-30",
      status: "Pending",
      frequency: "Monthly",
      icon: "📱",
    },
    {
      id: 5,
      name: "Insurance Premium",
      provider: "SafeGuard Insurance",
      amount: 199.99,
      dueDate: "2024-02-15",
      status: "Pending",
      frequency: "Monthly",
      icon: "🛡️",
    },
  ]);

  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayBill = (bill) => {
    setSelectedBill(bill);
    setPaymentAmount(bill.amount.toString());
    setShowPayModal(true);
  };

  const handleConfirmPayment = () => {
    if (paymentAmount && selectedBill) {
      setBills(
        bills.map((bill) =>
          bill.id === selectedBill.id ? { ...bill, status: "Paid" } : bill
        )
      );
      setPaymentSuccess(true);
      setTimeout(() => {
        setShowPayModal(false);
        setPaymentSuccess(false);
        setSelectedBill(null);
        setPaymentAmount("");
      }, 2000);
    }
  };

  const pendingBills = bills.filter((bill) => bill.status === "Pending");
  const paidBills = bills.filter((bill) => bill.status === "Paid");
  const totalPending = pendingBills.reduce((sum, bill) => sum + bill.amount, 0);

  const getStatusColor = (status) => {
    return status === "Paid"
      ? "bg-green-900/30 text-green-400 border-green-900/30"
      : "bg-yellow-900/30 text-yellow-400 border-yellow-900/30";
  };

  const getStatusIcon = (status) => {
    return status === "Paid" ? (
      <FiCheck className="w-4 h-4" />
    ) : (
      <FiClock className="w-4 h-4" />
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-50 mb-2">
            Bills & Payments
          </h1>
          <p className="text-blue-200">Manage and pay your bills easily</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-900/30 rounded-xl p-6">
            <p className="text-blue-200 text-sm mb-2">Total Bills</p>
            <p className="text-3xl font-bold text-blue-50">{bills.length}</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 border border-yellow-900/30 rounded-xl p-6">
            <p className="text-yellow-200 text-sm mb-2">Pending Amount</p>
            <p className="text-3xl font-bold text-yellow-400">
              ${totalPending.toFixed(2)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-green-900/10 border border-green-900/30 rounded-xl p-6">
            <p className="text-green-200 text-sm mb-2">Paid This Month</p>
            <p className="text-3xl font-bold text-green-400">
              ${paidBills.reduce((sum, bill) => sum + bill.amount, 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Pending Bills */}
        {pendingBills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-blue-50 mb-4">
              Pending Bills ({pendingBills.length})
            </h2>
            <div className="space-y-3">
              {pendingBills.map((bill) => (
                <div
                  key={bill.id}
                  className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 border border-blue-900/20 rounded-lg p-4 hover:border-blue-900/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{bill.icon}</div>
                      <div className="flex-1">
                        <p className="text-blue-50 font-semibold">
                          {bill.name}
                        </p>
                        <p className="text-blue-300 text-sm">{bill.provider}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-blue-400">
                            Due: {new Date(bill.dueDate).toLocaleDateString()}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium border flex items-center gap-1 ${getStatusColor(bill.status)}`}>
                            {getStatusIcon(bill.status)}
                            {bill.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-yellow-400">
                        ${bill.amount.toFixed(2)}
                      </p>
                      <button
                        onClick={() => handlePayBill(bill)}
                        className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-lg transition-all"
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
            <h2 className="text-xl font-bold text-blue-50 mb-4">
              Paid Bills ({paidBills.length})
            </h2>
            <div className="space-y-3">
              {paidBills.map((bill) => (
                <div
                  key={bill.id}
                  className="bg-gradient-to-r from-green-900/10 to-green-900/5 border border-green-900/20 rounded-lg p-4 opacity-75"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{bill.icon}</div>
                      <div className="flex-1">
                        <p className="text-blue-50 font-semibold">
                          {bill.name}
                        </p>
                        <p className="text-blue-300 text-sm">{bill.provider}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-blue-400">
                            Paid: {new Date(bill.dueDate).toLocaleDateString()}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium border flex items-center gap-1 ${getStatusColor(bill.status)}`}>
                            {getStatusIcon(bill.status)}
                            {bill.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">
                        ${bill.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Bill Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
          <FiPlus className="w-5 h-5" />
          Add New Bill
        </button>
      </div>

      {/* Payment Modal */}
      {showPayModal && selectedBill && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-blue-950 to-black border border-blue-900/30 rounded-2xl p-8 max-w-md w-full mx-4">
            {paymentSuccess ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mb-4 animate-pulse">
                  <FiCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-50 mb-2">
                  Payment Successful!
                </h3>
                <p className="text-blue-200 text-center">
                  ${paymentAmount} paid to {selectedBill.provider}
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-blue-50">
                    Confirm Payment
                  </h3>
                  <button
                    onClick={() => setShowPayModal(false)}
                    className="text-blue-300 hover:text-blue-50"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                <div className="bg-blue-900/20 border border-blue-900/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{selectedBill.icon}</div>
                    <div>
                      <p className="text-blue-50 font-semibold">
                        {selectedBill.name}
                      </p>
                      <p className="text-blue-300 text-sm">
                        {selectedBill.provider}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-blue-900/30 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-blue-300">Amount</span>
                      <span className="text-blue-50 font-semibold">
                        ${paymentAmount}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-blue-300">Due Date</span>
                      <span className="text-blue-50 font-semibold">
                        {new Date(selectedBill.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">From Account</span>
                      <span className="text-blue-50 font-semibold">
                        ****2847
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowPayModal(false)}
                    className="flex-1 bg-blue-900/30 hover:bg-blue-900/50 text-blue-50 font-semibold py-2 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all"
                  >
                    Confirm Payment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Bills;
