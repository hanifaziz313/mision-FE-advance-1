"use client";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

const Button = ({
  children,
  variant = "primary",
  className = "",
  href, // Prop baru untuk navigasi
  onClick, // Prop untuk handle click
  type = "button", // Default type untuk button
  disabled = false, // Status disabled
  loading = false, // Status loading
  ...props
}) => {
  const router = useRouter();

  // Variant styles
  const variants = {
    primary: "bg-[#3ECF4C] hover:bg-[#4acf3e] text-white",
    outline: "border border-[#28a745] text-[#28a745] hover:bg-[#f0fff4]",
    secondary: "bg-[#E2FCD9] text-green-600 border border-green-600 hover:bg-gray-100",
    dark: "bg-[#0F172A] text-white hover:bg-[#1E293B]",
    orange: "bg-[#F64920] text-white hover:bg-[#E53E1A]",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  // Handle click event
  const handleClick = (e) => {
    if (disabled || loading) return;

    if (onClick) {
      onClick(e);
    }

    if (href) {
      router.push(href);
    }
  };

  // Determine which variant class to use
  const variantClass = disabled || loading ? variants.disabled : variants[variant];

  return (
    <button type={type} className={`py-2 px-4 rounded-md transition duration-200 ${variantClass} ${className}`} onClick={handleClick} disabled={disabled || loading} aria-disabled={disabled || loading} {...props}>
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};

// Prop types validation
Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "outline", "secondary", "dark", "orange"]),
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  variant: "primary",
  className: "",
  type: "button",
  disabled: false,
  loading: false,
};

export default Button;
