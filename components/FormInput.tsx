export default function FormInput(props: {
  children?: React.ReactNode;
  id?: string;
  label?: string;
  type: 'textarea' | 'checkbox' | 'radio' | 'select' | 'submit';
  disabled?: boolean;
  stacked?: boolean;
  selectOptions?: object[];
  default?: string;
  value?: any;
  checked?: boolean;
  onChange?: (event: any) => void;
}) {
  const type = props.type;

  switch (type) {
    case 'select':
      return (
        <div>
          <label htmlFor={props.id}>{props.label}</label>
          <select
            name={props.id}
            id={props.id}
            className='block bg-blackRaspberry-200 rounded-md mb-1 p-1'
            value={props.value}
            onChange={props.onChange}>
            {props.selectOptions?.map((option, index) => {
              const key = Object.keys(option)[0];
              return (
                <option key={index} value={key} selected={key === props.default}>
                  {Object.values(option)[0]}
                </option>
              );
            })}
          </select>
          <p className='text-white/80 text-sm'>{props.children}</p>
        </div>
      );
    case 'submit':
      return (
        <input
          type='submit'
          className='bg-green-dark hover:bg-green-light transition-colors cursor-pointer rounded-lg py-1 px-4'
          value='Save'
        />
      );
    default:
      const isStacked = props.stacked;
      return (
        <div className={isStacked ? 'flex flex-col items-start' : ''}>
          <input
            type={type}
            name={props.id}
            id={props.id}
            disabled={props.disabled ? true : false}
            className={isStacked ? 'block bg-blackRaspberry-200 rounded-md order-2 mb-1' : 'mr-2'}
            onChange={props.onChange}
            {...(type !== 'checkbox' ? { value: props.value } : { checked: props.value })}
          />
          <label htmlFor={props.id} className={isStacked ? 'order-1' : ''}>
            {props.label}
          </label>
          <p className={'text-white/80 text-sm ' + (isStacked ? 'order-3' : 'ml-5')}>
            {props.children}
          </p>
        </div>
      );
  }
}
