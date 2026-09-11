interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <circle cx="16" cy="8" r="6" className="fill-amber-400/20 blur-xs" />

      <path
        d="M16 3.5C13.7909 3.5 12 5.29086 12 7.5C12 8.88406 12.7007 10.1045 13.7656 10.8235C14.2153 11.1272 14.5 11.6091 14.5 12.1522V12.5H17.5V12.1522C17.5 11.6091 17.7847 11.1272 18.2344 10.8235C19.2993 10.1045 20 8.88406 20 7.5C20 5.29086 18.2091 3.5 16 3.5Z"
        className="fill-amber-400"
      />
      <rect
        x="14.5"
        y="13"
        width="3"
        height="1.2"
        rx="0.6"
        className="fill-zinc-400"
      />

      <rect
        x="11"
        y="15.5"
        width="10"
        height="2.5"
        rx="1"
        className="fill-indigo-400"
      />
      <rect x="14" y="15.5" width="4" height="11" className="fill-indigo-400" />
      <rect
        x="11"
        y="24"
        width="10"
        height="2.5"
        rx="1"
        className="fill-indigo-400"
      />
    </svg>
  );
}
