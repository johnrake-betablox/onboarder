interface Props {
  field: string;
  text: string;
  required?: boolean;
}
export default function FormLabel({ field, text, required = false }: Props) {
  return (
    <label
      htmlFor={field}
      className="block text-xs font-bold uppercase text-gray-600"
    >
      {text} {required && <span className="text-red-600">*</span>}
    </label>
  );
}
