# Expect
Contract by design explicit type checking.

## Scoped package
This is a scoped package. Be sure to use the @joezone prefix for both your package dependency and any require statements.

	"dependencies": {
	  "@joezone/expect": "^0.9.0"
	}
	 
	require('@joezone/expect') 

## expect()

The expect function returns true if the type of the first parameter is equal to the spelled-out type in the second parameter.
It logs a message to the console, and returns false, whenever an unexpected type is encountered.

Boolean expect(variable, {String|Array} expectedType, String message)  
@param variable is the object to test  
@param expectedType is the string value of the type as returned by the `variable.constructor.name` property. When an object can legitimately hold two or more types, expectedType should be an array of strings containing each of the possible legitimate types.  
@param message (optional) is a string to write with the console message if the variable is not of the expected type.  
@return true if the expected type was found, false if not.  
 
	var alpha = '';
	var num = 1;
	var obj = {};
	var arr = [];
	var date = new Date();
	var func = function (){};
	var regex = /test/i;
	var bool = true;
	var nullvar = null;
	var undef = undefined;
	
	class Complex {};
	class MoreComplex extends Complex {}; 
	var complex = new Complex();
	var moreComplex = new MoreComplex();
	var unassigned;
	
	expect(alpha, 'String');
	expect(num, 'Number');
	expect(obj, 'Object');	
	expect(arr, 'Array');
	expect(date, 'Date');	
	expect(func, 'Function');	
	expect(regex, 'RegExp');	
	expect(bool, 'Boolean');	
	expect(nullvar, 'null');	
	expect(undef, 'undefined');	
	expect(complex, 'Complex');	
	expect(moreComplex, 'MoreComplex');	
	expect(unassigned, ['undefined','Complex','MoreComplex']);
	
	
	
	