import Image from "next/image";
import { convertDuration, generateArtistListJSX } from "../lib/utils";

export default function SpotifyStatCard(props: { data: SpotifyApi.TrackObjectFull | SpotifyApi.ArtistObjectFull }) {
  const numberFormatter = new Intl.NumberFormat("en-US");
  
  if ('album' in props.data) {
    const spotifyArtistArray = props.data.artists;
    const artists = generateArtistListJSX(spotifyArtistArray);

    return (
        <div className={'bg-blackRaspberry-600 lg:space-y-2 p-4 rounded-md grid grid-cols-2 gap-2 lg:gap-0 lg:block lg:grid-cols-none min-w-0'}>
          <div className='relative'>
            <div className='absolute right-0 bottom-0 bg-white rounded-tl-lg px-1 py-0.5'>
              <p className='text-blackRaspberry-900'>{convertDuration(new Date(props.data.duration_ms))}</p>
            </div>
            <Image
              src={props.data.album.images[0].url}
              alt={`Album cover for ${props.data.album.name}`}
              width={640}
              height={640}
              className='aspect-square object-cover'
            ></Image>
          </div>
          <div className='max-w-full'>
            <p className='font-medium text-lg truncate'><a href={props.data.external_urls.spotify} target='_blank' rel='noreferrer' className='hover:text-green-light transition-colors'>{props.data.name}</a></p>
            <p className='text-white/80 text-sm truncate'>{artists}</p>
          </div>
        </div>
    )
  }
  else {
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