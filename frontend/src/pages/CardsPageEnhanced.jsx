import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NavBar from "../components/Navbar";
import FooterEnhanced from "../components/FooterEnhanced";
import { FiCreditCard, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

gsap.registerPlugin(useGSAP);

const CardsPageEnhanced = () => {
  const [cards] = useState([
    {
      id: 1,
      type: "Premium Debit",
      cardNumber: "4532123456789012",
      cardHolder: "John Doe",
      expiryDate: "12/26",
      cvv: "***",
      balance: 45250.75,
      status: "Active",
      color: "from-blue-600 to-blue-800",
      icon: "💳",
      limit: 50000,
      spent: 4750,
    },
    {
      id: 2,
      type: "Platinum Credit",
      cardNumber: "5425233010103010",
      cardHolder: "John Doe",
      expiryDate: "08/25",
      cvv: "***",
      balance: 125340.50,
      status: "Active",
      color: "from-purple-600 to-purple-800",
      icon: "👑",
      limit: 100000,
      spent: 25340,
    },
    {
      id: 3,
      type: "Business Card",
      cardNumber: "6011111111111117",
      cardHolder: "John Doe",
      expiryDate: "03/27",
      cvv: "***",
      balance: 287500.00,
      status: "Active",
      color: "from-green-600 to-green-800",
      icon: "💼",
      limit: 250000,
      spent: 12500,
    },
    {
      id: 4,
      type: "Travel Card",
      cardNumber: "3782822463100005",
      cardHolder: "John Doe",
      expiryDate: "06/28",
      cvv: "***",
      balance: 89750.25,
      status: "Active",
      color: "from-orange-600 to-orange-800",
      icon: "✈️",
      limit: 75000,
      spent: 5250,
    },
  ]);

  const [visibleCVV, setVisibleCVV] = useState({});
  const [selectedCard, setSelectedCard] = useState(0);

  useGSAP(() => {
    // Hero content animation
    gsap.from(".cards-hero-content", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
    });

    // Card container animation - fade in only
    gsap.from(".card-container", {
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.2,
    });

    // Stat cards animation - fade in only
    gsap.from(".stat-card", {
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.3,
    });
  });

  const toggleCVV = (cardId) => {
    setVisibleCVV((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <div className="relative min-h-screen w-screen bg-black overflow-x-hidden">
      <NavBar />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10" />

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="relative px-5 sm:px-10 py-20">
          <div className="cards-hero-content max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
                Payment Methods
              </p>
              <h1 className="special-font font-zentry font-black text-5xl text-blue-50 mb-4">
                Your <b>Cards</b>
              </h1>
              <p className="font-circular-web text-blue-200 max-w-2xl">
                Manage all your payment cards in one secure place
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  onClick={() => setSelectedCard(index)}
                  className={`card-container group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${
                    selectedCard === index ? "ring-2 ring-yellow-300 scale-105" : "hover:scale-102"
                  }`}
                >
                  {/* Card Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-90`}
                  />

                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                    {/* Top Section */}
                    <div>
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <p className="text-white/80 text-sm font-circular-web mb-1">
                            {card.type}
                          </p>
                          <p className="text-2xl">{card.icon}</p>
                        </div>
                        <FiCreditCard className="text-white/80 text-2xl" />
                      </div>

                      {/* Card Number */}
                      <p className="text-white text-2xl font-mono tracking-widest mb-8">
                        {card.cardNumber.slice(0, 4)} •••• •••• {card.cardNumber.slice(-4)}
                      </p>
                    </div>

                    {/* Bottom Section */}
                    <div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white/60 text-xs font-circular-web mb-1">
                            Card Holder
                          </p>
                          <p className="text-white font-bold">{card.cardHolder}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/60 text-xs font-circular-web mb-1">
                            Expires
                          </p>
                          <p className="text-white font-bold">{card.expiryDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/10 to-transparent" />
                </div>
              ))}
            </div>

            {/* Selected Card Details */}
            {cards[selectedCard] && (
              <div className="stat-card group relative overflow-hidden border-hsla rounded-lg p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm mb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <h3 className="special-font font-zentry font-black text-2xl text-blue-50 mb-6">
                    {cards[selectedCard].type} Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card Info */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-blue-300 text-sm font-circular-web mb-1">
                          Card Number
                        </p>
                        <p className="text-blue-50 font-mono text-lg">
                          {cards[selectedCard].cardNumber.slice(0, 4)} •••• •••• {cards[selectedCard].cardNumber.slice(-4)}
                        </p>
                      </div>

                      <div>
                        <p className="text-blue-300 text-sm font-circular-web mb-1">
                          Card Holder
                        </p>
                        <p className="text-blue-50 font-bold">
                          {cards[selectedCard].cardHolder}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-blue-300 text-sm font-circular-web mb-1">
                            Expiry Date
                          </p>
                          <p className="text-blue-50 font-bold">
                            {cards[selectedCard].expiryDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-blue-300 text-sm font-circular-web mb-1">
                            CVV
                          </p>
                          <button
                            onClick={() => toggleCVV(cards[selectedCard].id)}
                            className="flex items-center gap-2 text-blue-50 font-bold hover:text-yellow-300 transition-colors"
                          >
                            {visibleCVV[cards[selectedCard].id] ? (
                              <>
                                {cards[selectedCard].cvv.replace(/\*/g, "8")}
                                <FiEyeOff size={16} />
                              </>
                            ) : (
                              <>
                                {cards[selectedCard].cvv}
                                <FiEye size={16} />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Usage Stats */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-blue-300 text-sm font-circular-web mb-2">
                          Credit Limit
                        </p>
                        <p className="text-blue-50 font-bold text-lg mb-2">
                          ${cards[selectedCard].limit.toLocaleString()}
                        </p>
                        <div className="w-full bg-blue-900/30 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                            style={{
                              width: `${((cards[selectedCard].limit - cards[selectedCard].spent) / cards[selectedCard].limit) * 100}%`,
                            }}
                          />
                        </div>
                        <p className="text-blue-300 text-xs mt-2">
                          Available: ${(cards[selectedCard].limit - cards[selectedCard].spent).toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-blue-300 text-sm font-circular-web mb-2">
                          Amount Spent
                        </p>
                        <p className="text-red-400 font-bold text-lg">
                          ${cards[selectedCard].spent.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-blue-300 text-sm font-circular-web mb-2">
                          Status
                        </p>
                        <span className="inline-block px-4 py-2 bg-green-900/30 text-green-400 rounded-full text-sm font-bold">
                          {cards[selectedCard].status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="stat-card group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-blue-900/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <p className="font-circular-web text-blue-200 text-sm mb-2">
                    Total Cards
                  </p>
                  <p className="special-font font-zentry font-black text-3xl text-blue-50">
                    {cards.length}
                  </p>
                </div>
              </div>

              <div className="stat-card group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-green-900/20 to-green-900/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <p className="font-circular-web text-green-200 text-sm mb-2">
                    Active Cards
                  </p>
                  <p className="special-font font-zentry font-black text-3xl text-green-400">
                    {cards.filter((c) => c.status === "Active").length}
                  </p>
                </div>
              </div>

              <div className="stat-card group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-purple-900/20 to-purple-900/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <p className="font-circular-web text-purple-200 text-sm mb-2">
                    Total Limit
                  </p>
                  <p className="special-font font-zentry font-black text-2xl text-purple-400">
                    ${cards.reduce((sum, c) => sum + c.limit, 0).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="stat-card group relative overflow-hidden border-hsla rounded-lg p-6 bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
                <div className="relative z-10">
                  <p className="font-circular-web text-yellow-200 text-sm mb-2">
                    Total Spent
                  </p>
                  <p className="special-font font-zentry font-black text-2xl text-yellow-400">
                    ${cards.reduce((sum, c) => sum + c.spent, 0).toLocaleString()}
                  </p>
                </div>
              </div>
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

export default CardsPageEnhanced;
