# Visual Design Guide - BankHub

## Color Palette

### Primary Colors
```
Blue-50:    #f0f9ff  (Bright text)
Blue-100:   #e0f2fe  (Light text)
Blue-200:   #bae6fd  (Medium text)
Blue-300:   #7dd3fc  (Accent text)
Blue-400:   #38bdf8  (Bright accent)
Blue-900:   #111e3a  (Dark background)
```

### Secondary Colors
```
Purple-900: #2d1b69  (Dark background)
Yellow-300: #fcd34d  (Primary buttons)
Yellow-400: #facc15  (Button hover)
```

### Status Colors
```
Green-400:  #4ade80  (Success)
Red-400:    #f87171  (Error)
```

## Typography Hierarchy

### Hero Heading
```
Font:       Zentry (special-font)
Weight:     Black (font-black)
Size:       7xl (56px) → 9xl (96px)
Color:      blue-50
Letter:     Uppercase
Example:    "Banking Reimag<b>i</b>ned"
```

### Section Heading
```
Font:       Zentry (special-font)
Weight:     Black (font-black)
Size:       4xl (36px) → 5xl (48px)
Color:      blue-50
Example:    "Your Transact<b>i</b>ons"
```

### Card Title
```
Font:       Zentry (special-font)
Weight:     Black (font-black)
Size:       2xl (24px) → 3xl (30px)
Color:      blue-50
Example:    "Send Money"
```

### Body Text
```
Font:       General Sans (font-circular-web)
Weight:     Regular
Size:       base (16px) → lg (18px)
Color:      blue-100 or blue-200
```

### Label Text
```
Font:       General Sans (font-circular-web)
Weight:     Regular
Size:       sm (14px)
Color:      blue-200 or blue-300
Transform:  uppercase
Example:    "WELCOME TO YOUR FINANCIAL HUB"
```

## Component Styles

### Hero Section
```
Background:  black
Height:      100vh (full screen)
Display:     flex items-center justify-center
Padding:     pt-20 (top padding)
Content:     Centered text with title and description
```

### Card with Border
```
Background:  gradient-to-br from-blue-900/20 to-purple-900/20
Border:      border-hsla (white border with opacity)
Padding:     p-6 or p-8
Border-radius: rounded-lg
Backdrop:    backdrop-blur-sm
Hover:       from-blue-900/40 to-purple-900/40
Transition:  transition-all duration-300
```

### Button - Primary (Yellow)
```
Background:  bg-yellow-300
Hover:       hover:bg-yellow-400
Text:        text-black font-bold
Padding:     px-6 py-3
Border-radius: rounded-lg
Transition:  transition-all duration-300
```

### Button - Secondary (Blue)
```
Background:  bg-blue-900/20
Border:      border-hsla
Hover:       hover:bg-blue-900/40
Text:        text-blue-50 font-bold
Padding:     px-6 py-3
Border-radius: rounded-lg
Transition:  transition-all duration-300
```

### Input Field
```
Background:  bg-blue-900/20
Border:      border border-blue-900/30
Text:        text-blue-50
Placeholder: placeholder-blue-400
Focus:       focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20
Padding:     px-4 py-2
Border-radius: rounded-lg
Transition:  transition-all
```

### Card with Hover Effect
```
Background:  gradient-to-r from-blue-900/10 to-purple-900/10
Hover:       from-blue-900/20 to-purple-900/20
Transition:  transition-all duration-300
Padding:     p-6
Border-radius: rounded-lg
Backdrop:    backdrop-blur-sm
```

## Animation Patterns

### Page Load Timeline
```javascript
Timeline Duration: 0.8s + 0.6s = 1.4s total

Step 1: Hero Section
  - Duration: 0.8s
  - From: opacity 0, y 50
  - To: opacity 1, y 0
  - Easing: power2.out

Step 2: Content Items (staggered)
  - Duration: 0.6s each
  - From: opacity 0, y 30
  - To: opacity 1, y 0
  - Stagger: 0.1s between items
  - Easing: power2.out
  - Delay: -0.4s (overlap)
```

### BentoTilt 3D Effect
```
Trigger:     onMouseMove
Effect:      3D rotation + scale
Calculation: 
  - tiltX = (relativeY - 0.8) * 15
  - tiltY = (relativeX - 0.5) * -5
  - scale = 0.95
Perspective: 700px
Reset:       onMouseLeave
```

### Radial Gradient Hover
```
Trigger:     onMouseMove
Effect:      Radial gradient at cursor position
Gradient:    radial-gradient(100px circle at X Y, #656fe288, #00000026)
Opacity:     0 → 1 on hover
Duration:    300ms
```

## Responsive Breakpoints

### Mobile (< 640px)
- Single column layouts
- Full-width elements
- Larger touch targets
- Simplified navigation

### Tablet (640px - 1024px)
- 2-column layouts
- Optimized spacing
- Medium text sizes
- Responsive grids

### Desktop (> 1024px)
- Multi-column layouts
- Full navigation
- Optimized typography
- Enhanced animations

## Spacing System

### Padding
```
p-1:  4px
p-2:  8px
p-3:  12px
p-4:  16px
p-5:  20px
p-6:  24px
p-8:  32px
```

### Margin
```
m-1:  4px
m-2:  8px
m-3:  12px
m-4:  16px
m-6:  24px
mb-4: margin-bottom 16px
mb-6: margin-bottom 24px
```

### Gap (Grid/Flex)
```
gap-3: 12px
gap-4: 16px
gap-6: 24px
gap-8: 32px
```

## Border Radius

```
rounded-lg:   8px
rounded-xl:   12px
rounded-2xl:  16px
rounded-full: 9999px (circles)
```

## Shadows & Effects

### Backdrop Blur
```
backdrop-blur-sm: blur(4px)
```

### Box Shadow
```
shadow-lg:    0 10px 15px -3px rgba(0, 0, 0, 0.1)
shadow-xl:    0 20px 25px -5px rgba(0, 0, 0, 0.1)
shadow-2xl:   0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

### Hover Effects
```
hover:scale-105:      Scale to 105%
hover:shadow-lg:      Add large shadow
hover:shadow-2xl:     Add extra large shadow
hover:opacity-100:    Full opacity
```

## Icon Usage

### Icon Sizes
```
w-4 h-4:   16px (small)
w-5 h-5:   20px (medium)
w-6 h-6:   24px (standard)
w-8 h-8:   32px (large)
text-3xl:  30px (emoji)
text-4xl:  36px (emoji)
```

### Icon Colors
```
text-blue-50:    Bright text
text-blue-300:   Medium text
text-yellow-300: Accent
text-green-400:  Success
text-red-400:    Error
```

## Layout Patterns

### Hero Section
```html
<div class="relative min-h-screen w-screen flex items-center justify-center px-5 sm:px-10 pt-20">
  <div class="text-center max-w-3xl">
    <!-- Content -->
  </div>
</div>
```

### Content Section
```html
<section class="relative py-20 px-5 sm:px-10">
  <div class="container mx-auto max-w-4xl">
    <!-- Content -->
  </div>
</section>
```

### Grid Layout
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Items -->
</div>
```

### Flex Layout
```html
<div class="flex items-center justify-between gap-4">
  <!-- Items -->
</div>
```

## State Indicators

### Active State
```
Background: bg-yellow-300
Text:       text-black
```

### Hover State
```
Background: Lighter shade
Shadow:     Increased shadow
Scale:      Slight scale increase
```

### Focus State
```
Border:     border-yellow-300
Ring:       ring-2 ring-yellow-300/20
```

### Disabled State
```
Opacity:    opacity-50
Cursor:     cursor-not-allowed
```

## Animation Timing

### Standard Durations
```
Fast:       200ms (quick interactions)
Normal:     300ms (standard transitions)
Slow:       600ms (page loads)
Very Slow:  800ms (hero animations)
```

### Easing Functions
```
power2.out:    Smooth deceleration (most common)
power1.inOut:  Linear with slight ease
ease-in-out:   CSS easing
ease-out:      CSS easing
```

## Best Practices

### Do's ✅
- Use consistent spacing
- Keep animations smooth (300ms)
- Use the color palette
- Match typography hierarchy
- Maintain responsive design
- Test on multiple devices
- Use semantic HTML
- Add proper contrast

### Don'ts ❌
- Don't use random colors
- Don't mix font families
- Don't create animations > 1s
- Don't forget mobile design
- Don't use low contrast text
- Don't add too many effects
- Don't break the grid
- Don't ignore accessibility

## Accessibility

### Color Contrast
- Text on background: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: Clearly visible

### Typography
- Minimum font size: 14px
- Line height: 1.5 or greater
- Letter spacing: Adequate

### Interactive Elements
- Minimum touch target: 44x44px
- Focus indicators: Visible
- Keyboard navigation: Supported

## Performance Tips

### Animations
- Use GSAP for complex animations
- Limit simultaneous animations
- Use GPU-accelerated properties (transform, opacity)
- Clean up animations on unmount

### Images
- Optimize image sizes
- Use appropriate formats (WebP, PNG, JPG)
- Lazy load images
- Add alt text

### Code
- Use React.memo for expensive components
- Implement code splitting
- Minimize bundle size
- Use efficient selectors

---

**Last Updated**: 2024
**Version**: 1.0
**Status**: Complete
