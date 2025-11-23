# Design Reference Guide

## Quick Start

### Running the Application
```bash
npm run dev
# Opens at http://localhost:5174
```

### Navigation
- **Landing Page**: `/`
- **Dashboard**: `/dashboard`
- **Send Money**: `/send-money`
- **Transactions**: `/transactions`
- **Bills**: `/bills`
- **Cards**: `/cards`
- **Investments**: `/investments`
- **Settings**: `/settings`

## Design Elements

### Typography Classes

#### Headings
```html
<!-- Large Hero Heading -->
<h1 class="special-font font-zentry font-black text-7xl">
  Banking Reimag<b>i</b>ned
</h1>

<!-- Section Heading -->
<h2 class="special-font font-zentry font-black text-4xl">
  Your Transact<b>i</b>ons
</h2>

<!-- Card Title -->
<h3 class="special-font font-zentry font-black text-2xl">
  Send Money
</h3>
```

#### Body Text
```html
<!-- Circular Web (default body) -->
<p class="font-circular-web text-lg">
  Description text
</p>

<!-- Robert Regular (secondary) -->
<p class="font-robert-regular text-base">
  Secondary text
</p>

<!-- Uppercase Label -->
<p class="font-circular-web text-sm uppercase">
  LABEL TEXT
</p>
```

### Color Palette

#### Text Colors
```css
/* Primary Text */
text-blue-50      /* Bright white-blue */
text-blue-100     /* Light blue */
text-blue-200     /* Medium light blue */
text-blue-300     /* Medium blue */
text-blue-400     /* Accent blue */

/* Status Colors */
text-green-400    /* Success */
text-yellow-400   /* Warning */
text-red-400      /* Error */
text-purple-400   /* Secondary */
```

#### Background Colors
```css
/* Dark Backgrounds */
bg-black          /* Pure black */
bg-blue-900       /* Dark blue */
bg-purple-900     /* Dark purple */

/* Transparent Backgrounds */
bg-blue-900/20    /* 20% opacity */
bg-blue-900/30    /* 30% opacity */
bg-blue-900/40    /* 40% opacity */

/* Gradient Backgrounds */
from-blue-900/20 to-purple-900/20
from-green-900/20 to-green-900/10
```

### Component Patterns

#### Card with Border
```html
<div class="border-hsla rounded-lg p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
  <!-- Content -->
</div>
```

#### Button - Primary (Yellow)
```html
<button class="px-6 py-3 bg-yellow-300 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all duration-300">
  Action
</button>
```

#### Button - Secondary (Blue)
```html
<button class="px-6 py-3 border-hsla bg-blue-900/20 hover:bg-blue-900/40 text-blue-50 font-bold rounded-lg transition-all duration-300">
  Secondary
</button>
```

#### Input Field
```html
<input 
  type="text"
  class="w-full bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50 placeholder-blue-400 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all"
  placeholder="Enter text..."
/>
```

#### Card with Hover Effect
```html
<div class="border-hsla rounded-lg p-6 bg-gradient-to-r from-blue-900/10 to-purple-900/10 backdrop-blur-sm hover:from-blue-900/20 hover:to-purple-900/20 transition-all duration-300">
  <!-- Content -->
</div>
```

### Animation Patterns

#### Page Load Animation
```javascript
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

useGSAP(() => {
  const tl = gsap.timeline();
  
  tl.from(".hero-section", {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power2.out",
  })
    .from(".content-item", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=0.4");
});
```

#### BentoTilt 3D Effect
```javascript
const [transformStyle, setTransformStyle] = useState("");
const itemRef = useRef(null);

const handleMouseMove = (event) => {
  if (!itemRef.current) return;

  const { left, top, width, height } =
    itemRef.current.getBoundingClientRect();

  const relativeX = (event.clientX - left) / width;
  const relativeY = (event.clientY - top) / height;

  const tiltX = (relativeY - 0.8) * 15;
  const tiltY = (relativeX - 0.5) * -5;

  const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
  setTransformStyle(newTransform);
};

const handleMouseLeave = () => {
  setTransformStyle("");
};

return (
  <div
    ref={itemRef}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    style={{ transform: transformStyle }}
  >
    {/* Content */}
  </div>
);
```

#### Radial Gradient Hover Effect
```javascript
const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
const [hoverOpacity, setHoverOpacity] = useState(0);
const hoverButtonRef = useRef(null);

const handleMouseMove = (event) => {
  if (!hoverButtonRef.current) return;
  const rect = hoverButtonRef.current.getBoundingClientRect();

  setCursorPosition({
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  });
};

return (
  <div
    ref={hoverButtonRef}
    onMouseMove={handleMouseMove}
    onMouseEnter={() => setHoverOpacity(1)}
    onMouseLeave={() => setHoverOpacity(0)}
    className="relative overflow-hidden"
  >
    <div
      className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
      style={{
        opacity: hoverOpacity,
        background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
      }}
    />
    {/* Content */}
  </div>
);
```

## Page Structure Template

### Basic Page Layout
```jsx
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(useGSAP);

const PageName = () => {
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".page-hero", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    })
      .from(".page-content", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4");
  });

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      <NavBar />

      {/* Hero Section */}
      <div className="page-hero relative min-h-screen w-screen flex items-center justify-center px-5 sm:px-10 pt-20">
        <div className="text-center max-w-3xl">
          <p className="font-circular-web text-sm uppercase text-blue-50 mb-4">
            Section Label
          </p>
          <h1 className="special-font font-zentry font-black text-5xl sm:text-6xl md:text-7xl text-blue-50 mb-6">
            Page Title <b>Highlight</b>
          </h1>
          <p className="font-robert-regular text-blue-100 text-lg max-w-2xl mx-auto">
            Description text
          </p>
        </div>
      </div>

      {/* Content Section */}
      <section className="page-content relative py-20 px-5 sm:px-10">
        <div className="container mx-auto max-w-4xl">
          {/* Content here */}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PageName;
```

## Responsive Breakpoints

```css
/* Mobile First */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

### Usage Examples
```html
<!-- Hidden on mobile, visible on medium+ -->
<div class="hidden md:block">
  Desktop only content
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Items -->
</div>

<!-- Responsive text -->
<h1 class="text-3xl md:text-5xl lg:text-7xl">
  Responsive heading
</h1>
```

## Common Utilities

### Spacing
```css
p-4   /* Padding: 1rem */
p-6   /* Padding: 1.5rem */
p-8   /* Padding: 2rem */
mb-4  /* Margin bottom: 1rem */
mb-6  /* Margin bottom: 1.5rem */
gap-4 /* Gap: 1rem */
gap-6 /* Gap: 1.5rem */
```

### Sizing
```css
w-full   /* Width: 100% */
h-screen /* Height: 100vh */
min-h-screen /* Min height: 100vh */
rounded-lg /* Border radius: 0.5rem */
rounded-full /* Border radius: 9999px */
```

### Transitions
```css
transition-all duration-300    /* All properties, 300ms */
transition-colors duration-300 /* Color changes, 300ms */
hover:scale-105 /* Scale on hover */
hover:shadow-lg  /* Shadow on hover */
```

## Icons

Using React Icons (TiLocationArrow, etc.):

```jsx
import { TiLocationArrow } from "react-icons/ti";

<TiLocationArrow className="w-5 h-5" />
```

## Best Practices

### 1. Consistency
- Use the same spacing throughout
- Keep font sizes consistent
- Use the same color palette
- Match animation timings

### 2. Performance
- Use GSAP for complex animations
- Avoid unnecessary re-renders
- Optimize images
- Lazy load components

### 3. Accessibility
- Use semantic HTML
- Add alt text to images
- Ensure color contrast
- Support keyboard navigation

### 4. Responsive Design
- Mobile-first approach
- Test on multiple devices
- Use flexible layouts
- Optimize touch targets

## Troubleshooting

### Animations Not Working
- Ensure GSAP is registered: `gsap.registerPlugin(useGSAP)`
- Check class names match in GSAP selectors
- Verify elements exist before animation

### Styling Issues
- Clear browser cache
- Check Tailwind CSS is compiled
- Verify class names are correct
- Check for conflicting styles

### Navigation Issues
- Ensure routes are added to App.jsx
- Check component imports
- Verify file paths
- Test on different pages

---

**Last Updated**: 2024
**Version**: 1.0
