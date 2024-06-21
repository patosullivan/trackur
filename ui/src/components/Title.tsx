export default function Title({ children }: { children: string }) {
  return (
    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
      {children}
    </h1>
  );
}
