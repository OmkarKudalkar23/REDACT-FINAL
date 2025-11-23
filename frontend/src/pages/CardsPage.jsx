import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NavBar from "../components/Navbar";
import FooterEnhanced from "../components/FooterEnhanced";

gsap.registerPlugin(useGSAP);

const CardsPage = () => {
  const [cards] = useState([
    {
      id: 1,
      type: "Premium Debit",
      cardNumber: "4532123456789012",
      cardHolder: "John Doe",
      expiryDate: "12/26",
      balance: 45250.75,
      color: "from-blue-600 to-blue-800",
      status: "Active",
      dailyLimit: 5000,
      spentToday: 1250,
      issuer: "Visa",
    },
    {
      id: 2,
      type: "Rewards Credit",
      cardNumber: "5425123456789012",
      cardHolder: "John Doe",
      expiryDate: "08/25",
      balance: 8500.0,
      color: "from-purple-600 to-purple-800",
      status: "Active",
      creditLimit: 25000,
      availableCredit: 16500,
      issuer: "Mastercard",
    },
    {
      id: 3,
      type: "Travel Card",
      cardNumber: "3782822463100005",
      cardHolder: "John Doe",
      expiryDate: "03/27",
      balance: 2150.00,
      color: "from-green-600 to-green-800",
      status: "Active",
      creditLimit: 15000,
      availableCredit: 12850,
      issuer: "American Express",
    },
  ]);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".cards-hero", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    })
      .from(".card-item", {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.4");
  });

  const maskCardNumber = (cardNumber) => {
    return `**** **** **** ${cardNumber.slice(-4)}`;
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      <NavBar />

      {/* Hero Section */}
      <div className="cards-hero relative min-h-screen w-screen flex items-center justify-center px-5 sm:px-10 pt-20">
        <div className="text-center max-w-3xl">
          <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
            Card Management
          </p>
          <h1 className="special-font font-zentry font-black text-5xl sm:text-6xl md:text-7xl text-blue-50 mb-6">
            Your C<b>a</b>rds
          </h1>
          <p className="font-robert-regular text-blue-100 text-lg max-w-2xl mx-auto">
            Manage all your debit and credit cards in one secure place
          </p>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative py-20 px-5 sm:px-10 border-t border-blue-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
              Card Features
            </p>
            <h2 className="special-font font-zentry font-black text-4xl md:text-5xl text-blue-50">
              Control Your Cards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🔒", title: "Instant Lock", description: "Lock/unlock cards instantly" },
              { icon: "🌍", title: "Global Use", description: "Use anywhere in the world" },
              { icon: "💳", title: "Virtual Cards", description: "Create virtual card numbers" },
              { icon: "📱", title: "Mobile Pay", description: "Add to Apple Pay & Google Pay" },
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
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`card-item bg-gradient-to-br ${card.color} rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
              >
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Card Type</p>
                    <p className="text-lg font-bold">{card.type}</p>
                  </div>
                  <div className="text-3xl">💳</div>
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
                    <p className="text-lg font-bold">{card.cardHolder}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100 text-xs mb-1">Expires</p>
                    <p className="text-lg font-mono">{card.expiryDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Card Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-hsla rounded-lg p-6 bg-gradient-to-br from-green-900/20 to-green-900/10 backdrop-blur-sm">
              <p className="font-circular-web text-green-200 text-sm mb-2">
                Total Card Balance
              </p>
              <p className="special-font font-zentry font-black text-3xl text-green-400">
                ${cards.reduce((sum, card) => sum + card.balance, 0).toFixed(2)}
              </p>
            </div>

            <div className="border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-blue-900/10 backdrop-blur-sm">
              <p className="font-circular-web text-blue-200 text-sm mb-2">
                Active Cards
              </p>
              <p className="special-font font-zentry font-black text-3xl text-blue-400">
                {cards.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterEnhanced />
    </div>
  );
};

export default CardsPage;
