import React, { ReactNode } from "react";
import "./styles.scss";

interface TitleProps {
  className?: string;
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  text: string | ReactNode;
}

const Title: React.FC<TitleProps> = (props) => {
  const { className, size, text } = props;

  const Size = size;

  const classesTitle = [className ?? "", `title-size-${size}`].join(" ").trim();

  return (
    <Size id={`title-text`} className={classesTitle}>
      {text}
    </Size>
  );
};

export default Title;
