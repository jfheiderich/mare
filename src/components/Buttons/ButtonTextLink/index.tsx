import React from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import chevronLeftIcon from "assets/icons/chevrons/chevron-right-dark-ocean-blue.svg";

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
  const navigate = useNavigate();

  const clickHandler = () => {
    if (onClick) {
      onClick();
    } else if (routeTo) {
      navigate(routeTo);
    } else if (!routeTo && isBackButton) {
      navigate(-1);
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
        <img src={chevronLeftIcon} alt="chevron left icon" />
      ) : (
        false
      )}
      <p className={`button-text-link__text ${buttonStyle}`}>{text}</p>
    </button>
  );
};

export default ButtonTextLink;
