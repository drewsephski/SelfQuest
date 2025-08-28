# MBTI Personality Test App

<div align="center">

![License](https://img.shields.io/github/license/drewsepeczi/mbti-personality-test-app?style=for-the-badge&color=blue)
![GitHub forks](https://img.shields.io/github/forks/drewsepeczi/mbti-personality-test-app?style=for-the-badge&color=green)
![GitHub stars](https://img.shields.io/github/stars/drewsepeczi/mbti-personality-test-app?style=for-the-badge&color=yellow)
![Build Status](https://img.shields.io/github/actions/workflow/status/drewsepeczi/mbti-personality-test-app/ci.yml?style=for-the-badge&color=success)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-2-pink?style=for-the-badge&logo=chakra-ui&logoColor=white)

**A modern, responsive MBTI personality test application built with Next.js 15 and Chakra UI. Discover your personality type through a comprehensive 70-question assessment with beautiful UI/UX and accessibility features.**

[🚀 Live Demo](#) | [📖 Documentation](MODERNIZATION.md) | [🎮 Try It Now](#)

</div>

---

## ✨ Features

### 🎯 Core Functionality
- **🧠 Comprehensive Assessment**: 70 scientifically-crafted questions to determine your MBTI personality type
- **📊 Detailed Results**: In-depth personality analysis with type descriptions and characteristics
- **📈 Progress Tracking**: Visual progress indicators and timer for each test session
- **💾 Local Storage**: Save your test results and view your complete history

### 🎨 User Experience
- **🌓 Dark/Light Mode**: Beautiful theme switching with optimized color contrast and smooth transitions
- **📱 Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **♿ Accessible Design**: WCAG 2.1 compliant with proper color contrast, keyboard navigation, and screen reader support
- **🎨 Modern UI**: Clean, intuitive interface built with Chakra UI components and Framer Motion animations

### ⚡ Performance & Technical
- **🚀 Fast Performance**: Optimized with Next.js 15 for lightning-fast load times and SEO
- **🔧 TypeScript**: Full type safety throughout the application
- **📦 Modern Bundling**: SWC compilation for optimized builds
- **🎯 PWA Ready**: Progressive Web App capabilities for mobile installation

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18.0** or later
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Quick Start

```bash
# Clone the repository
git clone https://github.com/drewsepeczi/mbti-personality-test-app.git
cd mbti-personality-test-app

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install

# Run the development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

# Open your browser
open http://localhost:3000
```

### Environment Setup

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Formatting
npm run format

# Build for production
npm run build
npm start
```

---

## 🛠️ Tech Stack

### Frontend Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router, Server Components, and Turbopack
- **[React 18](https://reactjs.org/)** - UI library with concurrent features and hooks
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript with advanced features

### UI & Styling
- **[Chakra UI 2](https://chakra-ui.com/)** - Component library for accessible, customizable UI
- **[Framer Motion 11](https://www.framer.com/motion/)** - Production-ready motion library
- **[Emotion](https://emotion.sh/)** - CSS-in-JS library for styling
- **[Fontsource Poppins](https://fontsource.org/)** - Open-source Google Fonts integration

### State Management & Data
- **[Zustand 5](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[IDB](https://github.com/jakearchibald/idb)** - IndexedDB wrapper for client-side storage
- **[Day.js](https://day.js.org/)** - Lightweight date manipulation library

### Development Tools
- **[ESLint](https://eslint.org/)** - JavaScript linting with Next.js and TypeScript rules
- **[Prettier](https://prettier.io/)** - Code formatting with consistent style
- **[Sharp](https://sharp.pixelplumbing.com/)** - High-performance image processing

---

## 📱 Screenshots

<div align="center">

### 🏠 Homepage
![Homepage](https://via.placeholder.com/800x400/667eea/ffffff?text=Homepage+Screenshot)

### 🧪 Test Interface
![Test Interface](https://via.placeholder.com/800x400/764ba2/ffffff?text=Test+Interface+Screenshot)

### 📊 Results Page
![Results Page](https://via.placeholder.com/800x400/f093fb/ffffff?text=Results+Page+Screenshot)

### 📱 Mobile View
![Mobile View](https://via.placeholder.com/400x800/4facfe/ffffff?text=Mobile+View+Screenshot)

</div>

*📸 Screenshots coming soon! The app features a modern, responsive design with smooth animations and intuitive navigation.*

---

## 🎯 How It Works

### 1. 🚀 Getting Started
- Visit the homepage and click "Take the Test"
- Read the instructions and begin your assessment
- Choose your preferred testing environment (light/dark mode)

### 2. 📝 Taking the Test
- Answer 70 multiple-choice questions about your preferences and behaviors
- Each question has 4 options representing different personality traits
- Track your progress with the visual progress bar and timer
- Take breaks as needed - your progress is automatically saved

### 3. 📊 Viewing Results
- Complete all questions to see your MBTI personality type
- Explore detailed analysis of your type characteristics
- Save your results to your personal history
- Compare results across multiple test sessions

### 4. 📈 Reviewing History
- Access all your previous test results from the history page
- View trends and changes in your personality type over time
- Export or share your results as needed

---

## 🎨 Design Features

### Accessibility
- **WCAG 2.1 AA Compliant**: Proper color contrast ratios and keyboard navigation
- **Screen Reader Support**: ARIA labels and semantic HTML structure
- **Focus Management**: Visible focus indicators and logical tab order
- **Responsive Design**: Mobile-first approach with breakpoints for all devices

### Visual Design
- **Modern Color Palette**: Carefully chosen colors for both light and dark modes
- **Typography**: Clean, readable fonts with proper hierarchy
- **Micro-interactions**: Smooth transitions and hover effects
- **Loading States**: Graceful loading indicators and skeleton screens

### Performance
- **Image Optimization**: Next.js automatic image optimization and lazy loading
- **Code Splitting**: Automatic route-based code splitting for faster initial load
- **Bundle Analysis**: Optimized imports and tree-shaking
- **Caching Strategies**: Efficient client-side and server-side caching

---

## 📁 Project Structure

```
mbti-personality-test-app/
├── components/                    # React components
│   ├── common/                   # Shared UI components
│   │   ├── color-mode-toggle.tsx # Dark/light mode toggle
│   │   ├── error-boundary.tsx    # Error boundary component
│   │   ├── footer.tsx           # Footer component
│   │   ├── loading.tsx          # Loading states
│   │   ├── modern-button.tsx    # Enhanced button component
│   │   └── nav.tsx              # Navigation component
│   ├── layouts/                  # Layout components
│   │   └── main-layout.tsx      # Main application layout
│   └── test/                     # Test-specific components
│       ├── test-answer-option.tsx # Answer option component
│       ├── test-display.tsx      # Test display component
│       ├── test-instructions.tsx # Test instructions
│       ├── test-menu.tsx         # Test menu component
│       ├── test-progress.tsx     # Progress tracking
│       ├── test-question.tsx     # Question display
│       ├── test-result-history.tsx # Results history
│       ├── test-result-stats.tsx # Results statistics
│       ├── test-result-table-of-content.tsx # Results navigation
│       ├── test-result.tsx       # Results display
│       └── test-timer.tsx        # Test timer
├── data/                         # Static data and test content
│   ├── personality-class-groups.ts # Personality type groups
│   ├── personality-classes.ts     # Personality type definitions
│   └── personality-test.ts        # Test questions and logic
├── hooks/                        # Custom React hooks
│   ├── use-headings-observer.tsx  # Heading navigation
│   └── use-performance.ts        # Performance monitoring
├── lib/                          # Utility functions
│   └── personality-test.ts       # Test logic and calculations
├── pages/                        # Next.js pages
│   ├── _app.tsx                  # App component
│   ├── _document.tsx             # Document customization
│   ├── index.tsx                 # Homepage
│   └── test/                     # Test pages
│       ├── index.tsx             # Test start page
│       └── result/               # Results pages
│           ├── [testResultId].tsx # Individual result
│           └── history/          # History pages
│               └── index.tsx     # History overview
├── store/                        # State management
│   └── use-user-test-answers.ts  # Test answers store
├── theme/                        # Theme configuration
│   └── index.ts                  # Chakra UI theme
├── public/                       # Static assets
│   ├── images/                   # Image assets
│   │   └── mbti/                 # MBTI type icons
│   ├── favicon.ico              # Favicon
│   └── manifest.json            # PWA manifest
├── .eslintrc.json               # ESLint configuration
├── .prettierrc.json             # Prettier configuration
├── next.config.js               # Next.js configuration
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes with proper commit messages
4. **Test** your changes thoroughly
5. **Push** to your fork (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow the project's ESLint configuration
- **Prettier**: Code formatting enforced
- **Component Structure**: Follow established patterns in the codebase
- **Testing**: Add tests for new features (when testing is implemented)

### Reporting Issues

- Use the **GitHub Issues** page for bug reports and feature requests
- Provide **detailed descriptions** and **reproduction steps**
- Include **screenshots** or **error messages** when applicable
- Check for **existing issues** before creating new ones

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### License Summary
- ✅ **Commercial use** allowed
- ✅ **Modification** allowed
- ✅ **Distribution** allowed
- ✅ **Private use** allowed
- 📝 **Include license and copyright notice**
- ⚠️ **Software is provided "as is"**

---

## 🙏 Acknowledgments

### Resources & Inspiration
- MBTI test questions based on [comprehensive personality research](http://www.lrjj.cn/encrm1.0/public/upload/MBTI-personality-test.pdf)
- Built with amazing open-source tools: [Next.js](https://nextjs.org/), [Chakra UI](https://chakra-ui.com/), [React](https://reactjs.org/)
- Inspired by Carl Jung's personality type theory and modern self-discovery tools

### Special Thanks
- **MBTI Community**: For ongoing research and development of personality theory
- **Open Source Contributors**: For the incredible tools that make this project possible
- **Users**: For feedback and suggestions that help improve the application

---

## 📞 Contact & Support

### Project Information
- **🏠 Homepage**: [https://github.com/drewsepeczi/mbti-personality-test-app](https://github.com/drewsepeczi/mbti-personality-test-app)
- **🐛 Issues**: [GitHub Issues](https://github.com/drewsepeczi/mbti-personality-test-app/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/drewsepeczi/mbti-personality-test-app/discussions)

### Developer Contact
- **👤 Drew Sepeczi**
- **📧 Email**: drewsepeczi@gmail.com
- **💼 LinkedIn**: [linkedin.com/in/drewsepeczi](https://linkedin.com/in/drewsepeczi)
- **🐙 GitHub**: [github.com/drewsepeczi](https://github.com/drewsepeczi)

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=drewsepeczi/mbti-personality-test-app&type=Date)](https://star-history.com/#drewsepeczi/mbti-personality-test-app&Date)

---

<div align="center">

### 🚀 Show Your Support

If you find this project helpful, please consider giving it a ⭐ star on GitHub!

### 📣 Stay Updated

Follow me for updates and new projects:
- **GitHub**: [@drewsepeczi](https://github.com/drewsepeczi)
- **LinkedIn**: [@drewsepeczi](https://linkedin.com/in/drewsepeczi)

---

<p align="center">
  <strong>Made with ❤️ using Next.js, TypeScript, and Chakra UI</strong><br>
  <em>Building better tools for self-discovery and personal growth</em>
</p>

</div>