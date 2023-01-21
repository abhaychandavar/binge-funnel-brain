import { createCipheriv, createDecipheriv, scryptSync } from 'crypto';
import CONFIG from '../config/config';
import helpers from '../utils/helpers';

const _algorithm = 'aes-192-cbc';
const _secret = scryptSync(CONFIG.AUTH.CIPHER_SECRET, 'GfG', 24);
const _iv = scryptSync(CONFIG.AUTH.CIPHER_SECRET, 'GfG', 16);
class CipherManager {
  encrypt(str: string) {
    const cipher = createCipheriv(_algorithm, _secret, _iv);
    let cryptedStr = cipher.update(str, 'utf8', 'hex');
    cryptedStr += cipher.final('hex');
    return cryptedStr;
  }

  decrypt(text: string) {
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = createDecipheriv(_algorithm, _secret, _iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  generateHashes(text: string) {
    const subStrings = helpers.generateStringCombinations(text);
    const encryptedSubStrings = subStrings.map((subStr: string) =>
      this.encrypt(subStr)
    );
    return encryptedSubStrings;
  }
}

const cipherManager = new CipherManager();
export default cipherManager;
