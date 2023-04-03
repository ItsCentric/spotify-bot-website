import FormInput from './FormInput';
import { SubMenuProgress } from './SettingsModal';

export default function SpotifySubMenu(props: {
  progress: { value: SubMenuProgress; setValue: Function };
}) {
  const formProgress = props.progress.value.spotify;
  function handleInputChange(event) {
    const target = event.target;
    const value = target.type !== 'checkbox' ? target.value : target.checked;
    const name = target.name;

    props.progress.setValue({
      ...props.progress.value,
      spotify: { ...props.progress.value.spotify, [name]: value },
    });
  }

  return (
    <form>
      <h3 className='text-xl font-semibold mb-2'>Privacy</h3>
      <div className='space-y-2'>
        <FormInput
          id='spotify-profile-privacy'
          label='Profile Privacy'
          type='checkbox'
          checked={formProgress['spotify-profile-privacy']}
          value={formProgress['spotify-profile-privacy']}
          onChange={handleInputChange}>
          If true, your Spotify profile will be private. This means only those that you have
          whitelisted will be able to see your profile.
        </FormInput>
        <FormInput
          id='spotify-toptracks-privacy'
          label='Top Tracks Privacy'
          type='checkbox'
          checked={formProgress['spotify-toptracks-privacy']}
          value={formProgress['spotify-toptracks-privacy']}
          onChange={handleInputChange}>
          If true, your Spotify top tracks will be private. This means only those that you have
          whitelisted will be able to see your top tracks.
        </FormInput>
        <FormInput
          id='spotify-topartists-privacy'
          label='Top Artists Privacy'
          type='checkbox'
          checked={formProgress['spotify-topartists-privacy']}
          value={formProgress['spotify-topartists-privacy']}
          onChange={handleInputChange}>
          If true, your Spotify top artists will be private. This means only those that you have
          whitelisted will be able to see your top artists.
        </FormInput>
        <FormInput
          id='spotify-nowplaying-privacy'
          label='Current Track Privacy'
          type='checkbox'
          checked={formProgress['spotify-nowplaying-privacy']}
          value={formProgress['spotify-nowplaying-privacy']}
          onChange={handleInputChange}>
          If true, your Spotify current track will be private. This means only those that you have
          whitelisted will be able to see your current track.
        </FormInput>
        <FormInput
          id='spotify-whitelist'
          label='Whitelist'
          type='textarea'
          disabled={true}
          stacked={true}>
          Will be implemented in the future.
        </FormInput>
        <FormInput
          id='spotify-blacklist'
          label='Blacklist'
          type='textarea'
          disabled={true}
          stacked={true}>
          Will be implemented in the future.
        </FormInput>
      </div>
    </form>
  );
}
