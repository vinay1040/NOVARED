function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "font-semibold px-5 py-2.5 rounded-full transition-all duration-200";
  const variants = {
    primary: "bg-red-800 text-white hover:bg-red-900 hover:shadow-md",
    outline: "border border-red-800 text-red-800 hover:bg-red-50",
    dark: "bg-neutral-900 text-white hover:bg-neutral-800",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
export default Button;