export default function CircleChart({
  percentageComplete,
  secondaryText,
}: {
  percentageComplete: number;
  secondaryText?: string;
}) {
  return (
    <svg
      viewBox="0 0 33.83098862 33.83098862"
      width="200"
      height="200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        stroke="#efefef"
        strokeWidth="2"
        fill="none"
        cx="16.91549431"
        cy="16.91549431"
        r="15.91549431"
      />
      <circle
        stroke="#00acc1"
        strokeWidth="2"
        strokeDasharray={`${percentageComplete}, 100`}
        strokeLinecap="round"
        fill="none"
        cx="16.91549431"
        cy="16.91549431"
        r="15.91549431"
      />
      <g>
        <text
          x="16.91549431"
          y="15.5"
          alignmentBaseline="central"
          textAnchor="middle"
          fontSize="8"
        >
          {percentageComplete}%
        </text>
        {secondaryText && (
          <text
            x="16.91549431"
            y="20.5"
            alignmentBaseline="central"
            textAnchor="middle"
            fontSize="2"
          >
            {secondaryText}
          </text>
        )}
      </g>
    </svg>
  );
}
