import React, { useRef, useState, useEffect } from "react";
import "./styles.scss";
import Image from "next/image";
import InputText from "../InputText/page";
import ListItemLink from "@/components/ListItemLink/page";
import ArrowDown from "../../../../public/icons/chevrons/chevron-down-dark-blue.svg";
import ArrowUp from "../../../../public/icons/chevrons/chevron-up-dark-blue.svg";

interface InputTextSelectProps {
  className?: string;
  disabled?: boolean;
  options: IOptionInputTextSelectProps[];
  inputPlaceholder?: string;
  isWarning?: boolean;
  inputValue: string;
  setInputValue: (a: any) => void;
  label?: string;
  searchOptions?: boolean;
}

export interface IOptionInputTextSelectProps {
  label: string;
  detailsText?: string;
  value: string;
  disabled?: boolean;
  optionImage?: string;
}

const InputTextSelect: React.FC<InputTextSelectProps> = (props) => {
  const {
    className,
    disabled,
    options,
    inputPlaceholder,
    isWarning,
    inputValue,
    setInputValue,
    label,
    searchOptions,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option: IOptionInputTextSelectProps) => {
    setInputValue(option.value);
    setIsOpen(false);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setIsOpen(true);
  };

  const filteredOptions = searchOptions
    ? options.filter(
        (option) =>
          option.label?.toLowerCase().startsWith(inputValue?.toLowerCase()) ||
          option.value?.toLowerCase().startsWith(inputValue?.toLowerCase())
      )
    : options;

  return (
    <div id="input-text-select" className={className ?? ""} ref={dropdownRef}>
      <InputText
        placeholder={inputPlaceholder}
        onChange={handleInputChange}
        onClick={() => setIsOpen((prev) => !prev)}
        value={inputValue}
        type="text"
        className="input-text-select__input"
        iconRight={isOpen ? ArrowUp : ArrowDown}
        isWarning={isWarning}
        label={label}
        iconRightClick={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && !disabled && (searchOptions || filteredOptions.length > 0) && (
        <div className="input-text-select__dropdown-wrapper">
          <ul className="input-text-select__dropdown-list-ul no-padding">
            {(searchOptions ? filteredOptions : options).map(
              (option, index) => (
                <li key={index} className="input-text-select__dropdown-list-li">
                  <ListItemLink
                    highlightText={option.label}
                    simpleText={option.detailsText}
                    hasArrowRight
                    onClick={() => handleOptionSelect(option)}
                  />
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InputTextSelect;
