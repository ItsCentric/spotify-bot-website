import Modal from './Modal';
import { ModalContext } from '../pages/profile';
import { useContext, useState } from 'react';
import ListSelectElement from './ListSelectElement';
import SpotifySubMenu from './SpotifySubMenu';
import GeneralSubMenu from './GeneralSubMenu';

export default function SettingsModal() {
  const modal = useContext(ModalContext);
  const [subMenu, setSubMenu] = useState<number>(0);
  const subMenuArray = [<GeneralSubMenu key={1} />, <SpotifySubMenu key={2} />];

  if (modal.value === 0) {
    return (
      <Modal open={true} heading='Settings'>
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
          <div className='bg-blackRaspberry-600 rounded-lg px-4 py-2'>{subMenuArray[subMenu]}</div>
        </div>
      </Modal>
    );
  } else return null;
}
