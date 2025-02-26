import React from "react";
import "./styles.scss";
import Image from "next/image";

interface ParagraphProps {
  className?: string;
  text: string;
  iconLeft?: string;
  colorText?: "white" | "black";
  boldText?: boolean;
  fontSize?: 12 | 14 | 16 | 20 | 24;
  textAlign?:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
}

const Paragraph: React.FC<ParagraphProps> = (props) => {
  const {
    className,
    text,
    iconLeft,
    colorText,
    boldText,
    fontSize = 16,
    textAlign = "start",
  } = props;

  const classesParagraph = [
    className,
    colorText ? `text-color-${colorText}` : "",
    boldText ? "bold-text" : "",
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <p
      id={`paragraph-text`}
      style={{ fontSize, textAlign }}
      className={classesParagraph}
    >
      {iconLeft ? (
        <Image
          width={100}
          height={100}
          src={iconLeft}
          alt="text icon"
          style={{ width: fontSize, height: fontSize }}
        />
      ) : (
        false
      )}
      {text}
    </p>
  );
};

export default Paragraph;
