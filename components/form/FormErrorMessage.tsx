interface Props {
  text?: string;
}
export default function FormErrorMessage({ text }: Props) {
  if (!text) {
    return null;
  }

  return (
    <p className="mb-4 rounded bg-red-500 p-4 text-sm text-white">{text}</p>
  );
}
