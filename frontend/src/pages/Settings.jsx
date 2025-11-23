import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
  FiUser,
  FiLock,
  FiBell,
  FiShield,
  FiEye,
  FiEyeOff,
  FiToggleLeft,
  FiToggleRight,
  FiX,
} from "react-icons/fi";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    address: "123 Main Street, City, State 12345",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    transactionAlerts: true,
    promotionalEmails: false,
    securityAlerts: true,
    weeklyReport: true,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    biometricLogin: true,
    loginAlerts: true,
    deviceManagement: true,
  });

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleSecurity = (key) => {
    setSecurity((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-50 mb-2">Settings</h1>
          <p className="text-blue-200">Manage your account and preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-blue-900/30">
          {[
            { id: "profile", label: "Profile", icon: FiUser },
            { id: "security", label: "Security", icon: FiLock },
            { id: "notifications", label: "Notifications", icon: FiBell },
            { id: "privacy", label: "Privacy", icon: FiShield },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-50"
                    : "border-transparent text-blue-300 hover:text-blue-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-50 mb-4">
                Profile Picture
              </h3>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-3xl font-bold">
                  JD
                </div>
                <div className="space-y-2">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all">
                    Upload Photo
                  </button>
                  <button className="px-4 py-2 bg-blue-900/30 hover:bg-blue-900/50 text-blue-50 rounded-lg font-medium transition-all">
                    Remove Photo
                  </button>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-50 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-blue-50 text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) =>
                      handleProfileChange("firstName", e.target.value)
                    }
                    className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-blue-50 text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) =>
                      handleProfileChange("lastName", e.target.value)
                    }
                    className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-blue-50 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      handleProfileChange("email", e.target.value)
                    }
                    className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-blue-50 text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      handleProfileChange("phone", e.target.value)
                    }
                    className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-blue-50 text-sm font-medium mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) =>
                      handleProfileChange("dateOfBirth", e.target.value)
                    }
                    className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-blue-50 text-sm font-medium mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) =>
                      handleProfileChange("address", e.target.value)
                    }
                    className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <button className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-6">
            {/* Password */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-blue-50">Password</h3>
              </div>
              <p className="text-blue-300 text-sm mb-4">
                Last changed 3 months ago
              </p>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all"
              >
                Change Password
              </button>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-blue-50 mb-1">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-blue-300 text-sm">
                    Add an extra layer of security
                  </p>
                </div>
                <button
                  onClick={() => toggleSecurity("twoFactorAuth")}
                  className="text-3xl"
                >
                  {security.twoFactorAuth ? (
                    <FiToggleRight className="w-8 h-8 text-green-400" />
                  ) : (
                    <FiToggleLeft className="w-8 h-8 text-blue-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Biometric Login */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-blue-50 mb-1">
                    Biometric Login
                  </h3>
                  <p className="text-blue-300 text-sm">
                    Use fingerprint or face recognition
                  </p>
                </div>
                <button
                  onClick={() => toggleSecurity("biometricLogin")}
                  className="text-3xl"
                >
                  {security.biometricLogin ? (
                    <FiToggleRight className="w-8 h-8 text-green-400" />
                  ) : (
                    <FiToggleLeft className="w-8 h-8 text-blue-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Alerts */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-blue-50 mb-1">
                    Login Alerts
                  </h3>
                  <p className="text-blue-300 text-sm">
                    Get notified of new login attempts
                  </p>
                </div>
                <button
                  onClick={() => toggleSecurity("loginAlerts")}
                  className="text-3xl"
                >
                  {security.loginAlerts ? (
                    <FiToggleRight className="w-8 h-8 text-green-400" />
                  ) : (
                    <FiToggleLeft className="w-8 h-8 text-blue-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-50 mb-4">
                Active Sessions
              </h3>
              <div className="space-y-3">
                <div className="bg-blue-900/20 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="text-blue-50 font-medium">Chrome on Windows</p>
                    <p className="text-blue-300 text-sm">
                      Last active: 5 minutes ago
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg text-sm font-medium">
                    Current
                  </span>
                </div>
                <div className="bg-blue-900/20 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="text-blue-50 font-medium">Safari on iPhone</p>
                    <p className="text-blue-300 text-sm">
                      Last active: 2 hours ago
                    </p>
                  </div>
                  <button className="text-red-400 hover:text-red-300 font-medium">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-50 mb-4">
                Notification Preferences
              </h3>

              <div className="space-y-4">
                {[
                  {
                    key: "emailNotifications",
                    label: "Email Notifications",
                    description: "Receive updates via email",
                  },
                  {
                    key: "smsNotifications",
                    label: "SMS Notifications",
                    description: "Receive updates via text message",
                  },
                  {
                    key: "transactionAlerts",
                    label: "Transaction Alerts",
                    description: "Get notified of all transactions",
                  },
                  {
                    key: "promotionalEmails",
                    label: "Promotional Emails",
                    description: "Receive offers and promotions",
                  },
                  {
                    key: "securityAlerts",
                    label: "Security Alerts",
                    description: "Important security notifications",
                  },
                  {
                    key: "weeklyReport",
                    label: "Weekly Report",
                    description: "Get weekly account summary",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex justify-between items-center p-4 bg-blue-900/20 rounded-lg"
                  >
                    <div>
                      <p className="text-blue-50 font-medium">{item.label}</p>
                      <p className="text-blue-300 text-sm">
                        {item.description}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleNotification(item.key)}
                      className="text-3xl"
                    >
                      {notifications[item.key] ? (
                        <FiToggleRight className="w-8 h-8 text-green-400" />
                      ) : (
                        <FiToggleLeft className="w-8 h-8 text-blue-400" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === "privacy" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-50 mb-4">
                Privacy Settings
              </h3>

              <div className="space-y-4">
                <div className="bg-blue-900/20 rounded-lg p-4">
                  <h4 className="text-blue-50 font-medium mb-2">
                    Data Collection
                  </h4>
                  <p className="text-blue-300 text-sm mb-4">
                    We use your data to improve our services and provide better
                    recommendations.
                  </p>
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    Learn more
                  </button>
                </div>

                <div className="bg-blue-900/20 rounded-lg p-4">
                  <h4 className="text-blue-50 font-medium mb-2">
                    Download Your Data
                  </h4>
                  <p className="text-blue-300 text-sm mb-4">
                    Get a copy of all your personal data in a portable format.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all">
                    Download Data
                  </button>
                </div>

                <div className="bg-blue-900/20 rounded-lg p-4">
                  <h4 className="text-blue-50 font-medium mb-2">
                    Delete Account
                  </h4>
                  <p className="text-blue-300 text-sm mb-4">
                    Permanently delete your account and all associated data.
                  </p>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-blue-950 to-black border border-blue-900/30 rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-blue-50">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-blue-300 hover:text-blue-50"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-blue-50 text-sm font-medium mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-blue-50 text-sm font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-blue-50 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 bg-blue-900/30 hover:bg-blue-900/50 text-blue-50 font-semibold py-2 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Settings;
