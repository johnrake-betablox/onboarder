import { StepCategoryProgress, StepCategoryStatus } from "@/lib/flow";
import { CheckIcon } from "@heroicons/react/24/solid";

interface Props {
  items: StepCategoryProgress[];
}
export default function StepCategoryProgress({ items = [] }: Props) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
      >
        {items.map((item, index) => (
          <li key={item.name} className="relative md:flex md:flex-1">
            {item.status === StepCategoryStatus.complete && (
              <div className="group flex w-full items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                    <CheckIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900">
                    {item.name}
                    <span className="block text-xs text-gray-400">
                      {item.totalStepsCount} steps
                    </span>
                  </span>
                </span>
              </div>
            )}

            {item.status === StepCategoryStatus.current && (
              <div
                className="flex items-center px-6 py-4 text-sm font-medium"
                aria-current="step"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                  <span className="text-indigo-600">{item.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-indigo-600">
                  {item.name}
                  <span className="block text-xs text-gray-400">
                    {item.totalStepsCount} steps
                  </span>
                </span>
              </div>
            )}

            {item.status === StepCategoryStatus.upcoming && (
              <div className="group flex items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                    <span className="text-gray-500 group-hover:text-gray-900">
                      {item.id}
                    </span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                    {item.name}
                    <span className="block text-xs text-gray-400">
                      {item.totalStepsCount} steps
                    </span>
                  </span>
                </span>
              </div>
            )}

            {index !== items.length - 1 ? (
              <>
                {/* Arrow separator for lg screens and up */}
                <div
                  className="absolute right-0 top-0 hidden h-full w-5 md:block"
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
