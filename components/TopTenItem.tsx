import Image from 'next/image';
import generateArtistListJsx from '../lib/generateArtistListJsx';
import toPascalCase from '../lib/toPascalCase';
import convertDuration from '../lib/convertDuration';
import SpotifyLink from './SpotifyLink';

export default function TopTenItem(props: {
  item: SpotifyApi.TrackObjectFull | SpotifyApi.ArtistObjectFull;
}) {
  const item = props.item;
  let genres: string[];
  let artists: JSX.Element[];
  if ('followers' in item) genres = item.genres.map((genre: string) => toPascalCase(genre));
  if ('album' in item) artists = generateArtistListJsx(item.artists);
  const trackOrArtist = 'album' in item;
  const itemImage = trackOrArtist ? item.album.images[0].url : item.images[0].url;
  const itemAltText = trackOrArtist
    ? 'track cover for ' + item.name
    : 'artist image for ' + item.name;
  const itemSubText = trackOrArtist ? artists : `Top ${item.popularity}%`;
  const secondColumnText = trackOrArtist ? 'Appears on:' : 'Genres:';
  const secondColumnData = trackOrArtist ? (
    <SpotifyLink link={item.album.external_urls.spotify} bold='medium'>
      {item.album.name}
    </SpotifyLink>
  ) : (
    <div className='font-medium truncate'>{genres.join(', ')}</div>
  );
  const thirdColumnText = trackOrArtist
    ? convertDuration(new Date(item.duration_ms))
    : '10 Liked Songs';

  return (
    <div className='bg-blackRaspberry-200 grid grid-cols-3 gap-2 lg:gap-0 items-center p-1 pr-4'>
      <div className='flex'>
        <Image
          src={itemImage}
          alt={itemAltText}
          height={64}
          width={64}
          className='aspect-square object-cover mr-2'
        />
        <div className='max-w-full flex flex-col justify-center'>
          <div className='text-lg truncate'>
            <SpotifyLink link={item.external_urls.spotify} bold='medium'>
              {item.name}
            </SpotifyLink>
          </div>
          <div className='truncate'>{itemSubText}</div>
        </div>
      </div>
      <div className='text-center'>
        <p>{secondColumnText}</p>
        <div className='max-w-full truncate'>{secondColumnData}</div>
      </div>
      <div className='justify-self-end'>
        <p className='text-right'>{thirdColumnText}</p>
      </div>
    </div>
  );
}
