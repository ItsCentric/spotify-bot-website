export default function ListSelectElement(props: {
  children: React.ReactNode;
  handleClick: Function;
  currentSubMenu: number;
  index: number;
}) {
  return (
    <li className='h-full w-full text-center'>
      <button
        className={
          'hover:bg-blackRaspberry-900/50 w-full h-full rounded-md transition-colors ' +
          (props.currentSubMenu === props.index ? 'bg-blackRaspberry-900/50' : '')
        }
        onClick={() => props.handleClick()}>
        {props.children}
      </button>
    </li>
  );
}
