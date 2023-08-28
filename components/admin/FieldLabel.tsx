import { DMMF } from "@prisma/client/runtime";
import { captilalize } from "utils/capitalize";

interface Props {
  field: DMMF.Field;
  required?: Boolean;
}
export default function FieldLabel({ field, required }: Props) {
  const renderRequiredAsterisk = () => {
    // Allow an override for fields marked required
    //  1) Fields that have a default value
    //  2) Boolean field checkboxes which always have a value (true/false)
    if (required === false) {
      return null;
    }

    if (field.isRequired) {
      return <span className="text-red-600">*</span>;
    }

    return null;
  };

  return (
    <label className="mb-2 block text-sm font-bold text-gray-700">
      {captilalize(field.name)} {renderRequiredAsterisk()}
    </label>
  );
}
