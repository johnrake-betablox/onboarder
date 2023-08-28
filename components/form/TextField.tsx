interface Props {
  field: string;
  value: any;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}
export default function TextField({
  field,
  value,
  onChange,
  type = "text",
  autoComplete,
  required = false,
}: Props) {
  return (
    <input
      id={field}
      name={field}
      type={type}
      required={required}
      autoComplete={autoComplete}
      className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-600 focus:outline-none focus:ring-green-600 sm:text-sm"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
}
