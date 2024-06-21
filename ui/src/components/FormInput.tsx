import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  defaultValue?: string;
  label: string;
  errors: FieldErrors;
  register: UseFormRegister<any>;
  validationRules?: any;
}

export default function FormInput({
  id,
  defaultValue,
  label,
  errors,
  register,
  validationRules,
  ...rest
}: FormInputProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        className="rounded-md border border-gray-300 p-2 dark:border-gray-700"
        id={id}
        defaultValue={defaultValue}
        {...register(id, validationRules)}
        {...rest}
      />
      {errors[id] && errors[id]?.type === 'required' && (
        <span className="text-red-500">This field is required</span>
      )}
    </>
  );
}
