import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";

const FooterEnhanced = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Send Money", href: "/send-money" },
    { label: "Transactions", href: "/transactions" },
    { label: "Cards", href: "/cards" },
    { label: "Investments", href: "/investments" },
    { label: "Bills", href: "/bills" },
  ];

  const company = [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#careers" },
    { label: "Blog", href: "#blog" },
    { label: "Press", href: "#press" },
    { label: "Contact", href: "#contact" },
  ];

  const support = [
    { label: "Help Center", href: "#help" },
    { label: "FAQ", href: "#faq" },
    { label: "Security", href: "#security" },
    { label: "Status", href: "#status" },
    { label: "Community", href: "#community" },
  ];

  const legal = [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Cookie Policy", href: "#cookies" },
    { label: "Compliance", href: "#compliance" },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "https://facebook.com", label: "Facebook" },
    { icon: <FaTwitter />, href: "https://twitter.com", label: "Twitter" },
    { icon: <FaLinkedin />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaInstagram />, href: "https://instagram.com", label: "Instagram" },
    { icon: <FaYoutube />, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="relative w-full bg-black border-t border-blue-900/30 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-black to-black pointer-events-none" />

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-blue-900/30 py-12 px-5 sm:px-10">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="special-font font-zentry font-black text-3xl md:text-4xl text-blue-50 mb-3">
                  Stay Updated
                </h3>
                <p className="font-circular-web text-blue-200 text-sm md:text-base">
                  Get the latest banking insights, security tips, and exclusive offers delivered to your inbox.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-3 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all font-circular-web text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-yellow-300 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <TiLocationArrow />
                </button>
              </form>

              {subscribed && (
                <div className="md:col-span-2 text-center text-green-400 font-bold text-sm">
                  ✓ Thank you for subscribing!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 px-5 sm:px-10">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <h2 className="special-font font-zentry font-black text-2xl text-blue-50 mb-2">
                    BankHub
                  </h2>
                  <p className="font-circular-web text-blue-300 text-sm">
                    Modern banking for everyone. Secure, fast, and transparent.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      className="w-10 h-10 rounded-full bg-blue-900/20 hover:bg-yellow-300 text-blue-300 hover:text-black flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-blue-50 mb-4 text-sm uppercase tracking-wider">
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.href}
                        className="font-circular-web text-blue-300 hover:text-yellow-300 text-sm transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-bold text-blue-50 mb-4 text-sm uppercase tracking-wider">
                  Company
                </h4>
                <ul className="space-y-3">
                  {company.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className="font-circular-web text-blue-300 hover:text-yellow-300 text-sm transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-bold text-blue-50 mb-4 text-sm uppercase tracking-wider">
                  Support
                </h4>
                <ul className="space-y-3">
                  {support.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className="font-circular-web text-blue-300 hover:text-yellow-300 text-sm transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-bold text-blue-50 mb-4 text-sm uppercase tracking-wider">
                  Legal
                </h4>
                <ul className="space-y-3">
                  {legal.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className="font-circular-web text-blue-300 hover:text-yellow-300 text-sm transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-blue-900/30 my-8" />

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="font-circular-web text-blue-300 text-xs md:text-sm">
                  © 2024 BankHub. All rights reserved.
                </p>
              </div>

              {/* Certifications */}
              <div className="text-center">
                <div className="flex justify-center gap-4 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-900/20 text-blue-300 text-xs font-bold">
                    🔒 SSL Encrypted
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-900/20 text-blue-300 text-xs font-bold">
                    ✓ FDIC Insured
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-900/20 text-blue-300 text-xs font-bold">
                    🛡️ PCI Compliant
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="text-center md:text-right">
                <p className="font-circular-web text-blue-300 text-xs md:text-sm mb-2">
                  Need help?
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-400 font-bold text-sm transition-colors"
                >
                  <span>Contact Support</span>
                  <TiLocationArrow className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-blue-900/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                <div>
                  <p className="font-bold text-blue-50 text-sm mb-1">24/7 Customer Support</p>
                  <p className="font-circular-web text-blue-300 text-xs">
                    Available via chat, email, and phone
                  </p>
                </div>
                <div>
                  <p className="font-bold text-blue-50 text-sm mb-1">Bank-Grade Security</p>
                  <p className="font-circular-web text-blue-300 text-xs">
                    Military-grade encryption for your protection
                  </p>
                </div>
                <div>
                  <p className="font-bold text-blue-50 text-sm mb-1">Zero Hidden Fees</p>
                  <p className="font-circular-web text-blue-300 text-xs">
                    Transparent pricing, no surprises
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-900/30 py-4 px-5 sm:px-10 bg-blue-900/5">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-circular-web text-blue-300">
              <p>
                BankHub is a financial technology company, not a bank. Banking services provided by partner banks.
              </p>
              <p>
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterEnhanced;
