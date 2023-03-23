import { createDecipheriv } from 'crypto';

export default function decryption(data: any) {
  try {
    const decipher = createDecipheriv('aes-256-ocb', Buffer.from(process.env.ENCRYPT_KEY), data.iv.buffer);
    const decrypted = Buffer.concat([
      decipher.update(data.content.buffer, 'base64'),
      decipher.final(),
    ]);
    return decrypted.toString();
  } catch (error) {
    throw error;
  }
}
