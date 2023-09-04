import LoadingSpinner from './LoadingSpinner';

export default function SecondaryButton({
  children,
  onClick,
  type = 'button',
  className,
  isLoading,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  isLoading?: boolean;
}) {
  return (
    <div className="flex items-center justify-center">
      <button
        className={`flex items-center justify-center space-x-4 rounded-md bg-black px-4 py-2 font-bold text-white hover:bg-gray-600 ${className}`}
        type={type}
        onClick={onClick}
        disabled={isLoading}
      >
        {children}
        {isLoading && (
          <LoadingSpinner className="ml-2 h-4 w-4" primary="text-blue-500" />
        )}
      </button>
    </div>
  );
}
