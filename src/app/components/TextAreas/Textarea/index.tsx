import React from "react";
import "./styles.scss";

interface TextareaProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  label?: string;
  isWarning?: boolean;
  labelId?: string;
  disabled?: boolean;
}

const Textarea: React.FC<TextareaProps> = (props) => {
  const {
    className,
    onChange,
    value,
    cols = 30,
    placeholder,
    maxLength,
    rows = 7,
    label,
    isWarning,
    labelId,
    disabled,
  } = props;

  return (
    <label
      id="text-area"
      className={className ?? ""}
      htmlFor={labelId ?? label}
    >
      {label ? (
        <span
          className={`text-area__label ${isWarning ? "label-warning" : ""}`}
        >
          {label}
        </span>
      ) : (
        false
      )}
      <div className="text-area__wrapper">
        <textarea
          className={`text-area__wrapper__input ${
            isWarning ? "input-warning" : ""
          }`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          cols={cols}
          maxLength={maxLength}
          placeholder={placeholder}
          name={labelId ?? label}
          id={labelId ?? label}
          disabled={disabled}
        />
      </div>
    </label>
  );
};

export default Textarea;
