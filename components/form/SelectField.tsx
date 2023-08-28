type Option = { value: string; label: string };

interface Props {
  field: string;
  value: any;
  required?: boolean;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}
export default function SelectField({
  field,
  value,
  onChange,
  options = [],
  required = false,
}: Props) {
  return (
    <select
      id={field}
      name={field}
      required={required}
      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-600 focus:outline-none focus:ring-green-600 sm:text-sm"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    >
      <option value="" />
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
