import { useEffect, useState } from 'react';
import FormInput from './FormInput';
import countries, { languagesAll } from 'countries-list';
import { Preferences } from '../models/User';

export default function GeneralSubMenu(props: {
  progress: { value: Preferences; setValue: Function };
}) {
  const [time, setTime] = useState(10);
  const [activatedTimer, setActivatedTimer] = useState(false);
  const formProgress = props.progress.value?.general;
  const countryNames = Object.values(countries.countries).map((country, index) => {
    return {
      [Object.keys(countries.countries)[index]]: country.name,
    };
  });
  const sortedCountryNames = countryNames.sort((a, b) => {
    const countryOne = Object.keys(a)[0].toUpperCase();
    const countryTwo = Object.keys(b)[0].toUpperCase();

    if (countryOne === countryTwo) return 0;
    return countryOne > countryTwo ? 1 : -1;
  });
  const languages = [];
  for (const key in languagesAll) {
    languages.push({ [key]: languagesAll[key].native });
  }
  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    props.progress.setValue({
      ...props.progress.value,
      general: { locale: { ...props.progress.value.general.locale, [name]: value } },
    });
  }

  useEffect(() => {
    let timer: NodeJS.Timer;

    if (activatedTimer) {
      timer =
        time > 0 && setInterval(() => setTime((previousTime: number) => previousTime - 1), 1000);
    } else if (!activatedTimer) {
      clearInterval(timer);
    }
    if (time === 0) setActivatedTimer(false);

    return () => {
      clearInterval(timer);
    };
  }, [activatedTimer, time, props.progress]);

  return (
    <>
      <form className='space-y-4'>
        <div>
          <h3 className='text-xl font-semibold mb-2'>Locale</h3>
          <div className='space-y-2'>
            <FormInput
              id='language'
              label='Language'
              type='select'
              selectOptions={languages}
              default={formProgress.locale.language}
              value={formProgress.locale.language}
              onChange={handleInputChange}>
              Set your preferred language. In future versions this will localize the website in this
              language.
            </FormInput>
            <FormInput
              id='country'
              label='Country'
              type='select'
              selectOptions={sortedCountryNames}
              default={formProgress.locale.country}
              value={formProgress.locale.country}
              onChange={handleInputChange}>
              Set your country. This will check to make sure a song is available in this country.
            </FormInput>
          </div>
        </div>
      </form>
      <div>
        <h3 className='text-xl font-semibold mb-2'>Account</h3>
        <div>
          <button
            className='bg-red-500 enabled:hover:bg-red-600 disabled:contrast-75 p-1.5 rounded-lg inline-block mb-1'
            disabled={time !== 0 && activatedTimer}
            onClick={() => setActivatedTimer(true)}>
            Unlink Account
          </button>
          <p
            className={
              'text-red-400 text-sm ' + (time !== 0 && activatedTimer ? 'inline-block' : 'hidden')
            }>
            {`Warning: this will unlink your Spotify account from Music Wizard; this includes deleting your data from its servers. If you are aware of this, please wait ${time} ${
              time === 1 ? 'second' : 'seconds'
            } to proceed.`}
          </p>
        </div>
      </div>
    </>
  );
}
