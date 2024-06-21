export default function PreviousList({
  items: items,
  itemLabel,
  loading,
  itemComponent,
}: {
  items: any[];
  itemLabel: string;
  loading: boolean;
  itemComponent: React.FC<{ item: any; i: number }>;
}) {
  return (
    <>
      <hr className="mt-4 w-full border-2" />
      <div className="mt-4 flex flex-col space-y-2">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Previous {itemLabel}s
        </h2>

        <div className="flex flex-col space-y-2">
          {loading ? (
            <span>Loading...</span>
          ) : (
            items
              .reverse()
              .map((item, i) => itemComponent({ item, i }) as React.ReactNode)
          )}
        </div>
      </div>
    </>
  );
}
