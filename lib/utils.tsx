import * as crypto from "crypto";
import SpotifyLink from "../components/SpotifyLink";

const algorithm = 'aes-256-cbc';
const key = '7x!A%D*G-JaNdRgUkXp2s5v8y/B?E(H+';

export function encryption(data: any) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  
  return {
    iv: iv,
    content: encrypted
  };
}

export function decryption(data: any) {
  const algorithm = 'aes-256-cbc';
  const key = '7x!A%D*G-JaNdRgUkXp2s5v8y/B?E(H+';
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, data.iv.buffer);
    const decrypted = Buffer.concat([decipher.update(data.content.buffer, 'base64'), decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    throw error;
  }
}

export function convertDuration(time: Date): string {
  let seconds: number | string = time.getSeconds();
  let minutes: number | string = time.getMinutes();

  if (seconds > 10) {
    seconds = seconds.toString();
  }
  else {
    seconds = `0${seconds}`;
  }
  if (time.getMinutes() > 10) {
    return time.toLocaleTimeString(undefined, { minute: 'numeric', second: '2-digit' });
  }
  else {
    minutes = minutes.toString();

    minutes = minutes.split('0')[0];
    return `${minutes}:${seconds}`;
  }
}

export function generateArtistListJSX(artists: SpotifyApi.ArtistObjectSimplified[]) {
  return artists.map((artist, i) => {
    if (i !== artists.length - 1) {
      return (
        <>
          <SpotifyLink link={artist.external_urls.spotify}>{artist.name}</SpotifyLink>{', '}
        </>
      )
    }
    else {
      return (
        <>
          <SpotifyLink link={artist.external_urls.spotify}>{artist.name}</SpotifyLink>
        </>
      )
    }
  })
}

export function toPascalCase(string: string) {
  return string
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}