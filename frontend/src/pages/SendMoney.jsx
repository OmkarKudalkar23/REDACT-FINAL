import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { FiSearch, FiPlus, FiX, FiCheck } from "react-icons/fi";

const SendMoney = () => {
  const [step, setStep] = useState(1);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [showAddRecipient, setShowAddRecipient] = useState(false);
  const [newRecipient, setNewRecipient] = useState({
    name: "",
    accountNumber: "",
    bankName: "",
  });

  const [recipients, setRecipients] = useState([
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

  const handleAddRecipient = () => {
    if (
      newRecipient.name &&
      newRecipient.accountNumber &&
      newRecipient.bankName
    ) {
      const recipient = {
        id: recipients.length + 1,
        ...newRecipient,
        avatar: newRecipient.name
          .split(" ")
          .map((n) => n[0])
          .join(""),
      };
      setRecipients([...recipients, recipient]);
      setNewRecipient({ name: "", accountNumber: "", bankName: "" });
      setShowAddRecipient(false);
    }
  };

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
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-50 mb-2">Send Money</h1>
          <p className="text-blue-200">
            Transfer funds to your contacts quickly and securely
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s
                    ? "bg-blue-600 text-white"
                    : "bg-blue-900/30 text-blue-300"
                }`}
              >
                {step > s ? <FiCheck /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded transition-all ${
                    step > s ? "bg-blue-600" : "bg-blue-900/30"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Recipient */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search recipients..."
                className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg pl-12 pr-4 py-3 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              />
            </div>

            {/* Recent Recipients */}
            <div>
              <h2 className="text-lg font-semibold text-blue-50 mb-4">
                Your Contacts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recipients.map((recipient) => (
                  <button
                    key={recipient.id}
                    onClick={() => {
                      setSelectedRecipient(recipient);
                      setStep(2);
                    }}
                    className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-lg p-4 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/20 transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold">
                        {recipient.avatar}
                      </div>
                      <div>
                        <p className="text-blue-50 font-semibold">
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
                  </button>
                ))}
              </div>
            </div>

            {/* Add New Recipient */}
            <button
              onClick={() => setShowAddRecipient(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <FiPlus className="w-5 h-5" />
              Add New Recipient
            </button>

            {/* Add Recipient Modal */}
            {showAddRecipient && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-blue-950 to-black border border-blue-900/30 rounded-2xl p-8 max-w-md w-full mx-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-blue-50">
                      Add New Recipient
                    </h3>
                    <button
                      onClick={() => setShowAddRecipient(false)}
                      className="text-blue-300 hover:text-blue-50"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-blue-50 text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={newRecipient.name}
                        onChange={(e) =>
                          setNewRecipient({
                            ...newRecipient,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-blue-50 text-sm font-medium mb-2">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={newRecipient.accountNumber}
                        onChange={(e) =>
                          setNewRecipient({
                            ...newRecipient,
                            accountNumber: e.target.value,
                          })
                        }
                        className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        placeholder="1234567890"
                      />
                    </div>

                    <div>
                      <label className="block text-blue-50 text-sm font-medium mb-2">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        value={newRecipient.bankName}
                        onChange={(e) =>
                          setNewRecipient({
                            ...newRecipient,
                            bankName: e.target.value,
                          })
                        }
                        className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        placeholder="BankHub"
                      />
                    </div>

                    <button
                      onClick={handleAddRecipient}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all"
                    >
                      Add Recipient
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Enter Amount */}
        {step === 2 && selectedRecipient && (
          <div className="space-y-6">
            {/* Recipient Summary */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-lg p-6">
              <p className="text-blue-200 text-sm mb-2">Sending to</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold">
                  {selectedRecipient.avatar}
                </div>
                <div>
                  <p className="text-blue-50 font-semibold">
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
              <label className="block text-blue-50 text-sm font-medium mb-2">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-50 text-2xl font-bold">
                  $
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg pl-10 pr-4 py-4 text-3xl font-bold text-blue-50 placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-blue-50 text-sm font-medium mb-2">
                Note (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-3 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none"
                placeholder="Add a note for this transfer..."
                rows="3"
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[50, 100, 500, 1000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="bg-blue-900/30 hover:bg-blue-600 text-blue-50 font-semibold py-2 rounded-lg transition-all"
                >
                  ${quickAmount}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-blue-900/30 hover:bg-blue-900/50 text-blue-50 font-semibold py-3 rounded-lg transition-all"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!amount}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all"
              >
                Review Transfer
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mb-6 animate-pulse">
              <FiCheck className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-blue-50 mb-2">
              Transfer Successful!
            </h2>
            <p className="text-blue-200 text-center mb-4">
              ${amount} has been sent to {selectedRecipient?.name}
            </p>
            <p className="text-blue-300 text-sm">
              Redirecting to dashboard...
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SendMoney;
