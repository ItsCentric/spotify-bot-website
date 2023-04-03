import { useContext, useEffect } from 'react';
import { ModalContext } from '../pages/profile';
import { IoClose } from 'react-icons/io5';

export default function Modal(props: {
  open: Boolean;
  heading?: String;
  children: React.ReactNode;
  restricted?: boolean;
}) {
  const open = props.open;
  const modal = useContext(ModalContext);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [modal.value]);

  if (open) {
    return (
      <div
        className='fixed w-full min-h-full backdrop-brightness-50 grid place-items-center z-40'
        onClick={() => {
          if (!props.restricted) modal.setValue(null);
        }}>
        <div
          className='relative flex flex-col rounded-lg w-1/2 h-2/3 top-0 left-50 translate-x-0.5 z-50 drop-shadow-2xl bg-blackRaspberry-200 text-white p-4'
          onClick={(e) => e.stopPropagation()}>
          <button
            className='absolute top-0 right-0 hover:text-white/80 m-1 transition-colors'
            onClick={() => {
              if (!props.restricted) modal.setValue(null);
            }}>
            <IoClose className='h-8 w-8' />
          </button>
          <h2 className='text-3xl font-bold mb-4'>{props.heading}</h2>
          {props.children}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
