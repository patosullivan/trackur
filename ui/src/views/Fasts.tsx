import Layout from '@/components/Layout/Layout';
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
import Header from '@/components/Header';
import Title from '@/components/Title';
import FormInput from '@/components/FormInput';
import Subtitle from '@/components/Subtitle';
import PreviousList from '@/components/PreviousList';

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
      header={<Header />}
      mainClass="flex h-full w-full flex-col items-center justify-center"
    >
      <Title>Fasts</Title>
      {currentFast ? (
        <CurrentFast />
      ) : (
        <>
          <Subtitle>Start a new fast</Subtitle>
          <form
            className="flex w-full max-w-sm flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col space-y-2">
              <FormInput
                id="start"
                defaultValue={localDateTime}
                label="Start"
                required
                errors={errors}
                type="datetime-local"
                register={register}
                validationRules={{ required: true }}
              />

              <FormInput
                id="duration"
                defaultValue="16"
                label="Expected Duration (in hours)"
                required
                errors={errors}
                type="number"
                register={register}
                validationRules={{ required: true }}
              />
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
        <PreviousList
          items={fasts}
          itemComponent={PreviousFast}
          loading={loading}
          itemLabel="fast"
        />
      )}
    </Layout>
  );
}
