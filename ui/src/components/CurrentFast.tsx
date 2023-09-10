import { useCurrentFast, useEndFastMutation } from '@/state/fasts';
import { format } from 'date-fns-tz';
import CircleChart from './CircleChart';
import PrimaryButton from './PrimaryButton';

export default function CurrentFast() {
  const {
    currentFast,
    currentDurationHours,
    currentDurationMinutes,
    currentDurationSeconds,
    percentageComplete,
  } = useCurrentFast();
  const { mutate: endFastMutation, isLoading } = useEndFastMutation();

  if (!currentFast) return null;

  const currentDurationString = `${currentDurationHours}:${currentDurationMinutes}:${currentDurationSeconds}`;

  return (
    <div className="flex flex-col items-center space-y-2 pt-4">
      <h2 className="text-center text-xl font-bold text-gray-800 dark:text-gray-100">
        Current Fast
      </h2>
      <CircleChart
        percentageComplete={percentageComplete}
        secondaryText={currentDurationString}
      />
      <div className="flex items-center space-x-2">
        <span className="font-bold">Start:</span>
        <span>{format(new Date(currentFast['fast-meta'].start), 'Pp')}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-bold">Expected Duration:</span>
        <span>{currentFast['fast-meta'].expectedduration} hours</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-bold">End:</span>
        <span>
          {format(
            new Date(currentFast['fast-meta'].start).getTime() +
              currentFast['fast-meta'].expectedduration * 60 * 60 * 1000,
            'Pp'
          )}
        </span>
      </div>
      <PrimaryButton
        onClick={() =>
          endFastMutation({
            id: currentFast.id,
            end: new Date().getTime(),
          })
        }
        isLoading={isLoading}
      >
        End Fast
      </PrimaryButton>
    </div>
  );
}
