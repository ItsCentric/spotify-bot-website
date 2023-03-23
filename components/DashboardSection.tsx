export default function DashboardSection(props: {
  heading: string;
  subheading: string;
  span?: number;
  children: any;
}) {
  return (
    <div
      className={
        'bg-blackRaspberry-200 rounded-[inherit] flex flex-col shadow-2xl px-4 py-8 lg:px-8 ' +
        (props.span ? `col-span-${props.span}` : '')
      }>
      <div className='mb-4'>
        <h2 className='text-3xl font-bold'>{props.heading}</h2>
        <p className='text-lg text-white/80'>{props.subheading}</p>
      </div>
      <div className='flex flex-1'>{props.children}</div>
    </div>
  );
}
