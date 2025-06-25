# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Additional text decoration styles
- Performance improvements for Khmer text rendering
- Enhanced font feature support

## [0.0.4] - 2025-06-25

### Added

- Custom text decoration thickness support via `decorationStyle.thickness`
- Custom text decoration spacing/offset support via `decorationStyle.spacing`
- Enhanced `textDecorator.js` module to handle custom decoration options
- Validation for decoration style parameters to prevent NaN errors
- Support for per-inline decoration customization

### Changed

- Updated `renderLine` function in `printer.js` to capture decoration style properties
- Modified `drawDecoration` function to use custom thickness and spacing values
- Improved decoration color handling with proper stroke color setting

### Fixed

- Fixed "decorationOptions is not defined" error in printer.js
- Fixed NaN error in decoration spacing calculations
- Resolved "text is not defined" syntax error
- Added proper fallback values for undefined decoration parameters

### Technical Details

- `decorationStyle: { thickness: number, spacing: number }` now supported
- Thickness controls line width (default calculated from font size)
- Spacing controls distance from text baseline (positive values move decoration away from text)
- Full backward compatibility maintained with existing decoration syntax

## [0.0.3] - 2025-06-20

### Added

- Khmer word break line support for proper text wrapping
- Enhanced line breaking algorithm for Khmer language text
- Support for Khmer script word boundaries and text flow
- Battambang font integration for Khmer text rendering

### Changed

- Updated text processing engine to handle Khmer script properly
- Improved word wrapping logic for non-Latin scripts
- Enhanced font handling for Khmer typography

### Fixed

- Resolved text overflow issues with Khmer text
- Fixed improper line breaks in the middle of Khmer words
- Corrected text spacing and alignment for Khmer content

### Technical Details

- Integrated Khmer-specific line breaking rules
- Added support for Khmer Unicode ranges (U+1780-U+17FF)
- Enhanced `@foliojs-fork/linebreak` dependency usage for Khmer script

## [0.0.2] - 2025-06-15

### Added

- Initial project setup and configuration
- Basic PDF generation functionality
- Core text rendering capabilities

### Changed

- Forked from original pdfmake project
- Updated package name to "pdfmake-kh"
- Modified build configuration for custom requirements

## [0.0.1] - 2025-06-10

### Added

- Initial release of pdfmake-kh
- Basic PDF document generation
- Text formatting and layout support
- Standard font integration
- Core printing functionality

### Technical Details

- Based on pdfmake with custom enhancements
- PDFKit engine integration
- Webpack build system setup
- Node.js >=18 compatibility
