import * as crypto from 'crypto';

function getRandomIv(): Buffer {
  return crypto.randomBytes(16);
}

function encryptString(key: Buffer, plaintext: string): Buffer {
  const iv = getRandomIv();
  const aes = crypto.createCipheriv('aes-256-cbc', key, iv);
  const buf1 = aes.update(plaintext, 'utf-8');
  const buf2 = aes.final();
  return Buffer.concat([iv, buf1, buf2], iv.length + buf1.length + buf2.length);
}

function decryptString(key: Buffer, ciphertext: Buffer): string {
  const iv = ciphertext.slice(0, 16);
  const data = ciphertext.slice(16);
  const aes = crypto.createDecipheriv('aes-256-cbc', key, iv);
  const buf1 = aes.update(data);
  const buf2 = aes.final();
  return Buffer.concat([buf1, buf2], buf1.length + buf2.length).toString('utf-8');
}

const key = crypto.randomBytes(32); // to jest dataKey.PlainText (KeySpec = AES_256), bezpośrednio w postaci binarnej
const ciphertext = encryptString(key, "dupa zbita");
console.log(ciphertext.length);
console.log(ciphertext.toString('base64'));
console.log(decryptString(key, ciphertext));

