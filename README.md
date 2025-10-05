# StudyHub - Student Learning Platform

A stunning, Apple-inspired educational platform with immersive 3D effects built with React, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

### 🎨 Apple-Style 3D Experience
- **Glassmorphism UI**: Frosted glass cards with backdrop blur and translucency
- **3D Depth Effects**: Multi-layer depth with translateZ transforms
- **Parallax Scrolling**: Immersive parallax container with perspective
- **Floating Animations**: Smooth floating elements with 3D transforms
- **Card Hover Effects**: Interactive 3D rotation on hover (rotateX, rotateY)
- **Gradient Mesh Background**: Dynamic radial gradients with blur effects
- **Shimmer Effects**: Animated light reflections across surfaces
- **3D Text Shadows**: Multi-layer text shadows for depth perception

### 💎 Premium Design Elements
- **Modern UI/UX**: Apple-inspired clean, minimalist design
- **Dark Mode**: Seamless theme toggle with glassmorphism in both modes
- **Smooth Animations**: Cubic-bezier easing for natural motion
- **Intersection Observer**: Elements animate into view as you scroll
- **Fully Responsive**: Optimized for all device sizes with adaptive 3D effects
- **Type-Safe**: Built with TypeScript for better development experience
- **Fast Performance**: Powered by Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Heroicons** - Beautiful hand-crafted SVG icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📚 What's Included

### Main Sections

1. **Hero Section**
   - Eye-catching introduction with animated blobs
   - Key statistics (students, courses, instructors, success rate)
   - Call-to-action buttons

2. **Courses Section**
   - 6 sample courses with detailed information
   - Course cards with images, ratings, and enrollment buttons
   - Instructor names, duration, and student count

3. **Resources Section**
   - Study materials and video lectures
   - Practice tests and study tips
   - Discussion forums and progress tracking

4. **Community Section**
   - Community features and benefits
   - Live statistics and engagement metrics
   - Join community call-to-action

5. **About Section**
   - Platform mission, vision, and values
   - Information about StudyHub

## 📝 Customization Guide

Edit `src/App.tsx` to customize:

- **Courses**: Update course titles, descriptions, images, and pricing
- **Resources**: Modify resource types and descriptions
- **Community Stats**: Change numbers and metrics
- **Branding**: Update "StudyHub" name and logo throughout

### Colors & Styling

Customize colors in `tailwind.config.js`:

```js
colors: {
  primary: '#3B82F6',    // Main brand color
  secondary: '#1E40AF',  // Secondary brand color
  dark: '#1F2937',       // Dark mode background
  light: '#F9FAFB',      // Light mode background
}
```

### Adding New Sections

1. Create a new component in `App.tsx`
2. Add it to the main App component
3. Update the navigation menu in the Navbar component

## 📁 Project Structure

```
personal-website/
├── src/
│   ├── App.tsx          # Main application component
│   ├── App.css          # Component styles
│   ├── index.css        # Global styles & Tailwind directives
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## 🎨 Apple-Style 3D CSS Classes

### Glassmorphism Components
- **`.glass-card`**: Frosted glass effect with backdrop-filter blur(20px)
- **`.glass-nav`**: Translucent navigation bar with blur effect
- **`.btn-primary`**: 3D button with gradient and depth shadows
- **`.btn-outline`**: Glass-style outline button with hover effects

### 3D Transform Classes
- **`.card-3d`**: Interactive 3D card with hover rotation
- **`.depth-layer-1/2/3`**: Z-axis depth layers (10px, 20px, 30px)
- **`.parallax-container`**: Perspective container for 3D effects
- **`.text-3d`**: Multi-layer text shadow for depth

### Animation Classes
- **`.float-animation`**: Smooth floating motion with translateZ
- **`.shimmer`**: Light reflection animation across surfaces
- **`.animate-blob`**: Organic blob movement
- **`.gradient-mesh`**: Fixed gradient background with blur

### Design Features
- **Animated Blobs**: Larger floating gradient spheres with 3D depth
- **Hover Effects**: 3D rotation and elevation on interaction
- **Gradient Accents**: Blue to purple to pink gradients
- **Icon Integration**: Heroicons with depth layers
- **Card Layouts**: Glassmorphism cards with inset shadows
- **Responsive Grid**: Adaptive layouts maintaining 3D effects

## 🌙 Dark Mode

The website includes a dark mode toggle button (bottom-right corner). The preference is saved to localStorage and persists across sessions.

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

Feel free to fork this project and customize it for your own use!

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for students worldwide**

---

## 💡 Note

Your original personal portfolio website has been backed up to `src/App-personal.tsx.bak`. You can restore it anytime by renaming the files.
