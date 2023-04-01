import FormInput from './FormInput';

export default function SpotifySubMenu() {
  return (
    <form>
      <h3 className='text-xl font-semibold mb-2'>Privacy</h3>
      <div className='space-y-2'>
        <FormInput id='spotify-profile-privacy' label='Profile Privacy' type='checkbox'>
          If true, your Spotify profile will be private. This means only those that you have
          whitelisted will be able to see your profile.
        </FormInput>
        <FormInput id='spotify-toptracks-privacy' label='Top Tracks Privacy' type='checkbox'>
          If true, your Spotify top tracks will be private. This means only those that you have
          whitelisted will be able to see your top tracks.
        </FormInput>
        <FormInput id='spotify-topartists-privacy' label='Top Artists Privacy' type='checkbox'>
          If true, your Spotify top artists will be private. This means only those that you have
          whitelisted will be able to see your top artists.
        </FormInput>
        <FormInput id='spotify-nowplaying-privacy' label='Current Track Privacy' type='checkbox'>
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
