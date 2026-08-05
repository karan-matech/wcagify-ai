# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: keyboard-navigation-and-forms.spec.ts >> WCAGify.ai Keyboard Navigation & Form Validation Tests >> Keyboard Tab switching using ArrowRight and ArrowLeft in Universal Asset Tabs
- Location: tests/keyboard-navigation-and-forms.spec.ts:36:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - link "Skip to main content" [ref=e4] [cursor=pointer]:
      - /url: "#main-content"
    - banner [ref=e5]:
      - navigation "Primary Navigation" [ref=e6]:
        - link "WCAGify.ai Home" [ref=e7] [cursor=pointer]:
          - /url: "#"
          - img "WCAGify.ai logo" [ref=e8]
          - generic [ref=e9]: WCAG 2.2 AA
        - generic [ref=e11]:
          - link "Engine" [ref=e12] [cursor=pointer]:
            - /url: "#pipeline"
          - link "Native vs Overlay" [ref=e13] [cursor=pointer]:
            - /url: "#comparison"
          - link "Assets" [ref=e14] [cursor=pointer]:
            - /url: "#assets"
          - link "Gatekeeper" [ref=e15] [cursor=pointer]:
            - /url: "#gatekeeper"
          - button "a11y Statement" [ref=e16]
        - link "Request Demo" [ref=e22] [cursor=pointer]:
          - /url: "#demo-request"
    - main [ref=e26]:
      - generic [ref=e29]:
        - generic [ref=e30]:
          - generic [ref=e31]: One Platform. Universal Accessibility.
          - generic [ref=e37]: Native Source Remediation
        - heading "Building the AI Infrastructure for Digital Accessibility" [level=1] [ref=e38]
        - paragraph [ref=e39]: Millions face digital barriers every day. WCAGify transforms inaccessible websites, enterprise documents, and digital publications into natively compliant, born-accessible assets—reconstructing accessibility directly at the source.
        - generic [ref=e40]:
          - button "Transform Your Digital Assets" [ref=e41]
          - button "Explore Build Gatekeeper" [ref=e45]
        - generic [ref=e47]:
          - generic [ref=e52]:
            - generic [ref=e53]: 100% Native Code
            - generic [ref=e54]: Remediated at source, never masked
          - generic [ref=e58]:
            - generic [ref=e59]: WCAG 2.2 AA & ADA
            - generic [ref=e60]: EAA EN 301 549 Law compliant
          - generic [ref=e65]:
            - generic [ref=e66]: AST & Tag Trees
            - generic [ref=e67]: PDF/UA, EPUB3, DOM trees
          - generic [ref=e73]:
            - generic [ref=e74]: Fail-Closed Gate
            - generic [ref=e75]: CI/CD compilation guard
      - generic [ref=e77]:
        - generic [ref=e78]:
          - generic [ref=e79]: Simple Animated Breakdown
          - heading "How WCAGify Fixes Your Website In Seconds" [level=2] [ref=e83]
          - paragraph [ref=e84]: No complicated code knowledge required. See how WCAGify automatically removes barriers for real people—whether they use screen readers, keyboard navigation, or high-contrast display modes.
        - generic [ref=e85]:
          - button "Screen Reader (Blind Users)" [ref=e86]
          - button "Keyboard Only (Motor Impaired)" [ref=e92]
          - button "Low Vision & High Contrast" [ref=e96]
        - generic [ref=e101]:
          - generic [ref=e102]:
            - generic [ref=e103]: "Status: WCAGify Repaired (100% Accessible)"
            - generic [ref=e109]:
              - button "Show Broken Original" [ref=e110]
              - button "Show developer view" [ref=e115]:
                - generic [ref=e120]: Developer View
          - generic [ref=e121]:
            - generic [ref=e122]:
              - generic [ref=e123]: https://my-store.com/checkout
              - generic [ref=e129]:
                - generic [ref=e130]:
                  - heading "Checkout & Payment Confirmation" [level=3] [ref=e131]
                  - generic [ref=e132]: "✓ Fixed: High contrast WCAG 7.2:1 ratio"
                - generic [ref=e138]:
                  - paragraph [ref=e139]: Order Summary Chart
                  - paragraph [ref=e140]: alt="Quarterly summary showing 3 items totaling $142.00"
                - generic [ref=e141]:
                  - generic [ref=e143]:
                    - generic [ref=e144]: Cardholder Name
                    - generic [ref=e145]: Explicit <label> tag
                  - textbox "Full name (demonstration field)" [ref=e146]: John Doe
                - button "Complete Purchase ($142.00)" [ref=e148]
            - generic [ref=e152]:
              - generic [ref=e153]:
                - heading "Screen Reader Experience" [level=4] [ref=e159]
                - paragraph [ref=e160]: WCAGify synthesized descriptive alt-text and structured headings. Blind users hear exact details rather than confusing image filenames.
                - button "🔊 Click to Listen (Audio Simulation)" [ref=e162]
              - generic [ref=e168]:
                - heading "What WCAGify Reconstructed" [level=5] [ref=e169]
                - list [ref=e170]:
                  - listitem [ref=e171]:
                    - generic [ref=e175]: Native Source Code Fixes (No surface overlays)
                  - listitem [ref=e176]:
                    - generic [ref=e180]: Context-Aware AI Alt Text Generation
                  - listitem [ref=e181]:
                    - generic [ref=e185]: Guaranteed WCAG 2.2 AA & ADA Legal Compliance
      - generic [ref=e187]:
        - generic [ref=e188]:
          - generic [ref=e189]: The Architectural Shift
          - heading "Native Source Remediation vs. The \"Overlay Trap\"" [level=2] [ref=e192]
          - paragraph [ref=e193]: Accessibility cannot be achieved with floating JavaScript toolbars or superficial overlays. True accessibility lives natively inside the source code, DOM structure, and tag tree of the digital asset itself.
        - generic [ref=e195]:
          - generic [ref=e196]:
            - heading "Global Legal Mandates & Compliance Drivers" [level=3] [ref=e200]
            - generic [ref=e201]: Strict Legal Liability
          - generic [ref=e202]:
            - generic [ref=e203]:
              - generic [ref=e204]:
                - heading "European Accessibility Act (EAA EN 301 549)" [level=4] [ref=e205]
                - generic [ref=e206]: Enforced EU-Wide
              - paragraph [ref=e207]: Mandates strict WCAG 2.2 AA accessibility across all e-commerce, banking, ebooks, and public digital services operating in the EU. Fines and operational bans apply to non-compliant digital assets.
            - generic [ref=e208]:
              - generic [ref=e209]:
                - heading "US ADA Title II & Section 508" [level=4] [ref=e210]
                - generic [ref=e211]: DOJ Rule Active
              - paragraph [ref=e212]: The US Department of Justice enforces WCAG 2.2 AA compliance for public entities, healthcare, and higher education across both web platforms and enterprise PDF documents.
        - generic [ref=e213]:
          - generic [ref=e214]:
            - generic [ref=e215]: "1"
            - heading "Accessibility Belongs Inside the Asset" [level=3] [ref=e216]
            - paragraph [ref=e217]: Accessibility is an intrinsic property of the digital asset itself—not a surface overlay, not a third-party widget, and not a floating toolbar that breaks assistive tools.
          - generic [ref=e218]:
            - generic [ref=e219]: "2"
            - heading "Native Source Remediation" [level=3] [ref=e220]
            - paragraph [ref=e221]: Reconstruct accessibility directly into the source code, DOM structure, tag trees, and semantic tokens rather than masking problems with temporary JavaScript patches.
          - generic [ref=e222]:
            - generic [ref=e223]: "3"
            - heading "Fail-Closed Build Gatekeeper" [level=3] [ref=e224]
            - paragraph [ref=e225]: Accessibility is an unbroken guarantee. Non-compliant code or assets MUST halt the compilation process with clear diagnostic feedback before hitting production.
        - generic [ref=e226]:
          - generic [ref=e227]:
            - generic [ref=e228]:
              - heading "Methodology Comparison Matrix" [level=3] [ref=e229]
              - paragraph [ref=e230]: Evaluating accessibility remediation strategies against enterprise requirements
            - generic [ref=e231]: WCAGify Native AI Engine
          - region "Remediation approach comparison, scrollable table" [ref=e235]:
            - table "Remediation Approach Comparison" [ref=e236]:
              - rowgroup [ref=e237]:
                - row [ref=e238]:
                  - columnheader "Evaluation Criterion" [ref=e239]
                  - columnheader "Superficial Overlays" [ref=e240]
                  - columnheader "Manual Services" [ref=e246]
                  - columnheader "WCAGify Native AI" [ref=e247]
              - rowgroup [ref=e252]:
                - row [ref=e253]:
                  - rowheader "Remediation Depth" [ref=e254]
                  - cell "Surface-level JS injection (does not change source code or PDF tags)" [ref=e255]
                  - cell "Manual coding per file (slow, expensive, breaks on updates)" [ref=e256]
                  - 'cell "Native Source Remediation: Reconstructs AST, DOM, and PDF/UA tag trees natively" [ref=e257]'
                - row [ref=e258]:
                  - rowheader "Screen Reader Compatibility" [ref=e259]
                  - cell "Frequently conflicts with VoiceOver/NVDA; blocked by adblockers" [ref=e260]
                  - cell "Compatible until next code release or CMS edit" [ref=e261]
                  - cell "100% Native compatibility; works on any assistive device without scripts" [ref=e262]
                - row [ref=e263]:
                  - rowheader "Legal & Regulatory Standing" [ref=e264]
                  - cell "Rejected by courts (EAA & ADA Title II explicitly penalize overlays)" [ref=e265]
                  - cell "Compliant until next unvetted release" [ref=e266]
                  - cell "Full Legal Audit Compliance (EAA EN 301 549 & US ADA Title II / Sec 508)" [ref=e267]
                - row [ref=e268]:
                  - rowheader "Scalability & CI/CD Guard" [ref=e269]
                  - cell "None (Floating widget on top of broken sites)" [ref=e270]
                  - cell "Manual QA bottleneck (weeks per document or release)" [ref=e271]
                  - 'cell "Fail-Closed Build Gatekeeper: Halts non-compliant builds automatically in CI/CD" [ref=e272]'
                - row [ref=e273]:
                  - rowheader "Asset Coverage Scope" [ref=e274]
                  - cell "Web pages only (cannot remediate PDFs, EPUBs, or Knowledge Bases)" [ref=e275]
                  - cell "Fragmented vendors for Web vs PDFs vs EPUBs" [ref=e276]
                  - 'cell "Universal Scope: Web & SaaS, Tagged PDFs, EPUB 3, & Enterprise Docs" [ref=e277]'
      - generic [ref=e279]:
        - generic [ref=e280]:
          - generic [ref=e281]: Universal Asset Transformation
          - heading "One Engine. Every Asset Format." [level=2] [ref=e285]
          - paragraph [ref=e286]: Select a digital format below to see how WCAGify automatically converts inaccessible files, e-books, and web apps into natively compliant assets.
        - tablist "Universal Asset Format Selector" [ref=e287]:
          - tab "Websites & Apps HTML5 + ARIA" [active] [selected] [ref=e288]:
            - generic [ref=e292]: Websites & Apps
            - generic [ref=e293]: HTML5 + ARIA
          - tab "PDFs & Documents PDF/UA ISO 14289" [ref=e294]:
            - generic [ref=e299]: PDFs & Documents
            - generic [ref=e300]: PDF/UA ISO 14289
          - tab "E-Books & Publishing EPUB 3 & MathML" [ref=e301]:
            - generic [ref=e305]: E-Books & Publishing
            - generic [ref=e306]: EPUB 3 & MathML
          - tab "Portals & Knowledge Bases Wikis & Portals" [ref=e307]:
            - generic [ref=e313]: Portals & Knowledge Bases
            - generic [ref=e314]: Wikis & Portals
        - tabpanel "Websites & Apps HTML5 + ARIA" [ref=e315]:
          - generic [ref=e316]:
            - generic [ref=e317]: Fix Web Forms, Buttons & Dashboards Natively
            - generic [ref=e322]:
              - button "View Unremediated" [ref=e323]
              - button "Show developer view" [ref=e328]:
                - generic [ref=e333]: Developer View
          - generic [ref=e334]:
            - generic [ref=e335]:
              - generic [ref=e336]:
                - generic [ref=e337]:
                  - text: "Format:"
                  - strong [ref=e342]: Websites & Apps
                - generic [ref=e343]: ✓ Accessible Output
              - generic [ref=e344]:
                - generic [ref=e345]:
                  - heading "Natively Fixed Web Form" [level=3] [ref=e346]
                  - paragraph [ref=e351]: Native semantic elements with clear focus outlines, high-contrast text, and screen reader announcements.
                - generic [ref=e352]:
                  - generic [ref=e353]: "Accessibility Capabilities Added:"
                  - list [ref=e354]:
                    - listitem [ref=e355]:
                      - generic [ref=e358]: Full keyboard focus ring
                    - listitem [ref=e359]:
                      - generic [ref=e362]: WCAG 7.2:1 contrast ratio
                    - listitem [ref=e363]:
                      - generic [ref=e366]: ARIA live regions for dynamic updates
            - generic [ref=e367]:
              - generic [ref=e368]:
                - heading "How WCAGify Fixes This" [level=4] [ref=e374]
                - paragraph [ref=e375]: Reconstructs web pages so everyone can register, pay, and navigate—using a mouse, keyboard, or screen reader.
                - button "🔊 Listen to Audio Preview" [ref=e377]
              - generic [ref=e387]:
                - generic [ref=e388]: Guaranteed Compliance
                - text: WCAG 2.2 AA, ADA Title II & EAA EN 301 549
      - generic [ref=e390]:
        - generic [ref=e391]:
          - generic [ref=e392]: Core Technology Architecture
          - heading "The Tri-Pillar Architecture" [level=2] [ref=e396]
          - paragraph [ref=e397]: Blending AI Reasoning, Deterministic Software Precision, and Human Judgment to guarantee 100% compliance at scale.
        - generic [ref=e398]:
          - button "Pillar 01 AI Intelligence Reasoning & Vision Generates natural language alt-text, understands complex visual layouts, and infers document reading hierarchies. Explore Capabilities" [pressed] [ref=e399]:
            - generic [ref=e400]: Pillar 01
            - heading "AI Intelligence" [level=3] [ref=e406]
            - generic [ref=e407]: Reasoning & Vision
            - paragraph [ref=e408]: Generates natural language alt-text, understands complex visual layouts, and infers document reading hierarchies.
            - generic [ref=e409]: Explore Capabilities
          - button "Pillar 02 Deterministic Systems Precision & Rules Enforces strict structural rules for ISO 14289-1 PDF/UA tag trees, ARIA landmarks, and contrast ratios. Explore Capabilities" [ref=e413]:
            - generic [ref=e414]: Pillar 02
            - heading "Deterministic Systems" [level=3] [ref=e420]
            - generic [ref=e421]: Precision & Rules
            - paragraph [ref=e422]: Enforces strict structural rules for ISO 14289-1 PDF/UA tag trees, ARIA landmarks, and contrast ratios.
            - generic [ref=e423]: Explore Capabilities
          - button "Pillar 03 Human Expert Workspace Judgment & QA Empowers accessibility experts with an integrated workspace to review high-complexity edge cases. Explore Capabilities" [ref=e427]:
            - generic [ref=e428]: Pillar 03
            - heading "Human Expert Workspace" [level=3] [ref=e435]
            - generic [ref=e436]: Judgment & QA
            - paragraph [ref=e437]: Empowers accessibility experts with an integrated workspace to review high-complexity edge cases.
            - generic [ref=e438]: Explore Capabilities
        - generic [ref=e442]:
          - generic [ref=e443]:
            - generic [ref=e444]:
              - generic [ref=e445]: Pillar 01 In-Depth
              - heading "AI Intelligence (Reasoning & Vision)" [level=3] [ref=e446]
            - generic [ref=e447]: Active System Module
          - generic [ref=e448]:
            - generic [ref=e449]:
              - heading "Core Execution Responsibilities" [level=4] [ref=e450]
              - list [ref=e451]:
                - listitem [ref=e452]:
                  - generic [ref=e455]: Context-aware visual layout & reading order inference
                - listitem [ref=e456]:
                  - generic [ref=e459]: Automatic semantic image description synthesis (Alt-Text)
                - listitem [ref=e460]:
                  - generic [ref=e463]: Complex chart, diagram, & mathematical formula interpretation
                - listitem [ref=e464]:
                  - generic [ref=e467]: Natural language table matrix comprehension
            - generic [ref=e468]:
              - generic [ref=e469]:
                - generic [ref=e470]: Technical Implementation Specification
                - paragraph [ref=e471]: Powered by Gemini Multi-Modal Vision & Semantic Reasoning Models running server-side in secure Cloud Run containers.
              - generic [ref=e472]:
                - generic [ref=e473]: "Compliance Verification:"
                - generic [ref=e474]: 100% Zero-Regression Guarantee
      - generic [ref=e476]:
        - generic [ref=e477]:
          - generic [ref=e478]: Automatic Quality Gatekeeper
          - heading "Stop Inaccessible Content Before It Goes Live" [level=2] [ref=e481]
          - paragraph [ref=e482]: Think of WCAGify as an automatic security guard for your website. If anyone on your team accidentally uploads broken buttons or unreadable documents, WCAGify stops the update instantly and fixes it before customers see it.
        - generic [ref=e483]:
          - generic [ref=e484]:
            - generic [ref=e485]: "Guard Status: Ready to Scan Release"
            - generic [ref=e490]:
              - button "Simulate Publishing Inaccessible Page" [ref=e491]
              - button "Show developer view" [ref=e495]:
                - generic [ref=e500]: Developer View
          - generic [ref=e501]:
            - generic [ref=e502]:
              - generic [ref=e503]:
                - generic [ref=e504]: "1"
                - generic [ref=e505]:
                  - generic [ref=e506]: Team Member Submits Web Update
                  - paragraph [ref=e507]: A developer or marketer pushes new marketing pages and PDF reports to the server.
              - generic [ref=e509]:
                - generic [ref=e510]: "2"
                - generic [ref=e511]:
                  - generic [ref=e512]: WCAGify Safety Gate Checkpoint
                  - paragraph [ref=e514]: Click "Simulate Publishing Inaccessible Page" above to trigger the guard.
              - generic [ref=e516]:
                - generic [ref=e517]: "3"
                - generic [ref=e518]:
                  - generic [ref=e519]: Live Customer Site
                  - paragraph [ref=e520]: Protected by WCAGify. No inaccessible content can ever break through to live users.
            - generic [ref=e521]:
              - generic [ref=e522]:
                - heading "Why This Matters" [level=3] [ref=e526]
                - paragraph [ref=e527]: Most accessibility lawsuits happen when team members publish new content or PDF files without checking accessibility. WCAGify guarantees you never make a mistake by acting as a zero-effort safety filter.
                - button "🔊 Listen to Guard Voice Audio" [ref=e529]
              - generic [ref=e539]:
                - generic [ref=e540]: Fail-Closed Security Guarantee
                - text: Zero non-compliant releases reach customers.
      - generic [ref=e542]:
        - status [ref=e543]
        - generic [ref=e544]:
          - generic [ref=e545]:
            - generic [ref=e546]: Schedule Platform Demonstration
            - heading "Transform Your Digital Assets at Scale" [level=2] [ref=e550]
            - paragraph [ref=e551]: Request a live demonstration of the WCAGify AI engine on your organization's websites, PDFs, EPUB publications, or enterprise docs.
          - generic [ref=e552]:
            - generic [ref=e553]:
              - generic [ref=e554]: Full Name *
              - textbox "Full Name" [ref=e555]:
                - /placeholder: e.g. Eleanor Vance
              - generic [ref=e556]: Your primary contact name for scheduling.
            - generic [ref=e557]:
              - generic [ref=e558]: Work Email Address *
              - textbox "Work Email Address" [ref=e559]:
                - /placeholder: eleanor@organization.gov
              - generic [ref=e560]: Please use your corporate, government, or institutional email.
            - generic [ref=e561]:
              - generic [ref=e562]:
                - generic [ref=e563]: Organization Type
                - combobox "Organization Type" [ref=e564]:
                  - option "Enterprise SaaS / Tech Company" [selected]
                  - option "Government / Public Sector Entity"
                  - option "Publishing House / Media Group"
                  - option "Higher Education / Academic Institution"
                  - option "Healthcare / Financial Services"
              - generic [ref=e565]:
                - generic [ref=e566]: Primary Digital Asset Focus
                - combobox "Primary Digital Asset Focus" [ref=e567]:
                  - option "Universal (Web, PDFs, EPUB, Docs)" [selected]
                  - option "Websites & SaaS Web Apps"
                  - option "Enterprise Tagged PDFs (PDF/UA)"
                  - option "EPUB 3 E-Books & Journals"
                  - option "Internal Knowledge Portals"
            - generic [ref=e568]:
              - generic [ref=e569]: Asset Volume & Remediation Timeline *
              - textbox "Asset Volume & Remediation Timeline" [ref=e570]:
                - /placeholder: e.g. We have ~5,000 untagged annual PDFs and a Next.js web portal that needs EAA EN 301 549 compliance by Q2...
              - generic [ref=e571]: Helps our engineers prepare relevant live transformation samples for your demo.
            - button "Submit Demo Request" [ref=e573]
    - contentinfo [ref=e577]:
      - generic [ref=e578]:
        - generic [ref=e579]:
          - generic [ref=e580]:
            - link "WCAGify.ai Home" [ref=e581] [cursor=pointer]:
              - /url: "#"
              - img "WCAGify.ai logo" [ref=e582]
            - paragraph [ref=e583]: "\"WCAGify is building the AI infrastructure for digital accessibility across Web, Documents, Publishing, and Enterprise Knowledge. Reconstructing accessibility directly at the source.\""
            - generic [ref=e584]:
              - generic [ref=e585]: WCAGify.ai Global Headquarters, 100 Accessibility Way, Suite 400, San Francisco, CA 94105
              - link "accessibility@wcagify.ai" [ref=e594] [cursor=pointer]:
                - /url: mailto:accessibility@wcagify.ai
              - generic [ref=e595]: +1 (800) 555-WCAG (9224)
          - generic [ref=e599]:
            - heading "Platform & Pipeline" [level=3] [ref=e600]
            - list [ref=e601]:
              - listitem [ref=e602]:
                - link "4-Step Transformation Engine" [ref=e603] [cursor=pointer]:
                  - /url: "#pipeline"
              - listitem [ref=e604]:
                - link "Native vs. Overlay Trap" [ref=e605] [cursor=pointer]:
                  - /url: "#comparison"
              - listitem [ref=e606]:
                - link "Universal Asset Engine" [ref=e607] [cursor=pointer]:
                  - /url: "#assets"
              - listitem [ref=e608]:
                - link "Tri-Pillar AI Architecture" [ref=e609] [cursor=pointer]:
                  - /url: "#architecture"
              - listitem [ref=e610]:
                - link "Fail-Closed Build Gatekeeper" [ref=e611] [cursor=pointer]:
                  - /url: "#gatekeeper"
          - generic [ref=e612]:
            - heading "Regulatory Standards" [level=3] [ref=e613]
            - list [ref=e614]:
              - listitem [ref=e615]:
                - link "WCAG 2.2 Level AA Standard" [ref=e616] [cursor=pointer]:
                  - /url: "#regulatory"
              - listitem [ref=e617]:
                - link "European Accessibility Act (EN 301 549)" [ref=e618] [cursor=pointer]:
                  - /url: "#regulatory"
              - listitem [ref=e619]:
                - link "US ADA Title II & Section 508" [ref=e620] [cursor=pointer]:
                  - /url: "#regulatory"
              - listitem [ref=e621]:
                - link "ISO 14289-1 PDF/UA Specifications" [ref=e622] [cursor=pointer]:
                  - /url: "#assets"
              - listitem [ref=e623]:
                - link "EPUB 3.3 Publication Guidelines" [ref=e624] [cursor=pointer]:
                  - /url: "#assets"
          - generic [ref=e625]:
            - heading "Company & Policies" [level=3] [ref=e626]
            - list [ref=e627]:
              - listitem [ref=e628]:
                - button "Accessibility Statement" [ref=e629]
              - listitem [ref=e633]:
                - link "Request Platform Demo" [ref=e634] [cursor=pointer]:
                  - /url: "#demo-request"
              - listitem [ref=e635]: Privacy Policy (SOC-2 Type II)
              - listitem [ref=e636]: Terms of Platform Service
              - listitem [ref=e637]: Security & Data Governance
        - generic [ref=e638]:
          - generic [ref=e639]:
            - generic [ref=e640]: WCAG 2.2 AA Compliant
            - generic [ref=e644]: Natively Built — Zero Overlay Dependencies.
          - generic [ref=e645]:
            - link "WCAGify.ai on LinkedIn (opens in new tab)" [ref=e646] [cursor=pointer]:
              - /url: https://linkedin.com
              - generic [ref=e651]: LinkedIn
            - link "WCAGify.ai on X / Twitter (opens in new tab)" [ref=e652] [cursor=pointer]:
              - /url: https://x.com
              - generic [ref=e655]: Twitter / X
            - link "WCAGify.ai on GitHub (opens in new tab)" [ref=e656] [cursor=pointer]:
              - /url: https://github.com
              - generic [ref=e660]: GitHub
            - button "Back to top of page" [ref=e661]
  - generic:
    - status [ref=e664]
    - button "Open accessibility preferences. Shortcut Alt plus A" [ref=e665] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | /**
  4  |  * Keyboard Accessibility, Interactive UX, and Form Validation Assertion Suite
  5  |  */
  6  | test.describe('WCAGify.ai Keyboard Navigation & Form Validation Tests', () => {
  7  | 
  8  |   test('Skip Link should become visible and shift focus to main content on first tab', async ({ page, browserName }) => {
  9  |     // Safari/WebKit only tabs between form controls unless the user enables
  10 |     // "Press Tab to highlight each item"; links are skipped by default. That is
  11 |     // a browser preference, not a page defect, so the Tab-order assertion is
  12 |     // only meaningful on engines that put links in the tab sequence.
  13 |     test.skip(browserName === 'webkit', 'WebKit excludes links from Tab order by default');
  14 |     await page.goto('/');
  15 | 
  16 |     // Initially, skip-link should not be visible to screen-readers but hidden offscreen
  17 |     const skipLink = page.locator('a[href="#main-content"]');
  18 |     await expect(skipLink).toBeAttached();
  19 | 
  20 |     // Emulate tab keypress to focus skip-link
  21 |     await page.keyboard.press('Tab');
  22 | 
  23 |     // Assert that the skip link is now focused and visible
  24 |     const isFocused = await skipLink.evaluate((el) => document.activeElement === el);
  25 |     expect(isFocused).toBe(true);
  26 | 
  27 |     // Press enter on Skip Link to activate routing
  28 |     await page.keyboard.press('Enter');
  29 | 
  30 |     // Assert that main content has focused (we added tabIndex={-1} on main)
  31 |     const mainContent = page.locator('main#main-content');
  32 |     const isMainFocused = await mainContent.evaluate((el) => document.activeElement === el);
  33 |     expect(isMainFocused).toBe(true);
  34 |   });
  35 | 
  36 |   test('Keyboard Tab switching using ArrowRight and ArrowLeft in Universal Asset Tabs', async ({ page }) => {
  37 |     await page.goto('/');
  38 | 
  39 |     const firstTab = page.locator('button[role="tab"]').first();
  40 |     
  41 |     // Focus on the first tab of Universal Asset format selectors
  42 |     await firstTab.focus();
  43 | 
  44 |     // Tab list keys cycle
  45 |     await page.keyboard.press('ArrowRight');
  46 |     
  47 |     // Check if second tab is focused and active
  48 |     const secondTab = page.locator('button[role="tab"]').nth(1);
  49 |     const isSecondTabFocused = await secondTab.evaluate((el) => document.activeElement === el);
  50 |     expect(isSecondTabFocused).toBe(true);
  51 |     expect(await secondTab.getAttribute('aria-selected')).toBe('true');
  52 | 
  53 |     // Cycle left back to the first tab
  54 |     await page.keyboard.press('ArrowLeft');
  55 |     const isFirstTabFocused = await firstTab.evaluate((el) => document.activeElement === el);
> 56 |     expect(isFirstTabFocused).toBe(true);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  57 |     expect(await firstTab.getAttribute('aria-selected')).toBe('true');
  58 |   });
  59 | 
  60 |   test('Demo request form empty submit should inject aria-invalid attributes and dynamic role="alert" alerts', async ({ page }) => {
  61 |     await page.goto('/');
  62 | 
  63 |     // Scroll to the demo form
  64 |     const formSection = page.locator('form');
  65 |     await formSection.scrollIntoViewIfNeeded();
  66 | 
  67 |     // Verify fields are initially valid and have no alert overlays
  68 |     const nameInput = page.locator('input#fullName');
  69 |     const emailInput = page.locator('input#email');
  70 | 
  71 |     expect(await nameInput.getAttribute('aria-invalid')).toBe('false');
  72 |     expect(await emailInput.getAttribute('aria-invalid')).toBe('false');
  73 | 
  74 |     // Attempt to submit form with blank fields
  75 |     const submitBtn = page.locator('button[type="submit"]');
  76 |     await submitBtn.click();
  77 | 
  78 |     // Verify validation errors are dynamically triggered
  79 |     expect(await nameInput.getAttribute('aria-invalid')).toBe('true');
  80 |     expect(await emailInput.getAttribute('aria-invalid')).toBe('true');
  81 | 
  82 |     // Verify presence of role="alert" with clear, polite accessibility feedback
  83 |     const nameAlert = page.locator('span#fullName-error[role="alert"]');
  84 |     const emailAlert = page.locator('span#email-error[role="alert"]');
  85 | 
  86 |     await expect(nameAlert).toBeVisible();
  87 |     await expect(emailAlert).toBeVisible();
  88 | 
  89 |     expect(await nameAlert.innerText()).toContain('Name is required');
  90 |     expect(await emailAlert.innerText()).toMatch(/email .*required/i);
  91 |   });
  92 | });
  93 | 
```