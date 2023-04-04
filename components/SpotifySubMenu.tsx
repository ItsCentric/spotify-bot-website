import { Preferences } from '../models/User';
import FormInput from './FormInput';

export default function SpotifySubMenu(props: {
  progress: { value: Preferences; setValue: Function };
}) {
  const formProgress = props.progress.value.spotify;
  function handleInputChange(event) {
    const target = event.target;
    const value = target.type !== 'checkbox' ? target.value : target.checked;
    const name = target.name;

    props.progress.setValue({
      ...props.progress.value,
      spotify: { privacy: { ...props.progress.value.spotify, [name]: value } },
    });
  }

  return (
    <form>
      <h3 className='text-xl font-semibold mb-2'>Privacy</h3>
      <div className='space-y-2'>
        <FormInput
          id='publicProfile'
          label='Profile Privacy'
          type='checkbox'
          checked={!formProgress.privacy.publicProfile}
          value={!formProgress.privacy.publicProfile}
          onChange={handleInputChange}>
          If true, your Spotify profile will be private. This means only those that you have
          whitelisted will be able to see your profile.
        </FormInput>
        <FormInput
          id='publicTopTracks'
          label='Top Tracks Privacy'
          type='checkbox'
          checked={!formProgress.privacy.publicTopTracks}
          value={!formProgress.privacy.publicTopTracks}
          onChange={handleInputChange}>
          If true, your Spotify top tracks will be private. This means only those that you have
          whitelisted will be able to see your top tracks.
        </FormInput>
        <FormInput
          id='publicTopArtists'
          label='Top Artists Privacy'
          type='checkbox'
          checked={!formProgress.privacy.publicTopArtists}
          value={!formProgress.privacy.publicTopArtists}
          onChange={handleInputChange}>
          If true, your Spotify top artists will be private. This means only those that you have
          whitelisted will be able to see your top artists.
        </FormInput>
        <FormInput
          id='publicNowPlaying'
          label='Current Track Privacy'
          type='checkbox'
          checked={!formProgress.privacy.publicNowPlaying}
          value={!formProgress.privacy.publicNowPlaying}
          onChange={handleInputChange}>
          If true, your Spotify current track will be private. This means only those that you have
          whitelisted will be able to see your current track.
        </FormInput>
        <FormInput id='whitelist' label='Whitelist' type='textarea' disabled={true} stacked={true}>
          Will be implemented in the future.
        </FormInput>
        <FormInput id='blacklist' label='Blacklist' type='textarea' disabled={true} stacked={true}>
          Will be implemented in the future.
        </FormInput>
      </div>
    </form>
  );
}
