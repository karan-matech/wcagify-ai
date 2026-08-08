"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

/* ============================ configuration ============================== */

export interface WcagifyWidgetProps {
  rootSelector?: string;
  mainSelector?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  storageKey?: string;
  accentColor?: string;
  dictionaryEndpoint?: string | null;
}

const DEFAULT_STORAGE_KEY = "wcagify.a11y.preferences.v1";
const ROOT_ATTR = "data-wcagify-root";

/* ============================== settings ================================= */

type ColorMode =
  | "default"
  | "monochrome"
  | "darkHighContrast"
  | "brightHighContrast"
  | "lowSaturation"
  | "highSaturation"
  | "contrast";
type FontChoice = "default" | "readable" | "dyslexic";
type CustomTarget = "bg" | "heading" | "text";
type CursorMode = "off" | "white" | "black";
type ContentControl = "fontScale" | "lineStep" | "wordStep" | "letterStep";

interface Settings {
  fontScale: number;
  lineStep: number;
  wordStep: number;
  letterStep: number;
  colorMode: ColorMode;
  font: FontChoice;
  links: boolean;
  headings: boolean;
  focus: boolean;
  cursor: CursorMode;
  motion: boolean;
  readingMask: boolean;
  readingGuide: boolean;
  /* Tools */
  blinksBlocking: boolean;
  magnifier: boolean;
  imageDescriptions: boolean;
  highlightElements: boolean;
  enlargeButtons: boolean;
  readableMode: boolean;
  textMagnifier: boolean;
  muteMedia: boolean;
  dictionary: boolean;
  virtualKeyboard: boolean;
  customBg: string | null;
  customHeading: string | null;
  customText: string | null;
  inkAuto: boolean;
}

const DEFAULTS: Settings = {
  fontScale: 100,
  lineStep: 0,
  wordStep: 0,
  letterStep: 0,
  colorMode: "default",
  font: "default",
  links: false,
  headings: false,
  focus: false,
  cursor: "off",
  motion: false,
  readingMask: false,
  readingGuide: false,
  blinksBlocking: false,
  magnifier: false,
  imageDescriptions: false,
  highlightElements: false,
  enlargeButtons: false,
  readableMode: false,
  textMagnifier: false,
  muteMedia: false,
  dictionary: false,
  virtualKeyboard: false,
  customBg: null,
  customHeading: null,
  customText: null,
  inkAuto: false,
};

const PROFILES: {
  key: string;
  label: string;
  hint: string;
  settings: Partial<Settings>;
}[] = [
  {
    key: "blindness",
    label: "Blindness",
    hint: "Screen-reader optimised: landmarks, strong focus, link and heading emphasis",
    settings: { focus: true, links: true, headings: true, motion: true },
  },
  {
    key: "motor",
    label: "Motor Skills Disorders",
    hint: "Large cursor, strong focus, larger targets, calm motion",
    settings: { cursor: "black", focus: true, motion: true, fontScale: 125 },
  },
  {
    key: "colorBlindness",
    label: "Color Blindness",
    hint: "Desaturated palette with non-colour cues on links and headings",
    settings: { colorMode: "monochrome", links: true, headings: true },
  },
  {
    key: "visuallyImpaired",
    label: "Visually Impaired",
    hint: "Larger text, high contrast, wider spacing, large cursor",
    settings: {
      fontScale: 150,
      colorMode: "brightHighContrast",
      lineStep: 2,
      focus: true,
      cursor: "black",
    },
  },
  {
    key: "epilepsy",
    label: "Epilepsy",
    hint: "All animation stopped and colour intensity dampened",
    settings: { motion: true, colorMode: "lowSaturation" },
  },
  {
    key: "adhd",
    label: "ADHD",
    hint: "Reading mask to cut distraction, motion stopped",
    settings: { readingMask: true, motion: true, lineStep: 2 },
  },
  {
    key: "learning",
    label: "Learning",
    hint: "Reading guide, readable typeface, generous spacing",
    settings: {
      readingGuide: true,
      font: "readable",
      lineStep: 2,
      letterStep: 1,
      motion: true,
    },
  },
  {
    key: "elder",
    label: "Elder",
    hint: "Bigger, calmer and easier to operate",
    settings: {
      fontScale: 150,
      lineStep: 2,
      cursor: "black",
      focus: true,
      motion: true,
      colorMode: "brightHighContrast",
    },
  },
  {
    key: "dyslexia",
    label: "Dyslexia",
    hint: "Dyslexia-friendly typeface with wide letter and line spacing",
    settings: { font: "dyslexic", lineStep: 3, wordStep: 3, letterStep: 3 },
  },
  {
    key: "wcagBaseline",
    label: "WCAG 2.2 AA baseline",
    hint: "Every conformance-visible aid at once: focus indicators, link and heading emphasis, readable spacing, reduced motion",
    settings: {
      focus: true,
      links: true,
      headings: true,
      motion: true,
      lineStep: 1,
      wordStep: 3,
      letterStep: 4,
      font: "readable",
    },
  },
];

const COLOR_MODES: { value: ColorMode; label: string; icon: IconName }[] = [
  { value: "monochrome", label: "Monochrome", icon: "eye" },
  { value: "darkHighContrast", label: "Dark High-Contrast", icon: "moon" },
  { value: "brightHighContrast", label: "Bright High-Contrast", icon: "sun" },
  { value: "lowSaturation", label: "Low saturation", icon: "droplet" },
  { value: "highSaturation", label: "High saturation", icon: "droplets" },
  { value: "contrast", label: "Contrast Mode", icon: "contrast" },
];

/* A deliberately small, pre-vetted palette. A free colour picker lets users
   build unreadable pairings; every swatch here stays legible against the rest. */
const SWATCHES: Record<CustomTarget, { value: string; label: string }[]> = {
  bg: [
    { value: "#FFFFFF", label: "White" },
    { value: "#F1F5F9", label: "Light grey" },
    { value: "#FFF8E7", label: "Cream" },
    { value: "#0F172A", label: "Navy" },
    { value: "#000000", label: "Black" },
  ],
  heading: [
    { value: "#000000", label: "Black" },
    { value: "#0F172A", label: "Navy" },
    { value: "#3730A3", label: "Indigo" },
    { value: "#FDE047", label: "Yellow" },
    { value: "#FFFFFF", label: "White" },
  ],
  text: [
    { value: "#111827", label: "Near black" },
    { value: "#334155", label: "Slate" },
    { value: "#1E3A8A", label: "Deep blue" },
    { value: "#FDE047", label: "Yellow" },
    { value: "#FFFFFF", label: "White" },
  ],
};

const CUSTOM_KEY: Record<
  CustomTarget,
  "customBg" | "customHeading" | "customText"
> = {
  bg: "customBg",
  heading: "customHeading",
  text: "customText",
};

/* Content Adjustment step tables. Index 0 always means "leave the site alone".
   The WCAG 1.4.12 minimums (line-height 1.5, word 0.16em, letter 0.12em) are
   deliberately reachable stops rather than the maximum. */
const LINE_STEPS = [null, "1.5", "1.7", "1.9", "2.1", "2.4"];
const WORD_STEPS = [null, "0.05em", "0.1em", "0.16em", "0.24em", "0.32em"];
const LETTER_STEPS = [null, "0.03em", "0.06em", "0.09em", "0.12em", "0.16em"];

const FONT_SCALE_MIN = 100;
const FONT_SCALE_MAX = 200;
const FONT_SCALE_STEP = 10;

const CONTENT_CONTROLS: {
  key: ContentControl;
  tab: string;
  title: string;
  description: string;
  max: number;
}[] = [
  {
    key: "fontScale",
    tab: "Font Size",
    title: "Font Sizing",
    description: "Increase and decrease the font size",
    max: FONT_SCALE_MAX,
  },
  {
    key: "lineStep",
    tab: "Line Spacing",
    title: "Line Spacing",
    description: "Open up the space between lines of text",
    max: LINE_STEPS.length - 1,
  },
  {
    key: "wordStep",
    tab: "Word Spacing",
    title: "Word Spacing",
    description: "Widen the gap between words",
    max: WORD_STEPS.length - 1,
  },
  {
    key: "letterStep",
    tab: "Letter Spacing",
    title: "Letter Spacing",
    description: "Widen the gap between characters",
    max: LETTER_STEPS.length - 1,
  },
];

/** Current value, its display label, and its 0–1 position on the track. */
function contentState(settings: Settings, key: ContentControl) {
  if (key === "fontScale") {
    const value = settings.fontScale;
    return {
      value,
      min: FONT_SCALE_MIN,
      max: FONT_SCALE_MAX,
      step: FONT_SCALE_STEP,
      label: `${value}%`,
      fraction: (value - FONT_SCALE_MIN) / (FONT_SCALE_MAX - FONT_SCALE_MIN),
    };
  }
  const table =
    key === "lineStep"
      ? LINE_STEPS
      : key === "wordStep"
        ? WORD_STEPS
        : LETTER_STEPS;
  const value = settings[key];
  const max = table.length - 1;
  return {
    value,
    min: 0,
    max,
    step: 1,
    label: value === 0 ? "Site default" : `Level ${value} · ${table[value]}`,
    fraction: value / max,
  };
}

/* ================================ icons ==================================
   Inline so the widget carries no icon-library dependency. Feather-style
   24x24 stroke paths. */

type IconName =
  | "accessibility"
  | "close"
  | "reset"
  | "type"
  | "contrast"
  | "palette"
  | "spacing"
  | "link"
  | "heading"
  | "cursor"
  | "pause"
  | "guide"
  | "mask"
  | "volume"
  | "target"
  | "ear"
  | "keyboard"
  | "grid"
  | "smart"
  | "mic"
  | "eye"
  | "moon"
  | "sun"
  | "droplet"
  | "droplets"
  | "check"
  | "fontSize"
  | "minus"
  | "plus"
  | "blinks"
  | "magnifier"
  | "image"
  | "elements"
  | "enlarge"
  | "readable"
  | "textMagnifier"
  | "mute"
  | "dictionary"
  | "readableFont";

const ICON_PATHS: Record<IconName, string | string[]> = {
  /* The universal "person in motion" accessibility mark. Multi-path, so it is
     stored as an array — the head is drawn as an arc pair rather than <circle>
     to keep the renderer to a single element type. */
  accessibility: [
    "M17 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0",
    "m18 19 1-7-6 1",
    "m5 8 3-3 5.5 3-2.36 3.5",
    "M4.24 14.5a5 5 0 0 0 6.88 6",
    "M13.76 17.5a5 5 0 0 0-6.88-6",
  ],
  close: "M18 6 6 18M6 6l12 12",
  reset: "M3 12a9 9 0 1 0 3-6.7M3 4v5h5",
  type: "M4 7V4h16v3M9 20h6M12 4v16",
  contrast: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M12 2v20a10 10 0 0 0 0-20",
  palette:
    "M12 2a10 10 0 1 0 0 20 2 2 0 0 0 1.6-3.2 2 2 0 0 1 1.6-3.2H18a4 4 0 0 0 4-4 10 10 0 0 0-10-9.6M7.5 10.5h.01M12 7.5h.01M16.5 10.5h.01",
  spacing: "M3 6h18M3 12h18M3 18h18",
  link: "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",
  heading: "M6 4v16M18 4v16M6 12h12",
  cursor: "m4 4 7 16 2-6 6-2z",
  pause: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M10 9v6M14 9v6",
  guide: "M3 5h18M3 12h18M3 19h18M7 12v7",
  mask: "M3 4h18v4H3zM3 16h18v4H3z",
  volume: "M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14",
  target:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4",
  ear: "M6 8a6 6 0 1 1 12 0c0 3-2 4-3 6s-1 4-3 4a3 3 0 0 1-3-3M9 9a3 3 0 0 1 6 0",
  keyboard: "M2 6h20v12H2zM6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8",
  grid: "M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18",
  smart: "M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4",
  mic: "M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3M5 10v1a7 7 0 0 0 14 0v-1M12 18v4M8 22h8",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8",
  sun: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  droplet: "M12 2.7 6.7 8a7.5 7.5 0 1 0 10.6 0zM6 14h12",
  droplets: "M12 2.7 6.7 8a7.5 7.5 0 1 0 10.6 0z",
  check: "M20 6 9 17l-5-5",
  /* An "A" between up and down chevrons — the conventional font-sizing mark. */
  fontSize: [
    "M7 17 12 5l5 12M8.6 13.4h6.8",
    "m9 2.5 3-1.6 3 1.6",
    "m9 21.5 3 1.6 3-1.6",
  ],
  minus: "M5 12h14",
  plus: "M12 5v14M5 12h14",
  blinks: [
    "M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9",
    "M5.6 5.6 18.4 18.4",
    "M12 8v4l2.5 2.5",
  ],
  magnifier: [
    "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14",
    "m16 16 5 5",
    "M11 8v6M8 11h6",
  ],
  image: [
    "M3 5h18v14H3z",
    "M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3",
    "m3 16 5-4 4 3 3-2 6 5",
  ],
  elements: ["M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"],
  enlarge: ["M4 10V4h6", "M20 14v6h-6", "m4 4 7 7", "m20 20-7-7"],
  readable: ["M4 4h16v16H4z", "M7 8h10M7 12h10M7 16h6"],
  textMagnifier: [
    "M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14",
    "m15.5 15.5 5.5 5.5",
    "M7.5 13 10 6.5 12.5 13M8.4 11h3.2",
  ],
  mute: ["M11 5 6 9H2v6h4l5 4z", "m16 9 5 6M21 9l-5 6"],
  dictionary: [
    "M4 4h7v16H4zM13 4h7v16h-7z",
    "M6.5 9h2M15.5 9h2M6.5 13h2M15.5 13h2",
  ],
  readableFont: ["M7 18 12 5l5 13", "M9 14h6", "M5 21h14"],
};

const Icon: React.FC<{
  name: IconName;
  size?: number;
  strokeWidth?: number;
}> = ({ name, size = 24, strokeWidth = 1.9 }) => {
  const value = ICON_PATHS[name];
  const paths = Array.isArray(value) ? value : [value];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
};

/* ================================ styles =================================
   Injected once at runtime. Selectors target [data-wcagify-root], which the
   widget stamps onto whichever element rootSelector resolves to — that is what
   makes the stylesheet portable across host projects. */

/* Cursor artwork, built once and inlined into the stylesheet as data URIs.
   `fill` is the cursor body, `edge` its outline — swapping the two gives the
   white and black variants without duplicating the path data. */
const ARROW = (fill: string, edge: string) =>
  `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><path d='M7 3 L7 39 L16 30.5 L22 44 L29 41 L23 27.5 L35 26.5 Z' fill='${fill}' stroke='${edge}' stroke-width='2.6' stroke-linejoin='round'/></svg>`;

/* A pointing hand: index finger raised, three fingers curled, thumb at left. */
const HAND = (fill: string, edge: string) =>
  `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><path d='M16 24 V10 a3.4 3.4 0 0 1 6.8 0 v10.5 v-3.5 a3.4 3.4 0 0 1 6.8 0 v3.5 v-2 a3.4 3.4 0 0 1 6.8 0 v2 v-1 a3.4 3.4 0 0 1 6.8 0 v11 c0 7.5 -5 13.5 -13 13.5 h-2.5 c-5 0 -8 -2.2 -10.6 -6.2 L10.5 30 a3.4 3.4 0 0 1 5.2 -4.3 Z' fill='${fill}' stroke='${edge}' stroke-width='2.6' stroke-linejoin='round' stroke-linecap='round'/></svg>`;

/* Elements that should show the pointing hand. */
const CLICKABLE =
  'a[href], button, [role="button"], [role="link"], input[type="button"], input[type="submit"], input[type="checkbox"], input[type="radio"], select, label[for], summary';

const STYLES = `
[${ROOT_ATTR}] { --wcagify-accent: #4f46e5; }

/* Font size is set as an inline root font-size percentage (rem-based scaling,
   never browser zoom). The widget itself is authored in px, so it is immune. */

/* Colour modes are filters, never forced colour values. A filter strengthens whatever polarity each section already has. */
html[data-a11y-color="monochrome"]         :is([${ROOT_ATTR}]:not(body), [${ROOT_ATTR}] > :not(.wcagify-widget)) { filter: grayscale(1) contrast(1.15); }
html[data-a11y-color="lowSaturation"]      :is([${ROOT_ATTR}]:not(body), [${ROOT_ATTR}] > :not(.wcagify-widget)) { filter: saturate(0.45); }
html[data-a11y-color="highSaturation"]     :is([${ROOT_ATTR}]:not(body), [${ROOT_ATTR}] > :not(.wcagify-widget)) { filter: saturate(1.9); }
html[data-a11y-color="contrast"]           :is([${ROOT_ATTR}]:not(body), [${ROOT_ATTR}] > :not(.wcagify-widget)) { filter: contrast(1.75) saturate(1.15); }
html[data-a11y-color="brightHighContrast"] :is([${ROOT_ATTR}]:not(body), [${ROOT_ATTR}] > :not(.wcagify-widget)) { filter: brightness(1.12) contrast(1.7); }
html[data-a11y-color="darkHighContrast"]   :is([${ROOT_ATTR}]:not(body), [${ROOT_ATTR}] > :not(.wcagify-widget)) { filter: invert(1) hue-rotate(180deg) contrast(1.2); background: #0b0b0f; }
html[data-a11y-color="darkHighContrast"] body { background: #0b0b0f; }

/* Only photographic content is double-inverted back to true colour. Vector art
   is dark ink by design, so letting it invert keeps it legible on dark.
   Tag real photos with data-a11y-no-invert to opt them out. */
html[data-a11y-color="darkHighContrast"] [${ROOT_ATTR}] :is(video, picture, [data-a11y-no-invert]):not(.wcagify-widget *),
html[data-a11y-color="darkHighContrast"] [${ROOT_ATTR}] img[src$=".jpg"]:not(.wcagify-widget *),
html[data-a11y-color="darkHighContrast"] [${ROOT_ATTR}] img[src$=".jpeg"]:not(.wcagify-widget *),
html[data-a11y-color="darkHighContrast"] [${ROOT_ATTR}] img[src$=".png"]:not(.wcagify-widget *),
html[data-a11y-color="darkHighContrast"] [${ROOT_ATTR}] img[src$=".webp"]:not(.wcagify-widget *) { filter: invert(1) hue-rotate(180deg); }

html[data-a11y-color="contrast"] [${ROOT_ATTR}] :is(p,li,span,dd,dt,td,th,a,h1,h2,h3,h4,h5,h6):not(.wcagify-widget *),
html[data-a11y-color="brightHighContrast"] [${ROOT_ATTR}] :is(p,li,span,dd,dt,td,th,a,h1,h2,h3,h4,h5,h6):not(.wcagify-widget *) { opacity: 1 !important; text-shadow: none !important; }
html[data-a11y-color="contrast"] [${ROOT_ATTR}] a:not(.wcagify-widget *),
html[data-a11y-color="brightHighContrast"] [${ROOT_ATTR}] a:not(.wcagify-widget *) { text-decoration: underline !important; text-underline-offset: 3px; }

html[data-a11y-custom-bg="on"] :is([${ROOT_ATTR}]:not(body), [${ROOT_ATTR}] > :not(.wcagify-widget)),
html[data-a11y-custom-bg="on"] [${ROOT_ATTR}] :is(section,header,footer,main,article,aside,div):not(.wcagify-widget):not(.wcagify-widget *) { background-color: var(--wcagify-custom-bg) !important; background-image: none !important; }
html[data-a11y-custom-bg="on"] body { background-color: var(--wcagify-custom-bg) !important; }
/* Custom TEXT and HEADING colours are applied in JS, not here: the correct
   colour depends on the background actually painted behind each element, and
   CSS cannot express "has no background of its own". See applyAdaptiveInk. */

/* A dark custom background hides dark vector art (logos, icons), exactly as in
   the dark colour mode — invert it back into view. */
html[data-a11y-custom-bg-tone="dark"] [${ROOT_ATTR}] :is(img[src$=".svg"], svg):not(.wcagify-widget *) { filter: invert(1) hue-rotate(180deg); }

html[data-a11y-font="readable"] [${ROOT_ATTR}] *:not(.wcagify-widget *) { font-family: Verdana, Tahoma, "Trebuchet MS", system-ui, sans-serif !important; }
html[data-a11y-font="dyslexic"] [${ROOT_ATTR}] *:not(.wcagify-widget *) { font-family: "OpenDyslexic", "Comic Sans MS", Verdana, system-ui, sans-serif !important; letter-spacing: .05em; word-spacing: .16em; }

/* Content adjustment — each axis independent, driven by its own custom
   property so one can be raised without disturbing the others. */
html[data-a11y-line="on"] [${ROOT_ATTR}] :is(p,li,dd,dt,blockquote,figcaption,span,a,label,td,th,h1,h2,h3,h4,h5,h6):not(.wcagify-widget *) { line-height: var(--wcagify-line) !important; }
html[data-a11y-word="on"] [${ROOT_ATTR}] :is(p,li,dd,dt,blockquote,figcaption,span,a,label,td,th,h1,h2,h3,h4,h5,h6):not(.wcagify-widget *) { word-spacing: var(--wcagify-word) !important; }
html[data-a11y-letter="on"] [${ROOT_ATTR}] :is(p,li,dd,dt,blockquote,figcaption,span,a,label,td,th,h1,h2,h3,h4,h5,h6):not(.wcagify-widget *) { letter-spacing: var(--wcagify-letter) !important; }

html[data-a11y-links="on"] [${ROOT_ATTR}] a:not(.wcagify-widget *) { text-decoration: underline !important; text-underline-offset: 3px; text-decoration-thickness: 2px !important; outline: 1px dashed currentColor; outline-offset: 2px; }
html[data-a11y-headings="on"] [${ROOT_ATTR}] :is(h1,h2,h3,h4,h5,h6):not(.wcagify-widget *) { outline: 2px solid var(--wcagify-accent) !important; outline-offset: 4px; background-color: rgba(79,70,229,.06); }
html[data-a11y-focus="on"] [${ROOT_ATTR}] :is(a,button,input,select,textarea,[tabindex]):not(.wcagify-widget *):focus-visible { outline: 4px solid #111827 !important; outline-offset: 3px !important; box-shadow: 0 0 0 8px #fde047 !important; border-radius: 2px; }
/* Enlarged cursor. Two variants so it stays visible on both light and dark
   pages, each drawn with the opposite colour as an outline. Clickable elements
   get a matching pointing hand, so the affordance survives the enlargement.
   48px is well inside the 128px browser limit for cursor images. */
/* Scoped to the whole document, not just the page root: the widget's own
   panel and launcher are outside the root, and leaving them on the system
   cursor made the setting look broken the moment the pointer entered them. */
html[data-a11y-cursor="white"], html[data-a11y-cursor="white"] * { cursor: url("data:image/svg+xml;utf8,${ARROW("white", "black")}") 5 3, auto !important; }
html[data-a11y-cursor="black"], html[data-a11y-cursor="black"] * { cursor: url("data:image/svg+xml;utf8,${ARROW("black", "white")}") 5 3, auto !important; }
html[data-a11y-cursor="white"] :is(${CLICKABLE}), html[data-a11y-cursor="white"] :is(${CLICKABLE}) * { cursor: url("data:image/svg+xml;utf8,${HAND("white", "black")}") 16 4, pointer !important; }
html[data-a11y-cursor="black"] :is(${CLICKABLE}), html[data-a11y-cursor="black"] :is(${CLICKABLE}) * { cursor: url("data:image/svg+xml;utf8,${HAND("black", "white")}") 16 4, pointer !important; }
html[data-a11y-cursor="white"] :is(input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea),
html[data-a11y-cursor="black"] :is(input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea) { cursor: text !important; }
html[data-a11y-motion="off"] [${ROOT_ATTR}] *:not(.wcagify-widget *), html[data-a11y-motion="off"] [${ROOT_ATTR}] *::before:not(.wcagify-widget *), html[data-a11y-motion="off"] [${ROOT_ATTR}] *::after:not(.wcagify-widget *) { animation-play-state: paused !important; animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; scroll-behavior: auto !important; }

/* ---- Tools ---- */

/* Highlight every interactive element, not only links and headings. */
html[data-a11y-elements="on"] [${ROOT_ATTR}] :is(${CLICKABLE}, input, textarea):not(.wcagify-widget *) {
  outline: 2px dashed #b45309 !important; outline-offset: 2px; background-color: rgba(245,158,11,.12) !important;
}

/* Enlarge click targets to comfortably clear the 24x24 minimum (WCAG 2.5.8). */
html[data-a11y-enlarge="on"] [${ROOT_ATTR}] :is(button, a[href], [role="button"], input[type="button"], input[type="submit"], select):not(.wcagify-widget *) {
  min-height: 48px !important; min-width: 48px !important; padding: 12px 18px !important;
  font-size: 1.05em !important; display: inline-flex !important; align-items: center !important; justify-content: center !important;
}
html[data-a11y-enlarge="on"] [${ROOT_ATTR}] nav a[href]:not(.wcagify-widget *) { min-width: 0 !important; }

/* Readable mode: strip the page down to its main content in a single column. */
html[data-a11y-readable="on"] [${ROOT_ATTR}] :is(aside, [role="complementary"], .ad, [data-ad], iframe[src*="ads"]):not(.wcagify-widget *) { display: none !important; }
html[data-a11y-readable="on"] [${ROOT_ATTR}] :is(main, [role="main"], article):not(.wcagify-widget *) {
  max-width: 68ch !important; margin-inline: auto !important; padding-inline: 24px !important;
  font-size: 1.1em !important; line-height: 1.75 !important;
}
html[data-a11y-readable="on"] [${ROOT_ATTR}] :is(main, [role="main"], article) :is(section, div):not(.wcagify-widget *) {
  background-image: none !important; box-shadow: none !important;
}
html[data-a11y-readable="on"] [${ROOT_ATTR}] :is(main, [role="main"], article) :is(img, svg, video):not(.wcagify-widget *) { max-width: 100% !important; height: auto !important; }

/* Image descriptions rendered under each image by the JS pass. */
.wcagify-imgdesc {
  display: block !important; margin: 6px 0 12px !important; padding: 6px 10px !important;
  font-size: 13px !important; line-height: 1.45 !important; text-align: start !important;
  border-inline-start: 3px solid #4f46e5 !important; background: #eef2ff !important; color: #312e81 !important; border-radius: 6px !important;
}
.wcagify-imgdesc[data-missing="true"] { border-inline-start-color: #b45309 !important; background: #fffbeb !important; color: #92400e !important; }

/* Magnifier lens */
.wcagify-lens {
  position: fixed; z-index: 2147483005; pointer-events: none; overflow: hidden;
  border: 3px solid #111827; border-radius: 12px; background: #fff;
  box-shadow: 0 12px 30px rgba(0,0,0,.45);
}
.wcagify-lens > div { position: absolute; top: 0; inset-inline-start: 0; transform-origin: 0 0; }

/* Text magnifier bubble */
.wcagify-textmag {
  position: fixed; z-index: 2147483005; pointer-events: none; max-width: min(560px, 80vw);
  padding: 10px 14px; border-radius: 10px; background: #111827; color: #fff;
  font-size: 24px; line-height: 1.35; font-weight: 600; box-shadow: 0 12px 30px rgba(0,0,0,.5);
}

/* Dictionary popover */
.wcagify-dict {
  position: fixed; z-index: 2147483006; width: min(340px, 90vw); max-height: 300px; overflow-y: auto;
  padding: 12px 14px; border-radius: 12px; background: #fff; color: #0f172a;
  border: 1px solid #cbd5e1; box-shadow: 0 20px 40px rgba(15,23,42,.35); font-size: 13px; line-height: 1.5;
}
.wcagify-dict h4 { margin: 0 0 2px; font-size: 15px; }
.wcagify-dict em { color: #475569; font-size: 12px; }
.wcagify-dict ol { margin: 8px 0 0; padding-inline-start: 18px; }
.wcagify-dict li { margin-bottom: 6px; }
.wcagify-dict button { margin-top: 8px; border: 1px solid #cbd5e1; background: #fff; border-radius: 8px; padding: 4px 10px; font-size: 12px; font-weight: 700; cursor: pointer; }

/* Virtual keyboard */
.wcagify-vk {
  position: fixed; inset-inline: 0; bottom: 0; z-index: 2147483006;
  background: #111827; padding: 10px; display: flex; flex-direction: column; gap: 6px;
  box-shadow: 0 -10px 30px rgba(0,0,0,.4);
}
.wcagify-vk-row { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; }
.wcagify-vk button {
  min-width: 40px; height: 44px; padding: 0 10px; border-radius: 8px; border: 1px solid #374151;
  background: #1f2937; color: #fff; font-size: 15px; font-weight: 600; cursor: pointer;
  flex: 0 1 auto;
}
.wcagify-vk button:hover { background: #374151; }
.wcagify-vk button.is-wide { min-width: 90px; }
@media (max-width: 480px) {
  .wcagify-vk { padding: 8px 6px; }
  .wcagify-vk-row { gap: 4px; }
  .wcagify-vk button { min-width: 28px; padding: 0 4px; font-size: 14px; }
  .wcagify-vk button.is-wide { min-width: 60px; }
}
.wcagify-vk-head { display: flex; align-items: center; justify-content: space-between; color: #cbd5e1; font-size: 12px; padding: 0 4px; }
.wcagify-vk-head strong { color: #fff; font-size: 13px; }

.wcagify-widget, .wcagify-widget * { box-sizing: border-box; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }

.wcagify-reading-mask { position: fixed; inset: 0; z-index: 2147483000; pointer-events: none; }
.wcagify-reading-mask span { position: absolute; left: 0; right: 0; background: rgba(0,0,0,.72); }
.wcagify-reading-guide { position: fixed; left: 0; right: 0; height: 4px; background: var(--wcagify-accent, #4f46e5); box-shadow: 0 0 0 1px rgba(255,255,255,.9); z-index: 2147483000; pointer-events: none; }

.wcagify-launcher { position: fixed; z-index: 2147483001; width: calc(56px * var(--wcagify-ui, 1)); height: calc(56px * var(--wcagify-ui, 1)); border-radius: 9999px; border: 2px solid #fff; background: var(--wcagify-accent, #4f46e5); color: #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px -5px rgba(15,23,42,.45); cursor: pointer; transition: transform .15s ease, filter .15s ease; }
.wcagify-launcher:hover { filter: brightness(1.1); transform: scale(1.06); }
.wcagify-launcher:focus-visible { outline: 3px solid #111827 !important; outline-offset: 3px !important; box-shadow: 0 0 0 7px #fde047; }
.wcagify-launcher.is-dragged { inset: auto; touch-action: none; }
.wcagify-launcher.is-dragging { cursor: grabbing; transform: scale(1.08); }
.wcagify-pos-bottom-right { bottom: 20px; inset-inline-end: 20px; }
.wcagify-pos-bottom-left { bottom: 20px; inset-inline-start: 20px; }
.wcagify-pos-top-right { top: 20px; inset-inline-end: 20px; }
.wcagify-pos-top-left { top: 20px; inset-inline-start: 20px; }

.wcagify-scrim { position: fixed; inset: 0; z-index: 2147483002; background: rgba(15,23,42,.45); }

.wcagify-panel, .wcagify-structure { position: fixed; bottom: 88px; inset-inline-end: 20px; z-index: 2147483003; width: min(calc(384px * var(--wcagify-ui, 1)), calc(100vw - 32px)); max-height: min(640px, calc(100vh - 120px)); display: flex; flex-direction: column; background: #fff; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(15,23,42,.45); overflow: hidden; font-size: calc(14px * var(--wcagify-ui, 1)); }
@media (max-width: 480px) { .wcagify-panel, .wcagify-structure { inset: auto 8px 8px 8px; width: auto; max-height: 82vh; } .wcagify-launcher { width: 52px; height: 52px; } }

.wcagify-panel-head { padding: 14px 16px; background: #312e81; color: #fff; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.wcagify-panel-head h2 { margin: 0; font-size: calc(15px * var(--wcagify-ui, 1)); font-weight: 700; }
.wcagify-panel-head p { margin: 2px 0 0; font-size: calc(11px * var(--wcagify-ui, 1)); color: #c7d2fe; }
.wcagify-close { background: rgba(255,255,255,.14); color: #fff; border: 1px solid rgba(255,255,255,.35); border-radius: 8px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex: none; }
.wcagify-close:hover { background: rgba(255,255,255,.28); }
.wcagify-body { overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 18px; }
.wcagify-group > h3 { margin: 0 0 8px; font-size: calc(11px * var(--wcagify-ui, 1)); font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #475569; display: flex; align-items: center; gap: 6px; }
.wcagify-hint { margin: 0 0 8px; font-size: calc(11px * var(--wcagify-ui, 1)); line-height: 1.45; color: #475569; }

.wcagify-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 8px; }
.wcagify-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 8px; }
.wcagify-nav-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 8px; }

.wcagify-chip { min-height: 44px; padding: 8px 10px; border-radius: 10px; border: 1px solid #cbd5e1; background: #fff; color: #1e293b; font-size: calc(12px * var(--wcagify-ui, 1)); font-weight: 600; text-align: start; cursor: pointer; display: flex; align-items: center; gap: 8px; line-height: 1.25; }
.wcagify-chip:hover { background: #eef2ff; border-color: #a5b4fc; }
.wcagify-chip[aria-pressed="true"], .wcagify-chip[aria-selected="true"] { background: var(--wcagify-accent, #4f46e5); border-color: var(--wcagify-accent, #4f46e5); color: #fff; }

.wcagify-tool { min-height: calc(84px * var(--wcagify-ui, 1)); padding: 10px 6px; border-radius: 12px; border: 1px solid #cbd5e1; background: #fff; color: #1e293b; font-size: calc(11px * var(--wcagify-ui, 1)); font-weight: 600; line-height: 1.25; text-align: center; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; }
.wcagify-tool:hover { background: #eef2ff; border-color: #a5b4fc; }
.wcagify-tool[aria-pressed="true"] { background: var(--wcagify-accent, #4f46e5); border-color: var(--wcagify-accent, #4f46e5); color: #fff; }

.wcagify-row { width: 100%; min-height: 44px; padding: 8px 12px; border-radius: 10px; border: 1px solid #cbd5e1; background: #fff; color: #1e293b; font-size: calc(13px * var(--wcagify-ui, 1)); font-weight: 600; display: flex; align-items: center; justify-content: space-between; gap: 10px; cursor: pointer; }
.wcagify-row:hover { background: #f8fafc; }
.wcagify-row + .wcagify-row { margin-top: 8px; }
.wcagify-switch { flex: none; width: 40px; height: 22px; border-radius: 9999px; background: #cbd5e1; position: relative; transition: background-color .15s ease; }
.wcagify-row[aria-pressed="true"] { border-color: var(--wcagify-accent, #4f46e5); background: #eef2ff; color: #312e81; }
.wcagify-row[aria-pressed="true"] .wcagify-switch { background: var(--wcagify-accent, #4f46e5); }
.wcagify-switch::after { content: ""; position: absolute; top: 3px; inset-inline-start: 3px; width: 16px; height: 16px; border-radius: 9999px; background: #fff; transition: transform .15s ease; }
.wcagify-row[aria-pressed="true"] .wcagify-switch::after { transform: translateX(18px); }

/* Content adjustment card */
.wcagify-card { border: 1px solid #cbd5e1; border-radius: 12px; padding: 12px; }
.wcagify-card-head { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; color: #0f172a; }
.wcagify-card-head strong { display: block; font-size: calc(14px * var(--wcagify-ui, 1)); font-weight: 700; }
.wcagify-card-head span { display: block; font-size: calc(11px * var(--wcagify-ui, 1)); color: #475569; line-height: 1.4; }

.wcagify-stepper { margin-top: 10px; display: flex; align-items: center; gap: 8px; }
.wcagify-stepper > button { flex: none; width: 34px; height: 34px; border-radius: 9999px; border: 0; background: #111827; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.wcagify-stepper > button:hover:not(:disabled) { background: var(--wcagify-accent, #4f46e5); }
.wcagify-stepper > button:disabled { background: #cbd5e1; color: #64748b; cursor: not-allowed; }
.wcagify-track { flex: 1; height: 12px; border-radius: 9999px; background: #e2e8f0; overflow: hidden; }
.wcagify-track > span { display: block; height: 100%; border-radius: 9999px; background: var(--wcagify-accent, #4f46e5); transition: width .15s ease; }
.wcagify-stepper-foot { margin-top: 8px; display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: calc(11px * var(--wcagify-ui, 1)); font-weight: 600; color: #334155; }
.wcagify-stepper-foot > button { display: flex; align-items: center; gap: 6px; min-height: 32px; padding: 4px 10px; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; color: #1e293b; font-size: 11px; font-weight: 700; cursor: pointer; }
.wcagify-stepper-foot > button:hover { background: #fef2f2; border-color: #fca5a5; color: #b91c1c; }
@media (prefers-reduced-motion: reduce) { .wcagify-track > span { transition: none !important; } }

/* Cursor colour choices */
.wcagify-cursor-choices { margin-top: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.wcagify-cursor-choice { min-height: 42px; padding: 8px 12px; border-radius: 9999px; border: 1px solid #cbd5e1; background: #fff; color: #1e293b; font-size: calc(12px * var(--wcagify-ui, 1)); font-weight: 700; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
.wcagify-cursor-choice:hover { border-color: #94a3b8; }
.wcagify-cursor-choice[aria-pressed="true"] { border-color: var(--wcagify-accent, #4f46e5); box-shadow: 0 0 0 3px #c7d2fe; }
.wcagify-cursor-choice.is-black[aria-pressed="true"] { background: #2f2f2f; color: #fff; }
.wcagify-cursor-choice.is-white[aria-pressed="true"] { background: #fff; color: #111827; }

/* Segmented colour bar: one continuous strip, so light swatches read as part
   of the control instead of vanishing into the panel background. */
.wcagify-colorbar { margin-top: 10px; display: flex; height: 40px; border-radius: 10px; overflow: hidden; border: 1px solid #94a3b8; box-shadow: inset 0 1px 2px rgba(15,23,42,.12); }
.wcagify-colorbar button { flex: 1; border: 0; padding: 0; cursor: pointer; position: relative; display: flex; align-items: center; justify-content: center; transition: flex-grow .15s ease; }
.wcagify-colorbar button + button { border-inline-start: 1px solid rgba(148,163,184,.55); }
.wcagify-colorbar button:hover { flex-grow: 1.25; }
.wcagify-colorbar button[aria-pressed="true"] { flex-grow: 1.4; box-shadow: inset 0 0 0 3px var(--wcagify-accent, #4f46e5); }
.wcagify-colorbar button[aria-pressed="true"]::after { content: ""; position: absolute; inset: 3px; border: 2px solid #fff; border-radius: 4px; }
.wcagify-colorbar button:focus-visible { outline: 3px solid #111827 !important; outline-offset: -3px !important; box-shadow: inset 0 0 0 3px #fde047; z-index: 1; }
.wcagify-colorbar-check { position: relative; z-index: 2; display: flex; }
.wcagify-colorbar-label { margin-top: 6px; font-size: calc(11px * var(--wcagify-ui, 1)); font-weight: 600; color: #334155; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.wcagify-colorbar-label em { font-style: normal; color: #64748b; font-weight: 500; }

.wcagify-panel :is(button):focus-visible, .wcagify-structure :is(button):focus-visible { outline: 3px solid #111827 !important; outline-offset: 2px !important; box-shadow: 0 0 0 5px #fde047; }

.wcagify-foot { padding: 12px 16px; border-top: 1px solid #e2e8f0; background: #f8fafc; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.wcagify-reset { min-height: 40px; padding: 8px 14px; border-radius: 10px; border: 1px solid #cbd5e1; background: #fff; color: #1e293b; font-size: calc(13px * var(--wcagify-ui, 1)); font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; }
.wcagify-reset:hover { background: #fef2f2; border-color: #fca5a5; color: #b91c1c; }
.wcagify-foot small { font-size: calc(11px * var(--wcagify-ui, 1)); color: #475569; text-align: end; line-height: 1.35; }
.wcagify-note { margin: 0; padding: 10px 12px; border-radius: 10px; background: #eef2ff; border: 1px solid #c7d2fe; color: #312e81; font-size: calc(11px * var(--wcagify-ui, 1)); line-height: 1.45; }

.wcagify-nav-overlay { position: fixed; inset: 0; z-index: 2147483004; pointer-events: none; }
.wcagify-badge { position: fixed; min-width: 22px; height: 20px; padding: 0 5px; border-radius: 5px; background: #111827; color: #fde047; border: 1px solid #fde047; font-size: 12px; font-weight: 800; line-height: 18px; text-align: center; box-shadow: 0 2px 6px rgba(0,0,0,.5); }
.wcagify-badge.is-dimmed { opacity: .25; }
.wcagify-badge.is-matched { background: var(--wcagify-accent, #4f46e5); color: #fff; border-color: #fff; transform: scale(1.15); }
.wcagify-grid-cell { position: fixed; border: 2px solid rgba(79,70,229,.9); background: rgba(15,23,42,.14); display: flex; align-items: center; justify-content: center; }
.wcagify-grid-cell span { font-size: 26px; font-weight: 800; color: #fff; background: rgba(17,24,39,.85); border-radius: 8px; padding: 2px 12px; }
.wcagify-nav-hud { position: fixed; bottom: 20px; inset-inline-start: 20px; max-width: calc(100vw - 40px); padding: 10px 14px; border-radius: 12px; background: #111827; color: #fff; font-size: 12px; line-height: 1.5; display: flex; flex-direction: column; gap: 2px; box-shadow: 0 12px 30px rgba(0,0,0,.5); }
.wcagify-nav-hud strong { font-size: 13px; color: #a5b4fc; }

.wcagify-structure-tabs { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 6px; padding: 12px 12px 8px; }
.wcagify-structure-list { margin: 0; padding: 0 12px 12px; list-style: none; overflow-y: auto; }
.wcagify-structure-item { width: 100%; min-height: 40px; padding: 8px; border: 0; border-radius: 8px; background: transparent; color: #1e293b; font-size: calc(13px * var(--wcagify-ui, 1)); text-align: start; cursor: pointer; display: flex; align-items: center; gap: 8px; }
.wcagify-structure-item:hover { background: #eef2ff; }
.wcagify-structure-tag { flex: none; font-size: 10px; font-weight: 800; color: #4338ca; background: #e0e7ff; border-radius: 4px; padding: 2px 5px; }
.wcagify-structure-empty { padding: 12px 8px; font-size: 12px; color: #475569; }

.wcagify-sr { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0; }

@media (prefers-reduced-motion: reduce) { .wcagify-launcher, .wcagify-switch, .wcagify-switch::after { transition: none !important; } }
`;

/* ============================== utilities ================================ */

const INTERACTIVE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])';

function resolveRoot(preferred?: string): HTMLElement | null {
  if (typeof document === "undefined") return null;
  const candidates = [preferred, "#root", "#app", "#__next"].filter(
    Boolean,
  ) as string[];
  for (const selector of candidates) {
    const found = document.querySelector(selector);
    if (found instanceof HTMLElement) return found;
  }
  return document.body;
}

function pageElements(
  selector: string,
  root: HTMLElement | null,
): HTMLElement[] {
  if (!root || typeof window === "undefined") return [];
  return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => {
      if (el.closest(".wcagify-widget")) return false;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return false;
      const style = window.getComputedStyle(el);
      return style.visibility !== "hidden" && style.display !== "none";
    },
  );
}

function accessibleName(el: HTMLElement): string {
  const label = el.getAttribute("aria-label");
  if (label) return label.trim();
  const labelledBy = el.getAttribute("aria-labelledby");
  if (labelledBy) {
    const ref = document.getElementById(labelledBy);
    if (ref?.innerText) return ref.innerText.trim();
  }
  const text = (
    el.innerText ||
    el.getAttribute("title") ||
    (el as HTMLInputElement).value ||
    ""
  ).trim();
  return text.replace(/\s+/g, " ").slice(0, 80) || el.tagName.toLowerCase();
}

function moveFocusTo(el: HTMLElement) {
  if (
    !el.hasAttribute("tabindex") &&
    !el.matches("a[href], button, input, select, textarea")
  ) {
    el.setAttribute("tabindex", "-1");
  }
  el.focus({ preventScroll: true });
  el.scrollIntoView({ block: "center", behavior: "smooth" });
}

/* ---------------------------- colour maths ------------------------------ */

type RGB = [number, number, number];

function hexToRgb(hex: string): RGB {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

let probeContext: CanvasRenderingContext2D | null | undefined;

/** Resolve ANY computed colour string to RGB; null when effectively transparent.
 *  A regex over `rgb()` is not enough: modern CSS (and Tailwind v4) serialises
 *  computed colours as `oklch()`, `lab()`, `color()`. Unparsed values would be
 *  mistaken for transparent and silently produce wrong contrast decisions, so
 *  anything non-legacy is resolved by painting one pixel and reading it back. */
function parseComputedColor(input: string): RGB | null {
  if (typeof document === "undefined") return null;
  const legacy = input.match(/^rgba?\(([^)]+)\)$/);
  if (legacy) {
    const parts = legacy[1]
      .split(/[,\s/]+/)
      .filter(Boolean)
      .map(Number);
    if (parts.length >= 3 && !Number.isNaN(parts[0])) {
      const alpha = parts.length > 3 ? parts[3] : 1;
      return alpha < 0.1 ? null : [parts[0], parts[1], parts[2]];
    }
  }
  if (!input || input === "transparent" || input === "none") return null;

  if (probeContext === undefined) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    probeContext = canvas.getContext("2d", { willReadFrequently: true });
  }
  if (!probeContext) return null;

  try {
    probeContext.clearRect(0, 0, 1, 1);
    probeContext.fillStyle = "#000000";
    probeContext.fillStyle = input; // an unparseable value leaves the previous one
    probeContext.fillRect(0, 0, 1, 1);
    const data = probeContext.getImageData(0, 0, 1, 1).data;
    if (data[3] < 25) return null;
    return [data[0], data[1], data[2]];
  } catch {
    return null;
  }
}

function relativeLuminance([r, g, b]: RGB): number {
  const channel = (v: number) => {
    const srgb = v / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(a: RGB, b: RGB): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** Black or white, whichever reads better on the given surface. */
const INK_DARK = "#111827";
const INK_LIGHT = "#FFFFFF";
function inkFor(rgb: RGB): string {
  return contrastRatio(hexToRgb(INK_DARK), rgb) >=
    contrastRatio(hexToRgb(INK_LIGHT), rgb)
    ? INK_DARK
    : INK_LIGHT;
}

/** Convenience wrapper for the fixed palette (hex in, hex out). */
function readableInk(hex: string): string {
  return inkFor(hexToRgb(hex));
}

/** Alpha-aware variant: returns [r,g,b,a], or null only when fully transparent. */
function parseComputedColorAlpha(
  input: string,
): [number, number, number, number] | null {
  const rgb = parseComputedColor(input);
  if (!rgb) return null;
  const legacy = input.match(/^rgba?\(([^)]+)\)$/);
  if (legacy) {
    const parts = legacy[1]
      .split(/[,\s/]+/)
      .filter(Boolean)
      .map(Number);
    const alpha = parts.length > 3 ? parts[3] : 1;
    return [rgb[0], rgb[1], rgb[2], alpha];
  }
  const slash = input.match(/\/\s*([\d.]+%?)\s*\)/);
  if (slash) {
    const raw = slash[1];
    const alpha = raw.endsWith("%") ? parseFloat(raw) / 100 : parseFloat(raw);
    if (!Number.isNaN(alpha)) return [rgb[0], rgb[1], rgb[2], alpha];
  }
  return [rgb[0], rgb[1], rgb[2], 1];
}

/** The colour actually painted behind an element's own text, compositing every
 *  translucent layer down onto the first opaque one. */
function effectiveBackground(el: HTMLElement): RGB {
  if (typeof window === "undefined") return [255, 255, 255];
  const layers: [number, number, number, number][] = [];
  let node: HTMLElement | null = el;
  while (node) {
    const parsed = parseComputedColorAlpha(
      window.getComputedStyle(node).backgroundColor,
    );
    if (parsed) {
      layers.push(parsed);
      if (parsed[3] >= 1) break;
    }
    node = node.parentElement;
  }
  let base: RGB =
    layers.length && layers[layers.length - 1][3] >= 1
      ? [
          layers[layers.length - 1][0],
          layers[layers.length - 1][1],
          layers[layers.length - 1][2],
        ]
      : [255, 255, 255];
  for (let i = layers.length - 1; i >= 0; i -= 1) {
    const [r, g, b, a] = layers[i];
    if (a >= 1) {
      base = [r, g, b];
      continue;
    }
    base = [
      Math.round(r * a + base[0] * (1 - a)),
      Math.round(g * a + base[1] * (1 - a)),
      Math.round(b * a + base[2] * (1 - a)),
    ];
  }
  return base;
}

/** Stable identity for a panel control across re-renders. */
function controlKey(el: HTMLElement): string {
  const explicit = el.dataset.wcagifyKey;
  if (explicit) return explicit;
  const label = el.getAttribute("aria-label") || el.textContent || "";
  return label.replace(/\s+/g, " ").trim().slice(0, 40);
}

function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return (
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.tagName === "SELECT" ||
    el.isContentEditable === true
  );
}

function loadSettings(storageKey: string): Settings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    return DEFAULTS;
  }
}

function withSystemPreferences(
  base: Settings,
  isFirstVisit: boolean,
): Settings {
  if (!isFirstVisit || typeof window === "undefined" || !window.matchMedia)
    return base;
  const next = { ...base };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    next.motion = true;
  if (window.matchMedia("(prefers-contrast: more)").matches)
    next.colorMode = "contrast";
  return next;
}

/* ================================ tools ================================== */

/** Blinks blocking: freeze fast or infinitely repeating animations (WCAG 2.3.1). */
function useBlinksBlocking(enabled: boolean, root: HTMLElement | null) {
  useEffect(() => {
    if (!enabled || !root) return;
    const touched: HTMLElement[] = [];

    const freeze = () => {
      root.querySelectorAll<HTMLElement>("*").forEach((el) => {
        if (el.closest(".wcagify-widget")) return;
        const cs = window.getComputedStyle(el);
        if (cs.animationName === "none") return;
        const duration = parseFloat(cs.animationDuration) || 0;
        const infinite = cs.animationIterationCount === "infinite";
        if (duration > 0 && duration < 1 && infinite) {
          el.style.setProperty("animation-play-state", "paused", "important");
          touched.push(el);
        }
      });
      root.querySelectorAll<HTMLElement>("blink, marquee").forEach((el) => {
        el.style.setProperty("animation", "none", "important");
        (el as HTMLElement & { stop?: () => void }).stop?.();
        touched.push(el);
      });
    };

    freeze();
    const observer = new MutationObserver(() => window.setTimeout(freeze, 100));
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      touched.forEach((el) => {
        el.style.removeProperty("animation-play-state");
        el.style.removeProperty("animation");
      });
    };
  }, [enabled, root]);
}

/** Mute media: silence and pause every audio/video, including ones added later. */
function useMuteMedia(enabled: boolean, root: HTMLElement | null) {
  useEffect(() => {
    if (!enabled || !root) return;
    const previous = new Map<HTMLMediaElement, boolean>();

    const mute = () => {
      root.querySelectorAll<HTMLMediaElement>("audio, video").forEach((el) => {
        if (!previous.has(el)) previous.set(el, el.muted);
        el.muted = true;
        if (!el.paused) el.pause();
      });
    };

    mute();
    const observer = new MutationObserver(() => mute());
    observer.observe(root, { childList: true, subtree: true });
    const interval = window.setInterval(mute, 1000);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
      previous.forEach((wasMuted, el) => {
        el.muted = wasMuted;
      });
    };
  }, [enabled, root]);
}

/** Image descriptions: surface each image's alt text, and flag the ones with none. */
function useImageDescriptions(enabled: boolean, root: HTMLElement | null) {
  useEffect(() => {
    if (!enabled || !root) return;

    const render = () => {
      root.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
        if (img.closest(".wcagify-widget")) return;
        if (img.nextElementSibling?.classList.contains("wcagify-imgdesc"))
          return;
        const decorative =
          img.getAttribute("alt") === "" ||
          img.getAttribute("aria-hidden") === "true";
        if (decorative) return;
        const alt = (img.getAttribute("alt") || "").trim();
        const caption = document.createElement("span");
        caption.className = "wcagify-imgdesc";
        if (alt) {
          caption.textContent = alt;
        } else {
          caption.textContent = "No description available for this image.";
          caption.dataset.missing = "true";
        }
        img.insertAdjacentElement("afterend", caption);
      });
    };

    render();
    const observer = new MutationObserver(() => window.setTimeout(render, 150));
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      root.querySelectorAll(".wcagify-imgdesc").forEach((el) => el.remove());
    };
  }, [enabled, root]);
}

/** Magnifier: a lens showing a scaled snapshot of the page under the pointer. */
const MagnifierLens: React.FC<{ root: HTMLElement | null; zoom?: number }> = ({
  root,
  zoom = 2,
}) => {
  const lensRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  const LENS_W = 320;
  const LENS_H = 200;

  useEffect(() => {
    if (!root || !innerRef.current) return;
    const inner = innerRef.current;

    const snapshot = () => {
      const clone = root.cloneNode(true) as HTMLElement;
      clone.removeAttribute("id");
      clone.removeAttribute(ROOT_ATTR);
      clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
      clone.querySelectorAll(".wcagify-widget").forEach((el) => el.remove());
      clone.style.width = `${root.offsetWidth}px`;
      inner.replaceChildren(clone);
      setReady(true);
    };

    snapshot();
    let pending = 0;
    const observer = new MutationObserver(() => {
      window.clearTimeout(pending);
      pending = window.setTimeout(snapshot, 400);
    });
    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return () => {
      observer.disconnect();
      window.clearTimeout(pending);
    };
  }, [root]);

  useEffect(() => {
    const move = (clientX: number, clientY: number) => {
      const lens = lensRef.current;
      const inner = innerRef.current;
      if (!lens || !inner) return;
      const left = Math.max(
        8,
        Math.min(window.innerWidth - LENS_W - 8, clientX + 24),
      );
      const top = Math.max(
        8,
        Math.min(window.innerHeight - LENS_H - 8, clientY - LENS_H / 2),
      );
      lens.style.left = `${left}px`;
      lens.style.top = `${top}px`;

      const pageX = clientX + window.scrollX;
      const pageY = clientY + window.scrollY;
      inner.style.transform = `scale(${zoom}) translate(${-pageX + LENS_W / (2 * zoom)}px, ${-pageY + LENS_H / (2 * zoom)}px)`;
    };

    const onMove = (e: MouseEvent) => move(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [zoom]);

  return (
    <div
      ref={lensRef}
      className="wcagify-lens"
      style={{ width: LENS_W, height: LENS_H, opacity: ready ? 1 : 0 }}
      aria-hidden="true"
    >
      <div ref={innerRef} />
    </div>
  );
};

/** Text magnifier: shows the text under the pointer, large, in a bubble. */
const TextMagnifier: React.FC<{ root: HTMLElement | null }> = ({ root }) => {
  const [state, setState] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (!root) return;
    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        !target ||
        target.closest(".wcagify-widget") ||
        !root.contains(target)
      ) {
        setState(null);
        return;
      }
      const own = Array.from(target.childNodes)
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .map((n) => n.textContent || "")
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      if (!own) {
        setState(null);
        return;
      }
      setState({ text: own.slice(0, 220), x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [root]);

  if (!state) return null;
  const top = state.y > window.innerHeight - 140 ? state.y - 120 : state.y + 28;
  return (
    <div
      className="wcagify-textmag"
      style={{
        left: Math.min(Math.max(8, state.x - 100), window.innerWidth - 300),
        top,
      }}
      aria-hidden="true"
    >
      {state.text}
    </div>
  );
};

/** Dictionary: select a word to look it up. */
const GLOSSARY: Record<
  string,
  {
    phonetic?: string;
    meanings: { partOfSpeech: string; definition: string }[];
  }
> = {
  accessibility: {
    phonetic: "/əkˌsesəˈbilədē/",
    meanings: [
      {
        partOfSpeech: "noun",
        definition:
          "The quality of being usable by people with the widest range of abilities, including those using assistive technology.",
      },
    ],
  },
  accessible: {
    meanings: [
      {
        partOfSpeech: "adjective",
        definition:
          "Able to be reached, understood or operated — including by people with disabilities.",
      },
    ],
  },
  wcag: {
    meanings: [
      {
        partOfSpeech: "noun",
        definition:
          "Web Content Accessibility Guidelines: the international standard defining how to make web content perceivable, operable, understandable and robust.",
      },
    ],
  },
  conformance: {
    meanings: [
      {
        partOfSpeech: "noun",
        definition:
          "Meeting all the success criteria of a standard at a stated level, such as WCAG 2.2 Level AA.",
      },
    ],
  },
  compliant: {
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "Meeting the requirements of a rule, standard or law.",
      },
    ],
  },
  remediation: {
    meanings: [
      {
        partOfSpeech: "noun",
        definition:
          "The work of correcting accessibility defects — at the source, in this platform’s sense, rather than masking them at runtime.",
      },
    ],
  },
  overlay: {
    meanings: [
      {
        partOfSpeech: "noun",
        definition:
          "A script layered over a finished page that attempts to patch accessibility problems in the browser without changing the underlying source.",
      },
    ],
  },
  semantic: {
    meanings: [
      {
        partOfSpeech: "adjective",
        definition:
          "Describing markup that conveys meaning and role, not just appearance, so assistive technology can interpret it.",
      },
    ],
  },
  aria: {
    meanings: [
      {
        partOfSpeech: "noun",
        definition:
          "Accessible Rich Internet Applications: attributes that expose roles, states and properties to assistive technology.",
      },
    ],
  },
  landmark: {
    meanings: [
      {
        partOfSpeech: "noun",
        definition:
          "A region of a page — banner, navigation, main, contentinfo — that lets users jump straight to a section.",
      },
    ],
  },
  contrast: {
    meanings: [
      {
        partOfSpeech: "noun",
        definition:
          "The measured luminance difference between text and its background, expressed as a ratio such as 4.5:1.",
      },
    ],
  },
  barriers: {
    meanings: [
      {
        partOfSpeech: "noun",
        definition:
          "Design or code choices that prevent someone from perceiving, operating or understanding content.",
      },
    ],
  },
  assistive: {
    meanings: [
      {
        partOfSpeech: "adjective",
        definition:
          "Describing technology — screen readers, magnifiers, switch devices — that helps someone use a computer.",
      },
    ],
  },
  dyslexia: {
    meanings: [
      {
        partOfSpeech: "noun",
        definition:
          "A common learning difference affecting the accuracy and fluency of reading and spelling.",
      },
    ],
  },
  epilepsy: {
    meanings: [
      {
        partOfSpeech: "noun",
        definition:
          "A neurological condition in which seizures may be triggered by, among other things, flashing or strobing content.",
      },
    ],
  },
  native: {
    meanings: [
      {
        partOfSpeech: "adjective",
        definition:
          "Belonging to the source itself rather than added by an external layer.",
      },
    ],
  },
  audit: {
    meanings: [
      {
        partOfSpeech: "noun",
        definition:
          "A structured review checking content against accessibility success criteria and recording what fails.",
      },
    ],
  },
  tagging: {
    meanings: [
      {
        partOfSpeech: "noun",
        definition:
          "Adding the structural markup — headings, lists, tables, reading order — that makes a document navigable.",
      },
    ],
  },
};

const DEFAULT_DICTIONARY_ENDPOINT: string | null = null;

const DictionaryPopover: React.FC<{
  root: HTMLElement | null;
  announce: (m: string) => void;
  endpoint: string | null;
}> = ({ root, announce, endpoint }) => {
  const [entry, setEntry] = useState<{
    word: string;
    phonetic?: string;
    meanings: { partOfSpeech: string; definition: string }[];
    error?: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (!root) return;
    let aborted = false;

    const onSelect = async () => {
      const selection = window.getSelection();
      const raw = selection?.toString().trim() ?? "";
      const anchor = selection?.anchorNode as HTMLElement | null;
      if (
        anchor &&
        (anchor.parentElement?.closest(".wcagify-widget") ||
          !root.contains(anchor))
      )
        return;
      if (!raw || !/^[A-Za-z][A-Za-z'-]{1,30}$/.test(raw)) {
        setEntry(null);
        return;
      }
      const rect = selection?.getRangeAt(0).getBoundingClientRect();
      const x = Math.min(
        Math.max(8, rect?.left ?? 40),
        window.innerWidth - 350,
      );
      const y = Math.min((rect?.bottom ?? 40) + 8, window.innerHeight - 320);

      const key = raw.toLowerCase();
      const local = GLOSSARY[key];
      if (local) {
        setEntry({
          word: raw,
          phonetic: local.phonetic,
          meanings: local.meanings,
          x,
          y,
        });
        announce(`${raw}: ${local.meanings[0].definition}`);
        return;
      }

      if (!endpoint) {
        setEntry({
          word: raw,
          meanings: [],
          error: "Not in the offline glossary.",
          x,
          y,
        });
        announce(`${raw} is not in the offline glossary.`);
        return;
      }

      setEntry({ word: raw, meanings: [], x, y });
      announce(`Looking up ${raw}`);

      try {
        const response = await fetch(endpoint + encodeURIComponent(key));
        if (aborted) return;
        if (!response.ok) {
          setEntry({
            word: raw,
            meanings: [],
            error: "No definition found.",
            x,
            y,
          });
          announce(`No definition found for ${raw}.`);
          return;
        }
        const data = await response.json();
        const first = Array.isArray(data) ? data[0] : null;
        const meanings: { partOfSpeech: string; definition: string }[] = [];
        (first?.meanings ?? []).slice(0, 3).forEach((m: any) => {
          const def = m?.definitions?.[0]?.definition;
          if (def)
            meanings.push({
              partOfSpeech: m.partOfSpeech ?? "",
              definition: def,
            });
        });
        setEntry({
          word: first?.word ?? raw,
          phonetic: first?.phonetic,
          meanings,
          x,
          y,
        });
        announce(
          meanings[0]
            ? `${raw}: ${meanings[0].definition}`
            : `No definition found for ${raw}.`,
        );
      } catch {
        if (!aborted) {
          setEntry({
            word: raw,
            meanings: [],
            error: "No definition available.",
            x,
            y,
          });
          announce(`No definition available for ${raw}.`);
        }
      }
    };

    document.addEventListener("mouseup", onSelect);
    document.addEventListener("keyup", onSelect);
    return () => {
      aborted = true;
      document.removeEventListener("mouseup", onSelect);
      document.removeEventListener("keyup", onSelect);
    };
  }, [root, announce, endpoint]);

  if (!entry) return null;
  return (
    <div
      className="wcagify-dict"
      style={{ left: entry.x, top: entry.y } as React.CSSProperties}
      role="dialog"
      aria-label={`Definition of ${entry.word}`}
    >
      <h4>{entry.word}</h4>
      {entry.phonetic && <em>{entry.phonetic}</em>}
      {entry.error && <p style={{ margin: "8px 0 0" }}>{entry.error}</p>}
      {!entry.error && entry.meanings.length === 0 && (
        <p style={{ margin: "8px 0 0" }}>Looking up…</p>
      )}
      {entry.meanings.length > 0 && (
        <ol>
          {entry.meanings.map((m, i) => (
            <li key={i}>
              <em>{m.partOfSpeech}</em> — {m.definition}
            </li>
          ))}
        </ol>
      )}
      <button type="button" onClick={() => setEntry(null)}>
        Close
      </button>
    </div>
  );
};

/** Virtual keyboard: on-screen typing for users who cannot use a physical one. */
const VirtualKeyboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [shift, setShift] = useState(false);
  const targetRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const editable = (
    el: unknown,
  ): el is HTMLInputElement | HTMLTextAreaElement =>
    (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) &&
    !el.readOnly &&
    !el.disabled &&
    !el.closest(".wcagify-widget");

  useEffect(() => {
    const onFocus = (e: FocusEvent) => {
      if (editable(e.target)) targetRef.current = e.target;
    };
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, []);

  const type = (value: string) => {
    if (editable(document.activeElement))
      targetRef.current = document.activeElement;
    const field = targetRef.current;
    if (!field) return;
    const start = field.selectionStart ?? field.value.length;
    const end = field.selectionEnd ?? field.value.length;

    let next = field.value;
    let caret = start;
    if (value === "BACKSPACE") {
      if (start === end && start > 0) {
        next = field.value.slice(0, start - 1) + field.value.slice(end);
        caret = start - 1;
      } else {
        next = field.value.slice(0, start) + field.value.slice(end);
        caret = start;
      }
    } else {
      next = field.value.slice(0, start) + value + field.value.slice(end);
      caret = start + value.length;
    }

    const proto =
      field instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
    setter?.call(field, next);
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.focus();
    field.setSelectionRange(caret, caret);
  };

  const rows = [
    "1234567890".split(""),
    "qwertyuiop".split(""),
    "asdfghjkl".split(""),
    "zxcvbnm".split(""),
  ];

  return (
    <div className="wcagify-vk" role="group" aria-label="Virtual keyboard">
      <div className="wcagify-vk-head">
        <strong>Virtual keyboard</strong>
        <span>
          {targetRef.current
            ? "Typing into the focused field"
            : "Click a text field first"}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close virtual keyboard"
          style={{ minWidth: 34, height: 30 }}
        >
          <Icon name="close" size={16} />
        </button>
      </div>
      {rows.map((row, i) => (
        <div className="wcagify-vk-row" key={i}>
          {row.map((key) => (
            <button
              key={key}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => type(shift ? key.toUpperCase() : key)}
            >
              {shift ? key.toUpperCase() : key}
            </button>
          ))}
        </div>
      ))}
      <div className="wcagify-vk-row">
        <button
          type="button"
          className="is-wide"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setShift((s) => !s)}
          aria-pressed={shift}
        >
          Shift
        </button>
        <button
          type="button"
          className="is-wide"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => type(" ")}
        >
          Space
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => type(".")}
        >
          .
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => type("@")}
        >
          @
        </button>
        <button
          type="button"
          className="is-wide"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => type("BACKSPACE")}
        >
          Backspace
        </button>
      </div>
    </div>
  );
};

/* ========================= navigation sub-tools ========================== */

interface StructureEntry {
  el: HTMLElement;
  label: string;
  kind: "heading" | "landmark" | "link";
  level: number;
}

const PageStructurePanel: React.FC<{
  root: HTMLElement | null;
  onClose: () => void;
  announce: (msg: string) => void;
}> = ({ root, onClose, announce }) => {
  const [filter, setFilter] = useState<"heading" | "landmark" | "link">(
    "heading",
  );
  const ref = useRef<HTMLDivElement | null>(null);

  const entries = useMemo<StructureEntry[]>(() => {
    const headings = pageElements("h1,h2,h3,h4,h5,h6", root).map((el) => ({
      el,
      label: accessibleName(el),
      kind: "heading" as const,
      level: Number(el.tagName[1]),
    }));
    const landmarks = pageElements(
      'main, nav, header, footer, aside, section[aria-label], [role="main"], [role="navigation"], [role="banner"], [role="contentinfo"]',
      root,
    ).map((el) => ({
      el,
      label: el.getAttribute("aria-label") || el.tagName.toLowerCase(),
      kind: "landmark" as const,
      level: 0,
    }));
    const links = pageElements("a[href]", root).map((el) => ({
      el,
      label: accessibleName(el),
      kind: "link" as const,
      level: 0,
    }));
    return [...headings, ...landmarks, ...links];
  }, [root]);

  useEffect(() => {
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const shown = entries.filter((entry) => entry.kind === filter);

  return (
    <div
      ref={ref}
      className="wcagify-structure"
      role="dialog"
      aria-modal="true"
      aria-label="Page structure"
    >
      <div className="wcagify-panel-head">
        <div>
          <h2>Page structure</h2>
          <p>Jump straight to any heading, landmark or link.</p>
        </div>
        <button
          type="button"
          className="wcagify-close"
          onClick={onClose}
          aria-label="Close page structure"
        >
          <Icon name="close" size={20} />
        </button>
      </div>

      <div
        className="wcagify-structure-tabs"
        role="tablist"
        aria-label="Structure type"
      >
        {(
          [
            ["heading", "Headings"],
            ["landmark", "Landmarks"],
            ["link", "Links"],
          ] as [typeof filter, string][]
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={filter === value}
            className="wcagify-chip"
            style={{ justifyContent: "center" }}
            onClick={() => setFilter(value)}
          >
            {label} ({entries.filter((entry) => entry.kind === value).length})
          </button>
        ))}
      </div>

      <ul className="wcagify-structure-list">
        {shown.length === 0 && (
          <li className="wcagify-structure-empty">
            Nothing of this type on the page.
          </li>
        )}
        {shown.map((entry, index) => (
          <li key={`${entry.kind}-${index}`}>
            <button
              type="button"
              className="wcagify-structure-item"
              style={{
                paddingInlineStart:
                  entry.kind === "heading" ? 8 + (entry.level - 1) * 14 : 8,
              }}
              onClick={() => {
                moveFocusTo(entry.el);
                announce(`Jumped to ${entry.label}`);
                onClose();
              }}
            >
              {entry.kind === "heading" && (
                <span className="wcagify-structure-tag">H{entry.level}</span>
              )}
              <span>{entry.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

function useKeyboardNavigation(
  enabled: boolean,
  root: HTMLElement | null,
  announce: (msg: string) => void,
) {
  const cursor = useRef<number>(-1);

  useEffect(() => {
    if (!enabled) return;
    const groups: Record<string, { selector: string; name: string }> = {
      h: { selector: "h1,h2,h3,h4,h5,h6", name: "heading" },
      l: { selector: "a[href]", name: "link" },
      b: { selector: 'button, [role="button"]', name: "button" },
      f: { selector: "input, select, textarea", name: "form field" },
      r: {
        selector:
          'main, nav, header, footer, aside, [role="main"], [role="navigation"]',
        name: "region",
      },
    };

    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target) || e.ctrlKey || e.metaKey || e.altKey)
        return;
      const key = e.key.toLowerCase();

      if (key === "m") {
        const main = root?.querySelector<HTMLElement>(
          'main, #main-content, [role="main"]',
        );
        if (main) {
          e.preventDefault();
          moveFocusTo(main);
          announce("Jumped to main content.");
        }
        return;
      }

      const group = groups[key];
      if (!group) return;
      e.preventDefault();

      const items = pageElements(group.selector, root);
      if (items.length === 0) {
        announce(`No ${group.name} found on this page.`);
        return;
      }
      const active = document.activeElement as HTMLElement | null;
      const activeIndex = active ? items.indexOf(active) : -1;
      const from = activeIndex >= 0 ? activeIndex : cursor.current;
      const next = e.shiftKey
        ? (from - 1 + items.length) % items.length
        : (from + 1) % items.length;

      cursor.current = next;
      moveFocusTo(items[next]);
      announce(
        `${group.name} ${next + 1} of ${items.length}: ${accessibleName(items[next])}`,
      );
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, root, announce]);
}

const SmartNavigationOverlay: React.FC<{
  root: HTMLElement | null;
  onExit: () => void;
  announce: (msg: string) => void;
}> = ({ root, onExit, announce }) => {
  const [targets, setTargets] = useState<HTMLElement[]>([]);
  const [typed, setTyped] = useState("");

  const refresh = useCallback(() => {
    setTargets(
      pageElements(INTERACTIVE_SELECTOR, root).filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.bottom > 0 && rect.top < window.innerHeight;
      }),
    );
  }, [root]);

  useEffect(() => {
    refresh();
    announce(
      "Smart navigation on. Type the number shown on a control, then press Enter to activate it. Escape exits.",
    );
    const onScroll = () => refresh();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [refresh, announce]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onExit();
        return;
      }
      if (isTypingTarget(e.target)) return;
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        setTyped((prev) => (prev + e.key).slice(0, 3));
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        setTyped((prev) => prev.slice(0, -1));
        return;
      }
      if (e.key === "Enter" && typed) {
        e.preventDefault();
        const target = targets[Number(typed) - 1];
        if (!target) {
          announce(`No control numbered ${typed}.`);
          setTyped("");
          return;
        }
        announce(`Activating ${accessibleName(target)}`);
        setTyped("");
        onExit();
        target.focus({ preventScroll: true });
        target.click();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [typed, targets, onExit, announce]);

  return (
    <div className="wcagify-nav-overlay" aria-hidden="true">
      {targets.map((el, index) => {
        const rect = el.getBoundingClientRect();
        const number = String(index + 1);
        const matched = typed.length > 0 && number.startsWith(typed);
        return (
          <span
            key={index}
            className={`wcagify-badge${typed && !matched ? " is-dimmed" : ""}${matched ? " is-matched" : ""}`}
            style={{
              top: Math.max(2, rect.top + 2),
              left: Math.max(2, rect.left + 2),
            }}
          >
            {number}
          </span>
        );
      })}
      <div className="wcagify-nav-hud">
        <strong>Smart Navigation</strong>
        <span>{typed ? `Typed: ${typed}` : "Type a number"}</span>
        <span>Enter activate · Backspace undo · Esc exit</span>
      </div>
    </div>
  );
};

/** Number of 3x3 refinements before Mousegrid commits the click. */
const MOUSEGRID_LEVELS = 3;

const MousegridOverlay: React.FC<{
  onExit: () => void;
  announce: (msg: string) => void;
}> = ({ onExit, announce }) => {
  const fullViewport = () => ({
    top: 0,
    left: 0,
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  const [region, setRegion] = useState(fullViewport);
  const [depth, setDepth] = useState(0);
  const history = useRef<(typeof region)[]>([]);

  useEffect(() => {
    const onResize = () => {
      history.current = [];
      setDepth(0);
      setRegion(fullViewport());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const cells = useMemo(() => {
    const cellWidth = region.width / 3;
    const cellHeight = region.height / 3;
    return Array.from({ length: 9 }, (_, index) => ({
      number: index + 1,
      top: region.top + Math.floor(index / 3) * cellHeight,
      left: region.left + (index % 3) * cellWidth,
      width: cellWidth,
      height: cellHeight,
    }));
  }, [region]);

  useEffect(() => {
    announce(
      `Mousegrid on. Press 1 to 9 to narrow the grid. After ${MOUSEGRID_LEVELS} picks the point is clicked. Backspace steps back, Escape exits.`,
    );
  }, [announce]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onExit();
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        const previous = history.current.pop();
        if (previous) {
          setRegion(previous);
          setDepth((d) => Math.max(0, d - 1));
        }
        return;
      }
      if (!/^[1-9]$/.test(e.key)) return;
      e.preventDefault();
      const cell = cells[Number(e.key) - 1];
      if (!cell) return;

      if (depth + 1 >= MOUSEGRID_LEVELS) {
        const x = cell.left + cell.width / 2;
        const y = cell.top + cell.height / 2;
        onExit();
        window.setTimeout(() => {
          const target = document.elementFromPoint(x, y) as HTMLElement | null;
          if (!target) {
            announce("Nothing to click at that point.");
            return;
          }
          const clickable =
            (target.closest(INTERACTIVE_SELECTOR) as HTMLElement | null) ||
            target;
          announce(`Clicked ${accessibleName(clickable)}`);
          clickable.focus?.({ preventScroll: true });
          clickable.click();
        }, 0);
        return;
      }

      history.current.push(region);
      setRegion({
        top: cell.top,
        left: cell.left,
        width: cell.width,
        height: cell.height,
      });
      setDepth((d) => d + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cells, depth, region, onExit, announce]);

  return (
    <div className="wcagify-nav-overlay" aria-hidden="true">
      {cells.map((cell) => {
        const labelSize = Math.max(
          11,
          Math.min(28, Math.min(cell.width, cell.height) * 0.42),
        );
        return (
          <div
            key={cell.number}
            className="wcagify-grid-cell"
            style={{
              top: cell.top,
              left: cell.left,
              width: cell.width,
              height: cell.height,
            }}
          >
            <span
              style={{
                fontSize: labelSize,
                padding: labelSize < 16 ? "0 4px" : undefined,
              }}
            >
              {cell.number}
            </span>
          </div>
        );
      })}
      <div className="wcagify-nav-hud">
        <strong>Mousegrid</strong>
        <span>
          Level {Math.min(depth + 1, MOUSEGRID_LEVELS)} of {MOUSEGRID_LEVELS} ·{" "}
          {depth + 1 >= MOUSEGRID_LEVELS
            ? "pick to click"
            : "pick to zoom in (1–9)"}
        </span>
        <span>Backspace back · Esc exit</span>
      </div>
    </div>
  );
};

function useVoiceCommands(
  enabled: boolean,
  root: HTMLElement | null,
  announce: (msg: string) => void,
  onUnsupported: () => void,
) {
  useEffect(() => {
    if (!enabled) return;
    const Ctor =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!Ctor) {
      announce("Voice commands are not supported in this browser.");
      onUnsupported();
      return;
    }

    const recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = document.documentElement.lang || "en-US";
    let stopped = false;

    const run = (raw: string) => {
      const command = raw.toLowerCase().trim();
      if (/^(scroll )?down$/.test(command)) {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
        return announce("Scrolled down.");
      }
      if (/^(scroll )?up$/.test(command)) {
        window.scrollBy({ top: -window.innerHeight * 0.8, behavior: "smooth" });
        return announce("Scrolled up.");
      }
      if (/^(go to )?top$/.test(command)) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return announce("Jumped to the top.");
      }
      if (/^(go to )?bottom$/.test(command)) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
        return announce("Jumped to the bottom.");
      }
      if (/^stop( reading)?$/.test(command)) {
        window.speechSynthesis?.cancel();
        return announce("Stopped.");
      }
      const clickMatch = command.match(/^(?:click|press|open|tap)\s+(.+)$/);
      if (clickMatch) {
        const phrase = clickMatch[1].replace(/[.?!]$/, "").trim();
        const candidates = pageElements(INTERACTIVE_SELECTOR, root);
        const words = phrase.split(/\s+/).filter(Boolean);
        const inOrder = (name: string) => {
          let from = 0;
          return words.every((w) => {
            const at = name.indexOf(w, from);
            if (at < 0) return false;
            from = at + w.length;
            return true;
          });
        };
        const hit =
          candidates.find(
            (el) => accessibleName(el).toLowerCase() === phrase,
          ) ||
          candidates.find((el) =>
            accessibleName(el).toLowerCase().startsWith(phrase),
          ) ||
          candidates.find((el) =>
            accessibleName(el).toLowerCase().includes(phrase),
          ) ||
          candidates.find((el) => inOrder(accessibleName(el).toLowerCase()));
        if (hit) {
          announce(`Clicking ${accessibleName(hit)}`);
          hit.focus({ preventScroll: true });
          hit.click();
        } else {
          announce(`Could not find anything called "${phrase}".`);
        }
        return;
      }
      announce(`Command not recognised: "${command}".`);
    };

    recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) run(String(result[0].transcript));
    };
    recognition.onerror = (event: any) => {
      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        announce("Microphone access was denied, so voice commands are off.");
        onUnsupported();
        stopped = true;
      }
    };
    recognition.onend = () => {
      if (!stopped) {
        try {
          recognition.start();
        } catch {
          /* already restarting */
        }
      }
    };

    try {
      recognition.start();
      announce(
        'Voice commands listening. Try "scroll down", "go to top", or "click request demo".',
      );
    } catch {
      onUnsupported();
    }

    return () => {
      stopped = true;
      recognition.onend = null;
      try {
        recognition.stop();
      } catch {
        /* never started */
      }
    };
  }, [enabled, root, announce, onUnsupported]);
}

/* ============================ main component ============================= */

export const WcagifyWidget: React.FC<WcagifyWidgetProps> = ({
  rootSelector,
  mainSelector = 'main, #main-content, [role="main"]',
  position = "bottom-right",
  storageKey = DEFAULT_STORAGE_KEY,
  accentColor,
  dictionaryEndpoint = DEFAULT_DICTIONARY_ENDPOINT,
}) => {
  const [mounted, setMounted] = useState(false);
  const [hostRoot, setHostRoot] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [activeProfile, setActiveProfile] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [pointerY, setPointerY] = useState(0);
  const [structureOpen, setStructureOpen] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [voiceNav, setVoiceNav] = useState(false);
  const [navMode, setNavMode] = useState<"none" | "smart" | "mousegrid">(
    "none",
  );
  const [customTarget, setCustomTarget] = useState<CustomTarget>("bg");
  const [contentTab, setContentTab] = useState<ContentControl>("fontScale");

  const panelRef = useRef<HTMLDivElement | null>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);

  const lastControlId = useRef<string | null>(null);
  const lastScrollTop = useRef(0);

  const [launcherPos, setLauncherPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const dragState = useRef<{ dx: number; dy: number; moved: boolean } | null>(
    null,
  );
  const [dragging, setDragging] = useState(false);
  const posKey = `${storageKey}.launcherPos`;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(posKey);
      if (raw) setLauncherPos(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, [posKey]);

  const clampPos = useCallback((x: number, y: number) => {
    if (typeof window === "undefined") return { x, y };
    const size = launcherRef.current?.offsetWidth || 56;
    return {
      x: Math.max(8, Math.min(x, window.innerWidth - size - 8)),
      y: Math.max(8, Math.min(y, window.innerHeight - size - 8)),
    };
  }, []);

  const onLauncherPointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const el = launcherRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      dragState.current = {
        dx: e.clientX - rect.left,
        dy: e.clientY - rect.top,
        moved: false,
      };
      el.setPointerCapture(e.pointerId);
    },
    [],
  );

  const onLauncherPointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const drag = dragState.current;
      if (!drag) return;
      const next = clampPos(e.clientX - drag.dx, e.clientY - drag.dy);
      if (!drag.moved) {
        const rect = launcherRef.current!.getBoundingClientRect();
        if (Math.abs(next.x - rect.left) < 4 && Math.abs(next.y - rect.top) < 4)
          return;
        drag.moved = true;
        setDragging(true);
      }
      setLauncherPos(next);
    },
    [clampPos],
  );

  const onLauncherPointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const drag = dragState.current;
      dragState.current = null;
      launcherRef.current?.releasePointerCapture(e.pointerId);
      if (drag?.moved) {
        setDragging(false);
        e.preventDefault();
        setLauncherPos((pos) => {
          if (pos) {
            try {
              window.localStorage.setItem(posKey, JSON.stringify(pos));
            } catch {
              /* ignore */
            }
          }
          return pos;
        });
      }
    },
    [posKey],
  );

  useEffect(() => {
    if (!launcherPos) return;
    const onResize = () => setLauncherPos((p) => (p ? clampPos(p.x, p.y) : p));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [launcherPos, clampPos]);

  /* Mount: inject styles once, tag the host root, hydrate stored preferences. */
  useEffect(() => {
    const STYLE_ID = "wcagify-widget-styles";
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = STYLES;
      document.head.appendChild(style);
    }

    const root = resolveRoot(rootSelector);
    if (root) {
      root.setAttribute(ROOT_ATTR, "");
      setHostRoot(root);
    }

    const isFirstVisit = window.localStorage.getItem(storageKey) === null;
    setSettings(withSystemPreferences(loadSettings(storageKey), isFirstVisit));
    setMounted(true);

    return () => root?.removeAttribute(ROOT_ATTR);
  }, [rootSelector, storageKey]);

  useEffect(() => {
    if (accentColor && hostRoot)
      hostRoot.style.setProperty("--wcagify-accent", accentColor);
  }, [accentColor, hostRoot]);

  /* Reflect settings onto <html> and persist. */
  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    const map: Record<string, string | null> = {
      "data-a11y-line": settings.lineStep > 0 ? "on" : null,
      "data-a11y-word": settings.wordStep > 0 ? "on" : null,
      "data-a11y-letter": settings.letterStep > 0 ? "on" : null,
      "data-a11y-color":
        settings.colorMode === "default" ? null : settings.colorMode,
      "data-a11y-custom-bg": settings.customBg ? "on" : null,
      "data-a11y-custom-bg-tone": settings.customBg
        ? readableInk(settings.customBg) === "#FFFFFF"
          ? "dark"
          : "light"
        : null,
      "data-a11y-custom-heading": settings.customHeading ? "on" : null,
      "data-a11y-custom-text": settings.customText ? "on" : null,
      "data-a11y-font": settings.font === "default" ? null : settings.font,
      "data-a11y-links": settings.links ? "on" : null,
      "data-a11y-headings": settings.headings ? "on" : null,
      "data-a11y-focus": settings.focus ? "on" : null,
      "data-a11y-cursor": settings.cursor === "off" ? null : settings.cursor,
      "data-a11y-motion": settings.motion ? "off" : null,
      "data-a11y-elements": settings.highlightElements ? "on" : null,
      "data-a11y-enlarge": settings.enlargeButtons ? "on" : null,
      "data-a11y-readable": settings.readableMode ? "on" : null,
    };
    Object.entries(map).forEach(([attr, value]) => {
      if (value === null) html.removeAttribute(attr);
      else html.setAttribute(attr, value);
    });

    html.style.fontSize =
      settings.fontScale === 100 ? "" : `${settings.fontScale}%`;

    const uiScale = Math.min(1.5, 1 + ((settings.fontScale - 100) / 100) * 0.5);
    html.style.setProperty(
      "--wcagify-ui",
      uiScale === 1 ? "" : String(uiScale),
    );
    html.style.setProperty(
      "--wcagify-line",
      LINE_STEPS[settings.lineStep] ?? "",
    );
    html.style.setProperty(
      "--wcagify-word",
      WORD_STEPS[settings.wordStep] ?? "",
    );
    html.style.setProperty(
      "--wcagify-letter",
      LETTER_STEPS[settings.letterStep] ?? "",
    );
    html.style.setProperty("--wcagify-custom-bg", settings.customBg ?? "");
    html.style.setProperty(
      "--wcagify-custom-heading",
      settings.customHeading ?? "",
    );
    html.style.setProperty("--wcagify-custom-text", settings.customText ?? "");

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(settings));
    } catch {
      /* storage unavailable */
    }
  }, [settings, mounted, storageKey]);

  /* ---- Adaptive ink ----------------------------------------------------- */
  const inkedElements = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!mounted) return;

    const clearInk = () => {
      inkedElements.current.forEach((el) => {
        el.style.removeProperty("color");
        el.style.removeProperty("-webkit-text-fill-color");
        el.style.removeProperty("transition-property");
      });
      inkedElements.current = [];
    };

    const { customText, customHeading } = settings;
    if (!hostRoot || (!customText && !customHeading)) {
      clearInk();
      return;
    }

    const TEXT_SELECTOR =
      "p,li,dd,dt,span,label,td,th,blockquote,figcaption,a,button,div,h1,h2,h3,h4,h5,h6,strong,em,small";

    const apply = () => {
      clearInk();
      const candidates = Array.from<HTMLElement>(
        hostRoot.querySelectorAll<HTMLElement>(TEXT_SELECTOR),
      );

      candidates.forEach((el: HTMLElement) => {
        if (el.closest(".wcagify-widget")) return;
        const ownsText = Array.from(el.childNodes).some(
          (node) =>
            node.nodeType === Node.TEXT_NODE &&
            node.textContent!.trim().length > 0,
        );
        if (!ownsText) return;

        const isHeading =
          /^H[1-6]$/.test(el.tagName) ||
          el.closest("h1,h2,h3,h4,h5,h6") !== null;
        const desiredHex = isHeading
          ? (customHeading ?? customText)
          : (customText ?? customHeading);
        if (!desiredHex) return;

        const background = effectiveBackground(el);
        const style = window.getComputedStyle(el);
        const px = parseFloat(style.fontSize);
        const isLarge =
          px >= 24 || (px >= 18.66 && Number(style.fontWeight) >= 700);
        const required = isLarge ? 3 : 4.5;
        const chosen =
          contrastRatio(hexToRgb(desiredHex), background) >= required
            ? desiredHex
            : inkFor(background);

        el.style.setProperty("color", chosen, "important");
        el.style.setProperty("-webkit-text-fill-color", chosen, "important");
        el.style.setProperty("transition-property", "none", "important");
        inkedElements.current.push(el);
      });
    };

    const settle = window.setTimeout(apply, 0);
    const recheck = window.setTimeout(apply, 250);

    let debounce = 0;
    const observer = new MutationObserver(() => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(apply, 200);
    });
    observer.observe(hostRoot, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(settle);
      window.clearTimeout(recheck);
      window.clearTimeout(debounce);
      observer.disconnect();
      clearInk();
    };
  }, [
    mounted,
    hostRoot,
    settings.customText,
    settings.customHeading,
    settings.customBg,
  ]);

  useEffect(() => {
    if (!settings.readingMask && !settings.readingGuide) return;
    const onMove = (e: MouseEvent) => setPointerY(e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) setPointerY(e.touches[0].clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [settings.readingMask, settings.readingGuide]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "a" || e.key === "A")) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = () =>
      Array.from<HTMLElement>(
        panel.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el: HTMLElement) => !el.hasAttribute("disabled"));

    const body = panel.querySelector<HTMLElement>(".wcagify-body");
    const restored = lastControlId.current
      ? (Array.from<HTMLElement>(
          panel.querySelectorAll<HTMLElement>("button"),
        ).find((b: HTMLElement) => controlKey(b) === lastControlId.current) ??
        null)
      : null;

    if (body) body.scrollTop = lastScrollTop.current;

    if (restored) {
      restored.focus({ preventScroll: true });
      if (body) {
        const panelBox = body.getBoundingClientRect();
        const box = restored.getBoundingClientRect();
        if (box.top < panelBox.top || box.bottom > panelBox.bottom) {
          restored.scrollIntoView({ block: "center" });
        }
      }
    } else {
      focusables()[0]?.focus({ preventScroll: true });
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener("keydown", onKey);
    return () => panel.removeEventListener("keydown", onKey);
  }, [open]);

  const announce = useCallback((message: string) => {
    setAnnouncement("");
    window.setTimeout(() => setAnnouncement(message), 40);
  }, []);

  const disableVoice = useCallback(() => setVoiceNav(false), []);
  useKeyboardNavigation(keyboardNav, hostRoot, announce);
  useVoiceCommands(voiceNav, hostRoot, announce, disableVoice);
  useBlinksBlocking(settings.blinksBlocking, hostRoot);
  useMuteMedia(settings.muteMedia, hostRoot);
  useImageDescriptions(settings.imageDescriptions, hostRoot);

  const enterNavMode = useCallback(
    (mode: "smart" | "mousegrid") => {
      const leaving = navMode === mode;
      setNavMode(leaving ? "none" : mode);
      if (!leaving) setOpen(false);
    },
    [navMode],
  );

  const update = useCallback(
    (patch: Partial<Settings>, message: string) => {
      setSettings((prev) => ({ ...prev, ...patch }));
      setActiveProfile(null);
      announce(message);
    },
    [announce],
  );

  const applyProfile = useCallback(
    (key: string) => {
      const profile = PROFILES.find((p) => p.key === key);
      if (!profile) return;
      if (activeProfile === key) {
        setSettings(DEFAULTS);
        setActiveProfile(null);
        announce("Profile removed. Default appearance restored.");
        return;
      }
      setSettings({ ...DEFAULTS, ...profile.settings });
      setActiveProfile(key);
      announce(`${profile.label} profile applied. ${profile.hint}.`);
    },
    [activeProfile, announce],
  );

  const resetAll = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    setSettings(DEFAULTS);
    setActiveProfile(null);
    setKeyboardNav(false);
    setVoiceNav(false);
    setNavMode("none");
    setStructureOpen(false);
    announce("All accessibility preferences reset to defaults.");
  }, [announce]);

  const toggleSpeech = useCallback(() => {
    if (!("speechSynthesis" in window)) {
      announce("Text to speech is not supported in this browser.");
      return;
    }
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      announce("Reading stopped.");
      return;
    }
    const selection = window.getSelection()?.toString().trim();
    const main = hostRoot?.querySelector<HTMLElement>(mainSelector) ?? hostRoot;
    const text = (
      selection && selection.length > 0 ? selection : main?.innerText || ""
    ).slice(0, 20000);
    if (!text) {
      announce("Nothing available to read on this page.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
    announce(
      selection
        ? "Reading the selected text aloud."
        : "Reading the page aloud.",
    );
  }, [announce, speaking, hostRoot, mainSelector]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const activeCount = useMemo(
    () =>
      (Object.keys(DEFAULTS) as (keyof Settings)[])
        .filter((k) => k !== "inkAuto")
        .filter((k) => settings[k] !== DEFAULTS[k]).length,
    [settings],
  );

  const activeControl =
    CONTENT_CONTROLS.find((c) => c.key === contentTab) ?? CONTENT_CONTROLS[0];
  const controlState = contentState(settings, contentTab);

  const stepContent = useCallback(
    (direction: 1 | -1) => {
      const state = contentState(settings, contentTab);
      const next = Math.min(
        state.max,
        Math.max(state.min, state.value + direction * state.step),
      );
      if (next === state.value) return;
      const label = contentState(
        { ...settings, [contentTab]: next },
        contentTab,
      ).label;
      const control = CONTENT_CONTROLS.find((c) => c.key === contentTab)!;
      update(
        { [contentTab]: next } as Partial<Settings>,
        `${control.title}: ${label}.`,
      );
    },
    [settings, contentTab, update],
  );

  if (!mounted || typeof document === "undefined") return null;

  const maskTop = Math.max(0, pointerY - 70);
  const maskBottomStart = pointerY + 70;

  const bool = (key: keyof Settings, label: string) => () => {
    const now = !settings[key];
    update(
      { [key]: now } as Partial<Settings>,
      `${label} ${now ? "on" : "off"}.`,
    );
  };

  const tools: {
    icon: IconName;
    label: string;
    pressed: boolean;
    onClick: () => void;
  }[] = [
    {
      icon: "blinks",
      label: "Blinks Blocking",
      pressed: settings.blinksBlocking,
      onClick: bool("blinksBlocking", "Blinks blocking"),
    },
    {
      icon: "magnifier",
      label: "Magnifier",
      pressed: settings.magnifier,
      onClick: bool("magnifier", "Magnifier"),
    },
    {
      icon: "readableFont",
      label: "Readable Font",
      pressed: settings.font === "readable",
      onClick: () =>
        update(
          { font: settings.font === "readable" ? "default" : "readable" },
          settings.font === "readable"
            ? "Readable font off."
            : "Readable font on.",
        ),
    },
    {
      icon: "image",
      label: "Image Descriptions",
      pressed: settings.imageDescriptions,
      onClick: bool("imageDescriptions", "Image descriptions"),
    },
    {
      icon: "link",
      label: "Highlight Links",
      pressed: settings.links,
      onClick: bool("links", "Highlight links"),
    },
    {
      icon: "heading",
      label: "Highlight Headers",
      pressed: settings.headings,
      onClick: bool("headings", "Highlight headers"),
    },
    {
      icon: "elements",
      label: "Highlight elements",
      pressed: settings.highlightElements,
      onClick: bool("highlightElements", "Highlight elements"),
    },
    {
      icon: "enlarge",
      label: "Enlarge Buttons",
      pressed: settings.enlargeButtons,
      onClick: bool("enlargeButtons", "Enlarge buttons"),
    },
    {
      icon: "readable",
      label: "Readable Mode",
      pressed: settings.readableMode,
      onClick: bool("readableMode", "Readable mode"),
    },
    {
      icon: "textMagnifier",
      label: "Text Magnifier",
      pressed: settings.textMagnifier,
      onClick: bool("textMagnifier", "Text magnifier"),
    },
    {
      icon: "ear",
      label: "Page Structure",
      pressed: structureOpen,
      onClick: () => {
        setStructureOpen(true);
        setOpen(false);
      },
    },
    {
      icon: "mute",
      label: "Mute Media",
      pressed: settings.muteMedia,
      onClick: bool("muteMedia", "Mute media"),
    },
    {
      icon: "mask",
      label: "Read focus",
      pressed: settings.readingMask,
      onClick: () =>
        update(
          { readingMask: !settings.readingMask, readingGuide: false },
          settings.readingMask ? "Read focus off." : "Read focus on.",
        ),
    },
    {
      icon: "guide",
      label: "Reading guide",
      pressed: settings.readingGuide,
      onClick: () =>
        update(
          { readingGuide: !settings.readingGuide, readingMask: false },
          settings.readingGuide ? "Reading guide off." : "Reading guide on.",
        ),
    },
    {
      icon: "dictionary",
      label: "Dictionary",
      pressed: settings.dictionary,
      onClick: bool("dictionary", "Dictionary"),
    },
    {
      icon: "keyboard",
      label: "Virtual Keyboard",
      pressed: settings.virtualKeyboard,
      onClick: bool("virtualKeyboard", "Virtual keyboard"),
    },
  ];

  const extraToggles: {
    icon: IconName;
    label: string;
    pressed: boolean;
    onClick: () => void;
  }[] = [
    {
      icon: "target",
      label: "Strong focus outline",
      pressed: settings.focus,
      onClick: bool("focus", "Strong focus outline"),
    },
    {
      icon: "pause",
      label: "Stop animations",
      pressed: settings.motion,
      onClick: bool("motion", "Stop animations"),
    },
  ];

  const widget = (
    <div className="wcagify-widget">
      {settings.readingMask && (
        <div className="wcagify-reading-mask" aria-hidden="true">
          <span style={{ top: 0, height: maskTop }} />
          <span style={{ top: maskBottomStart, bottom: 0 }} />
        </div>
      )}
      {settings.readingGuide && (
        <div
          className="wcagify-reading-guide"
          style={{ top: pointerY }}
          aria-hidden="true"
        />
      )}

      {navMode === "smart" && (
        <SmartNavigationOverlay
          root={hostRoot}
          onExit={() => setNavMode("none")}
          announce={announce}
        />
      )}
      {navMode === "mousegrid" && (
        <MousegridOverlay
          onExit={() => setNavMode("none")}
          announce={announce}
        />
      )}
      {structureOpen && (
        <PageStructurePanel
          root={hostRoot}
          onClose={() => setStructureOpen(false)}
          announce={announce}
        />
      )}

      {settings.magnifier && <MagnifierLens root={hostRoot} />}
      {settings.textMagnifier && <TextMagnifier root={hostRoot} />}
      {settings.dictionary && (
        <DictionaryPopover
          root={hostRoot}
          announce={announce}
          endpoint={dictionaryEndpoint}
        />
      )}
      {settings.virtualKeyboard && (
        <VirtualKeyboard
          onClose={() =>
            update({ virtualKeyboard: false }, "Virtual keyboard closed.")
          }
        />
      )}

      <div
        className="wcagify-sr"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>

      <button
        ref={launcherRef}
        type="button"
        className={`wcagify-launcher${launcherPos ? " is-dragged" : ` wcagify-pos-${position}`}${dragging ? " is-dragging" : ""}`}
        style={
          launcherPos ? { left: launcherPos.x, top: launcherPos.y } : undefined
        }
        onPointerDown={onLauncherPointerDown}
        onPointerMove={onLauncherPointerMove}
        onPointerUp={onLauncherPointerUp}
        onPointerCancel={onLauncherPointerUp}
        onClick={() => {
          if (dragging) return;
          setOpen((v) => !v);
        }}
        onKeyDown={(e) => {
          const step = e.shiftKey ? 40 : 12;
          const deltas: Record<string, [number, number]> = {
            ArrowUp: [0, -step],
            ArrowDown: [0, step],
            ArrowLeft: [-step, 0],
            ArrowRight: [step, 0],
          };
          const delta = deltas[e.key];
          if (!delta) return;
          e.preventDefault();
          const rect = launcherRef.current!.getBoundingClientRect();
          const next = clampPos(rect.left + delta[0], rect.top + delta[1]);
          setLauncherPos(next);
          try {
            window.localStorage.setItem(posKey, JSON.stringify(next));
          } catch {
            /* ignore */
          }
        }}
        aria-expanded={open}
        aria-controls="wcagify-a11y-panel"
        aria-label={
          open
            ? "Close accessibility preferences"
            : `Open accessibility preferences${activeCount > 0 ? `, ${activeCount} active` : ""}. Shortcut Alt plus A`
        }
        title="Accessibility preferences (Alt + A)"
      >
        <Icon name="accessibility" size={28} strokeWidth={2.25} />
      </button>

      {open && (
        <>
          <div
            className="wcagify-scrim"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            id="wcagify-a11y-panel"
            ref={panelRef}
            className="wcagify-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wcagify-a11y-title"
            aria-describedby="wcagify-a11y-desc"
          >
            <div className="wcagify-panel-head">
              <div>
                <h2 id="wcagify-a11y-title">Accessibility preferences</h2>
                <p id="wcagify-a11y-desc">
                  Your settings, saved on this device. Press Escape to close.
                </p>
              </div>
              <button
                type="button"
                className="wcagify-close"
                onClick={() => setOpen(false)}
                aria-label="Close accessibility preferences"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div
              className="wcagify-body"
              onScroll={(e) => {
                lastScrollTop.current = (e.target as HTMLElement).scrollTop;
              }}
              onClickCapture={(e) => {
                const control = (e.target as HTMLElement).closest("button");
                if (control) lastControlId.current = controlKey(control);
              }}
              onFocusCapture={(e) => {
                const control = (e.target as HTMLElement).closest("button");
                if (control) lastControlId.current = controlKey(control);
              }}
            >
              <p className="wcagify-note">
                These are personal viewing preferences — not a compliance layer.
                They change how this page reads for you; they do not make an
                inaccessible site conformant.
              </p>

              <section
                className="wcagify-group"
                aria-labelledby="wcagify-grp-profiles"
              >
                <h3 id="wcagify-grp-profiles">One-tap profiles</h3>
                <div className="wcagify-grid">
                  {PROFILES.map((profile) => (
                    <button
                      key={profile.key}
                      type="button"
                      className="wcagify-chip"
                      style={
                        profile.key === "wcagBaseline"
                          ? { gridColumn: "1 / -1" }
                          : undefined
                      }
                      aria-pressed={activeProfile === profile.key}
                      onClick={() => applyProfile(profile.key)}
                    >
                      <Icon name="target" size={16} />
                      <span>
                        {profile.label}
                        <span className="wcagify-sr"> — {profile.hint}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <section
                className="wcagify-group"
                aria-labelledby="wcagify-grp-nav"
              >
                <h3 id="wcagify-grp-nav">Navigation adjustment</h3>
                <div className="wcagify-nav-grid">
                  <button
                    type="button"
                    className="wcagify-tool"
                    aria-pressed={structureOpen}
                    onClick={() => {
                      setStructureOpen(true);
                      setOpen(false);
                    }}
                  >
                    <Icon name="ear" />
                    <span>Screen Reader Adjustment</span>
                  </button>
                  <button
                    type="button"
                    className="wcagify-tool"
                    aria-pressed={keyboardNav}
                    onClick={() => {
                      const next = !keyboardNav;
                      setKeyboardNav(next);
                      announce(
                        next
                          ? "Keyboard navigation on. Press H for headings, L for links, B for buttons, F for form fields, R for regions, M for main content. Add Shift to go backwards."
                          : "Keyboard navigation off.",
                      );
                    }}
                  >
                    <Icon name="keyboard" />
                    <span>Keyboard Navigation (Motor)</span>
                  </button>
                  <button
                    type="button"
                    className="wcagify-tool"
                    aria-pressed={navMode === "mousegrid"}
                    onClick={() => enterNavMode("mousegrid")}
                  >
                    <Icon name="grid" />
                    <span>Mousegrid</span>
                  </button>
                  <button
                    type="button"
                    className="wcagify-tool"
                    aria-pressed={navMode === "smart"}
                    onClick={() => enterNavMode("smart")}
                  >
                    <Icon name="smart" />
                    <span>Smart Navigation</span>
                  </button>
                  <button
                    type="button"
                    className="wcagify-tool"
                    aria-pressed={speaking}
                    onClick={toggleSpeech}
                  >
                    <Icon name="volume" />
                    <span>Text Reader</span>
                  </button>
                  <button
                    type="button"
                    className="wcagify-tool"
                    aria-pressed={voiceNav}
                    onClick={() => {
                      const next = !voiceNav;
                      setVoiceNav(next);
                      if (!next) announce("Voice commands off.");
                    }}
                  >
                    <Icon name="mic" />
                    <span>Voice Commands</span>
                  </button>
                </div>
              </section>

              <section
                className="wcagify-group"
                aria-labelledby="wcagify-grp-content"
              >
                <h3 id="wcagify-grp-content">
                  <Icon name="type" size={14} /> Content adjustment
                </h3>
                <div className="wcagify-card">
                  <div className="wcagify-card-head">
                    <Icon name="fontSize" size={26} />
                    <div>
                      <strong>{activeControl.title}</strong>
                      <span>{activeControl.description}</span>
                    </div>
                  </div>

                  <div
                    className="wcagify-grid"
                    role="tablist"
                    aria-label="Content adjustment type"
                  >
                    {CONTENT_CONTROLS.map((control) => (
                      <button
                        key={control.key}
                        type="button"
                        role="tab"
                        aria-selected={contentTab === control.key}
                        className="wcagify-chip"
                        style={{ justifyContent: "center" }}
                        onClick={() => setContentTab(control.key)}
                      >
                        {control.tab}
                      </button>
                    ))}
                  </div>

                  <div className="wcagify-stepper">
                    <button
                      type="button"
                      onClick={() => stepContent(-1)}
                      disabled={controlState.value <= controlState.min}
                      aria-label={`Decrease ${activeControl.title.toLowerCase()}`}
                    >
                      <Icon name="minus" size={18} strokeWidth={2.6} />
                    </button>
                    <div className="wcagify-track">
                      <span
                        style={{
                          width: `${Math.round(controlState.fraction * 100)}%`,
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => stepContent(1)}
                      disabled={controlState.value >= controlState.max}
                      aria-label={`Increase ${activeControl.title.toLowerCase()}`}
                    >
                      <Icon name="plus" size={18} strokeWidth={2.6} />
                    </button>
                  </div>

                  <div className="wcagify-stepper-foot">
                    <span aria-live="off">{controlState.label}</span>
                    <button
                      type="button"
                      onClick={() =>
                        update(
                          {
                            fontScale: 100,
                            lineStep: 0,
                            wordStep: 0,
                            letterStep: 0,
                          },
                          "Font size and spacing reset to the site defaults.",
                        )
                      }
                    >
                      <Icon name="fontSize" size={16} /> Reset font
                    </button>
                  </div>
                </div>
              </section>

              <section
                className="wcagify-group"
                aria-labelledby="wcagify-grp-cursor"
              >
                <h3 id="wcagify-grp-cursor">
                  <Icon name="cursor" size={14} /> Cursor
                </h3>
                <div className="wcagify-card">
                  <div className="wcagify-card-head">
                    <Icon name="cursor" size={26} />
                    <div>
                      <strong>Cursor</strong>
                      <span>Enlarge the cursor and change its color</span>
                    </div>
                  </div>
                  <div
                    className="wcagify-cursor-choices"
                    role="group"
                    aria-label="Cursor colour"
                  >
                    {(
                      [
                        ["white", "White"],
                        ["black", "Black"],
                      ] as [CursorMode, string][]
                    ).map(([value, label]) => {
                      const active = settings.cursor === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          className={`wcagify-cursor-choice is-${value}`}
                          aria-pressed={active}
                          onClick={() =>
                            update(
                              { cursor: active ? "off" : value },
                              active
                                ? "Large cursor off."
                                : `${label} large cursor on, with a matching pointer over clickable elements.`,
                            )
                          }
                        >
                          <span>{label}</span>
                          {active && (
                            <Icon name="check" size={16} strokeWidth={3} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              <section
                className="wcagify-group"
                aria-labelledby="wcagify-grp-colour"
              >
                <h3 id="wcagify-grp-colour">
                  <Icon name="palette" size={14} /> Color adjustment
                </h3>
                <div className="wcagify-nav-grid">
                  {COLOR_MODES.map((mode) => {
                    const active = settings.colorMode === mode.value;
                    return (
                      <button
                        key={mode.value}
                        type="button"
                        className="wcagify-tool"
                        aria-pressed={active}
                        onClick={() =>
                          update(
                            { colorMode: active ? "default" : mode.value },
                            active
                              ? "Colour mode cleared."
                              : `${mode.label} applied.`,
                          )
                        }
                      >
                        <Icon name={mode.icon} />
                        <span>{mode.label}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section
                className="wcagify-group"
                aria-labelledby="wcagify-grp-custom"
              >
                <h3 id="wcagify-grp-custom">
                  <Icon name="droplet" size={14} /> Custom color
                </h3>
                <p className="wcagify-hint">
                  A short, pre-checked palette rather than a full colour wheel —
                  every swatch here stays legible against the others.
                </p>
                <div
                  className="wcagify-grid-3"
                  role="tablist"
                  aria-label="Custom colour target"
                >
                  {(
                    [
                      ["bg", "Backgrounds"],
                      ["heading", "Headings"],
                      ["text", "Contents"],
                    ] as [CustomTarget, string][]
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      role="tab"
                      aria-selected={customTarget === value}
                      className="wcagify-chip"
                      style={{ justifyContent: "center" }}
                      onClick={() => setCustomTarget(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div
                  className="wcagify-colorbar"
                  role="group"
                  aria-label={`${customTarget} colour`}
                >
                  {SWATCHES[customTarget].map((swatch) => {
                    const key = CUSTOM_KEY[customTarget];
                    const active = settings[key] === swatch.value;
                    return (
                      <button
                        key={swatch.value}
                        type="button"
                        data-wcagify-key={`swatch-${customTarget}-${swatch.value}`}
                        style={{ background: swatch.value }}
                        aria-pressed={active}
                        aria-label={`${swatch.label}${active ? ", selected" : ""}`}
                        onClick={() => {
                          if (active) {
                            update(
                              { [key]: null } as Partial<Settings>,
                              `${swatch.label} cleared.`,
                            );
                            return;
                          }
                          const patch: Partial<Settings> = {
                            [key]: swatch.value,
                          } as Partial<Settings>;
                          if (customTarget === "bg") {
                            if (!settings.customText || settings.inkAuto) {
                              const ink = readableInk(swatch.value);
                              patch.customText = ink;
                              patch.customHeading = ink;
                              patch.inkAuto = true;
                            }
                          } else {
                            patch.inkAuto = false;
                          }
                          update(patch, `${swatch.label} applied.`);
                        }}
                      >
                        {active && (
                          <span
                            className="wcagify-colorbar-check"
                            style={{ color: readableInk(swatch.value) }}
                          >
                            <Icon name="check" size={16} strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <p className="wcagify-colorbar-label">
                  <span>
                    {(() => {
                      const current = settings[CUSTOM_KEY[customTarget]];
                      const match = SWATCHES[customTarget].find(
                        (s) => s.value === current,
                      );
                      return match
                        ? `Selected: ${match.label}`
                        : "Using the site’s own colour";
                    })()}
                  </span>
                  <em>Tap again to clear</em>
                </p>
                {(settings.customBg ||
                  settings.customHeading ||
                  settings.customText) && (
                  <button
                    type="button"
                    className="wcagify-row"
                    style={{ marginTop: 10, justifyContent: "center" }}
                    onClick={() =>
                      update(
                        {
                          customBg: null,
                          customHeading: null,
                          customText: null,
                          inkAuto: false,
                        },
                        "Custom colours reset.",
                      )
                    }
                  >
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <Icon name="reset" size={16} /> Reset colors
                    </span>
                  </button>
                )}
              </section>

              <section
                className="wcagify-group"
                aria-labelledby="wcagify-grp-font"
              >
                <h3 id="wcagify-grp-font">Typeface</h3>
                <div className="wcagify-grid-3">
                  {(
                    [
                      ["default", "Default"],
                      ["readable", "Readable"],
                      ["dyslexic", "Dyslexia"],
                    ] as [FontChoice, string][]
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      className="wcagify-chip"
                      style={{ justifyContent: "center" }}
                      aria-pressed={settings.font === value}
                      onClick={() =>
                        update({ font: value }, `${label} typeface applied.`)
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </section>

              <section
                className="wcagify-group"
                aria-labelledby="wcagify-grp-tools"
              >
                <h3 id="wcagify-grp-tools">Assistive tools</h3>
                <div className="wcagify-nav-grid">
                  {tools.map((tool) => (
                    <button
                      key={tool.label}
                      type="button"
                      className="wcagify-tool"
                      aria-pressed={tool.pressed}
                      onClick={tool.onClick}
                    >
                      <Icon name={tool.icon} />
                      <span>{tool.label}</span>
                    </button>
                  ))}
                </div>

                <div style={{ marginTop: 10 }}>
                  {extraToggles.map((toggle) => (
                    <button
                      key={toggle.label}
                      type="button"
                      className="wcagify-row"
                      aria-pressed={toggle.pressed}
                      onClick={toggle.onClick}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Icon name={toggle.icon} size={16} />
                        {toggle.label}
                      </span>
                      <span className="wcagify-switch" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* <div className="wcagify-foot">
              <button
                type="button"
                className="wcagify-reset"
                onClick={resetAll}
              >
                <Icon name="reset" size={16} /> Reset all
              </button>
              <small>
                {activeCount === 0
                  ? "No preferences active"
                  : `${activeCount} preference${activeCount === 1 ? "" : "s"} active`}
                <br />
                Alt&nbsp;+&nbsp;A toggles this panel
              </small>
            </div> */}
            <div className="wcagify-foot">
              <button
                type="button"
                className="wcagify-reset"
                onClick={resetAll}
              >
                <Icon name="reset" size={16} aria-hidden="true" /> Reset all
              </button>
              <small>
                {activeCount === 0
                  ? "No preferences active"
                  : `${activeCount} preference${activeCount === 1 ? "" : "s"} active`}
                <br />
                Alt&nbsp;+&nbsp;A toggles this panel
              </small>
            </div>

            {/* WCAGify & MoveAhead Platform Branding */}
            <div
              className="wcagify-branding"
              style={{
                padding: "0px 16px 12px",
                textAlign: "left",
                background: "#f8fafc",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "11px",
                  lineHeight: "1.4",
                  opacity: 0.85,
                }}
              >
                Engineered in India with{" "}
                <span role="img" aria-label="love">
                  ❤️
                </span>{" "}
                by MoveAhead
              </p>
              <p
                style={{
                  margin: "2px 0 0 0",
                  fontSize: "11px",
                  lineHeight: "1.4",
                  opacity: 0.75,
                }}
              >
                <strong>WCAGify.ai</strong> • An infrastructure platform by{" "}
                <a
                  href="https://moveahead.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MoveAhead (opens in a new tab)"
                  style={{ color: "inherit", textDecoration: "underline" }}
                >
                  MoveAhead
                </a>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return createPortal(widget, document.body);
};

export default WcagifyWidget;
