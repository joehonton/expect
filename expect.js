//=============================================================================
//
// File:         /joezone/expect.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-SA 4.0
// Initial date: Sep 13, 2015
// Contents:     Contract by design explicit type checking 
//
//=============================================================================

"use strict";

class Expect {
	
	constructor() {
	}
	
	write(msg) {
		if (process != undefined && process.stderr != undefined && process.stderr.write != undefined)
			process.stderr.write(msg);
		else if (console != undefined && console.log != undefined)
			console.log(msg);
	}
	
	//^ Check to make sure the given argument is of the expected type, and write an entry when it's not
	//> obj is the object to check
	//> expectedType is a string (or an array of strings) containing a prototype.name to validate against
	//> message to display if expectation not met
	//< true if the expectation was met, false if not
	//
	expect(obj, expectedType, message) {
		message = message || '';
	
		var validTypes;
		if (expectedType.constructor.name == 'String') {
			if (this.expectOne(obj, expectedType) == true)
				return true;
		}
		else if (expectedType.constructor.name == 'Array') {
			for (let type of expectedType) {
				if (this.expectOne(obj, type) == true)
					return true;
			}
		}
		else {
			this.write(`[*EXPECT*] Logic: 'type' should be a String or an Array of Strings`);
			return false;
		}
	
		var s = '';
		if (expectedType.constructor.name == 'String')
			s = 'Expected type ' + expectedType;
		else //if (expectedType.constructor.name == 'Array')
			s = "Expected one of these types '" + expectedType.join('|') + "'";
			
		if (obj === undefined)
			this.write(`[*EXPECT*]${this.getFunctionName(4)} ${s}, but got 'undefined' ${message}\n`);
		else if (obj === null)
			this.write(`[*EXPECT*]${this.getFunctionName(4)} ${s}, but got 'null' ${message}\n`);
		else
			this.write(`[*EXPECT*]${this.getFunctionName(4)} ${s}, but got '${obj.constructor.name}' ${message}\n`);
		return false;
	}
	
	//^ A private helper to perform one object/type evaluation
	//< true if obj is type; false if not
	expectOne(obj, type) {
		if (obj === undefined)
			return (type == 'undefined');
		else if (obj === null)
			return (type == 'null');
		else if (obj.constructor.name != type)
			return false;
		else
			return true;
	}
	
	//^ Take a snapshot of the stack and return the line number of the zero-indexed item in it
	getFunctionName(depth) {
		// create an Error object, but don't throw it
		var stackTraceLine = (new Error).stack.split("\n")[depth];
		
		// extract the function name from the backtrace (assuming the backtrace pattern adopted by "node")
		var regex1 = /at (.*) ?\(/g;
		var matches = regex1.exec(stackTraceLine);
		var desiredOutput = '';
		if (matches.length > 1)
			desiredOutput += matches[1].trim();
		desiredOutput = this.rightAlign(desiredOutput, 30);
		return `{${desiredOutput}}`;
	}
	
	//^ Right align the given string to fit within a fixed width character column
	rightAlign(s, width) {
		var columnLen = width;
		var stringLen = s.length;
		if (stringLen > columnLen)
			return s.substr(0,columnLen-3) + '...';
		else
			return Array(columnLen+1 - stringLen).join(' ') + s;
	}

}

module.exports = function(obj, expectedType, message) {
	var expect = new Expect();
	return expect.expect(obj, expectedType, message);
	}

