# PDFMake with Khmer Language Support

A fork of [pdfmake](https://github.com/liborm85/pdfmake) with enhanced support for Khmer language text breaking and word wrapping.

## Features

- All original pdfmake functionality
- Enhanced Khmer text breaking and word wrapping
- Proper handling of Khmer script line breaks
- Improved text rendering for Khmer documents

## Installation

```bash
npm install pdfmake-kh
```

## Usage

Same as original pdfmake, but with improved Khmer text handling:

```javascript
const pdfMake = require('pdfmake-kh');

const docDefinition = {
  content: [
    {
      text: 'ភាសាខ្មែរគឺជាភាសាផ្លូវការរបស់ព្រះរាជាណាចក្រកម្ពុជា',
      style: 'khmerText'
    }
  ]
};

pdfMake.createPdf(docDefinition).download();
```

## Khmer Text Breaking

This fork includes improved word breaking for Khmer text, ensuring proper line wrapping that respects Khmer language rules and maintains readability.

## Credits

- **Original Project**: [pdfmake by liborm85](https://github.com/liborm85/pdfmake)
- **Khmer Word Splitting Reference**: [split-khmer by seanghay](https://github.com/seanghay/split-khmer)

Special thanks to the original pdfmake team and the split-khmer project for providing the foundation and reference implementation for Khmer text processing.

## License

Same as original pdfmake -