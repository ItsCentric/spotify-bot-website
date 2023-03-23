export default function Tooltip(props: {
  children: any;
  position: 'top' | 'bottom';
  alignment: 'left' | 'right' | 'center';
}) {
  let alignment: string;

  switch (props.alignment) {
    case 'left':
      alignment = 'left-0';
      break;
    case 'right':
      alignment = 'right-0';
      break;
    case 'center':
      alignment = 'left-1/2 -translate-x-1/2';
      break;
  }

  return (
    <div
      className={
        'group-hover:block hidden absolute bottom-full bg-black text-white opacity-85 rounded-lg whitespace-nowrap p-1 z-10 pointer-events-none ' +
        alignment
      }>
      {props.children}
    </div>
  );
}
