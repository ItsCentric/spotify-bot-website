import { randomBytes, createCipheriv } from 'crypto';
import { EncryptedContent } from '../types/types';

export default function encryption(data: string): EncryptedContent {
  try {
    const iv = randomBytes(12);
    const key = Buffer.from(process.env.ENCRYPT_KEY, 'hex');
    const cipher = createCipheriv('aes-256-ocb', key, iv, { authTagLength: 16 });
    const encryptedData = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    const authTag = cipher.getAuthTag();
  
    return { iv, encryptedData, authTag };
  } catch (error) {
    throw error;
  }
}
