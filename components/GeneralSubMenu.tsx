import { useEffect, useState } from 'react';
import FormInput from './FormInput';
import countries, { languagesAll } from 'countries-list';

export default function GeneralSubMenu() {
  const [time, setTime] = useState(10);
  const [activatedTimer, setActivatedTimer] = useState(false);
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
  console.log(languages);

  useEffect(() => {
    let timer: NodeJS.Timer;

    if (activatedTimer) {
      timer =
        time > 0 && setInterval(() => setTime((previousTime: number) => previousTime - 1), 1000);
    } else if (!activatedTimer) {
      clearInterval(timer);
    }
    if (time === 0) setActivatedTimer(false);

    return () => clearInterval(timer);
  }, [activatedTimer, time]);

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
              default='en'>
              Set your preferred language. In future versions this will localize the website in this
              language.
            </FormInput>
            <FormInput
              id='country'
              label='Country'
              type='select'
              selectOptions={sortedCountryNames}
              default='US'>
              Set your country. This will check to make sure a song is available in this country.
            </FormInput>
          </div>
        </div>
        <div></div>
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
