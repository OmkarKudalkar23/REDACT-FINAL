import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NavBar from "../components/Navbar";
import FooterEnhanced from "../components/FooterEnhanced";

gsap.registerPlugin(useGSAP);

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    address: "123 Main Street, New York, NY 10001",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    accountNumber: "ACC-2024-123456",
    memberSince: "January 2020",
  });

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".settings-hero", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    })
      .from(".settings-content", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4");
  });

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      <NavBar />

      {/* Hero Section */}
      <div className="settings-hero relative min-h-screen w-screen flex items-center justify-center px-5 sm:px-10 pt-20">
        <div className="text-center max-w-3xl">
          <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
            Account Settings
          </p>
          <h1 className="special-font font-zentry font-black text-5xl sm:text-6xl md:text-7xl text-blue-50 mb-6">
            Manage Your Account
          </h1>
          <p className="font-robert-regular text-blue-100 text-lg max-w-2xl mx-auto">
            Update your profile, security, and preferences
          </p>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative py-20 px-5 sm:px-10 border-t border-blue-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
              Account Control
            </p>
            <h2 className="special-font font-zentry font-black text-4xl md:text-5xl text-blue-50">
              Customize Your Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🔐", title: "Security", description: "Protect your account" },
              { icon: "🔔", title: "Notifications", description: "Stay informed" },
              { icon: "🛡️", title: "Privacy", description: "Control your data" },
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
      <section className="settings-content relative py-20 px-5 sm:px-10">
        <div className="container mx-auto max-w-4xl">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-12 border-b border-blue-900/30 pb-6">
            {[
              { id: "profile", label: "Profile" },
              { id: "security", label: "Security" },
              { id: "notifications", label: "Notifications" },
              { id: "privacy", label: "Privacy" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-yellow-300 text-black"
                    : "border-hsla bg-blue-900/20 text-blue-50 hover:bg-blue-900/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              {/* Profile Picture */}
              <div className="border-hsla rounded-lg p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
                <h3 className="special-font font-zentry font-black text-2xl text-blue-50 mb-6">
                  Profile Picture
                </h3>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-black text-3xl font-bold">
                    JD
                  </div>
                  <div className="space-y-2">
                    <button className="px-6 py-2 bg-yellow-300 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all duration-300">
                      Upload Photo
                    </button>
                    <button className="px-6 py-2 border-hsla bg-blue-900/20 hover:bg-blue-900/40 text-blue-50 font-bold rounded-lg transition-all duration-300">
                      Remove Photo
                    </button>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="border-hsla rounded-lg p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
                <h3 className="special-font font-zentry font-black text-2xl text-blue-50 mb-6">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-circular-web text-blue-50 text-sm mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) =>
                        handleProfileChange("firstName", e.target.value)
                      }
                      className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-circular-web text-blue-50 text-sm mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) =>
                        handleProfileChange("lastName", e.target.value)
                      }
                      className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-circular-web text-blue-50 text-sm mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        handleProfileChange("email", e.target.value)
                      }
                      className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-circular-web text-blue-50 text-sm mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        handleProfileChange("phone", e.target.value)
                      }
                      className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-circular-web text-blue-50 text-sm mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) =>
                        handleProfileChange("dateOfBirth", e.target.value)
                      }
                      className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-circular-web text-blue-50 text-sm mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={profile.accountNumber}
                      disabled
                      className="w-full bg-blue-900/10 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-300 cursor-not-allowed"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-circular-web text-blue-50 text-sm mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) =>
                        handleProfileChange("address", e.target.value)
                      }
                      className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-circular-web text-blue-50 text-sm mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={profile.city}
                      onChange={(e) =>
                        handleProfileChange("city", e.target.value)
                      }
                      className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-circular-web text-blue-50 text-sm mb-2">
                      State / Province
                    </label>
                    <input
                      type="text"
                      value={profile.state}
                      onChange={(e) =>
                        handleProfileChange("state", e.target.value)
                      }
                      className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-circular-web text-blue-50 text-sm mb-2">
                      Zip / Postal Code
                    </label>
                    <input
                      type="text"
                      value={profile.zipCode}
                      onChange={(e) =>
                        handleProfileChange("zipCode", e.target.value)
                      }
                      className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-circular-web text-blue-50 text-sm mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={profile.country}
                      onChange={(e) =>
                        handleProfileChange("country", e.target.value)
                      }
                      className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-circular-web text-blue-50 text-sm mb-2">
                      Member Since
                    </label>
                    <input
                      type="text"
                      value={profile.memberSince}
                      disabled
                      className="w-full bg-blue-900/10 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-300 cursor-not-allowed"
                    />
                  </div>
                </div>

                <button className="mt-6 px-6 py-2 bg-yellow-300 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all duration-300">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
                <h3 className="special-font font-zentry font-black text-xl text-blue-50 mb-2">
                  Change Password
                </h3>
                <p className="font-circular-web text-blue-300 text-sm mb-4">
                  Last changed 3 months ago
                </p>
                <button className="px-6 py-2 bg-yellow-300 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all duration-300">
                  Change Password
                </button>
              </div>

              <div className="border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="special-font font-zentry font-black text-xl text-blue-50 mb-1">
                      Two-Factor Authentication
                    </h3>
                    <p className="font-circular-web text-blue-300 text-sm">
                      Add an extra layer of security
                    </p>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              {[
                { label: "Email Notifications", description: "Receive updates via email" },
                { label: "SMS Notifications", description: "Receive updates via text message" },
                { label: "Transaction Alerts", description: "Get notified of all transactions" },
                { label: "Security Alerts", description: "Important security notifications" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm flex justify-between items-center"
                >
                  <div>
                    <p className="text-blue-50 font-bold">{item.label}</p>
                    <p className="font-circular-web text-blue-300 text-sm">
                      {item.description}
                    </p>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <div className="border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
                <h3 className="special-font font-zentry font-black text-xl text-blue-50 mb-2">
                  Data Collection
                </h3>
                <p className="font-circular-web text-blue-300 text-sm mb-4">
                  We use your data to improve our services and provide better recommendations.
                </p>
                <button className="text-yellow-300 hover:text-yellow-400 font-bold transition-colors">
                  Learn more →
                </button>
              </div>

              <div className="border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
                <h3 className="special-font font-zentry font-black text-xl text-blue-50 mb-2">
                  Download Your Data
                </h3>
                <p className="font-circular-web text-blue-300 text-sm mb-4">
                  Get a copy of all your personal data in a portable format.
                </p>
                <button className="px-6 py-2 bg-yellow-300 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all duration-300">
                  Download Data
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <FooterEnhanced />
    </div>
  );
};

export default SettingsPage;
