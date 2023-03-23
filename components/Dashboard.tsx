import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import DashboardSection from './DashboardSection';
import { useEffect, useState, useContext } from 'react';
import SpotifyStatCard from './SpotifyStatCard';
import { SessionContext, SpotifyDataContext } from '../pages/profile';

export default function Dashboard() {
  const [adjective, setAdjective] = useState<string>(null);
  const session = useContext(SessionContext);
  const spotifyData = useContext(SpotifyDataContext);
  const recentTracks = spotifyData.recentTracks.tracks;
  const tracksMood = spotifyData.recentTracks.tracksMood;

  ChartJS.register(ArcElement, Tooltip);
  useEffect(() => {
    if (!adjective) {
      switch (spotifyData.recentTracks.tracksMood.largest.name) {
        case 'danceability':
          setAdjective('danceable');
          break;
        case 'energy':
          setAdjective('energetic');
          break;
        case 'acousticness':
          setAdjective('acoustic');
          break;
        case 'valence':
          setAdjective('happy');
          break;
      }
    }
  });

  return (
    <div className='p-4 md:p-8'>
      <h1 className='text-4xl font-bold mb-4'>
        How have you been listening,{' '}
        <span className='text-green-light'>
          {session ? session.user.name : ''}
        </span>
        ?
      </h1>
      <div className='flex flex-col md:grid md:grid-cols-2 bg-blackRaspberry-600 rounded-lg gap-8 p-4'>
        <DashboardSection
          heading='Your Listening Overview'
          subheading={`${roundToPercent(
            tracksMood.largest.value / tracksMood.total
          )}% of your recent tracks were ${adjective}.`}>
          <Doughnut
            data={{
              labels: ['Danceability', 'Energy', 'Acousticness', 'Valence'],
              datasets: [
                {
                  label: 'Tracks',
                  data: spotifyData.recentTracks.tracksMood.array,
                  backgroundColor: [
                    'rgba(94, 96, 232, 0.8)',
                    'rgba(84, 232, 137, 0.8)',
                    'rgba(232, 123, 118, 0.8)',
                    'rgba(232, 202, 72, 0.8)',
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
            height={300}
            width={300}
          />
        </DashboardSection>
        <DashboardSection
          heading='Recent Tracks'
          subheading={"What's on the menu lately?"}>
          <div className='flex flex-col 2xl:flex-row gap-4 flex-1 max-w-full'>
            <SpotifyStatCard data={recentTracks[0].track} />
            <SpotifyStatCard data={recentTracks[1].track} />
            <SpotifyStatCard data={recentTracks[2].track} />
          </div>
        </DashboardSection>
      </div>
    </div>
  );
}

function roundToPercent(number: number) {
  const percent = number * 1000;
  const roundedPercent = Math.round(percent);
  const decimalPercent = roundedPercent / 10;

  return decimalPercent;
}
