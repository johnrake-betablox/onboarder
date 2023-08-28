import { classNames } from "@/utils/classnames";
import LoadingDots from "../LoadingDots";

export default function SubmitButton({
  loading = false,
  text = "Save",
}: {
  loading?: boolean;
  text?: string;
}) {
  return (
    <button
      type="submit"
      className={classNames(
        loading
          ? "cursor-not-allowed bg-gray-200 text-black opacity-80"
          : "bg-green-600 text-white hover:bg-green-500",
        "rounded  px-3 py-2 font-semibold",
      )}
      disabled={loading}
    >
      {loading ? <LoadingDots /> : text}
    </button>
  );
}
