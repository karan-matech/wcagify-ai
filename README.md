# WCAGify.ai

**WCAGify.ai** is an AI-powered infrastructure for digital accessibility compliance across Web applications, Digital Documents, Publishing, and Enterprise Knowledge bases. Built on Next.js, React, and Gemini AI models, WCAGify.ai enables automated accessibility diagnostics, WCAG 2.2 auditing, and intelligent remediation workflows.

---

## 💡 Core Philosophy

At WCAGify.ai, we approach digital accessibility not as an afterthought or static checklist, but as a foundational architectural discipline:

1. **Universal Access by Design**
   Accessibility is an essential human right and standard engineering practice. Systems should be usable by everyone, regardless of hardware, software, language, location, or ability.

2. **Proactive Diagnostics over Reactive Hotfixes**
   Accessibility flaws should be identified early in the development lifecycle. Automated audits, linting, and AI-driven structural analysis prevent accessibility debt from entering production environments.

3. **Standards-Driven Precision (WCAG 2.2 / Section 508 / EN 301 549)**
   Every rule, recommendation, and repair strictly adheres to international accessibility standards, including WCAG 2.2 Levels A, AA, and AAA guidelines.

4. **AI-Assisted, Human-Centric Remediation**
   Artificial intelligence handles pattern matching, contrast evaluation, semantic tree analysis, and contextual alt-text generation, while maintaining clear, readable output for human audit validation.

---

## ⚡ Key Features

- **Automated Web & Component Auditing**: Evaluates DOM elements, ARIA attributes, color contrast, keyboard navigation, and landmark structures.
- **AI Accessibility Engine**: Utilizes Google Gemini to generate context-aware fix suggestions, semantic code refactoring, and accessible descriptive text.
- **Interactive Remediation Workspace**: Comprehensive UI for visualizing compliance status, severity scoring, and actionable remediation steps.
- **Multi-Standards Coverage**: Aligned with WCAG 2.1 / 2.2 AA standards, WAI-ARIA 1.2 specifications, and modern responsive design principles.

---

## 🚀 Steps to Run

Follow these steps to set up, develop, build, and run WCAGify.ai on your machine:

### 1. Prerequisites

Ensure you have the following installed:

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

### 2. Install Dependencies

Install all project dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` (if present) or create a `.env.local` file with your API credentials:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the app.

### 5. Type Checking & Code Quality

Run static TypeScript analysis to verify type safety:

```bash
npm run lint
```

### 6. Critical Checks & Build Verification

Execute pre-build accessibility check scripts:

```bash
npm run test:critical
```

### 7. Production Build

Compile and bundle the project for production deployment:

```bash
npm run build
```

### 8. Production Preview

Preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```text
├── src/
│   ├── app/                # Next.js App Router (pages & layouts)
│   │   ├── page.tsx        # Dashboard / Audit interface
│   │   ├── layout.tsx      # Root application layout
│   │   └── accessibility/ # Detailed accessibility guidelines view
│   ├── components/         # Reusable UI components & visualizers
│   └── lib/                # Core utilities, state management, & Gemini integration
├── scripts/                # Development, build, and pre-build validation scripts
├── public/                 # Static assets, SVG icons, & media
├── metadata.json           # Application identity & permissions metadata
├── package.json            # Project manifest, scripts, and dependencies
└── README.md               # Project documentation & philosophy
```

---

## 🛡️ License

Private & Confidential — Built with WCAGify.ai.
