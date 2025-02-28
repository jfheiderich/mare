"use client";
import React from "react";
import "./styles.scss";
import Image from "next/image";

interface ButtonProps {
  className?: string;
  onClick: (prop: any) => void;
  buttonStyle: "primary" | "secondary" | "tertiary";
  iconLeft?: string;
  iconRight?: string;
  buttonText?: string;
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
      {iconLeft ? (
        <Image width={100} height={100} src={iconLeft} alt="icon button left" />
      ) : (
        false
      )}
      <span className="button-component__text">{buttonText}</span>
      {iconRight ? (
        <Image
          width={100}
          height={100}
          src={iconRight}
          alt="icon button right"
        />
      ) : (
        false
      )}
    </button>
  );
};

export default Button;
