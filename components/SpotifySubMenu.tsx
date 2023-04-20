import { Preferences } from '../models/User';
import FormInput from './FormInput';
import handleInputChange from '../lib/handleInputChange';
import { useCallback } from 'react';

export default function SpotifySubMenu(props: {
  progress: { value: Preferences; setValue: Function };
}) {
  const formProgress = props.progress.value.spotify;
  const handleInputChangeCallback = useCallback(handleInputChange, []);

  return (
    <form className='space-y-6'>
      <div>
        <h3 className='text-xl font-semibold mb-2'>Privacy</h3>
        <div className='space-y-2'>
          <FormInput
            id='spotify-privacy-privateProfile'
            label='Profile Privacy'
            type='checkbox'
            checked={formProgress.privacy.privateProfile}
            value={formProgress.privacy.privateProfile}
            onChange={(event) => handleInputChangeCallback(event, props.progress)}>
            If checked, your Spotify profile will be private. This means only those that you have
            whitelisted will be able to see your profile.
          </FormInput>
          <FormInput
            id='spotify-privacy-privateTopTracks'
            label='Top Tracks Privacy'
            type='checkbox'
            checked={formProgress.privacy.privateTopTracks}
            value={formProgress.privacy.privateTopTracks}
            onChange={(event) => handleInputChangeCallback(event, props.progress)}>
            If checked, your Spotify top tracks will be private. This means only those that you have
            whitelisted will be able to see your top tracks.
          </FormInput>
          <FormInput
            id='spotify-privacy-privateTopArtists'
            label='Top Artists Privacy'
            type='checkbox'
            checked={formProgress.privacy.privateTopArtists}
            value={formProgress.privacy.privateTopArtists}
            onChange={(event) => handleInputChangeCallback(event, props.progress)}>
            If checked, your Spotify top artists will be private. This means only those that you
            have whitelisted will be able to see your top artists.
          </FormInput>
          <FormInput
            id='spotify-privacy-privateNowPlaying'
            label='Current Track Privacy'
            type='checkbox'
            checked={formProgress.privacy.privateNowPlaying}
            value={formProgress.privacy.privateNowPlaying}
            onChange={(event) => handleInputChangeCallback(event, props.progress)}>
            If checked, your Spotify current track will be private. This means only those that you
            have whitelisted will be able to see your current track.
          </FormInput>
          <FormInput
            id='spotify-privacy-whitelist'
            label='Whitelist'
            type='textarea'
            disabled={true}
            stacked={true}>
            Will be implemented in the future.
          </FormInput>
          <FormInput
            id='spotify-privacy-blacklist'
            label='Blacklist'
            type='textarea'
            disabled={true}
            stacked={true}>
            Will be implemented in the future.
          </FormInput>
        </div>
      </div>
      <div>
        <h3 className='text-xl font-semibold mb-2'>Defaults</h3>
        <div className='space-y-2'>
          <FormInput
            id='spotify-defaults-timeRange-topTracks'
            label='Top Tracks'
            type='select'
            default={formProgress.defaults.timeRange.topTracks}
            value={formProgress.defaults.timeRange.topTracks}
            selectOptions={[
              { short_term: 'Last 4 Weeks' },
              { medium_term: 'Last 6 Months' },
              { long_term: 'All Time' },
            ]}
            onChange={(event) => handleInputChangeCallback(event, props.progress)}>
            This will be the default setting when displaying your top tracks.
          </FormInput>
          <FormInput
            id='spotify-defaults-timeRange-topArtists'
            label='Top Artists'
            type='select'
            default={formProgress.defaults.timeRange.topArtists}
            value={formProgress.defaults.timeRange.topArtists}
            selectOptions={[
              { short_term: 'Last 4 Weeks' },
              { medium_term: 'Last 6 Months' },
              { long_term: 'All Time' },
            ]}
            onChange={(event) => handleInputChangeCallback(event, props.progress)}>
            This will be the default setting when displaying your top artists.
          </FormInput>
        </div>
      </div>
    </form>
  );
}
