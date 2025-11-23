# Animation Patterns - Video-Enhanced Banking Pages

## 🎬 Core Animation Patterns

### 1. Hero Video Clip-Path Animation

**Purpose**: Create an organic, non-rectangular video frame that animates into view

**Implementation**:
```javascript
useGSAP(() => {
  // Set initial clip-path
  gsap.set("#hero-video-frame", {
    clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
    borderRadius: "0% 0% 40% 10%",
  });

  // Animate from full rectangle to clipped shape
  gsap.from("#hero-video-frame", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    borderRadius: "0% 0% 0% 0%",
    duration: 1.2,
    ease: "power1.inOut",
  });
});
```

**Visual Effect**: Video frame appears to "unfold" from a rectangle into an organic shape

**Used In**: All hero sections (Dashboard, Send Money, Transactions)

---

### 2. Content Fade-In Timeline

**Purpose**: Animate hero content after video animation completes

**Implementation**:
```javascript
useGSAP(() => {
  const tl = gsap.timeline();
  
  // Hero video animation
  tl.from("#hero-video-frame", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    borderRadius: "0% 0% 0% 0%",
    duration: 1.2,
    ease: "power1.inOut",
  })
    // Hero content fades in (overlapped)
    .from(".hero-content", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.6")
    // Cards fade in with stagger
    .from(".card", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=0.4");
});
```

**Timeline**:
- 0ms - 1200ms: Hero video clip-path animation
- 600ms - 1400ms: Hero content fade-in (overlapped)
- 1000ms - 1600ms: Card animations with stagger

**Used In**: All enhanced pages

---

### 3. Video Background with Opacity Hover

**Purpose**: Subtle video background that becomes more visible on hover

**Implementation**:
```jsx
<div className="group relative overflow-hidden rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
  {/* Video Background */}
  <video
    src="/videos/feature-1.mp4"
    autoPlay
    muted
    loop
    className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300"
  />
  
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />
  
  {/* Content */}
  <div className="relative z-10">
    {/* Content here */}
  </div>
</div>
```

**Opacity Levels**:
- Default: `opacity-10` (subtle)
- Hover: `opacity-20` (more visible)
- Transition: `transition-opacity duration-300` (smooth)

**Used In**: Feature cards, stat cards, transaction items

---

### 4. Scale & Translate Hover Effects

**Purpose**: Add interactive feedback on hover

**Implementation**:
```jsx
{/* Scale on hover */}
<div className="hover:scale-105 transition-all duration-300">
  {/* Content */}
</div>

{/* Translate on hover */}
<div className="hover:translate-x-2 transition-all duration-300">
  {/* Content */}
</div>
```

**Effects**:
- `hover:scale-105` - Grows 5% on hover
- `hover:translate-x-2` - Moves right 8px on hover
- `transition-all duration-300` - Smooth 300ms transition

**Used In**: Cards, buttons, transaction items

---

### 5. Staggered List Animation

**Purpose**: Animate list items sequentially for visual interest

**Implementation**:
```javascript
gsap.from(".list-item", {
  opacity: 0,
  x: -30,
  duration: 0.5,
  stagger: 0.1,
  ease: "power2.out",
});
```

**Timing**:
- Item 1: 0ms - 500ms
- Item 2: 100ms - 600ms
- Item 3: 200ms - 700ms
- Item 4: 300ms - 800ms
- etc.

**Used In**: Transaction lists, feature cards

---

### 6. Gradient Overlay Pattern

**Purpose**: Create depth and readability over video backgrounds

**Implementation**:
```jsx
{/* Simple gradient */}
<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

{/* Directional gradient */}
<div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />

{/* Radial gradient (ready for use) */}
<div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
```

**Opacity Levels**:
- `from-black/40` - 40% opacity
- `to-black/60` - 60% opacity
- `to-transparent` - Fades to transparent

**Used In**: All video backgrounds

---

## 🎨 Color & Opacity Combinations

### Video Opacity Levels
```
opacity-5   - Very subtle (5%)
opacity-10  - Subtle (10%)
opacity-15  - Moderate (15%)
opacity-20  - Visible (20%)
opacity-25  - Very visible (25%)
```

### Gradient Opacity Levels
```
from-black/20  - 20% opacity
from-black/30  - 30% opacity
from-black/40  - 40% opacity
from-black/50  - 50% opacity
from-black/60  - 60% opacity
```

### Recommended Combinations
```
Video: opacity-10  + Gradient: from-black/50 to-black/30
Video: opacity-5   + Gradient: from-black/40 to-black/20
Video: opacity-15  + Gradient: from-black/60 to-black/40
```

---

## 🎬 Animation Easing Functions

### GSAP Easing
```javascript
ease: "power1.inOut"   // Smooth, natural
ease: "power2.out"     // Deceleration (most common)
ease: "power1.out"     // Gentle deceleration
ease: "back.out"       // Bouncy effect
ease: "elastic.out"    // Spring effect
```

### Recommended Easing
- **Clip-path animations**: `power1.inOut` (smooth)
- **Fade-in animations**: `power2.out` (natural)
- **Scale transforms**: `power2.out` (snappy)
- **Translate effects**: `power1.out` (smooth)

---

## 📊 Animation Timing

### Standard Durations
```javascript
duration: 0.3   // Quick interactions (300ms)
duration: 0.6   // Standard animations (600ms)
duration: 0.8   // Slower animations (800ms)
duration: 1.2   // Hero animations (1200ms)
```

### Stagger Timing
```javascript
stagger: 0.05   // 50ms between items (fast)
stagger: 0.1    // 100ms between items (standard)
stagger: 0.15   // 150ms between items (slow)
```

### Overlap Timing (Timeline)
```javascript
"-=0.6"  // Start 600ms before previous ends
"-=0.4"  // Start 400ms before previous ends
"-=0.2"  // Start 200ms before previous ends
"+=0.1"  // Start 100ms after previous ends
```

---

## 🎯 Common Animation Patterns

### Pattern 1: Hero Section
```javascript
// 1. Clip-path animation
// 2. Hero content fade-in (overlapped)
// 3. Feature cards staggered fade-in
```

### Pattern 2: Feature Card
```javascript
// 1. Fade-in on page load
// 2. Video opacity on hover
// 3. Scale on hover
// 4. Explore button appears on hover
```

### Pattern 3: List Item
```javascript
// 1. Fade-in with stagger
// 2. Translate-x on hover
// 3. Video opacity on hover
```

### Pattern 4: Stat Card
```javascript
// 1. Fade-in on page load
// 2. Scale on hover
// 3. Video opacity on hover
```

---

## 🚀 Performance Tips

### GPU Acceleration
Use properties that are GPU-accelerated:
- ✅ `transform` (scale, translate, rotate)
- ✅ `opacity`
- ❌ `width`, `height`, `left`, `top`

### Avoid Jank
```javascript
// Good - GPU accelerated
gsap.to(element, { scale: 1.05, opacity: 0.8 });

// Bad - CPU intensive
gsap.to(element, { width: "110%", height: "110%" });
```

### Optimize Videos
- Use MP4 format
- Keep file sizes small
- Mute and loop
- Use low opacity (reduces visual impact)

### Efficient Selectors
```javascript
// Good - Specific class
gsap.from(".dashboard-card", { ... });

// Bad - Generic selector
gsap.from("div", { ... });
```

---

## 🎨 Customization Guide

### Adjust Clip-Path Shape
```javascript
// Current shape
clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)"

// More rounded
clipPath: "polygon(20% 0, 80% 0, 90% 85%, 10% 95%)"

// More angular
clipPath: "polygon(10% 0, 70% 0, 85% 95%, 0 100%)"
```

### Adjust Animation Duration
```javascript
// Faster
duration: 0.8

// Standard
duration: 1.2

// Slower
duration: 1.6
```

### Adjust Video Opacity
```javascript
// Subtle
opacity-5 group-hover:opacity-15

// Moderate
opacity-10 group-hover:opacity-20

// Visible
opacity-15 group-hover:opacity-25
```

---

## 📱 Mobile Considerations

### Reduce Animation Complexity
```javascript
// Check if mobile
const isMobile = window.innerWidth < 768;

if (!isMobile) {
  // Run full animations
} else {
  // Run simpler animations
}
```

### Disable Video on Mobile
```jsx
{!isMobile && (
  <video
    src="/videos/feature-1.mp4"
    autoPlay
    muted
    loop
    className="..."
  />
)}
```

### Reduce Stagger on Mobile
```javascript
stagger: isMobile ? 0.05 : 0.1
```

---

## 🔧 Debugging Tips

### Check Animation Timing
```javascript
gsap.timeline({ onUpdate: () => {
  console.log("Animation progress");
}});
```

### Visualize Clip-Path
```javascript
// Add border to see clip-path
gsap.set("#hero-video-frame", {
  border: "2px solid red",
  clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
});
```

### Test Performance
```javascript
// Use Chrome DevTools Performance tab
// Record animation and check FPS
// Aim for 60 FPS
```

---

## 📚 Resources

### GSAP Documentation
- https://gsap.com/docs/v3/
- Easing visualizer: https://gsap.com/docs/v3/Easing

### CSS Clip-Path
- https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path
- Clip-path generator: https://bennettfeely.com/clippath/

### Video Optimization
- Use online video compressors
- Convert to MP4 format
- Keep under 5MB per video

---

## 🎉 Summary

These animation patterns create:
- ✅ Professional appearance
- ✅ Smooth interactions
- ✅ Visual depth
- ✅ Engaging user experience
- ✅ Non-AI-generated look
- ✅ Landing page aesthetic

All patterns are:
- ✅ Reusable across pages
- ✅ Performance optimized
- ✅ Mobile friendly
- ✅ Browser compatible
- ✅ Easy to customize

---

**Last Updated**: 2024
**Version**: 1.0
**Status**: Complete
