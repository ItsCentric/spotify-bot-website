import { createDecipheriv } from 'crypto';

export default function decryption(data: any) {
  const algorithm = 'aes-256-cbc';
  const key = '7x!A%D*G-JaNdRgUkXp2s5v8y/B?E(H+';
  try {
    const decipher = createDecipheriv(algorithm, key, data.iv.buffer);
    const decrypted = Buffer.concat([
      decipher.update(data.content.buffer, 'base64'),
      decipher.final(),
    ]);
    return decrypted.toString();
  } catch (error) {
    throw error;
  }
}
