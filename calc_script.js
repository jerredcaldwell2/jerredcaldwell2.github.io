function convertToMillimeters(value, unit) {
    var conversionFactors = {
        'mm': 1,
        'cm': 10,
        'm': 1000,
        'km': 1000000,
        'in': 25.4,
        'ft': 304.8,
        'yd': 914.4,
        'mi': 1609344
    };
    if (conversionFactors.hasOwnProperty(unit)) {
        return parseFloat((value * conversionFactors[unit]).toFixed(3));
    } else {
        console.log("Invalid unit.");
        return NaN;
    }
}

// Function to convert from millimeters to the desired output unit, including special formatting for feet
function convertFromMillimeters(value_mm, outputUnit) {
    const conversionFactors = {
        'mm': 1,
        'cm': 0.1,
        'm': 0.001,
        'km': 0.000001,
        'in': 0.0393701,
        'ft': 0.00328084,
        'yd': 0.00109361,
        'mi': 0.000000621371
    };

    if (conversionFactors.hasOwnProperty(outputUnit)) {
        const result_decimal = value_mm * conversionFactors[outputUnit];
        let formattedResult = result_decimal.toFixed(3);

        if (['mm', 'cm', 'm', 'km'].includes(outputUnit)) {
            return formattedResult;  // Metric units: simple decimal formatting
        } else if (outputUnit === 'in') {
            // Inches: always display both decimal and fraction
            return formatFraction(result_decimal, 32);
        } else if (outputUnit === 'ft') {
          // Feet: display full decimal and additional "or" format (feet and fractional inches)
          const feet = Math.floor(result_decimal);
          const inchesDecimal = (result_decimal - feet) * 12;
          const formattedInches = formatFraction(inchesDecimal, 32);
          return `${formattedResult} ft or ${feet}ft ${formattedInches}in`;
        } else {
            // Yards and miles: display only decimal, no fractions or conversions
            return formattedResult;
        }
    } else {
        console.log("Invalid unit.");
        return NaN;  // Invalid unit
    }
}

// Helper function to format fractions for inches
function formatFraction(result_decimal, base) {
    const wholeNumber = Math.floor(result_decimal);
    const fractionPart = result_decimal % 1;
    const formattedDecimal = result_decimal.toFixed(3);

    // If the decimal part is exactly 0.000, return only the whole number
    if (formattedDecimal.split('.')[1] === '000') {
        return `${wholeNumber}`;
    } else {
        let numerator = Math.round(fractionPart * base);
        const denominator = base;

        // Reduce fraction using the greatest common divisor
        const gcd = greatestCommonDivisor(numerator, denominator);
        numerator /= gcd;

        // Format output to include both decimal and fraction part, excluding the unit inside parentheses
        return `${formattedDecimal} (${numerator}/${denominator / gcd})`;
    }
}

// Function to calculate the greatest common divisor (Euclidean algorithm)
function greatestCommonDivisor(a, b) {
    while (b !== 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

// Function to convert a decimal value to the closest 1/32 fraction of an inch
function decimalToFraction(decimal) {
    var tolerance = 1 / 64; // Define the tolerance to find the closest fraction
    var numerator = 0;
    var denominator = 1;

    while (true) {
        var fraction = numerator / denominator;
        if (Math.abs(decimal - fraction) < tolerance) {
            return {
                numerator: numerator,
                denominator: denominator
            };
        } else if (fraction < decimal) {
            numerator++;
        } else {
            denominator++;
            numerator = Math.floor(decimal * denominator);
        }
    }
}

// Function to convert fractions to decimals
function fractionToDecimal(fraction) {
    if (fraction.includes(' ')) {
        var parts = fraction.split(' ');
        var wholeNumber = parseInt(parts[0]);
        var fractionPart = parts[1];
        if (fractionPart.includes('/')) {
            var fractionParts = fractionPart.split('/');
            var numerator = parseInt(fractionParts[0]);
            var denominator = parseInt(fractionParts[1]);
            if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
                return wholeNumber + numerator / denominator;
            }
        } else {
            return wholeNumber;
        }
    } else if (fraction.includes('/')) {
        var fractionParts = fraction.split('/');
        var numerator = parseInt(fractionParts[0]);
        var denominator = parseInt(fractionParts[1]);
        if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
            return numerator / denominator;
        }
    } else {
        return parseFloat(fraction) || 0;
    }
}

/*
// Main function to convert and calculate
function convertAndCalculate() {
    // Get input values and units
    var input1 = document.getElementById("input1").value.trim();
    var inputUnit1 = document.getElementById("inputUnit1").value;
    var input2 = document.getElementById("input2").value.trim();
    var inputUnit2 = document.getElementById("inputUnit2").value;
    var operation = document.getElementById("operation").value;
    var outputUnit = document.getElementById("outputUnit").value;

    // Convert inputs to millimeters with three decimal places
    var value1_mm = convertToMillimeters(fractionToDecimal(input1), inputUnit1);
    var value2_mm = convertToMillimeters(fractionToDecimal(input2), inputUnit2);

    // Perform operation if both inputs are provided
    var result_mm;
    if (!isNaN(value1_mm) && !isNaN(value2_mm)) {
        switch (operation) {
            case '+':
                result_mm = value1_mm + value2_mm;
                break;
            case '-':
                result_mm = value1_mm - value2_mm;
                break;
            case '*':
                result_mm = value1_mm * value2_mm;
                break;
            case '/':
                if (value2_mm === 0) {
                    console.log("Cannot divide by zero.");
                    return;
                }
                result_mm = value1_mm / value2_mm;
                break;
            default:
                console.log("Invalid operation");
                return;
        }
    } else {
        // If only one input is provided, set the result to the valid input converted to the desired output unit
        result_mm = !isNaN(value1_mm) ? value1_mm : value2_mm;
    }

    // Convert result to the desired output unit
    var result = convertFromMillimeters(result_mm, outputUnit);

    // Display result
    var historyList = document.getElementById("history");
    var historyItem = document.createElement("li");
    historyItem.textContent = input1 + " " + inputUnit1 + " " + operation + " " + input2 + " " + inputUnit2 + " = " + result + " " + outputUnit;
    historyList.appendChild(historyItem);
}
*/

// Main function to handle conversion and arithmetic operations
function convertAndCalculate() {
    // Retrieve and trim input values and units
    const input1 = document.getElementById("input1").value.trim();
    const inputUnit1 = document.getElementById("inputUnit1").value;
    const input2 = document.getElementById("input2").value.trim();
    const inputUnit2 = document.getElementById("inputUnit2").value;
    const operation = document.getElementById("operation").value;
    const outputUnit = document.getElementById("outputUnit").value;

    // Convert input values from their units to millimeters
    const value1_mm = convertToMillimeters(fractionToDecimal(input1), inputUnit1);
    const value2_mm = convertToMillimeters(fractionToDecimal(input2), inputUnit2);

    // Validate input and calculate based on operation
    let result_mm = calculateResult(value1_mm, value2_mm, operation);
    if (result_mm === null) {
        console.error("Invalid operation or division by zero.");
        return;  // Exit the function if the operation is invalid
    }

    // Convert the result from millimeters to the desired output unit
    const result = convertFromMillimeters(result_mm, outputUnit);

    // Display the formatted result
    displayResult(input1, inputUnit1, operation, input2, inputUnit2, result, outputUnit);
}

// Function to perform the arithmetic operation
function calculateResult(value1_mm, value2_mm, operation) {
    if (!isNaN(value1_mm) && !isNaN(value2_mm)) {
        switch (operation) {
            case '+':
                return value1_mm + value2_mm;
            case '-':
                return value1_mm - value2_mm;
            case '*':
                return value1_mm * value2_mm;
            case '/':
                return value2_mm !== 0 ? value1_mm / value2_mm : null;  // Avoid division by zero
            default:
                return null;  // Return null for invalid operations
        }
    }
    return !isNaN(value1_mm) ? value1_mm : value2_mm;  // Return the valid input if only one is provided
}

// Function to display the result in the history list
function displayResult(input1, inputUnit1, operation, input2, inputUnit2, result, outputUnit) {
    const historyList = document.getElementById("history");
    const historyItem = document.createElement("li");
    const formattedResult = outputUnit === 'ft' ? result : `${result} ${outputUnit}`;
    historyItem.textContent = `${input1} ${inputUnit1} ${operation} ${input2} ${inputUnit2} = ${formattedResult}`;
    historyList.appendChild(historyItem);
}
