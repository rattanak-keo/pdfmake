# PDFMake with Khmer Language Support

A fork of [pdfmake](https://github.com/liborm85/pdfmake) with enhanced support for Khmer language text breaking, word wrapping, and advanced text decoration styling.

## Features

- All original pdfmake functionality
- Enhanced Khmer text breaking and word wrapping
- Proper handling of Khmer script line breaks
- Improved text rendering for Khmer documents
- **Custom text decoration styling** (thickness, spacing, color)
- Advanced underline, strikethrough, and overline customization

## Installation

```bash
npm install pdfmake-kh
```

## Usage

### Basic Khmer Text

```javascript
const pdfMake = require("pdfmake-kh");

const docDefinition = {
	content: [
		{
			text: "ភាសាខ្មែរគឺជាភាសាផ្លូវការរបស់ព្រះរាជាណាចក្រកម្ពុជា",
			style: "khmerText",
		},
	],
};

pdfMake.createPdf(docDefinition).download();
```

### Custom Text Decorations

```javascript
const docDefinition = {
	content: [
		{
			text: "Custom styled text with decorations",
			decoration: "underline",
			decorationColor: "#ff0000",
			decorationStyle: {
				thickness: 3, // Line thickness
				spacing: 5, // Distance from text
			},
		},
		{
			text: [
				"Mix of ",
				{
					text: "thick underline",
					decoration: "underline",
					decorationStyle: { thickness: 4, spacing: 2 },
				},
				" and ",
				{
					text: "custom strikethrough",
					decoration: "lineThrough",
					decorationColor: "#0000ff",
					decorationStyle: { thickness: 2 },
				},
			],
		},
	],
};
```

## Text Decoration Options

| Property                    | Type   | Description                                   |
| --------------------------- | ------ | --------------------------------------------- |
| `decoration`                | string | `'underline'`, `'lineThrough'`, `'overline'`  |
| `decorationColor`           | string | Color of the decoration line (hex, rgb, etc.) |
| `decorationStyle.thickness` | number | Line thickness in points                      |
| `decorationStyle.spacing`   | number | Distance from text baseline                   |

## Khmer Text Breaking

This fork includes improved word breaking for Khmer text, ensuring proper line wrapping that respects Khmer language rules and maintains readability.

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history and release notes.

## Credits

- **Original Project**: [pdfmake by liborm85](https://github.com/liborm85/pdfmake)
- **Khmer Word Splitting Reference**: [split-khmer by seanghay](https://github.com/seanghay/split-khmer)

Special thanks to the original pdfmake team and the split-khmer project for providing the foundation and reference implementation for Khmer text processing.

## License

Same as original pdfmake - MIT License
