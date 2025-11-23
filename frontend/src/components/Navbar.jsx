import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";

import Button from "./Button";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Send Money", href: "/send-money" },
  { label: "Transactions", href: "/transactions" },
  { label: "Cards", href: "/cards" },
  { label: "Investments", href: "/investments" },
];

const NavBar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [isIndicatorActive, setIsIndicatorActive] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Show navbar immediately on dashboard pages, after 8 seconds on landing
  useEffect(() => {
    const isDashboardPage = location.pathname !== "/";
    
    if (isDashboardPage) {
      setShowNav(true);
      if (navContainerRef.current) {
        gsap.from(navContainerRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    } else {
      const timer = setTimeout(() => {
        setShowNav(true);
        if (navContainerRef.current) {
          gsap.from(navContainerRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.8,
            ease: "power2.out",
          });
        }
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    if (audioElementRef.current) {
      if (isAudioPlaying) {
        audioElementRef.current.play().catch(() => {
          // Silently handle autoplay restrictions
        });
      } else {
        audioElementRef.current.pause();
      }
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (navContainerRef.current) {
      if (currentScrollY === 0) {
        // Topmost position: show navbar without floating-nav
        setIsNavVisible(true);
        navContainerRef.current.classList.remove("floating-nav");
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down: hide navbar and apply floating-nav
        setIsNavVisible(false);
        navContainerRef.current.classList.add("floating-nav");
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up: show navbar with floating-nav
        setIsNavVisible(true);
        navContainerRef.current.classList.add("floating-nav");
      }
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    if (navContainerRef.current) {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2,
      });
    }
  }, [isNavVisible]);

  return (
    <>
      {showNav && (
        <div
          ref={navContainerRef}
          className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
        >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Product button */}
          <div className="flex items-center gap-7">
            <Link to="/" className="cursor-pointer hover:opacity-80 transition-opacity duration-300">
              <img src="/img/logo.png" alt="logo" className="w-10" />
            </Link>

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                item.href.startsWith("#") ? (
                  <a
                    key={index}
                    href={item.href}
                    className="nav-hover-btn"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={index}
                    to={item.href}
                    className="nav-hover-btn"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            {/* Login and Signup Buttons */}
            <div className="hidden md:flex items-center gap-3 ml-10">
              <Link
                to="/"
                className="px-4 py-2 text-blue-50 hover:text-blue-75 transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/"
                className="px-4 py-2 bg-blue-75 text-white rounded-lg hover:bg-blue-100 transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
        </div>
      )}
    </>
  );
};

export default NavBar;
