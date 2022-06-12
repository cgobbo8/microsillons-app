

export const joinStyles = (...args) => args.filter(Boolean).join(' ');

export const isVowel = (char) => /[aeiouy]/i.test(char);

export const getFirstLetter = (word) => word.charAt(0);
