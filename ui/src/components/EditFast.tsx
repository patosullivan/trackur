import { getLocalDateTimeString } from '@/logic/utils';
import { Fast, useEditFastMutation } from '@/state/fasts';
import { useForm } from 'react-hook-form';

export default function EditFast({
  editFast,
  setEditFast,
}: {
  editFast: Fast | undefined;
  setEditFast: React.Dispatch<React.SetStateAction<Fast | undefined>>;
}) {
  const { mutate: editFastMutation } = useEditFastMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    if (!editFast) {
      return;
    }
    editFastMutation({
      id: editFast.id,
      start: new Date(data.start).getTime(),
      end: new Date(data.end).getTime(),
    });
    setEditFast(undefined);
  };

  if (!editFast || !editFast['fast-meta'] || !editFast['fast-meta'].end) {
    return null;
  }

  const localStartTime = getLocalDateTimeString(
    new Date(editFast['fast-meta'].start)
  );
  const localEndTime = getLocalDateTimeString(
    new Date(editFast['fast-meta'].end)
  );

  return (
    <>
      <h1>Edit Fast</h1>
      <div className="flex flex-col space-y-2">
        <span>
          To edit this fast, please enter the new start time and duration.
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-sm flex-col space-y-4"
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="editStart">Start</label>
            <input
              className="rounded-md border border-gray-300 p-2 dark:border-gray-700"
              type="datetime-local"
              id="editStart"
              defaultValue={localStartTime}
              {...register('start', { required: true })}
            />
            {errors.start && (
              <span className="text-red-500">This field is required</span>
            )}

            <label htmlFor="editEnd">End</label>
            <input
              className="rounded-md border border-gray-300 p-2 dark:border-gray-700"
              type="datetime-local"
              id="editEnd"
              defaultValue={localEndTime}
              {...register('end', { required: true })}
            />
          </div>
          <div className="flex space-x-2">
            <button
              className="button"
              onClick={() => setEditFast(undefined)}
              color="primary"
            >
              Cancel
            </button>
            <button className="button" color="primary" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
