class NumberUtils {
  getPower(decimalPlaces) {
    return 10 ** decimalPlaces;
  }
  
  roundToDecimalPlace(number, decimalPlaces = 2) {
	debugger;
    const round = this.getPower(decimalPlaces);
    return Math.round(number * round) / round;
  }
}

class StringUtils {
  capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  }
}

export { StringUtils, NumberUtils };