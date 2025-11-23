import { useEffect, useRef } from "react";

const LoadingScreen = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.02;

      // Clear canvas - pure black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw infinity symbol (∞)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = 100;

      ctx.globalAlpha = 1;
      ctx.strokeStyle = "#5542ff";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Rotate infinity symbol
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time);

      // Draw infinity symbol using lemniscate curve
      ctx.beginPath();
      for (let i = 0; i < Math.PI * 2; i += 0.01) {
        const x = (scale * Math.cos(i)) / (1 + Math.cos(i) * Math.cos(i));
        const y = (scale * Math.sin(i) * Math.cos(i)) / (1 + Math.cos(i) * Math.cos(i));

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      ctx.restore();
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default LoadingScreen;
