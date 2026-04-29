---
name: PROTOCOL_88_EVO
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353435'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c5c6ca'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8f9194'
  outline-variant: '#44474a'
  surface-tint: '#c6c6c9'
  primary: '#c6c6c9'
  on-primary: '#2f3133'
  primary-container: '#1a1c1e'
  on-primary-container: '#838486'
  inverse-primary: '#5d5e61'
  secondary: '#c3c7cc'
  on-secondary: '#2d3135'
  secondary-container: '#484c50'
  on-secondary-container: '#b9bcc1'
  tertiary: '#ffb2b7'
  on-tertiary: '#67001c'
  tertiary-container: '#41000e'
  on-tertiary-container: '#eb4762'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e5'
  primary-fixed-dim: '#c6c6c9'
  on-primary-fixed: '#1a1c1e'
  on-primary-fixed-variant: '#454749'
  secondary-fixed: '#e0e3e8'
  secondary-fixed-dim: '#c3c7cc'
  on-secondary-fixed: '#181c20'
  on-secondary-fixed-variant: '#43474b'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000e'
  on-tertiary-fixed-variant: '#91002b'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353435'
typography:
  header-primary:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  data-readout:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  micro-label:
    fontFamily: Space Grotesk
    fontSize: 9px
    fontWeight: '400'
    lineHeight: '1'
    letterSpacing: 0.15em
  code-snippet:
    fontFamily: Fira Code
    fontSize: 11px
    fontWeight: '400'
    lineHeight: '1.5'
  digital-display:
    fontFamily: monospace
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.2em
spacing:
  micro: 2px
  unit: 4px
  gutter: 12px
  container-padding: 16px
  edge-margin: 24px
---

## Brand & Style

This design system is a high-fidelity, hyper-technical HUD (Heads-Up Display) aesthetic designed for mission-critical data visualization and advanced operator interfaces. The brand personality is cold, precise, and authoritative, evoking the feeling of a high-end surveillance terminal or an orbital defense array. 

The design style is a hybrid of **Cyber-Technical Brutalism** and **Tactical Minimalism**. It prioritizes information density over white space, using a "more is more" approach to micro-metadata to create an atmosphere of total situational awareness. The emotional response is one of calculated control and high-stakes urgency, where every pixel serves as a telemetry point.

## Colors

The color strategy utilizes a deeply desaturated, low-contrast foundation to allow active data to punch through. 

- **Base Surfaces:** The primary (#1a1c1e) and secondary (#2d3135) hues are pale slates that provide a non-distracting background for long-duration monitoring.
- **Critical Accents:** A sharp raspberry-red (#e94560) is reserved strictly for active states, critical system failures, and micro-interactive elements.
- **Data Visualization:** We utilize a desaturated blue-grey for secondary telemetry and structural line-work, ensuring the UI feels expansive rather than claustrophobic.

## Typography

This design system employs a complex typographic hierarchy to differentiate between structural labels, live data, and system logic.

- **Structural Headers:** Use **Space Grotesk** for high-level navigation and panel titles. It must always be uppercase with wide tracking.
- **Active Telemetry:** **JetBrains Mono** handles all primary data values and table content, providing high legibility for alphanumeric strings.
- **System Logic:** **Fira Code** is used for decorative metadata strings, coordinate systems, and background "noise" text to reinforce the technical nature of the UI.
- **Digital Displays:** Large numeric readouts should use a custom-weighted monospaced style to mimic 7-segment hardware displays.

## Layout & Spacing

The layout follows a **Fixed-Modular Grid** system. The screen is divided into primary functional zones with high-density clusters. 

- **Density:** Padding is kept to an absolute minimum to maximize data-to-pixel ratio. Use 4px increments for all component-internal spacing.
- **Grid Overlays:** A subtle 32px global grid overlay should be visible in the background, with 1px scanlines appearing every 4th row.
- **Alignment:** All elements must align to the pixel grid. Use bracketed containers to group related micro-data modules, ensuring that no screen real estate is left "empty"—fill gaps with decorative coordinate strings or system status indicators.

## Elevation & Depth

Depth is conveyed through **Z-index layering and structural outlines** rather than shadows. 

- **Tonal Layering:** Different UI depths are achieved by shifting the background color slightly lighter or darker within the pale slate spectrum.
- **Line-work:** Use "Ghost Outlines"—1px borders with 20-40% opacity—to define containers.
- **Overlays:** Active modules should use a scanline texture or a faint "noise" grain to appear as if they are projected on top of the base interface. 
- **Backdrop Effects:** Use a subtle blur (4px) only for temporary system modals, ensuring that the underlying data remains partially visible.

## Shapes

The design system completely avoids standard rounded corners. The shape language is defined by **Angular Geometry**.

- **Chamfers & Notches:** Every major container must feature a 45-degree cut (chamfer) on at least one corner, typically the top-right or bottom-left.
- **Brackets:** Use L-shaped vector paths to "frame" data points.
- **Connector Lines:** Use 1px vertical and horizontal lines to visually link related modules, mimicking circuit board traces.
- **Clipping:** Buttons and input fields should utilize a notched-corner SVG mask rather than a standard CSS border-radius.

## Components

- **Buttons:** Non-rectilinear shapes. Use a "clipped corner" design with a secondary 1px offset border. The hover state should trigger a color flip to the raspberry-red accent and a "glitch" animation on the text label.
- **Data Chips:** Small, high-contrast badges containing monospaced text. Include a "prefix" icon (e.g., a small hex code or glyph) for every chip.
- **Inputs:** Simple underlined fields with bracketed edges. The active state should show a blinking vertical cursor and a "scanning" animation across the bottom border.
- **Cards/Panels:** These are the primary containers. They must include "Micro-Metadata" in the corners—tiny, non-functional coordinate strings (e.g., `LAT: 40.7128 / LON: 74.0060`) and version numbers (e.g., `VER_88.0.1`).
- **Icons:** Custom, high-density vector glyphs. Icons should look like technical schematics, incorporating circuit paths, crosshairs, and broken/glitched lines. 
- **Readout Strings:** Decorative strings of "junk data" should scroll slowly in the background of headers to maintain the feeling of a live, processing system.