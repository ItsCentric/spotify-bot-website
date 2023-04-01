import { useEffect, useState } from 'react';

export default function FormInput(props: {
  children?: React.ReactNode;
  id: string;
  label: string;
  type: 'textarea' | 'checkbox' | 'radio' | 'select';
  disabled?: boolean;
  stacked?: boolean;
  selectOptions?: object[];
  default?: string;
}) {
  if (props.type !== 'select') {
    const isStacked = props.stacked;
    return (
      <div className={isStacked ? 'flex flex-col items-start' : ''}>
        <input
          type={props.type}
          name={props.id}
          id={props.id}
          disabled={props.disabled ? true : false}
          className={
            isStacked ? 'block bg-blackRaspberry-200 rounded-md order-2 mb-1' : 'mr-2'
          }></input>
        <label htmlFor={props.id} className={isStacked ? 'order-1' : ''}>
          {props.label}
        </label>
        <p className={'text-white/80 text-sm ' + (isStacked ? 'order-3' : 'ml-5')}>
          {props.children}
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <label htmlFor={props.id}>{props.label}</label>
        <select
          name={props.id}
          id={props.id}
          className='block bg-blackRaspberry-200 rounded-md mb-1'>
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
  }
}
