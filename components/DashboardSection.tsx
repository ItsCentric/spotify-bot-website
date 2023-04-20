import { IoMdInformationCircle } from 'react-icons/io';
import Tooltip from './Tooltip';

export default function DashboardSection(props: {
  heading: string;
  subheading: string;
  span?: number;
  children: any;
  info?: boolean;
  infoText?: string;
}) {
  return (
    <div
      className={
        'bg-blackRaspberry-200 rounded-[inherit] flex flex-col shadow-2xl px-4 py-8 lg:px-8 ' +
        (props.span ? `col-span-${props.span}` : '')
      }>
      <div className='mb-4'>
        <h2 className='text-3xl font-bold'>{props.heading}</h2>
        <p className='text-lg text-white/80 inline-block align-middle mr-1'>{props.subheading}</p>
        <div className={'group relative inline-block align-middle ' + (props.info ? '' : 'hidden')}>
          <IoMdInformationCircle className='text-white/80' />
          <Tooltip position='top' alignment='center'>
            {props.infoText}
          </Tooltip>
        </div>
      </div>
      <div className='flex flex-1'>{props.children}</div>
    </div>
  );
}
