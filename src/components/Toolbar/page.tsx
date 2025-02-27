import React, { useState } from "react";
import "./styles.scss";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface ToolbarProps {
  className?: string;
  buttons: ToolbarButton[];
}

export type ToolbarButton = {
  routerTo: string;
  text: string;
  icon: string;
  id: string;
  onClick?: () => void;
};

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { className, buttons } = props;
  const [activatedButtonId, setActivatedButton] = useState("");
  const router = useRouter();

  return (
    <nav id="toolbar-component" className={className ?? ""}>
      {buttons.map((btn, index, arr) => {
        return (
          <div className="toolbar-component__button-wrapper" key={btn.id}>
            <button
              className={`button-wrapper__button ${
                activatedButtonId === btn.id ? "activated" : ""
              }`}
              onClick={() => {
                btn.onClick?.();
                setActivatedButton(btn.id);
                router.push(btn.routerTo);
              }}
            >
              <Image
                width={100}
                height={100}
                src={btn.icon}
                alt={`${btn.text} icon`}
                className="button__icon"
              />
              <p className="button__text">{btn.text}</p>
            </button>
          </div>
        );
      })}
    </nav>
  );
};

export default Toolbar;
