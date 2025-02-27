"use client";
import React from "react";
import "./styles.scss";
import Image from "next/image";

interface GridButtonsProps {
  className?: string;
  buttons: ButtonGrid[];
}

export type ButtonGrid = {
  icon: string;
  action: () => void;
  text: string;
  id: string;
};

const GridButtons: React.FC<GridButtonsProps> = (props) => {
  const { className, buttons } = props;

  return (
    <section id="grid-buttons" className={className ?? ""}>
      {buttons.map((btn, index, arr) => (
        <button
          key={btn.id}
          className="grid-buttons__button"
          onClick={btn.action}
        >
          <div className="button__icon">
            <Image
              width={30}
              height={30}
              src={btn.icon}
              alt={btn.text}
              className="icon__icon"
            />
          </div>

          <p className="button__text">{btn.text}</p>
        </button>
      ))}
    </section>
  );
};

export default GridButtons;
