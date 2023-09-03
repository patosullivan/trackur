import { useCurrentFast, useEndFastMutation } from '@/state/fasts';
import { format } from 'date-fns-tz';

export default function CurrentFast() {
  const {
    currentFast,
    currentDurationHours,
    currentDurationMinutes,
    currentDurationSeconds,
    percentageComplete,
  } = useCurrentFast();
  const { mutate: endFastMutation } = useEndFastMutation();

  if (!currentFast) return null;

  return (
    <div className="flex flex-col space-y-2 pt-4">
      <h2 className="text-center text-xl font-bold text-gray-800 dark:text-gray-100">
        Current Fast
      </h2>
      <div className="flex items-center space-x-2">
        <span className="font-bold">Start:</span>
        <span>{format(new Date(currentFast['fast-meta'].start), 'Pp')}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-bold">Expected Duration:</span>
        <span>{currentFast['fast-meta'].expectedduration} hours</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-bold">Current Duration:</span>
        <span>
          {currentDurationHours}:{currentDurationMinutes}:
          {currentDurationSeconds}
        </span>
        <span>~{percentageComplete}% done</span>
      </div>
      <div className="flex items-center justify-center space-x-2 pt-4">
        <button
          onClick={() =>
            endFastMutation({
              id: currentFast.id,
              end: new Date().getTime(),
            })
          }
          className="button"
        >
          End Fast
        </button>
      </div>
    </div>
  );
}
