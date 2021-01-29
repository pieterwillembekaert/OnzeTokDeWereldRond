import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaesarCipherService {

  constructor() { }

  caesarCipher(string: string, shift: number): string {
    // Alphabet
    var alphabet = "";
    const alphabetLower = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Encoded Text
    let encodedText = '';

    // Adjust Shift (Over 26 Characters)
    if (shift > 26) {
      // Assign Remainder As Shift
      shift = shift % 26;
    }

    // Iterate Over Data
    let i = 0;
    var isUpperCase = false;

    while (i < string.length) {
      // Valid Alphabet Characters
      if (string[i].toUpperCase() === string[i]) {
        isUpperCase = true;
        alphabet = alphabetUpper;

      } else {
        isUpperCase = false
        alphabet = alphabetLower;

      }


      if (alphabet.indexOf(string[i]) !== -1 && isUpperCase) {
        // Find Alphabet Index
        const alphabetIndex = alphabet.indexOf((string[i]).toUpperCase());

        // Alphabet Index Is In Alphabet Range
        if (alphabet[alphabetIndex + shift]) {
          // Append To String
          encodedText += alphabet[alphabetIndex + shift];
        }
        // Alphabet Index Out Of Range (Adjust Alphabet By 26 Characters)
        else {
          // Append To String
          encodedText += alphabet[alphabetIndex + shift - 26];
        }
      } else if (alphabet.indexOf(string[i]) !== -1 && !isUpperCase) {
        const alphabetIndex = alphabet.indexOf((string[i]).toLowerCase());

        // Alphabet Index Is In Alphabet Range
        if (alphabet[alphabetIndex + shift]) {
          // Append To String
          encodedText += alphabet[alphabetIndex + shift];
        }
        // Alphabet Index Out Of Range (Adjust Alphabet By 26 Characters)
        else {
          // Append To String
          encodedText += alphabet[alphabetIndex + shift - 26];
        }

      }
      // Special Characters
      else {
        // Append To String
        encodedText += string[i];


      }

      // Increase I
      i++;
    }

    return encodedText;
  };



}
