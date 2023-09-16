import CaretLeftIcon from '@/components/icons/CaretLeftIcon';
import Layout from '@/components/Layout/Layout';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import {
  useCurrentFast,
  useAddFastMutation,
  useFasts,
  useLastFast,
} from '@/state/fasts';
import { format } from 'date-fns-tz';
import { getLocalDateTimeString } from '@/logic/utils';
import CurrentFast from '@/components/CurrentFast';
import PrimaryButton from '@/components/PrimaryButton';
import PreviousFast from '@/components/PreviousFast';

export default function Fasts() {
  const { fasts, loading } = useFasts();
  const { currentFast } = useCurrentFast();
  const { lastFast } = useLastFast();
  const { mutate: addFastMutation, isLoading: addFastIsLoading } =
    useAddFastMutation();
  const now = new Date();

  const localDateTime = getLocalDateTimeString(now);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      start: localDateTime,
      duration: 16,
    },
  });

  const watchDuration = watch('duration');
  const watchStart = watch('start');

  useEffect(() => {
    if (lastFast) {
      setValue('duration', lastFast['fast-meta'].expectedduration);
    }
  }, [lastFast, setValue]);

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
          Fasts
        </h1>

        {currentFast ? (
          <CurrentFast />
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

                <label htmlFor="duration">Expected Duration (in hours)</label>
                <input
                  className="rounded-md border border-gray-300 p-2 dark:border-gray-700"
                  type="number"
                  id="duration"
                  {...register('duration', { required: true })}
                />
                {errors.duration && (
                  <span className="text-red-500">This field is required</span>
                )}
                <span className="text-gray-600 dark:text-gray-400">
                  Expected end:{' '}
                  {format(
                    new Date(
                      new Date(watchStart).getTime() +
                        watchDuration * 60 * 60 * 1000
                    ),
                    'Pp'
                  )}
                </span>
              </div>
              <PrimaryButton isLoading={addFastIsLoading} type="submit">
                Start
              </PrimaryButton>
            </form>
          </>
        )}

        {fasts.filter((fast) => fast.id !== currentFast?.id).length > 0 && (
          <>
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
                      <PreviousFast key={fast.id} fast={fast} i={i} />
                    ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
