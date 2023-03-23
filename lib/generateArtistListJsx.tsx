import SpotifyLink from '../components/SpotifyLink';

export default function generateArtistListJsx(artists: SpotifyApi.ArtistObjectSimplified[]) {
  return artists.map((artist, i) => {
    if (i !== artists.length - 1) {
      return (
        <>
          <SpotifyLink link={artist.external_urls.spotify}>{artist.name}</SpotifyLink>
          {', '}
        </>
      );
    } else {
      return (
        <>
          <SpotifyLink link={artist.external_urls.spotify}>{artist.name}</SpotifyLink>
        </>
      );
    }
  });
}
