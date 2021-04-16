import React from 'react';
import classnames from 'classnames'

interface InputGroupProps {
    className ?:string
    type: string
    placeholder: string
    value: string
    error: string | undefined
    setValue: (str:string)=>void

}
export default function InputGroup<InputGroupProps>({className, type, placeholder, value, error, setValue}) {
	return (
		<div className={className}>
			<input
				type={type}
				className={classnames(
                    'w-full p-3 transition duration-200 border border-gray-300 rounded outline-none bg-gray-50 focus:bg-white hover:bg-white',
                    { 'border-red-500': error }
                  )}
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<small className="font-medium text-red-600">{error}</small>
		</div>
	);
}
