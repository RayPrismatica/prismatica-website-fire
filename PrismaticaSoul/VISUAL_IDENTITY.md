# Prismatica Labs - Visual Identity & Design System

> **The Soul of Prismatica**
> This document captures the complete visual DNA of Prismatica Labs. Every pixel, every spacing decision, every interaction. This is the design principle that runs through the entire website.

---

## Philosophy

**Quiet confidence. Zero noise. Maximum clarity.**

The design speaks through restraint. No gradients. No shadows unless functional. No decoration for decoration's sake. Every element serves the message. The brand is intellectual, not emotional. Precision over persuasion.

---

## Color System

### Primary Palette

**Prismatica Red** - `#D43225`
- Primary action color
- Active states
- Critical accents (left border bars, underlines)
- Hover states on links and buttons
- Strategic emphasis

**Usage contexts:**
- CTA buttons background
- Active navigation items
- Accent bars (3px width, positioned left: -20px)
- Header underlines (4px solid)
- Filter button active state
- Hover states for bento boxes (border-top-color)

**Background** - `rgb(245, 245, 247)`
- Page background
- Subtle, warm gray that reduces eye strain
- Creates contrast with white cards without harshness

**White** - `#fff`
- Card backgrounds
- Button text on red backgrounds
- Sidebar background
- Clean, pure white for content containers

### Text Hierarchy

**Primary Text** - `#222`
- Main headings
- Body text (in high emphasis contexts)
- Navigation items
- Almost black, slightly softened

**Secondary Text** - `#444`
- Paragraph text
- Body copy
- Service descriptions
- Standard reading text

**Tertiary Text** - `#666`
- Labels
- Metadata
- Service details
- Lower hierarchy information
- Inactive filter buttons

**Quaternary Text** - `#999`
- Timestamps
- Footer links
- Ultra-low hierarchy
- Disabled states

### Accent Colors (Context-Specific)

**Orange** - `#EA9336`
- Section label: "How We Work"
- Specific thematic accent

**Green** - `#10B981`
- Section label: "Services"
- Athena online status indicator
- Success states

**Purple** - `#6C5CE7`
- Section label: "Products"
- Thematic differentiation

**Gold** - `#FFB800`
- Testimonial star ratings
- Special highlights

### Borders & Dividers

**Standard Border** - `#e0e0e0`
- Card borders
- Section dividers
- Input borders
- Subtle separation

**Border Variations:**
- Sidebar: `1px solid #e0e0e0`
- Horizontal rules: `1px solid #e0e0e0`
- Thick dividers: `1px solid #ccc` top and bottom with 3px height container

---

## Typography

### Font Families

**Display Font** - `"Passion One", sans-serif`
- Headers (h2 primarily)
- Logo text
- High-impact statements
- Uppercase treatments

**Body Font** - `"Noto Sans", sans-serif`
- All body text
- Navigation
- Buttons
- Form inputs
- Interface elements

### Type Scale & Hierarchy

**Design Philosophy**: Following Jony Ive's principle - "When you have 21 font sizes, you have none."

The system uses exactly **6 intentional font sizes** and **3 line-height values** for absolute clarity and consistency.

**The Ive-Approved Scale:**
- **9px** - Legal/copyright (9 instances)
- **13px** - Labels/captions/navigation (34 instances)
- **17px** - Body text - THE standard (258 instances)
- **28px** - Section headings (29 instances)
- **56px** - Page titles (19 instances)
- **clamp(44-100px)** - Threshold hero only (1 instance)

**Line-Height Scale:**
- **0.9** - Display text (Passion One titles)
- **1.6** - Standard body text (optimal reading)
- **1.8** - Spacious text (philosophy, reflective content)

---

### Contextual Typography System

**Ive's Principle:** *"Form and the material and process – they are beautifully intertwined – completely connected."*

Typography follows **spatial context**, not just HTML semantics. Different spatial containers demand different typographic systems—but each must be internally consistent.

#### Context 1: Page Typography (Continuous Reading Flow)

**Purpose:** Structural hierarchy for continuous content consumption

**Hierarchy:**
- **Large jumps** (56px → 28px → 17px) create obvious visual structure
- **Passion One** for page titles (brand voice)
- **Noto Sans** for everything else (readability)
- **Line-height:** Tighter for titles (0.9), comfortable for body (1.6-1.8)

**When to use:** Main page content, article layouts, documentation

#### Context 2: Bento Box Typography (Contained Objects)

**Purpose:** Compact, scannable hierarchy within discrete spatial containers

**Hierarchy:**
- **Flatter scale** (17px → 17px → 17px → 13px → 9px)
- **The container itself** (card border, background) creates primary hierarchy
- **Weight and style** create secondary hierarchy within
- **All Noto Sans** (no Passion One in cards - would overwhelm compact space)

**When to use:** Service cards, product cards, navigation cards, any "bento box" component

**The Key Insight:** When content is inside a visually distinct container (card, panel, modal), you don't need large font size jumps. The container does the hierarchical work. Use size consistently (17px) and let **weight, style, and accent marks** (like the red bar) create hierarchy.

#### Typography Rules by Context

| Element | Page Context | Bento Context |
|---------|--------------|---------------|
| Primary Title | 56px, Passion One, 700 | 17px, Noto Sans, 700, uppercase |
| Section Header | 28px, Noto Sans, 700, uppercase | (Not used - container provides section) |
| Body Text | 17px, Noto Sans, 400 | 17px, Noto Sans, 400 |
| Prompt/Callout | 17px, Noto Sans, 500 + accent bar | 17px, Noto Sans, 400 + accent bar |
| Metadata | 13px, Noto Sans, 400 | 13px, Noto Sans, 400, italic |
| Badge/Label | 13px, Noto Sans, 600, uppercase | 9px, Noto Sans, 600, uppercase |

**Critical Rule:** Never mix contexts. Don't put 28px headers inside bento boxes. Don't use 17px titles in main page hierarchy.

---

**Threshold Hero (Homepage `/` Only)**
```css
font-family: var(--font-passion), sans-serif;
font-size: clamp(44px, 10vw, 100px); /* Dynamic scaling for statement */
font-weight: 600;
line-height: 0.9;
letter-spacing: 0.005em;
margin-bottom: 32px;
color: #222;
```

**Page Headers (h2)**
```css
font-family: var(--font-passion), sans-serif;
font-size: 56px;
font-weight: 600;
line-height: 0.9;
letter-spacing: 0.005em;
margin-bottom: 32px;
color: #222;

/* Consistent across all breakpoints - no variation */
```

**Section Headers (h3 - Uppercase)**
```css
font-family: "Noto Sans", sans-serif;
font-size: 28px;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 1px;
line-height: 0.9;
margin-top: 48px;
margin-bottom: 24px;
color: #222;
```

**Service Headers (h3 - Bento Boxes)**
```css
font-family: "Noto Sans", sans-serif;
font-size: 17px;
font-weight: 700;
letter-spacing: 1px;
text-transform: uppercase;
line-height: 1.6;
margin-bottom: 20px;
color: #222;
```

**Body Text (Standard)**
```css
font-family: "Noto Sans", sans-serif;
font-size: 17px; /* THE body text standard */
line-height: 1.6;
margin-bottom: 16px;
color: #444;

/* Consistent across all breakpoints - no mobile variation */
/* This is the most common size in the entire codebase (258 instances) */
```

**Emphasized Body (Quotes/Callouts)**
```css
position: relative;
font-size: 17px;
font-weight: 500;
line-height: 1.6;
color: #222;

/* With left accent bar */
&::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: #D43225;
}
```

**Spacious Text (Philosophy, Reflective)**
```css
font-size: 17px;
line-height: 1.8; /* More breathing room */
color: #666;
font-weight: 400;
text-wrap: balance;
orphans: 3;
widows: 3;
```

**Labels & Captions**
```css
font-size: 13px;
font-weight: 600;
letter-spacing: 1px;
text-transform: uppercase;
line-height: 1.6;
color: #666;
```

**Legal Text (Footer, Copyright)**
```css
font-family: "Noto Sans", sans-serif;
font-size: 9px;
line-height: 1.6;
color: #999;
```

**Navigation Text**
```css
font-size: 13px;
font-family: "Noto Sans", sans-serif;
font-weight: 600;
letter-spacing: 1px;
text-transform: uppercase;
line-height: 1.6;
padding: 8px 0;
transition: opacity 0.2s;

/* Active State */
color: #D43225;

/* Hover State */
opacity: 0.6;
```

---

## Layout & Spacing

### Grid System

**Desktop Layout**
- Sidebar: Fixed `240px` width
- Main content: `margin-left: 240px`
- Max content width: `700px` (paragraphs), `1200px` (sections)
- Main padding: `48px`

**Mobile Layout**
```css
@media (max-width: 1024px) {
  /* Sidebar becomes drawer */
  --sidebar-width: 0px;
  .main {
    margin-left: 0;
    margin-top: 60px; /* Mobile header height */
    padding: 24px 20px;
  }
}

@media (max-width: 768px) {
  .main {
    padding: 32px 20px;
  }
}

@media (max-width: 480px) {
  .main {
    padding: 16px 12px;
  }
}
```

### Spacing Scale

**Macro Spacing (Sections)**
- Section top margin: `48px`
- Section bottom margin: `32px` - `48px`
- Thick divider margin: `48px 0`

**Standard Spacing**
- Element margin-bottom: `16px` (paragraphs)
- Element margin-bottom: `20px` (mobile paragraphs)
- Card margin-bottom: `24px`
- Subsection margin: `32px 0`

**Micro Spacing**
- Button padding: `14px 28px` (primary), `8px 16px` (filter)
- Card padding: `32px`
- Input padding: `12px 20px`
- Horizontal rule margin: `32px 0`
- Gap between filter buttons: `8px`
- Gap between service CTAs: `12px` - `16px`

### Border Radius Scale

- **Buttons (Primary)**: `4px` - Sharp, professional
- **Filter Buttons**: `4px`
- **Cards (Bento Boxes)**: `12px` - Soft, friendly
- **Athena Chat Container**: `16px` - Conversational
- **Modals**: `8px` - Balanced
- **Avatar Images**: `50%` (circular)
- **Input Fields**: `24px` (chat input - pill shape)

---

## Components

### Buttons

**Primary CTA Button**
```css
display: inline-block;
padding: 14px 28px;
background-color: #D43225;
color: #fff;
text-decoration: none;
border-radius: 4px;
font-size: 17px;
font-weight: 600;
transition: all 0.2s;
border: none;
cursor: pointer;

&:hover {
  background-color: #b8281e; /* Darker red */
  /* OR */
  background-color: #B82919;
}
```

**Enhanced CTA (Products Page)**
```css
padding: 14px 32px;
background-color: #D43225;
border-radius: 6px;
font-weight: 600;
font-size: 17px;
letter-spacing: 0.3px;
box-shadow: 0 2px 8px rgba(212, 50, 37, 0.2);
transition: all 0.2s ease;

&:hover {
  background-color: #B82919;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(212, 50, 37, 0.3);
}
```

**Secondary CTA (Sidebar/Text Links)**
```css
background: none;
color: #222;
padding: 8px 0;
border: none;
font-weight: 600;
font-size: 13px;
font-family: "Noto Sans", sans-serif;
letter-spacing: 1px;
text-transform: uppercase;
transition: color 0.2s;

&::after {
  content: " →";
  margin-left: 4px;
}

&.red:hover {
  color: #D43225;
}
```

**Filter Buttons**
```css
padding: 8px 16px;
font-size: 13px;
font-weight: 600;
letter-spacing: 1px;
text-transform: uppercase;
border-radius: 4px;
cursor: pointer;
transition: all 0.2s;

/* Inactive State */
border: 2px solid #e0e0e0;
background: white;
color: #666;

/* Active State */
border: 2px solid #D43225;
background: #D43225;
color: white;

/* Hover State (Inactive) */
&:hover {
  border-color: #D43225;
  color: #D43225;
}
```

### Cards (Bento Boxes)

**Standard Service Card**
```css
background-color: #fff;
padding: 32px;
border-radius: 12px;
margin-bottom: 24px;
cursor: pointer;
transition: transform 0.3s ease;

&:hover {
  transform: scale(1.02);
  /* OR */
  transform: translateY(-2px);
}

/* Divider within card */
.divider-line {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  transition: border-color 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Hover effect on divider */
&:hover .divider-line {
  border-top-color: #D43225;
}

/* Hover effect on delivery date */
&:hover .delivery-date {
  color: #D43225;
}
```

**Left Accent Bar (Problem Statement)**
```css
position: relative;
font-size: 17px;
margin-bottom: 16px;

&::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: #D43225;
}
```

**Category Badge**
```css
font-size: 13px;
font-weight: 600;
letter-spacing: 1px;
padding: 4px 8px;
background: #f5f5f5;
color: #666;
border-radius: 4px;
text-transform: uppercase;
```

### Forms & Inputs

**Text Input**
```css
border: 1px solid #ddd;
border-radius: 24px; /* Chat input */
/* OR */
border-radius: 4px; /* Standard forms */
padding: 12px 20px;
font-size: 17px;
outline: none;
transition: all 0.2s;
background: #fafafa;

&:focus {
  border-color: #999;
  background: white;
}

&:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Modals

**Modal Overlay**
```css
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.7);
display: flex;
align-items: center;
justify-content: center;
z-index: 1000;
animation: fadeIn 0.2s ease;
padding: 20px;
```

**Modal Content**
```css
background: white;
border-radius: 8px;
padding: 40px;
max-width: 700px;
width: 100%;
max-height: 90vh;
overflow-y: auto;
position: relative;
animation: slideUp 0.3s ease;
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

/* Mobile: Full screen */
@media (max-width: 768px) {
  padding: 24px 20px;
  max-height: 100vh;
  min-height: 100vh;
  border-radius: 0;
  overflow-y: auto;
}
```

### Sidebar

**Desktop Sidebar**
```css
width: 240px;
background: #fff;
border-right: 1px solid #e0e0e0;
padding: 48px 24px 24px 48px;
position: fixed;
height: 100vh;
overflow-y: auto;
display: flex;
flex-direction: column;
z-index: 40;
```

**Mobile Sidebar (Drawer)**
```css
@media (max-width: 1024px) {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  height: 100vh;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 999;
  padding: 80px 24px 24px 24px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);

  &.mobile-open {
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  width: 100%;
  max-width: 320px;
}
```

**Mobile Header**
```css
display: none; /* Desktop */

@media (max-width: 1024px) {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  gap: 12px;
}
```

**Hamburger Button**
```css
width: 28px;
height: 28px;
background: transparent;
border: none;
cursor: pointer;
padding: 0;

span {
  width: 28px;
  height: 2px;
  background: #222;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
  display: block;
}
```

### Athena Chat

**Chat Container**
```css
margin-top: 24px;
border-radius: 16px;
overflow: hidden;
max-width: 700px;
width: 100%;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
background: #fff;
border: 1px solid #ddd;
```

**Chat Header**
```css
background: #222;
padding: 16px 20px;
color: white;
display: flex;
justify-content: space-between;
align-items: center;
```

**Avatar**
```css
width: 40px;
height: 40px;
border-radius: 50%;
overflow: hidden;
flex-shrink: 0;
border: 2px solid rgba(255, 255, 255, 0.15);

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

**Messages Container**
```css
background: #fafafa;
padding: 20px;
min-height: 350px;
max-height: min(500px, 60vh);
overflow-y: auto;
display: flex;
flex-direction: column;
gap: 16px;
```

**Message Bubble**
```css
padding: 12px 16px;
border-radius: 16px;
max-width: 80%;
animation: messageSlideIn 0.3s ease;

/* User Bubble */
&.user-bubble {
  background: #222;
  color: white;
  border-bottom-right-radius: 4px;
  margin-left: auto;
}

/* Assistant Bubble */
&.assistant-bubble {
  background: white;
  color: #222;
  border: 1px solid #ddd;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
```

**Message Text**
```css
margin: 0;
font-size: 17px;
line-height: 1.6;
white-space: pre-wrap;
word-wrap: break-word;
```

**Input Area**
```css
background: white;
border-top: 1px solid #ddd;
padding: 16px;
display: flex;
gap: 12px;
align-items: center;
```

**Send Button**
```css
width: 44px;
height: 44px;
border-radius: 50%;
background: #222;
border: none;
color: white;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
transition: all 0.2s;
flex-shrink: 0;

&:hover:not(:disabled) {
  transform: scale(1.05);
  background: #000;
}

&:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
```

**Typing Indicator**
```css
display: flex;
gap: 4px;
padding: 4px 0;

span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #999;
  animation: typingBounce 1.4s infinite;
}

span:nth-child(2) {
  animation-delay: 0.2s;
}

span:nth-child(3) {
  animation-delay: 0.4s;
}
```

### Dividers & Separators

**Standard Horizontal Rule**
```css
border: none;
border-top: 1px solid #e0e0e0;
margin: 32px 0;
```

**Thick Divider (Section Break)**
```css
margin: 48px 0;
border-top: 1px solid #ccc;
border-bottom: 1px solid #ccc;
height: 3px;
```

**Header Underline (Emphasis)**
```css
/* Applied to span within h2 */
border-bottom: 4px solid #D43225;
```

---

## Animations & Transitions

### Standard Transitions

**Default Transition**
```css
transition: all 0.2s;
/* OR */
transition: all 0.2s ease;
```

**Transform Transitions**
```css
transition: transform 0.3s ease;
```

**Specific Property Transitions**
```css
transition: color 0.2s;
transition: opacity 0.2s;
transition: border-color 0.3s ease;
transition: background-color 0.2s;
```

### Keyframe Animations

**Fade In**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.section {
  animation: fadeIn 0.3s ease;
}
```

**Slide Up (Modals)**
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-content {
  animation: slideUp 0.3s ease;
}
```

**Message Slide In**
```css
@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-bubble {
  animation: messageSlideIn 0.3s ease;
}
```

**Typing Bounce**
```css
@keyframes typingBounce {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-8px);
  }
}

.typing-indicator span {
  animation: typingBounce 1.4s infinite;
}
```

### Hover Effects

**Card Hover (Scale)**
```css
&:hover {
  transform: scale(1.02);
}
```

**Card Hover (Translate)**
```css
&:hover {
  transform: translateY(-2px);
}
```

**Button Hover (Lift + Shadow)**
```css
&:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(212, 50, 37, 0.3);
}
```

**Link Hover (Opacity)**
```css
transition: opacity 0.2s;

&:hover {
  opacity: 0.6; /* Navigation */
  /* OR */
  opacity: 0.7; /* Text links */
  /* OR */
  opacity: 0.85; /* Buttons */
}
```

**Underline on Hover**
```css
text-decoration: none;
transition: text-decoration 0.2s;

&:hover {
  text-decoration: underline;
}
```

### GPU Acceleration

```css
/* Applied to animated elements for performance */
[class*="transition"],
[class*="animate"],
[class*="duration"] {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
```

---

## Interactive States

### Navigation

**Default State**
```css
color: #222;
opacity: 1;
```

**Active State**
```css
color: #D43225;
```

**Hover State**
```css
opacity: 0.6;
```

### Buttons

**Primary Button States**
- Default: `background: #D43225`
- Hover: `background: #b8281e` or `#B82919`
- Active/Pressed: Same as hover
- Disabled: `opacity: 0.4`, `cursor: not-allowed`

**Filter Button States**
- Inactive: `border: 2px solid #e0e0e0`, `background: white`, `color: #666`
- Inactive Hover: `border-color: #D43225`, `color: #D43225`
- Active: `border: 2px solid #D43225`, `background: #D43225`, `color: white`

### Form Inputs

**Default State**
```css
border: 1px solid #ddd;
background: #fafafa;
```

**Focus State**
```css
border-color: #999;
background: white;
```

**Disabled State**
```css
opacity: 0.5;
cursor: not-allowed;
```

### Cards

**Default State**
```css
transform: none;
border-top: 1px solid #e0e0e0;
```

**Hover State**
```css
transform: scale(1.02); /* OR translateY(-2px) */
.divider-line {
  border-top-color: #D43225;
}
.delivery-date {
  color: #D43225;
}
```

---

## Special Elements

### Section Labels

```css
font-size: 13px;
font-weight: 600;
letter-spacing: 1px;
margin-top: -28px;
margin-bottom: 32px;
text-transform: uppercase;

/* Color variations */
&.how-we-work { color: #EA9336; }
&.services { color: #10B981; }
&.products { color: #6C5CE7; }
```

### Delivery Date

```css
font-weight: bold;
transition: color 0.2s ease;
cursor: help;

/* Hover state via parent card */
color: #D43225;
```

### Athena Status Indicator

```css
position: absolute;
bottom: 0;
right: 0;
display: block;
height: 10px;
width: 10px;
border-radius: 50%;
background-color: #10b981; /* Green = online */
border: 2px solid white;
```

### Testimonial Stars

```css
display: flex;
align-items: center;
justify-content: center;
gap: 4px;
font-size: 20px;
color: #FFB800;
```

---

## Responsive Breakpoints

### Breakpoint System

**Large Desktop**: `> 1024px`
- Full sidebar visible
- Sidebar width: 240px
- Main padding: 48px
- Font sizes: Full scale

**Tablet**: `<= 1024px`
- Sidebar becomes drawer
- Mobile header appears
- Sidebar width: 0px (collapsed)
- Main margin-left: 0
- Main padding: 24px 20px

**Mobile**: `<= 768px`
- Sidebar drawer max-width: 320px
- Main padding: 32px 20px
- Font size: 17px (body - consistent)
- h2: 56px (consistent)
- h3: 28px (consistent)
- Reduced spacing overall

**Small Mobile**: `<= 480px`
- Main padding: 16px 12px
- h2: 56px (consistent)
- h3: 28px (consistent)
- Minimum comfortable sizes

### Mobile-Specific Behaviors

**Prevent iOS Zoom on Input Focus**
```css
@media (max-width: 768px) {
  input[type="text"],
  input[type="email"],
  textarea {
    font-size: 17px; /* Consistent with body text */
  }
}
```

**Modal Full Screen on Mobile**
```css
@media (max-width: 768px) {
  .modal-content {
    padding: 24px 20px;
    max-height: 100vh;
    min-height: 100vh;
    border-radius: 0;
  }
}
```

**Chat Full Screen on Mobile**
```css
@media (max-width: 768px) {
  .athena-modal-active {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    border-radius: 0;
    z-index: 9999;
  }
}
```

---

## Performance Optimizations

### Image Rendering

```css
img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}
```

### Smooth Scrolling (Mobile)

```css
.mobile-chat-scroll {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}
```

### Safe Area Handling (iOS)

```css
@supports (padding: env(safe-area-inset-bottom)) {
  .mobile-chat-safe-bottom {
    padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
  }
}
```

### Dynamic Viewport Height

```css
@supports (height: 100dvh) {
  .mobile-chat-viewport {
    height: 100dvh;
  }
}
```

---

## Design Patterns

### Terminology: Accent Styles

**IMPORTANT:** When referring to "accent" or "red accent" without further specification, this **always means the left accent bar** (3px vertical red bar). There are three distinct red accent patterns:

1. **"Accent" / "Red accent" / "Left accent bar" / "Accent bar" (default)** = 3px vertical red bar positioned to the left
2. **"Red underline" / "Underline"** = 4px border-bottom on text (used in headings)
3. **"Red text" / "Colored text"** = Colored text (`color: #D43225`) used in large headers

**Default behavior:** When someone requests to "add an accent" or "add a red accent" or "accent this text", use the left accent bar pattern unless they explicitly specify underline or colored text.

### Left Accent Bar Pattern

Used throughout for emphasis:
```css
position: relative;

&::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: #D43225;
}
```

**Contexts:**
- Problem statements in bento boxes
- Emphasized quotes/callouts
- Strategic statements

### Underline Emphasis Pattern

```css
/* Applied to span within heading */
border-bottom: 4px solid #D43225;
```

**Used for:**
- Key words in headers ("DO", "PRODUCT", "CONSULTING")
- Drawing attention to critical terms

### Bento Box Pattern

**Structure:**
1. Problem statement (with left accent bar)
2. Service title (uppercase, bold) + category badge
3. Description (dynamic or static)
4. Delivery timeline (italic, smaller)
5. Divider line
6. Pricing + CTAs (Share/Enquire)

**Interaction:**
- Hover: `transform: scale(1.02)`
- Divider color changes to red on hover
- Delivery date color changes to red on hover

### Filter Pattern

Horizontal row of pills:
- Gap: 8px
- Active state fully filled with red
- Inactive state outlined
- Hover preview of active state (red border + text)

---

## Content Constraints

### Max Widths

- **Paragraph blocks**: `700px`
- **Section containers**: `1200px`
- **Modal content**: `700px`
- **Chat container**: `700px`

**Purpose:** Optimal reading line length (50-75 characters)

### Word Wrapping

```css
word-wrap: break-word;
overflow-wrap: break-word;
```

Applied to:
- Headings (h2)
- Paragraphs (p)
- Dynamic content

---

## Accessibility

### Focus States

```css
outline: none; /* Only when custom focus provided */

/* Custom focus for inputs */
input:focus {
  border-color: #999;
  background: white;
}
```

### ARIA Labels

- Hamburger button: `aria-label="Toggle menu"`
- Interactive elements have proper `title` attributes
- Modal overlays: `aria-hidden="true"` on backdrop

### Color Contrast

All text meets WCAG AA standards:
- `#222` on `rgb(245, 245, 247)`: Pass
- `#444` on white: Pass
- White on `#D43225`: Pass
- `#666` on white: Pass (for non-critical text)

---

## Dynamic Content Styling

### Fade-In Pattern

```css
.dynamic-news-insight,
.dynamic-pattern-insight {
  transition: opacity 0.3s ease;
  opacity: 1; /* Fades in on load */
}
```

### Loading States

Placeholder or existing content shown while fetching:
- Never show skeleton screens
- Never show spinners for content
- Graceful degradation to fallback content

---

## Icon Usage

### Arrow Icons

**Right Arrow (→)**
- Used in CTAs: "Explore →", "Enquire →"
- Added via `::after` pseudo-element or direct text
- Indicates forward action

**Chevron Icons (SVG)**
- Used in Athena drawer (Open/Close toggle)
- Stroke width: 2.5
- Size: 14px × 14px

### Star Icons

**Rating Stars (⭐)**
- Color: `#FFB800`
- Used in testimonials
- 5-star display

---

## Z-Index Hierarchy

```
Base Layer: 1
Sidebar (Desktop): 40
Athena Chat Drawer: 30
Mobile Overlay: 998
Mobile Sidebar: 999
Mobile Header: 1000
Modals: 1000
Athena Chat Modal (Mobile): 9999
```

---

## Box Shadows

### Subtle Shadows (Cards)

```css
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
```

### Button Shadows

```css
/* Default */
box-shadow: 0 2px 8px rgba(212, 50, 37, 0.2);

/* Hover */
box-shadow: 0 4px 12px rgba(212, 50, 37, 0.3);
```

### Message Bubble Shadows

```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
```

### Modal Shadows

```css
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
```

### Mobile Sidebar Shadow

```css
box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
```

---

## Voice & Tone (Visual)

**Clean, Not Clinical**
- Generous whitespace without feeling empty
- Borders are subtle (#e0e0e0), never harsh
- One accent color dominates (red), others support

**Confident, Not Aggressive**
- Font weights are bold but not black
- Uppercase used sparingly for hierarchy
- Red is vibrant but not neon

**Professional, Not Corporate**
- Border radius softens edges (12px cards)
- Transitions feel responsive (0.2-0.3s)
- Typography scale is human, not systematic

**Direct, Not Blunt**
- Buttons say "Enquire →" not "Submit"
- Labels are plain English, not jargon
- Information hierarchy is clear, not dumbed down

---

## Implementation Notes

### CSS Architecture

**Global Styles** (`globals.css`)
- Base resets
- Typography definitions
- Layout primitives (.container, .main, .sidebar)
- Responsive breakpoints
- Animation keyframes
- Utility classes

**Component Styles** (Inline via React)
- Most component-specific styles are inline
- Allows dynamic values (e.g., delivery dates)
- Enables hover state management in JS
- Facilitates conditional styling

**Shared Classes** (Global CSS)
- `.section`, `.section.active`
- `.nav-item`
- `.cta-button` + variants
- `.bento-link`, `.service-bento`
- `.modal-overlay`, `.modal-content`
- `.athena-*` (Athena chat classes)

### Font Loading

```javascript
// In layout.tsx
import { Noto_Sans, Passion_One } from "next/font/google";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const passionOne = Passion_One({
  variable: "--font-passion",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});
```

### CSS Variables

```css
:root {
  --sidebar-width: 240px;
  --font-noto-sans: [font stack];
  --font-passion: [font stack];
}

@media (max-width: 1024px) {
  :root {
    --sidebar-width: 0px;
  }
}
```

---

## Common Mistakes to Avoid

❌ **Don't:**
- Use gradients or multiple colors in a single element
- Add shadows without functional purpose
- Exceed 700px width for body text
- Use animations longer than 0.5s
- Mix border-radius values arbitrarily
- Use colors outside the defined palette
- Add emoji or decorative icons without reason
- Create new spacing values outside the scale
- Use font weights other than 300, 400, 600, 700
- Apply borders darker than #ccc for standard dividers
- Create font sizes outside the approved 6-size scale

✅ **Do:**
- Keep whitespace generous
- Use red sparingly and intentionally
- Maintain consistent border-radius per component type
- Apply transitions to interactive elements
- Use the 3px left accent bar for emphasis
- Stick to the defined spacing scale
- Use uppercase only for labels and navigation
- Ensure all text is readable (proper contrast)
- Test responsive behavior at all breakpoints
- Prioritize performance (GPU acceleration, optimized images)
- Follow the Ive-approved typography scale rigorously

---

## Quick Reference

### Most Used Colors
- Red: `#D43225`
- Text: `#222`, `#444`, `#666`
- Border: `#e0e0e0`
- Background: `rgb(245, 245, 247)`

### The Ive-Approved Font Size Scale
- **9px** - Legal/copyright (9 instances)
- **13px** - Labels/captions/navigation (34 instances)
- **17px** - Body text - THE standard (258 instances)
- **28px** - Section headings (29 instances)
- **56px** - Page titles (19 instances)
- **clamp(44-100px)** - Threshold hero only (1 instance)

### Line Heights
- **0.9** - Display text (Passion One)
- **1.6** - Standard body text
- **1.8** - Spacious/philosophy text

### Most Used Spacing
- Card padding: 32px
- Section margin: 48px top, 32px between
- Paragraph margin-bottom: 16px
- Button padding: 14px 28px

### Most Used Border Radius
- Buttons: 4px
- Cards: 12px
- Chat: 16px

### Most Used Transitions
- `all 0.2s` (default)
- `transform 0.3s ease` (cards)

---

**This is the design system.**

Every component, every interaction, every pixel follows these principles. Restraint. Clarity. Precision. The brand doesn't shout. It speaks clearly and steps back.

**"When you have 21 font sizes, you have none."** - Jony Ive
