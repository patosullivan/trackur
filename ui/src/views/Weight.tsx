import Layout from '@/components/Layout/Layout';
import { format } from 'date-fns-tz';
import classNames from 'classnames';
import CaretLeftIcon from '@/components/icons/CaretLeftIcon';
import { Link } from 'react-router-dom';
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
    console.log({
      date: new Date(data.date).getTime(),
      weight: parseFloat(data.weight),
    });

    addWeightMutation({
      date: new Date(data.date).getTime(),
      weight: parseFloat(data.weight),
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
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Weight</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-sm flex-col space-y-4"
        >
          <label htmlFor="weight">Weight</label>
          <input
            className="rounded-md border border-gray-300 px-4 py-2"
            type="number"
            step="0.1"
            id="weight"
            {...register('weight', { required: true })}
          />
          {errors.weight && (
            <span className="text-red-500">This field is required</span>
          )}
          <label htmlFor="date">Date</label>
          <input
            className="rounded-md border border-gray-300 px-4 py-2"
            type="datetime-local"
            id="date"
            defaultValue={localDateTime}
            {...register('date', { required: true })}
          />
          {errors.date && (
            <span className="text-red-500">This field is required</span>
          )}
          <PrimaryButton isLoading={addWeightIsLoading} type="submit">
            Submit
          </PrimaryButton>
        </form>
        {weights.length > 0 && (
          <>
            <hr className="mt-4 w-full border-2" />
            <div className="mt-4 flex flex-col space-y-2">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Previous weights
              </h2>

              <div className="flex flex-col space-y-2">
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  weights.map((weight, i) => (
                    <div
                      key={weight.id}
                      className={classNames('flex flex-col space-y-2', {
                        'border-t border-gray-300 pt-2 dark:border-gray-700':
                          i > 0,
                      })}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">Date:</span>
                        <span>
                          {format(new Date(weight['weight-meta'].date), 'Pp')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">Weight:</span>
                        <span>{weight['weight-meta'].weight}</span>
                      </div>
                      <div className="flex space-x-2">
                        <DestructiveButton
                          isLoading={deleteWeightIsLoading}
                          onClick={() =>
                            deleteWeightMutation({ id: weight.id })
                          }
                        >
                          Delete
                        </DestructiveButton>
                        <SecondaryButton onClick={() => setEditWeight(weight)}>
                          Edit
                        </SecondaryButton>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Dialog
        open={!!editWeight}
        onOpenChange={() => setEditWeight(undefined)}
        aria-labelledby="form-dialog-title"
      >
        <EditWeight editWeight={editWeight} setEditWeight={setEditWeight} />
      </Dialog>
    </Layout>
  );
}
