import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import LoadingScreen from "./LoadingScreen";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const totalVideos = 1;
  const heroContentRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos >= totalVideos) {
      setLoading(false);
    }
  }, [loadedVideos]);

  // Show content after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
      // Animate in the hero content
      if (heroContentRef.current) {
        gsap.from(heroContentRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // will handle the video scroll rotate and skew animation
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = () => {
    return `videos/hero-7.mp4`;
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && <LoadingScreen />}
      {/* handle the video part */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <video
            src={getVideoSrc()}
            autoPlay
            muted
            loop
            id="current-video"
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {showContent && (
          <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
            B<b>HARAT</b>PAY
          </h1>
        )}

        {showContent && (
          <div ref={heroContentRef} className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-24 px-5 sm:px-10">
              <h1 className="special-font hero-heading text-blue-100">
                Ban<b>k</b>ing Reimagined
              </h1>

              <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                Experience Modern Banking <br /> Secure, Fast & Transparent
              </p>

              <Button
                id="watch-trailer"
                title="Sign Up"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-yellow-300 flex-center gap-1"
              />
            </div>
          </div>
        )}
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
