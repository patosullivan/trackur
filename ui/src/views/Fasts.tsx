import CaretLeftIcon from '@/components/icons/CaretLeftIcon';
import Layout from '@/components/Layout/Layout';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  useCurrentFast,
  useAddFastMutation,
  useFasts,
  useEndFastMutation,
  useDeleteFastMutation,
  Fast,
} from '@/state/fasts';
import { format } from 'date-fns-tz';
import classNames from 'classnames';
import { intervalToDuration } from 'date-fns';
import Dialog from '@/components/Dialog';
import EditFast from '@/components/EditFast';
import { getLocalDateTimeString } from '@/logic/utils';

export default function Fasts() {
  const [editFast, setEditFast] = useState<Fast | undefined>();
  const { fasts, loading } = useFasts();
  const currentFast = useCurrentFast();
  const { mutate: addFastMutation } = useAddFastMutation();
  const { mutate: endFastMutation } = useEndFastMutation();
  const { mutate: deleteFastMutation } = useDeleteFastMutation();
  const [currentDuration, setCurrentDuration] = useState(0);
  const currentDurationHours = Math.floor(currentDuration);
  const currentDurationMinutes = Math.floor(
    (currentDuration - currentDurationHours) * 60
  );
  const now = new Date();

  const localDateTime = getLocalDateTimeString(now);

  useEffect(() => {
    if (currentFast) {
      const start = new Date(currentFast['fast-meta'].start);
      const diff = now.getTime() - start.getTime();
      const diffInHours = diff / 1000 / 60 / 60;

      setCurrentDuration(diffInHours);
    }
  }, [currentFast]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    addFastMutation({
      start: new Date(data.start).getTime(),
      expectedDuration: parseInt(data.duration, 10),
    });
  };

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
              <span>
                {format(new Date(currentFast['fast-meta'].start), 'Pp')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold">Expected Duration:</span>
              <span>{currentFast['fast-meta'].expectedduration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold">Current Duration:</span>
              <span>{currentDurationHours} hours,</span>
              <span>{currentDurationMinutes} minutes,</span>
              <span>
                {Math.floor(
                  (currentDuration /
                    currentFast['fast-meta'].expectedduration) *
                    100
                )}
                % done
              </span>
            </div>
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
                  defaultValue={localDateTime}
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
              fasts
                .filter((fast) => fast.id !== currentFast?.id)
                .map((fast, i) => (
                  <div
                    key={fast.id}
                    className={classNames('flex flex-col space-y-2', {
                      'border-t border-gray-300 pt-2 dark:border-gray-700':
                        i > 0,
                    })}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">Start:</span>
                      <span>
                        {format(new Date(fast['fast-meta'].start), 'Pp')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">Expected Duration:</span>
                      <span>{fast['fast-meta'].expectedduration}</span>
                    </div>
                    {fast['fast-meta'].end && (
                      <>
                        <span className="font-bold">End:</span>
                        <span>
                          {format(new Date(fast['fast-meta'].end), 'Pp')}
                        </span>

                        <span className="font-bold">Actual Duration:</span>
                        <span>
                          {
                            intervalToDuration({
                              start: new Date(fast['fast-meta'].start),
                              end: new Date(fast['fast-meta'].end),
                            }).hours
                          }{' '}
                          hours and{' '}
                          {
                            intervalToDuration({
                              start: new Date(fast['fast-meta'].start),
                              end: new Date(fast['fast-meta'].end),
                            }).minutes
                          }{' '}
                          minutes
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => deleteFastMutation({ id: fast.id })}
                            className="button"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setEditFast(fast)}
                            className="button"
                          >
                            Edit
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={!!editFast}
        onOpenChange={() => setEditFast(undefined)}
        aria-labelledby="form-dialog-title"
      >
        <EditFast editFast={editFast} setEditFast={setEditFast} />
      </Dialog>
    </Layout>
  );
}
