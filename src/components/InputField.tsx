import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface InputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, label }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 mb-1">
      {label}
    </label>
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      id={name}
      className="w-full p-2 border border-gray-300 rounded"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm mt-1"
    />
  </div>
);

export default InputField;
