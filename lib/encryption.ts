import { randomBytes, createCipheriv } from 'crypto';

export default function encryption(data: any) {
  const algorithm = 'aes-256-cbc';
  const key = '7x!A%D*G-JaNdRgUkXp2s5v8y/B?E(H+';
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

  return {
    iv: iv,
    content: encrypted,
  };
}
