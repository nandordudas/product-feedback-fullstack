export const _patternParts = {
  /**
   * Matches the beginning of the string. This matches a position, not a character.
   */
  beginning: '^',
  /**
   * Positive lookahead - matches a group after the [a-z] without including it in the result.
   */
  containsLowercaseCharacter: '(?=.*[a-z])',
  /**
   * Positive lookahead - matches a group after the [A-Z] without including it in the result.
   */
  containsUppercaseCharacter: '(?=.*[A-Z])',
  /**
   * Positive lookahead - matches a group after the [0-9] without including it in the result.
   */
  containsDigit: '(?=.*[0-9])',
  /**
   * Positive lookahead - matches a group after the [^A-Za-z0-9_] without including it in the result.
   */
  containsSymbol: '(?=.*\W)',
  /**
   * Matches a character having a character code between [A-Za-z0-9_][^A-Za-z0-9_] characters inclusive and
   * matches the specified quantity of the previous token.
   */
  containsWordAndNonWordWithSpecificQuantity: '[\w\W]{8,32}',
  /**
   * Matches the end of the string. This matches a position, not a character.
   */
  end: '$',
}

export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)[\w\W]{8,32}$/
