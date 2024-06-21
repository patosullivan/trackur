import { Link } from 'react-router-dom';
import CaretLeftIcon from '@/components/icons/CaretLeftIcon';

export default function Header({
  to = '..',
  label = 'Back',
}: {
  to?: string;
  label?: string;
}) {
  return (
    <div className="flex w-full items-center justify-between">
      <Link to={to} className="flex items-center space-x-2">
        <CaretLeftIcon className="h-6 w-6" />
        <span>{label}</span>
      </Link>
    </div>
  );
}
