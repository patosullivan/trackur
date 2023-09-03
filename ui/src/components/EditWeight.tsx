import { getLocalDateTimeString } from '@/logic/utils';
import { Weight, useEditWeightMutation } from '@/state/weights';
import { useForm } from 'react-hook-form';
import PrimaryButton from './PrimaryButton';

export default function EditWeight({
  editWeight,
  setEditWeight,
}: {
  editWeight: Weight | undefined;
  setEditWeight: React.Dispatch<React.SetStateAction<Weight | undefined>>;
}) {
  const { mutate: editWeightMutation } = useEditWeightMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    if (!editWeight) {
      return;
    }
    editWeightMutation({
      id: editWeight.id,
      date: new Date(data.date).getTime(),
      weight: parseInt(data.weight, 10),
    });
    setEditWeight(undefined);
  };

  if (!editWeight || !editWeight['weight-meta']) {
    return null;
  }

  const localDateTime = getLocalDateTimeString(
    new Date(editWeight['weight-meta'].date)
  );

  return (
    <>
      <h1>Edit Weight</h1>
      <div className="flex flex-col space-y-2">
        <span>
          To edit this weight, please enter the new start time and duration.
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-sm flex-col space-y-4"
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="editDate">Date</label>
            <input
              className="rounded-md border border-gray-300 p-2 dark:border-gray-700"
              type="datetime-local"
              id="editDate"
              defaultValue={localDateTime}
              {...register('date', { required: true })}
            />
            {errors.start && (
              <span className="text-red-500">This field is required</span>
            )}

            <label htmlFor="editWeight">Weight</label>
            <input
              className="rounded-md border border-gray-300 p-2 dark:border-gray-700"
              type="number"
              id="editWeight"
              defaultValue={editWeight['weight-meta'].weight}
              {...register('weight', { required: true })}
            />
            {errors.weight && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex space-x-2">
            <button className="button" onClick={() => setEditWeight(undefined)}>
              Cancel
            </button>
            <PrimaryButton type="submit">Save</PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
}
