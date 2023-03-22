export default function Card(props: { children: any }) {
    return (
        <div className='bg-blackRaspberry-600 drop-shadow-xl rounded-lg p-4 flex flex-col'>
            {props.children}
        </div>
    )
}