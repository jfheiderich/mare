"use client";

import React, { useState } from "react";
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
      />

      <button onClick={() => setIsDisabled((prev) => !prev)}>
        <Image src={PencilEditIcon} width={24} height={24} alt="lápis editor" />
      </button>
    </section>
  );
};

export default InputEdit;
