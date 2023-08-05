import CaretLeftIcon from '@/components/icons/CaretLeftIcon';
import Layout from '@/components/Layout/Layout';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useCurrentFast, useFastMutation, useFasts } from '@/state/fasts';
import { format } from 'date-fns';
import classNames from 'classnames';

export default function Fast() {
  const { fasts, loading } = useFasts();
  const currentFast = useCurrentFast();
  const { mutate } = useFastMutation();
  const [currentDuration, setCurrentDuration] = useState(0);
  const currentDurationHours = Math.floor(currentDuration);
  const currentDurationMinutes = Math.floor(
    (currentDuration - currentDurationHours) * 60
  );

  useEffect(() => {
    if (currentFast) {
      const start = new Date(currentFast.start);
      const now = new Date();
      const diff = now.getTime() - start.getTime();
      const diffInHours = diff / 1000 / 60 / 60;

      setCurrentDuration(diffInHours);
    }
  }, [currentFast]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <Layout
      header={
        <div className="flex w-full items-center justify-between">
          <Link to=".." className="flex items-center space-x-2">
            <CaretLeftIcon className="h-6 w-6" />
            <span>Back</span>
          </Link>
        </div>
      }
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Fast
        </h1>

        {currentFast ? (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold">Start:</span>
              <span>{format(new Date(currentFast.start), 'Pp')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold">Expected Duration:</span>
              <span>{currentFast.expectedDuration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold">Current Duration:</span>
              <span>{currentDurationHours} hours,</span>
              <span>{currentDurationMinutes} minutes,</span>
              <span>
                {Math.floor(
                  (currentDuration / currentFast.expectedDuration) * 100
                )}
                % done
              </span>
            </div>
            <button
              onClick={() =>
                mutate({ id: currentFast.id, end: new Date().toISOString() })
              }
              className="button"
            >
              End Fast
            </button>
          </div>
        ) : (
          <>
            <span className="text-gray-600 dark:text-gray-400">
              Start a new fast
            </span>

            <form
              className="flex w-full max-w-sm flex-col space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col space-y-2">
                <label htmlFor="start">Start</label>
                <input
                  className="rounded-md border border-gray-300 p-2 dark:border-gray-700"
                  type="datetime-local"
                  id="start"
                  // this should be the current time in the user's timezone
                  defaultValue={new Date().toISOString().slice(0, 16)}
                  {...register('start', { required: true })}
                />
                {errors.start && (
                  <span className="text-red-500">This field is required</span>
                )}

                <label htmlFor="duration">Duration (in hours)</label>
                <input
                  className="rounded-md border border-gray-300 p-2 dark:border-gray-700"
                  type="number"
                  id="duration"
                  {...register('duration', { required: true })}
                />
                {errors.duration && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <button className="button" type="submit">
                Start
              </button>
            </form>
          </>
        )}

        <hr className="mt-4 w-full border-2" />
        <div className="mt-4 flex flex-col space-y-2">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Previous Fasts
          </h2>

          <div className="flex flex-col space-y-2">
            {loading ? (
              <span>Loading...</span>
            ) : (
              fasts.map((fast, i) => (
                <div
                  key={fast.id}
                  className={classNames('flex flex-col space-y-2', {
                    'border-t border-gray-300 pt-2 dark:border-gray-700': i > 0,
                  })}
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">Start:</span>
                    <span>{format(new Date(fast.start), 'Pp')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">Expected Duration:</span>
                    <span>{fast.expectedDuration}</span>
                  </div>
                  {fast.end && fast.actualDuration && (
                    <>
                      <span className="font-bold">End:</span>
                      <span>{format(new Date(fast.end), 'Pp')}</span>

                      <span className="font-bold">Actual Duration:</span>
                      <span>{fast.actualDuration}</span>

                      <span className="font-bold">Difference:</span>
                      <span>{fast.actualDuration - fast.expectedDuration}</span>

                      <span className="font-bold">Percent Difference:</span>
                      <span>
                        {(
                          ((fast.actualDuration - fast.expectedDuration) /
                            fast.expectedDuration) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
