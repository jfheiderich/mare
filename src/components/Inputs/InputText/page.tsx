"use client";
import React from "react";
import "./styles.scss";
import Image from "next/image";
import VMasker from "vanilla-masker";

interface InputTextProps {
  className?: string;
  value: string;
  labelId?: string;
  onChange: (event: string) => void;
  label?: string;
  iconRight?: string;
  iconRightClick?: () => void;
  iconLeft?: string;
  isWarning?: boolean;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "date";
  isDisabled?: boolean;
  mask?: string;
  onClick?: React.MouseEventHandler<HTMLLabelElement> | undefined;
}

const InputText: React.FC<InputTextProps> = (props) => {
  const {
    className,
    labelId,
    value,
    onChange,
    label,
    iconLeft,
    iconRight,
    iconRightClick,
    isWarning,
    placeholder,
    type = "text",
    isDisabled,
    mask,
    onClick,
  } = props;

  const inputTextClassNames = [
    className,
    "input-text-class",
    isWarning ? "warning-input-text" : "",
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <label
      id="input-text"
      className={inputTextClassNames}
      htmlFor={labelId ?? label}
      onClick={onClick}
    >
      {label ? (
        <span
          className={`input-text__label ${isWarning ? "label-warning" : ""}`}
        >
          {label}
        </span>
      ) : (
        false
      )}

      <div className="input-text__input-wrapper">
        {iconLeft ? (
          <div className="input-wrapper__icon-left-wrapper">
            <Image
              width={100}
              height={100}
              src={iconLeft}
              alt="input icon left"
            />
          </div>
        ) : (
          false
        )}

        <input
          disabled={isDisabled}
          className={`input-wrapper__input ${isWarning ? "warning-input" : ""}`}
          type={type}
          name={labelId ?? label}
          id={labelId ?? label}
          value={value}
          onChange={(e) => {
            if (mask) {
              onChange(VMasker.toPattern(e.target.value, mask));
            } else {
              onChange(e.target.value);
            }
          }}
          placeholder={placeholder}
        />
        {iconRight ? (
          <div
            className={`input-wrapper__icon-right-wrapper ${
              iconRightClick ? "cursor-pointer" : ""
            }`}
          >
            <Image
              width={24}
              height={24}
              src={iconRight}
              alt="input icon right"
              onClick={iconRightClick}
            />
          </div>
        ) : (
          false
        )}
      </div>
    </label>
  );
};

export default InputText;
