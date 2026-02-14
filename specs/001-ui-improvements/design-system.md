# Design System: Frontend UI Improvements

**Feature**: 001-ui-improvements | **Date**: 2026-02-13
**Purpose**: Define design tokens, component patterns, and styling guidelines for consistent UI implementation

## Overview

This design system provides the foundation for all styling improvements in the Todo application. It defines reusable design tokens, component patterns, and guidelines that ensure visual consistency, accessibility, and maintainability across all pages and components.

## Design Tokens

### Spacing Scale

Based on 4px base unit for consistent spacing throughout the application:

```javascript
// Tailwind spacing (already available)
spacing: {
  0: '0px',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
}
```

**Usage Guidelines**:
- Component padding: `p-4` to `p-6` (16-24px)
- Section spacing: `space-y-6` to `space-y-8` (24-32px)
- Page margins: `px-4` on mobile, `px-6` to `px-8` on desktop
- Card gaps: `gap-4` (16px)

### Typography Scale

```javascript
// Font sizes
fontSize: {
  xs: '0.75rem',    // 12px - Small labels, captions
  sm: '0.875rem',   // 14px - Secondary text, helper text
  base: '1rem',     // 16px - Body text, form inputs
  lg: '1.125rem',   // 18px - Large body text, subheadings
  xl: '1.25rem',    // 20px - Section headings
  '2xl': '1.5rem',  // 24px - Page headings
  '3xl': '1.875rem', // 30px - Hero headings
  '4xl': '2.25rem',  // 36px - Large hero headings
}

// Font weights
fontWeight: {
  normal: '400',    // Body text
  medium: '500',    // Emphasized text
  semibold: '600',  // Subheadings, buttons
  bold: '700',      // Headings
}

// Line heights
lineHeight: {
  tight: '1.25',    // Headings
  normal: '1.5',    // Body text
  relaxed: '1.75',  // Comfortable reading
}
```

**Typography Hierarchy**:
- **H1 (Page Title)**: `text-3xl font-bold text-gray-900`
- **H2 (Section Heading)**: `text-2xl font-bold text-gray-900`
- **H3 (Subsection)**: `text-xl font-semibold text-gray-900`
- **Body Text**: `text-base font-normal text-gray-700`
- **Secondary Text**: `text-sm text-gray-600`
- **Label**: `text-sm font-medium text-gray-700`
- **Caption**: `text-xs text-gray-500`

### Color Palette

**Primary Colors** (Blue):
```javascript
primary: {
  50: '#eff6ff',   // Very light backgrounds
  100: '#dbeafe',  // Light backgrounds, hover states
  200: '#bfdbfe',  // Subtle accents
  300: '#93c5fd',  // Borders, dividers
  400: '#60a5fa',  // Secondary buttons
  500: '#3b82f6',  // Links, icons
  600: '#2563eb',  // Primary buttons, main brand
  700: '#1d4ed8',  // Hover states for primary
  800: '#1e40af',  // Active states
  900: '#1e3a8a',  // Dark accents
}
```

**Neutral Colors** (Gray):
```javascript
gray: {
  50: '#f9fafb',   // Page backgrounds
  100: '#f3f4f6',  // Card backgrounds
  200: '#e5e7eb',  // Borders, dividers
  300: '#d1d5db',  // Disabled states
  400: '#9ca3af',  // Placeholder text
  500: '#6b7280',  // Secondary text
  600: '#4b5563',  // Body text
  700: '#374151',  // Emphasized text
  800: '#1f2937',  // Headings
  900: '#111827',  // High contrast text
}
```

**Semantic Colors**:
```javascript
success: {
  50: '#f0fdf4',
  500: '#22c55e',  // Success messages, completed states
  600: '#16a34a',  // Success buttons
  700: '#15803d',  // Success hover
}

danger: {
  50: '#fef2f2',
  500: '#ef4444',  // Error messages, delete actions
  600: '#dc2626',  // Danger buttons
  700: '#b91c1c',  // Danger hover
}

warning: {
  50: '#fffbeb',
  500: '#f59e0b',  // Warning messages
  600: '#d97706',  // Warning accents
}
```

**Contrast Requirements**:
- Normal text (< 18px): Minimum 4.5:1 contrast ratio
- Large text (≥ 18px or ≥ 14px bold): Minimum 3:1 contrast ratio
- Interactive elements: Minimum 3:1 contrast ratio

### Border Radius

```javascript
borderRadius: {
  none: '0',
  sm: '0.125rem',   // 2px - Small elements
  DEFAULT: '0.25rem', // 4px - Inputs, small buttons
  md: '0.375rem',   // 6px - Buttons
  lg: '0.5rem',     // 8px - Cards, modals
  xl: '0.75rem',    // 12px - Large cards
  '2xl': '1rem',    // 16px - Hero sections
  full: '9999px',   // Circular elements
}
```

**Usage Guidelines**:
- Buttons: `rounded-md` (6px)
- Input fields: `rounded-md` (6px)
- Cards: `rounded-lg` to `rounded-xl` (8-12px)
- Modals: `rounded-2xl` (16px)
- Badges: `rounded-full`

### Shadow System

```javascript
boxShadow: {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',           // Subtle elevation
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1)',       // Default cards
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',         // Elevated cards
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',       // Modals, dropdowns
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',       // High elevation
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',  // Maximum elevation
}
```

**Elevation Levels**:
- Level 0 (Flat): No shadow - Page backgrounds
- Level 1 (Subtle): `shadow-sm` - Subtle cards
- Level 2 (Default): `shadow-md` - Standard cards
- Level 3 (Elevated): `shadow-lg` - Modals, popovers
- Level 4 (Floating): `shadow-xl` - Tooltips, notifications

### Responsive Breakpoints

```javascript
screens: {
  sm: '640px',   // Mobile landscape, small tablets
  md: '768px',   // Tablets
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Extra large desktop
}
```

**Responsive Strategy**:
- Mobile-first approach (base styles for mobile)
- Use `sm:`, `md:`, `lg:` prefixes for larger screens
- Test at: 320px, 375px, 768px, 1024px, 1920px

## Component Patterns

### Buttons

**Primary Button**:
```html
<button class="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none">
  Button Text
</button>
```

**Secondary Button**:
```html
<button class="inline-flex items-center justify-center rounded-md bg-gray-200 px-4 py-2 text-base font-semibold text-gray-900 shadow-sm transition-all duration-200 hover:bg-gray-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none">
  Button Text
</button>
```

**Danger Button**:
```html
<button class="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none">
  Delete
</button>
```

**Button Sizes**:
- Small: `h-9 px-3 text-sm`
- Medium (default): `h-11 px-4 text-base`
- Large: `h-12 px-6 text-lg`

### Form Inputs

**Text Input**:
```html
<div class="space-y-2">
  <label class="block text-sm font-medium text-gray-700">
    Label Text
  </label>
  <input
    type="text"
    class="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm transition-colors duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
    placeholder="Placeholder text"
  />
</div>
```

**Input with Error**:
```html
<div class="space-y-2">
  <label class="block text-sm font-medium text-gray-700">
    Label Text
  </label>
  <input
    type="text"
    class="block w-full rounded-md border border-red-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm transition-colors duration-200 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
  />
  <p class="text-sm text-red-600">Error message here</p>
</div>
```

### Cards

**Standard Card**:
```html
<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
  <!-- Card content -->
</div>
```

**Interactive Card** (clickable):
```html
<div class="group rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:border-primary-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
  <!-- Card content -->
</div>
```

### Modals

**Modal Overlay**:
```html
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
  <div class="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-100 animate-scale-in">
    <!-- Modal content -->
  </div>
</div>
```

### Loading States

**Spinner**:
```html
<svg class="h-5 w-5 animate-spin text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>
```

**Loading Button**:
```html
<button class="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-base font-semibold text-white" disabled>
  <svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <!-- spinner SVG -->
  </svg>
  Loading...
</button>
```

### Empty States

**Empty State Pattern**:
```html
<div class="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 px-8 py-16 text-center shadow-lg">
  <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-200">
    <!-- Icon SVG -->
  </div>
  <h3 class="mb-3 text-2xl font-bold text-gray-900">No items yet</h3>
  <p class="mb-8 text-lg text-gray-600 max-w-md mx-auto">Get started by creating your first item</p>
  <button class="inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-lg">
    Create Item
  </button>
</div>
```

## Accessibility Guidelines

### Focus States

All interactive elements MUST have visible focus indicators:
- Use `focus:outline-none focus:ring-2 focus:ring-{color}-500 focus:ring-offset-2`
- Focus ring should be 2px wide with 2px offset
- Focus ring color should match the element's primary color

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Tab order should follow visual order
- Use semantic HTML elements (button, a, input)
- Provide skip links for main content

### Color Contrast

**Text Contrast**:
- Body text on white: `text-gray-700` or darker (meets 4.5:1)
- Headings on white: `text-gray-900` (meets 7:1)
- Secondary text: `text-gray-600` (meets 4.5:1)
- Disabled text: `text-gray-400` (informational only, not critical)

**Interactive Element Contrast**:
- Primary buttons: White text on `bg-primary-600` (meets 4.5:1)
- Links: `text-primary-600` on white (meets 4.5:1)
- Borders: `border-gray-300` minimum for visibility

### ARIA Attributes

- Use `aria-label` for icon-only buttons
- Use `aria-describedby` for form field errors
- Use `aria-live` for dynamic content updates
- Use `role="dialog"` and `aria-modal="true"` for modals

## Responsive Design Guidelines

### Mobile (< 640px)

- Single column layouts
- Full-width cards with `mx-4` margins
- Larger touch targets (minimum 44x44px)
- Simplified navigation
- Stack form fields vertically

### Tablet (640px - 1024px)

- Two-column layouts where appropriate
- Increased spacing: `px-6` to `px-8`
- Show more content per view
- Horizontal navigation options

### Desktop (> 1024px)

- Multi-column layouts
- Maximum content width: `max-w-7xl mx-auto`
- Hover states become more prominent
- Show all navigation options
- Larger spacing: `px-8` to `px-12`

## Tailwind Configuration Extensions

Add to `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
}
```

## Implementation Checklist

When implementing styling improvements:

- [ ] Use design tokens from this document
- [ ] Follow component patterns exactly
- [ ] Test all interactive states (hover, focus, active, disabled)
- [ ] Verify color contrast ratios
- [ ] Test responsive behavior at all breakpoints
- [ ] Validate keyboard navigation
- [ ] Check focus indicators are visible
- [ ] Ensure no inline styles are used
- [ ] Maintain consistent spacing throughout
- [ ] Test with screen readers if possible
