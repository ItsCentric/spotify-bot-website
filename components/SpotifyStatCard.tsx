import format from "date-fns/format";
import Image from "next/image";

function convertDuration(time: Date): string {
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

export default function SpotifyStatCard(props: { type: 'track' | 'artist', data: any }) {
  const numberFormatter = new Intl.NumberFormat("en-US");

  if (props.type == 'track') {
    const spotifyArtistArray = props.data.artists;
    let artists = [];
    spotifyArtistArray.forEach((artist, i: number) => {
      //* formatting the list of artists
      if (i !== spotifyArtistArray.length - 1) artists.push(<span><a href={artist.external_urls.spotify} key={props.data.id} target='_blank' rel='noreferrer' className='hover:text-green-dark transition-colors'>{` ${artist.name}`}</a>,</span>);
      else artists.push(<a href={artist.external_urls.spotify} key={props.data.id} className='hover:text-green-dark transition-colors' target='_blank' rel='noreferrer'>{` ${artist.name}`}</a>);
    });

    return (
        <div className='bg-white flex flex-col gap-2 p-4 rounded-md flex-1 min-w-0'>
          <div>
            <Image
              src={props.data.album.images[0].url}
              alt={`Album cover for ${props.data.album.name}`}
              width={640}
              height={640}
              className='aspect-square object-cover'
            ></Image>
          </div>
          <div>
            <p className='text-blackRaspberry font-medium text-2xl truncate'><a href={props.data.external_urls.spotify} target='_blank' rel='noreferrer' className='hover:text-green-dark transition-colors'>{props.data.name}</a></p>
            <p className='text-blackRaspberry/75 font-medium text-lg truncate'>{artists}</p>
          </div>
          <div className='divide-y-2 border-y-2'>
            <p className='text-blackRaspberry text-lg'><span className='font-medium'>Released:</span> {format(new Date(props.data.album.release_date), 'MM/dd/yyyy')}</p>
            <p className='text-blackRaspberry text-lg'><span className='font-medium'>Duration:</span> {convertDuration(new Date(props.data.duration_ms))}</p>
          </div>
        </div>
    )
  }
  else if (props.type == 'artist') {
    let genres = [];
    props.data.genres.forEach(genre => {
      genres.push(' ' + genre)
    });
    return (
        <div className='bg-white flex flex-col gap-2 p-4 rounded-md flex-1 min-w-0'>
          <div>
            <Image
              src={props.data.images[0].url}
              alt={`Picture of ${props.data.name}`}
              height={640}
              width={640}
              className='aspect-square object-cover'
            ></Image>
          </div>
          <div>
            <p className='text-blackRaspberry font-medium text-2xl truncate'><a href={props.data.external_urls.spotify} className='hover:text-green-dark transition-colors' target='_blank' rel='noreferrer'>{props.data.name}</a></p>
            <p className='text-blackRaspberry/75 font-medium text-lg capitalize truncate'>{genres.toString()}</p>
          </div>
          <div className='divide-y-2 border-y-2'>
            <p className='text-blackRaspberry text-lg'><span className='font-medium'>Followers:</span> {numberFormatter.format(props.data.followers.total)}</p>
            <p className='text-blackRaspberry text-lg'><span className='font-medium'>Popularity:</span> {props.data.popularity}</p>
          </div>
        </div>
    )
  }
}