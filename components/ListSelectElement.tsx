export default function ListSelectElement(props: {
  children: React.ReactNode;
  handleClick: Function;
}) {
  return (
    <li className='h-full w-full text-center'>
      <button
        className='hover:bg-blackRaspberry-900/50 w-full h-full rounded-md transition-colors'
        onClick={() => props.handleClick()}>
        {props.children}
      </button>
    </li>
  );
}
