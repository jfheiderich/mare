import React from "react";
import "./styles.scss";

interface ButtonProps {
  className?: string;
  onClick: (prop: any) => void;
  buttonStyle: "primary" | "secondary" | "tertiary";
  iconLeft?: string;
  iconRight?: string;
  buttonText: string;
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    buttonStyle,
    onClick,
    iconLeft,
    iconRight,
    buttonText,
    isDisabled,
  } = props;

  const buttonClassesNames = ["button", buttonStyle, className]
    .map((btn) => btn?.trim())
    .join(" ")
    .trim();

  return (
    <button
      id="button-component"
      className={buttonClassesNames}
      onClick={onClick}
      disabled={isDisabled}
    >
      {iconLeft ? <img src={iconLeft} alt="icon button left" /> : false}
      <span className="button-component__text">{buttonText}</span>
      {iconRight ? <img src={iconRight} alt="icon button right" /> : false}
    </button>
  );
};

export default Button;
