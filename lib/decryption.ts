import { createDecipheriv } from 'crypto';

export default function decryption(encryptedData: string, iv: Buffer, authTag: Buffer) {
  try {
    const key = Buffer.from(process.env.ENCRYPT_KEY, 'hex');
    const decipher = createDecipheriv('aes-256-ocb', key, iv, { authTagLength: 16 });
    decipher.setAuthTag(authTag);
    const decryptedData = decipher.update(encryptedData, 'hex', 'utf8') + decipher.final('utf8');

    return decryptedData;
  } catch (error) {
    throw error;
  }
}
