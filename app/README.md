# CoreBench

CoreBench is a high-performance, professional-grade developer workbench designed for the modern 2026 workflow. It provides a centralized suite of utilities focusing on speed, security, and developer productivity.

## Primary Modules

### Developer Utilities
Provides essential tools for day-to-day development tasks, including:
- **JSON Modernizer**: High-speed formatting and validation.
- **Security Suite**: JWT Decoders, HMAC Generators, and secure Password generation.
- **Transformation Tools**: Base64 encoding/decoding, HTML/CSS minification, and SQL formatting.

### Financial Calculators
Precision instruments for financial planning and analysis:
- **Loan Dynamics**: Comprehensive EMI and amortization schedule calculators.
- **Taxation & Investment**: GST and SIP estimation tools (forthcoming).

## Technical Architecture

### Core Stack
- **Framework**: React 18+ with Vite for optimal HMR and build performance.
- **Interface**: Custom CSS design system with glassmorphism and premium micro-animations.
- **Iconography**: Lucide React for consistent vector iconography.

### Internationalization & SEO
- **Multi-Regional Engine**: Support for 9+ languages with dynamic routing and locale persistency.
- **Search Optimization**: Automated sitemap generation, localized meta-tags, and optimized crawlable components.

## Development Workflow

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Local Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Production Build
To generate a production-ready bundle:
```bash
npm run build
```

The output will be located in the `dist/` directory, optimized for deployment.

## Project Structure

- `src/components`: Reusable UI components and design system tokens.
- `src/pages`: Top-level route components and page layouts.
- `src/tools`: Core logic and internal state management for individual utilities.
- `src/data`: Centralized translation keys and metadata storage.
- `src/context`: Global state providers for language and configuration.

## License

Internal Enterprise Distribution - CoreBench 2026.
