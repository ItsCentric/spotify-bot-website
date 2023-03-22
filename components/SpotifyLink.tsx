export default function SpotifyLink(props: {
  link: string;
  bold?: 'semibold' | 'medium';
  children: any;
}) {
  return (
    <a
      href={props.link}
      rel='noreferrer'
      target='_blank'
      className={
        'hover:text-green-dark transition-colors truncate' +
        (props.bold ? ` font-${props.bold}` : '')
      }>
      {props.children}
    </a>
  );
}
