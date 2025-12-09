export const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={`w-full rounded-lg bg-primary text-primary-foreground text-sm font-semibold py-2.5 disabled:opacity-50 ${props.className}`}
  >
    {children}
  </button>
);
