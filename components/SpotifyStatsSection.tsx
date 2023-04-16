import { useState, useContext, useEffect } from 'react';
import { UserDataContext } from '../pages/profile';
import Dashboard from './Dashboard';
import TopTen from './TopTen';

export default function SpotifyStatsSection(props: { statType: number }) {
  const userData = useContext(UserDataContext);
  const spotifyData = userData.spotifyData;
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>(null);
  const topItems = spotifyData.topItems;
  let currentItems: {
    tracks: SpotifyApi.UsersTopTracksResponse;
    artists: SpotifyApi.UsersTopArtistsResponse;
  };

  useEffect(() => {
    const tracksOrArtist = props.statType === 1 ? 'topTracks' : 'topArtists';
    setTimeRange(userData.preferences.spotify.defaults.timeRange[tracksOrArtist]);
  }, [props.statType, userData.preferences.spotify.defaults.timeRange]);

  switch (timeRange) {
    case 'short_term':
      currentItems = topItems.shortTerm;
      break;
    case 'medium_term':
      currentItems = topItems.mediumTerm;
      break;
    case 'long_term':
      currentItems = topItems.longTerm;
      break;
  }

  switch (props.statType) {
    case 0:
      return <Dashboard />;
    case 1:
      return (
        <TopTen
          type='tracks'
          items={currentItems}
          timeRangeState={{ value: timeRange, changeValue: setTimeRange }}
        />
      );
    case 2:
      return (
        <TopTen
          type='artists'
          items={currentItems}
          timeRangeState={{ value: timeRange, changeValue: setTimeRange }}
        />
      );
  }
}
