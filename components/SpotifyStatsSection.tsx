import SpotifyStatCard from "./SpotifyStatCard";

export default function SpotifyStatsSection(props: { data: any, }) {
  return (
    <div className='px-8 flex flex-col gap-8 my-12 max-w-6xl mx-auto md:row-span-full col-start-2'>

      {/* TOP TRACKS */}
      <div>
        <h3 className='text-3xl inline-block text-white mb-3 font-bold'>Top 3 Tracks</h3>
        <p className="inline-block text-white/50 font-light ml-2">(Last 6 months)</p>
        <div className='flex flex-col md:flex-row md:justify-evenly gap-4'>
          <SpotifyStatCard type='track' data={props.data.topTracks.items[0]} />
          <SpotifyStatCard type='track' data={props.data.topTracks.items[1]} />
          <SpotifyStatCard type='track' data={props.data.topTracks.items[2]} />
        </div>
      </div>

      {/* TOP ARTISTS */}
      <div>
        <h2 className='inline-block text-3xl mb-3 text-white font-bold'>Top 3 Artists</h2>
        <p className="inline-block text-white/50 font-light ml-2">(Last 6 months)</p>
        <div className='flex flex-col md:flex-row md:justify-evenly gap-4'>
          <SpotifyStatCard type='artist' data={props.data.topArtists.items[0]} />
          <SpotifyStatCard type='artist' data={props.data.topArtists.items[1]} />
          <SpotifyStatCard type='artist' data={props.data.topArtists.items[2]} />
        </div>
      </div>
    </div>
  )
}