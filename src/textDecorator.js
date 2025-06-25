"use strict";

var isArray = require("./helpers").isArray;
var isPattern = require("./helpers").isPattern;
var getPattern = require("./helpers").getPattern;

function groupDecorations(line) {
	var groups = [],
		currentGroup = null;
	for (var i = 0, l = line.inlines.length; i < l; i++) {
		var inline = line.inlines[i];
		var decoration = inline.decoration;
		if (!decoration) {
			currentGroup = null;
			continue;
		}
		if (!isArray(decoration)) {
			decoration = [decoration];
		}
		var color = inline.decorationColor || inline.color || "black";
		var style = inline.decorationStyle || "solid";
		for (var ii = 0, ll = decoration.length; ii < ll; ii++) {
			var decorationItem = decoration[ii];
			if (
				!currentGroup ||
				decorationItem !== currentGroup.decoration ||
				style !== currentGroup.decorationStyle ||
				color !== currentGroup.decorationColor
			) {
				currentGroup = {
					line: line,
					decoration: decorationItem,
					decorationColor: color,
					decorationStyle: style,
					inlines: [inline],
				};
				groups.push(currentGroup);
			} else {
				currentGroup.inlines.push(inline);
			}
		}
	}

	return groups;
}

function drawDecoration(group, x, y, pdfKitDoc, decorationOptions) {
    function maxInline() {
        var max = 0;
        for (var i = 0, l = group.inlines.length; i < l; i++) {
            var inline = group.inlines[i];
            max = inline.fontSize > max ? i : max;
        }
        return group.inlines[max];
    }
    function width() {
        var sum = 0;
        for (var i = 0, l = group.inlines.length; i < l; i++) {
            var justifyShift = group.inlines[i].justifyShift || 0;
            sum += group.inlines[i].width + justifyShift;
        }
        return sum;
    }
    var firstInline = group.inlines[0],
        biggerInline = maxInline(),
        totalWidth = width(),
        lineAscent = group.line.getAscenderHeight(),
        ascent = (biggerInline.font.ascender / 1000) * biggerInline.fontSize,
        height = biggerInline.height,
        descent = height - ascent;

    // Use custom thickness and spacing if available
    var customThickness = null;
    var customSpacing = null;

    if (decorationOptions && decorationOptions.customDecorations) {
        var firstInlineIndex = group.line.inlines.indexOf(group.inlines[0]);

        if (decorationOptions.thicknessMap) {
            customThickness = decorationOptions.thicknessMap[firstInlineIndex];
            // Validate thickness is a number
            if (isNaN(customThickness) || customThickness <= 0) {
                customThickness = null;
            }
        }

        if (decorationOptions.spacingMap) {
            customSpacing = decorationOptions.spacingMap[firstInlineIndex];
            // Validate spacing is a number
            if (isNaN(customSpacing)) {
                customSpacing = null;
            }
        }
    }

    var lw =
        customThickness ||
        0.5 + Math.floor(Math.max(biggerInline.fontSize - 8, 0) / 2) * 0.12;

    // Set the decoration color BEFORE drawing
    pdfKitDoc.strokeColor(group.decorationColor || 'black');

    switch (group.decoration) {
        case "underline":
            var defaultUnderlineOffset = descent * 0.25;
            var underlineOffset =
                (customSpacing !== null && customSpacing !== undefined)
                    ? customSpacing
                    : defaultUnderlineOffset;
            pdfKitDoc
                .lineWidth(lw)
                .moveTo(
                    x + firstInline.x,
                    Math.floor(y + lineAscent + underlineOffset) + 0.5
                )
                .lineTo(
                    x + firstInline.x + totalWidth,
                    Math.floor(y + lineAscent + underlineOffset) + 0.5
                )
                .stroke();
            break;

        case "lineThrough":
            var defaultStrikeOffset = ascent * 0.35;
            var strikeOffset =
                (customSpacing !== null && customSpacing !== undefined)
                    ? customSpacing
                    : defaultStrikeOffset;
            pdfKitDoc
                .lineWidth(lw)
                .moveTo(
                    x + firstInline.x,
                    Math.floor(y + lineAscent - strikeOffset) + 0.5
                )
                .lineTo(
                    x + firstInline.x + totalWidth,
                    Math.floor(y + lineAscent - strikeOffset) + 0.5
                )
                .stroke();
            break;

        case "overline":
            var defaultOverlineOffset = ascent;
            var overlineOffset =
                (customSpacing !== null && customSpacing !== undefined)
                    ? customSpacing
                    : defaultOverlineOffset;
            pdfKitDoc
                .lineWidth(lw)
                .moveTo(
                    x + firstInline.x,
                    Math.floor(y + lineAscent - overlineOffset) + 0.5
                )
                .lineTo(
                    x + firstInline.x + totalWidth,
                    Math.floor(y + lineAscent - overlineOffset) + 0.5
                )
                .stroke();
            break;
    }
}

function drawDecorations(line, x, y, pdfKitDoc, decorationOptions) {
	var groups = groupDecorations(line);
	for (var i = 0, l = groups.length; i < l; i++) {
		drawDecoration(groups[i], x, y, pdfKitDoc, decorationOptions);
	}
}

function drawBackground(line, x, y, patterns, pdfKitDoc) {
	var height = line.getHeight();
	for (var i = 0, l = line.inlines.length; i < l; i++) {
		var inline = line.inlines[i];
		if (!inline.background) {
			continue;
		}
		var color = inline.background;
		if (isPattern(inline.background)) {
			color = getPattern(inline.background, patterns);
		}
		var justifyShift = inline.justifyShift || 0;
		pdfKitDoc
			.fillColor(color)
			.rect(x + inline.x - justifyShift, y, inline.width + justifyShift, height)
			.fill();
	}
}

module.exports = {
	drawBackground: drawBackground,
	drawDecorations: drawDecorations,
};
