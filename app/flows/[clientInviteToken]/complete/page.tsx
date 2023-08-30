import { CheckIcon } from "@heroicons/react/24/outline";

export default async function FlowCompletePage() {
  return (
    <div className="mx-auto max-w-3xl py-4 lg:py-40">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckIcon className="h-10 w-10 text-green-600" aria-hidden="true" />
      </div>
      <div className="mt-3 text-center sm:mt-5">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          You're All Set!
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Thank you for sending over your website content. We're excited to
            start weaving it into a standout online presence. Stay tuned for
            updates as we bring your vision to life!
          </p>
        </div>
      </div>
    </div>
  );
}
