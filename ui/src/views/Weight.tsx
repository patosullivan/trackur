import Layout from '@/components/Layout/Layout';
import { format } from 'date-fns-tz';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { getLocalDateTimeString } from '@/logic/utils';
import PrimaryButton from '@/components/PrimaryButton';
import {
  useWeights,
  useAddWeightMutation,
  useDeleteWeightMutation,
  Weight as WeightType,
} from '@/state/weights';
import { useState } from 'react';
import Dialog from '@/components/Dialog';
import EditWeight from '@/components/EditWeight';
import DestructiveButton from '@/components/DestructiveButton';
import SecondaryButton from '@/components/SecondaryButton';
import Header from '@/components/Header';
import Title from '@/components/Title';
import FormInput from '@/components/FormInput';
import PreviousWeight from '@/components/PreviousWeight';
import PreviousList from '@/components/PreviousList';

export default function Weight() {
  const [editWeight, setEditWeight] = useState<WeightType | undefined>(
    undefined
  );
  const { weights, loading } = useWeights();
  const { mutate: addWeightMutation, isLoading: addWeightIsLoading } =
    useAddWeightMutation();
  const { mutate: deleteWeightMutation, isLoading: deleteWeightIsLoading } =
    useDeleteWeightMutation();
  const now = new Date();
  const localDateTime = getLocalDateTimeString(now);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    addWeightMutation({
      date: new Date(data.date).getTime(),
      weight: parseFloat(data.weight),
    });
  };

  return (
    <Layout
      header={<Header />}
      mainClass="flex h-full flex-col items-center justify-center"
    >
      <Title>Weight</Title>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col space-y-4"
      >
        <FormInput
          label="Weight"
          type="number"
          id="weight"
          step="0.1"
          errors={errors}
          register={register}
          validationRules={{ required: true }}
        />
        <FormInput
          label="Date"
          type="datetime-local"
          id="date"
          defaultValue={localDateTime}
          errors={errors}
          register={register}
          validationRules={{ required: true }}
        />
        <PrimaryButton isLoading={addWeightIsLoading} type="submit">
          Submit
        </PrimaryButton>
      </form>
      {weights.length > 0 && (
        <PreviousList
          itemLabel="weight"
          items={weights}
          loading={loading}
          itemComponent={PreviousWeight}
        />
      )}
    </Layout>
  );
}
