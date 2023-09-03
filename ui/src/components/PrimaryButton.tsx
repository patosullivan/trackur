export default function PrimaryButton({
  children,
  onClick,
  type = 'button',
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}) {
  return (
    <button
      className={`rounded-md bg-blue-500 py-2 px-3 font-bold text-white hover:bg-blue-700 ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
