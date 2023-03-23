import { randomBytes, createCipheriv } from 'crypto';

export default function encryption(data: any) {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-ocb', Buffer.from(process.env.ENCRYPT_KEY, 'base64'), iv);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

  return {
    iv: iv,
    content: encrypted,
  };
}
