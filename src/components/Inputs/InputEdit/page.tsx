"use client";

import React, { useState } from "react";
import "./styles.scss";
import InputText from "../InputText/page";
import Button from "@/components/Buttons/Button";
import Image from "next/image";
import PencilEditIcon from "../../../../public/icons/pencil/edit-pencil-icon-black.svg";

interface InputEditProps {
  className?: string;
  valueInput: string;
  setValueInput: (value: string) => void;
  isWarning?: boolean;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "date" | undefined;
  mask?: string;
}

const InputEdit: React.FC<InputEditProps> = (props) => {
  const {
    className,
    setValueInput,
    valueInput,
    isWarning,
    label,
    mask,
    placeholder,
    type,
  } = props;
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <section id="input-edit" className={className ?? ""}>
      <InputText
        onChange={setValueInput}
        value={valueInput}
        isDisabled={!isDisabled}
        isWarning={isWarning}
        label={label}
        labelId={label}
        placeholder={placeholder}
        type={type}
        mask={mask}
        className="input-edit__input"
      />

      <button
        onClick={() => setIsDisabled((prev) => !prev)}
        className="input-edit__button"
      >
        <Image src={PencilEditIcon} width={20} height={20} alt="lápis editor" />
      </button>
    </section>
  );
};

export default InputEdit;
