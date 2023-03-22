import { toPascalCase } from "../lib/utils";
import TopTenItem from "./TopTenItem";

export default function TopTen(props: { type: 'tracks' | 'artists', items: { tracks: SpotifyApi.UsersTopTracksResponse, artists: SpotifyApi.UsersTopArtistsResponse }, timeRangeState: { value: 'short_term' | 'medium_term' | 'long_term', changeValue: (value: 'short_term' | 'medium_term' | 'long_term') => void } }) {
    const items = props.items[props.type].items;
    const timeRange = props.timeRangeState;
    const itemsJsx = items.map((item: SpotifyApi.TrackObjectFull | SpotifyApi.ArtistObjectFull) => {
        return (
            <TopTenItem item={item} key={item.id} />
        )
    });

    return (
        <div className='flex flex-col gap-3'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-bold text-white'>Top 10 {toPascalCase(props.type)}</h1>
                <div>
                    <ul className='divide-x-2 divide-white/80 text-white/75 text-sm'>
                        <button className={'pr-2 hover:text-white transition-colors ' + (timeRange.value === 'short_term' ? 'text-white' : '')} onClick={() => timeRange.changeValue('short_term')}>Last 4 Weeks</button>
                        <button className={'px-2 hover:text-white transition-colors ' + (timeRange.value === 'medium_term' ? 'text-white' : '')} onClick={() => timeRange.changeValue('medium_term')}>Last 6 Months</button>
                        <button className={'pl-2 hover:text-white transition-colors ' + (timeRange.value === 'long_term' ? 'text-white' : '')} onClick={() => timeRange.changeValue('long_term')}>All Time</button>
                    </ul>
                </div>
            </div>
            <div className='p-4 flex-1 rounded-lg bg-blackRaspberry-600 flex flex-col justify-between'>
                {itemsJsx.slice(0, 10)}
            </div>
        </div>
    )
}