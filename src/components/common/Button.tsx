import Link from "next/link";
import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { LinkProps } from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  as?: "button" | "a";
  href?: string;
  icon?: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  className = "",
  as = "button",
  ...props
}) => {
  const baseStyles =
    "font-semibold px-3 text-base h-[44px] rounded-lg transition-colors duration-200 flex items-center justify-center gap-2";

  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-[#448AFF14] hover:bg-[#448AFF14] text-[#448AFF]",
  };
  const sizeStyles = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;

  if (as === "button") {
    return (
      <button
        className={buttonStyles}
        type={props?.type as "button" | "submit" | "reset" | undefined}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {props?.icon} {children}
      </button>
    );
  } else {
    return (
      <Link
        className={buttonStyles}
        {...(props as LinkProps)}
        href={props?.href || "#"}
      >
        {children}
      </Link>
    );
  }
};

export default Button;
