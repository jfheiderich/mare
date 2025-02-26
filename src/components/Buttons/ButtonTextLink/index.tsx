"use client";
import React from "react";
import "./styles.scss";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import chevronLeftIcon from "../../public/icons/chevrons/chevron-right-dark-ocean-blue.svg";

interface ButtonTextLinkProps {
  className?: string;
  onClick?: () => void;
  text: string;
  isBackButton?: boolean;
  routeTo?: string;
  buttonStyle?: "bold-20" | "light-14";
  isDisabled?: boolean;
  alignTo?: "center" | "right" | "left";
}

const ButtonTextLink: React.FC<ButtonTextLinkProps> = (props) => {
  const {
    onClick,
    className,
    text,
    routeTo,
    isBackButton,
    buttonStyle = "light-14",
    isDisabled,
    alignTo,
  } = props;
  const router = useRouter();

  const clickHandler = () => {
    if (onClick) {
      onClick();
    } else if (routeTo) {
      router.push(routeTo);
    } else if (!routeTo && isBackButton) {
      router.push(-1);
    }
  };

  const buttonTextLinkClasses = [`align-to-${alignTo}`, className ?? ""]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <button
      onClick={clickHandler}
      id="button-text-link"
      className={buttonTextLinkClasses}
      disabled={isDisabled}
    >
      {isBackButton ? (
        <Image
          width={100}
          height={100}
          src={chevronLeftIcon}
          alt="chevron left icon"
        />
      ) : (
        false
      )}
      <p className={`button-text-link__text ${buttonStyle}`}>{text}</p>
    </button>
  );
};

export default ButtonTextLink;
