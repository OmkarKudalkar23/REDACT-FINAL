import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { FiPlus, FiLock, FiUnlock, FiX, FiEye, FiEyeOff } from "react-icons/fi";

const Cards = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      type: "Debit",
      cardNumber: "4532123456789012",
      cardHolder: "John Doe",
      expiryDate: "12/26",
      cvv: "123",
      balance: 5250.75,
      isLocked: false,
      color: "from-blue-600 to-blue-800",
      icon: "💳",
    },
    {
      id: 2,
      type: "Credit",
      cardNumber: "5425123456789012",
      cardHolder: "John Doe",
      expiryDate: "08/25",
      cvv: "456",
      balance: 8500.0,
      isLocked: false,
      color: "from-purple-600 to-purple-800",
      icon: "💰",
    },
  ]);

  const [showCardDetails, setShowCardDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCVV, setShowCVV] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  const handleLockCard = (cardId) => {
    setCards(
      cards.map((card) =>
        card.id === cardId ? { ...card, isLocked: !card.isLocked } : card
      )
    );
  };

  const maskCardNumber = (cardNumber) => {
    return `**** **** **** ${cardNumber.slice(-4)}`;
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowCardDetails(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-50 mb-2">My Cards</h1>
          <p className="text-blue-200">Manage your debit and credit cards</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`bg-gradient-to-br ${card.color} rounded-2xl p-8 text-white shadow-lg cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105`}
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Card Type</p>
                  <p className="text-lg font-semibold">{card.type}</p>
                </div>
                <div className="text-3xl">{card.icon}</div>
              </div>

              <div className="mb-8">
                <p className="text-blue-100 text-xs mb-2">Card Number</p>
                <p className="text-2xl font-mono tracking-widest">
                  {maskCardNumber(card.cardNumber)}
                </p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-blue-100 text-xs mb-1">Card Holder</p>
                  <p className="text-lg font-semibold">{card.cardHolder}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-xs mb-1">Expires</p>
                  <p className="text-lg font-mono">{card.expiryDate}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Card Button */}
          <button
            onClick={() => setShowAddCard(true)}
            className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-dashed border-blue-600 rounded-2xl p-8 text-white hover:border-blue-400 hover:bg-blue-900/40 transition-all flex flex-col items-center justify-center gap-4"
          >
            <FiPlus className="w-12 h-12" />
            <p className="text-lg font-semibold">Add New Card</p>
          </button>
        </div>

        {/* Card Management Section */}
        <div>
          <h2 className="text-xl font-bold text-blue-50 mb-4">
            Card Management
          </h2>
          <div className="space-y-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 border border-blue-900/20 rounded-lg p-4 flex items-center justify-between hover:border-blue-900/40 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{card.icon}</div>
                  <div>
                    <p className="text-blue-50 font-semibold">
                      {card.type} Card - {maskCardNumber(card.cardNumber)}
                    </p>
                    <p className="text-blue-300 text-sm">
                      Expires {card.expiryDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLockCard(card.id)}
                    className={`p-2 rounded-lg transition-all ${
                      card.isLocked
                        ? "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                        : "bg-green-900/30 text-green-400 hover:bg-green-900/50"
                    }`}
                  >
                    {card.isLocked ? (
                      <FiLock className="w-5 h-5" />
                    ) : (
                      <FiUnlock className="w-5 h-5" />
                    )}
                  </button>
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      card.isLocked
                        ? "bg-red-900/30 text-red-400"
                        : "bg-green-900/30 text-green-400"
                    }`}
                  >
                    {card.isLocked ? "Locked" : "Active"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-900/20 to-green-900/10 border border-green-900/30 rounded-xl p-6">
            <p className="text-green-200 text-sm mb-2">Total Card Balance</p>
            <p className="text-3xl font-bold text-green-400">
              ${cards.reduce((sum, card) => sum + card.balance, 0).toFixed(2)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-900/30 rounded-xl p-6">
            <p className="text-blue-200 text-sm mb-2">Active Cards</p>
            <p className="text-3xl font-bold text-blue-400">
              {cards.filter((c) => !c.isLocked).length}/{cards.length}
            </p>
          </div>
        </div>
      </div>

      {/* Card Details Modal */}
      {showCardDetails && selectedCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-blue-950 to-black border border-blue-900/30 rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-blue-50">Card Details</h3>
              <button
                onClick={() => setShowCardDetails(false)}
                className="text-blue-300 hover:text-blue-50"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className={`bg-gradient-to-br ${selectedCard.color} rounded-xl p-6 text-white mb-6`}>
              <p className="text-blue-100 text-sm mb-4">Card Number</p>
              <p className="text-2xl font-mono tracking-widest mb-8">
                {selectedCard.cardNumber}
              </p>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-blue-100 text-xs mb-1">Card Holder</p>
                  <p className="font-semibold">{selectedCard.cardHolder}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-xs mb-1">Expires</p>
                  <p className="font-mono">{selectedCard.expiryDate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-blue-900/20 border border-blue-900/30 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-300">CVV</span>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-50 font-mono">
                      {showCVV ? selectedCard.cvv : "***"}
                    </span>
                    <button
                      onClick={() => setShowCVV(!showCVV)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {showCVV ? (
                        <FiEyeOff className="w-4 h-4" />
                      ) : (
                        <FiEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-900/30 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-300">Card Balance</span>
                  <span className="text-blue-50 font-semibold">
                    ${selectedCard.balance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCardDetails(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-blue-950 to-black border border-blue-900/30 rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-blue-50">Add New Card</h3>
              <button
                onClick={() => setShowAddCard(false)}
                className="text-blue-300 hover:text-blue-50"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-blue-50 text-sm font-medium mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-blue-50 text-sm font-medium mb-2">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-blue-50 text-sm font-medium mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-blue-50 text-sm font-medium mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowAddCard(false)}
                  className="flex-1 bg-blue-900/30 hover:bg-blue-900/50 text-blue-50 font-semibold py-2 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddCard(false)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all"
                >
                  Add Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Cards;
