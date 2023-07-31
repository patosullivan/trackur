import React from 'react';
import { IconProps } from './icon';

export default function HashIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        className="fill-current"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.124 3.00771c.5481.0685.9368.56829.8683 1.11631l-.4845 3.87596h3.9844l.5155-4.12403c.0685-.54802.5683-.93675 1.1163-.86824.5481.0685.9368.56829.8683 1.11631l-.4845 3.87596H19c.5523 0 1 .44772 1 1 0 .55229-.4477 1-1 1h-2.7422L15.7578 14H19c.5523 0 1 .4477 1 1s-.4477 1-1 1h-3.4922l-.5155 4.124c-.0685.548-.5683.9368-1.1163.8683-.5481-.0685-.9368-.5683-.8683-1.1164L13.4922 16H9.50778l-.5155 4.124c-.0685.548-.56829.9368-1.11631.8683s-.93675-.5683-.86825-1.1164L7.49222 16H5c-.55228 0-1-.4477-1-1s.44772-1 1-1h2.74222l.5-4.00002H5c-.55228 0-1-.44771-1-1 0-.55228.44772-1 1-1h3.49222l.5155-4.12403c.0685-.54802.56829-.93675 1.11628-.86824ZM13.7422 14l.5-4.00002h-3.9844L9.75778 14h3.98442Z"
      />
    </svg>
  );
}
