import Modal from './Modal';
import { ModalContext } from '../pages/profile';
import { useContext, useEffect, useRef, useState } from 'react';
import ListSelectElement from './ListSelectElement';
import SpotifySubMenu from './SpotifySubMenu';
import GeneralSubMenu from './GeneralSubMenu';

export type SubMenuProgress = {
  general: {
    language?: string;
    country?: string;
  };
  spotify: {
    'spotify-profile-privacy'?: boolean;
    'spotify-toptracks-privacy'?: boolean;
    'spotify-topartists-privacy'?: boolean;
    'spotify-nowplaying-privacy'?: boolean;
  };
};
export default function SettingsModal() {
  const modal = useContext(ModalContext);
  const [unsavedChanges, setUnsavedChanges] = useState<JSX.Element>(null);
  const [subMenu, setSubMenu] = useState<number>(0);
  const [subMenuProgress, setSubMenuProgress] = useState<SubMenuProgress>({
    general: { language: 'en', country: 'US' },
    spotify: {
      'spotify-nowplaying-privacy': false,
      'spotify-profile-privacy': false,
      'spotify-topartists-privacy': false,
      'spotify-toptracks-privacy': false,
    },
  });
  const initialSubMenuProgress = useRef(subMenuProgress);
  const subMenuArray = [
    <GeneralSubMenu key={1} progress={{ value: subMenuProgress, setValue: setSubMenuProgress }} />,
    <SpotifySubMenu key={2} progress={{ value: subMenuProgress, setValue: setSubMenuProgress }} />,
  ];

  useEffect(() => {
    if (JSON.stringify(subMenuProgress) !== JSON.stringify(initialSubMenuProgress.current)) {
      setUnsavedChanges(
        <div className='absolute bottom-0 w-full p-4 flex justify-center gap-8 z-[9999] bg-blackRaspberry-600'>
          <p className='text-xl'>You have unsaved changes</p>
          <div className='space-x-2'>
            <button
              className='py-1 px-2 bg-green-light hover:bg-green-dark rounded-lg transition-colors'
              onClick={() => console.log('form submitted!', subMenuProgress)}>
              Save
            </button>
            <button
              className='py-1 px-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors'
              onClick={() => setSubMenuProgress(initialSubMenuProgress.current)}>
              Reset
            </button>
          </div>
        </div>
      );
    } else {
      setUnsavedChanges(null);
    }
  }, [subMenuProgress]);

  if (modal.value === 0) {
    return (
      <>
        {unsavedChanges}
        <Modal
          open={true}
          heading='Settings'
          restricted={
            JSON.stringify(subMenuProgress) !== JSON.stringify(initialSubMenuProgress.current)
          }>
          <div className='grid grid-cols-[1fr,_3fr] gap-4 flex-1'>
            <div className='bg-blackRaspberry-600 rounded-lg'>
              <ul className='flex flex-col items-center p-2'>
                {subMenuArray.map((subMenu, index) => {
                  return (
                    <ListSelectElement key={index} handleClick={() => setSubMenu(index)}>
                      {subMenu.type.name.split('SubMenu')[0]}
                    </ListSelectElement>
                  );
                })}
              </ul>
            </div>
            <div className='bg-blackRaspberry-600 rounded-lg px-4 py-2'>
              {subMenuArray[subMenu]}
            </div>
          </div>
        </Modal>
      </>
    );
  } else return null;
}
