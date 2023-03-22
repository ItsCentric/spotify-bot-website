import { useState, useContext } from "react";
import { SpotifyDataContext } from "../pages/profile";
import Dashboard from "./Dashboard";
import TopTen from "./TopTen";


export default function SpotifyStatsSection(props: { statType: number}) {
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('medium_term');
  const spotifyData = useContext(SpotifyDataContext);
  const topItems = spotifyData.topItems;
  let currentItems: { tracks: SpotifyApi.UsersTopTracksResponse, artists: SpotifyApi.UsersTopArtistsResponse };
  
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
      return (
        <Dashboard />
        )
    case 1:
      return (
        <TopTen type='tracks' items={currentItems} timeRangeState={{value: timeRange, changeValue: setTimeRange}} />
      );
    case 2:
      return (
        <TopTen type='artists' items={currentItems} timeRangeState={{value: timeRange, changeValue: setTimeRange}} />
      );
  }
}