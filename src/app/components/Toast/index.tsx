import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useToast } from "hooks/useToast";
import IconInfo from "assets/icons/infos/info-icon-circle-red-blood.svg";
import IconCheck from "assets/icons/checks/check-icon-circle-dark-ocean-blue.svg";
import IconWarning from "assets/icons/infos/warning-icon-yellow.svg";
import CloseRed from "assets/icons/closes/close-icon-red-blood.svg";
import CloseOcenBlue from "assets/icons/closes/close-icon-dark-ocean-blue.svg";

const Toast: React.FC = () => {
  const { toastConfig, toastVisible } = useToast();
  const [toastState, setToastState] = useState("");
  console.log("toastVisible", toastVisible);

  useEffect(() => {
    if (toastVisible) {
      setToastState("show");
    } else {
      setToastState("hide");
    }
  }, [toastVisible]);

  useEffect(() => {
    if (toastState === "show" && toastConfig) {
      const timer = setTimeout(() => {
        setToastState("hide");
      }, toastConfig.timeout || 5000);

      return () => clearTimeout(timer);
    }
  }, [toastState, toastConfig]);

  if (!toastConfig) return null;

  const { type, title, description } = toastConfig;

  let toastStyle;
  let iconImage;
  switch (type) {
    case "success":
      toastStyle = "success";
      iconImage = IconCheck;
      break;
    // case "warning":
    //   toastStyle = "warning";
    //   iconImage = IconWarning;
    //   break;
    // case "info":
    //   toastStyle = "info";
    //   iconImage = IconInfo;
    //   break;
    case "error":
    default:
      toastStyle = "error";
      iconImage = IconInfo;
      break;
  }

  return (
    <div className={`toast-container ${toastStyle} ${toastState}`} role="alert">
      <figure className={`toast-container__icon-wrapper`}>
        <img src={iconImage} alt="info ícone" className="icon-wrapper__icon" />
      </figure>
      <div className="text-container">
        <p className="text-primary no-margin">{title}</p>
        <p className="text-secondary no-margin">{description}</p>
      </div>
    </div>
  );
};

export default Toast;
