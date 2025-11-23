import { useState } from "react";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "../components/AnimatedTitle";
import Button from "../components/Button";
import TaurusModel from "../components/3D/TaurusModel";

gsap.registerPlugin(useGSAP);

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".login-container", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    })
      .from(".login-form-group", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.4");
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your login/signup logic here
  };

  return (
    <div className="relative min-h-screen w-screen bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-violet-900/20" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6">
        <Link to="/" className="text-blue-50 hover:text-blue-75 transition-colors flex items-center gap-2">
          <TiLocationArrow className="rotate-180" />
          Back to Home
        </Link>
      </nav>

      {/* Main Content - Split Layout */}
      <div className="relative z-10 w-full h-screen flex overflow-hidden">
        <div className="w-full h-full flex">
          {/* Left Side - 3D Model (hidden on mobile, visible on lg) */}
          <div className={`hidden lg:flex lg:w-1/2 items-center justify-center p-6 ${isSignUp ? "order-2" : "order-1"}`}>
            <div className="w-full h-full">
              <TaurusModel isSignUp={isSignUp} />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className={`w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-8 py-6 lg:py-8 overflow-hidden ${isSignUp ? "order-1" : "order-2"}`}>
            <div className="login-container w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="special-font font-zentry font-black text-3xl md:text-4xl text-blue-50 mb-2 uppercase">
              {isSignUp ? "Join BankHub" : "Welcome Back"}
            </h1>
            <p className="font-circular-web text-blue-100 text-xs md:text-sm">
              {isSignUp
                ? "Create your account and start banking smarter"
                : "Sign in to your account to continue"}
            </p>
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Sign Up Only) */}
            {isSignUp && (
              <div className="login-form-group">
                <label className="block text-blue-50 text-xs font-medium mb-1 font-general">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 bg-blue-900/20 border border-blue-75/30 rounded-lg text-blue-50 text-sm placeholder-blue-100/50 focus:outline-none focus:border-blue-75 transition-colors duration-300"
                  required={isSignUp}
                />
              </div>
            )}

            {/* Email Field */}
            <div className="login-form-group">
              <label className="block text-blue-50 text-xs font-medium mb-1 font-general">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-3 py-2 bg-blue-900/20 border border-blue-75/30 rounded-lg text-blue-50 text-sm placeholder-blue-100/50 focus:outline-none focus:border-blue-75 transition-colors duration-300"
                required
              />
            </div>

            {/* Password Field */}
            <div className="login-form-group">
              <label className="block text-blue-50 text-xs font-medium mb-1 font-general">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-blue-900/20 border border-blue-75/30 rounded-lg text-blue-50 text-sm placeholder-blue-100/50 focus:outline-none focus:border-blue-75 transition-colors duration-300"
                required
              />
            </div>

            {/* Confirm Password (Sign Up Only) */}
            {isSignUp && (
              <div className="login-form-group">
                <label className="block text-blue-50 text-xs font-medium mb-1 font-general">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-blue-900/20 border border-blue-75/30 rounded-lg text-blue-50 text-sm placeholder-blue-100/50 focus:outline-none focus:border-blue-75 transition-colors duration-300"
                  required={isSignUp}
                />
              </div>
            )}

            {/* Remember Me / Forgot Password */}
            {!isSignUp && (
              <div className="login-form-group flex items-center justify-between">
                <label className="flex items-center gap-2 text-blue-100 text-xs cursor-pointer font-general">
                  <input type="checkbox" className="w-3 h-3" />
                  Remember me
                </label>
                <a href="#" className="text-blue-75 text-xs hover:text-blue-100 transition-colors font-general">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <div className="login-form-group pt-2">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-75 to-violet-600 text-white font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-blue-75/50 transition-all duration-300 flex items-center justify-center gap-2 font-general"
              >
                {isSignUp ? "Create Account" : "Sign In"}
                <TiLocationArrow size={16} />
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-3 flex items-center gap-3">
            <div className="flex-1 h-px bg-blue-75/30" />
            <span className="text-blue-100 text-xs font-general">or</span>
            <div className="flex-1 h-px bg-blue-75/30" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="px-3 py-2 bg-blue-900/20 border border-blue-75/30 rounded-lg text-blue-50 hover:bg-blue-900/40 transition-colors duration-300 text-xs font-medium font-general">
              Google
            </button>
            <button className="px-3 py-2 bg-blue-900/20 border border-blue-75/30 rounded-lg text-blue-50 hover:bg-blue-900/40 transition-colors duration-300 text-xs font-medium font-general">
              Apple
            </button>
          </div>

          {/* Toggle Sign Up / Login */}
          <div className="text-center mb-2">
            <p className="text-blue-100 text-xs font-general">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-75 font-semibold hover:text-blue-100 transition-colors font-general"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          {/* Terms */}
          <p className="text-center text-blue-100 text-xs font-general">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-75 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-75 hover:underline">
              Privacy
            </a>
          </p>
          </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-75/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
    </div>
  );
};

export default Login;
