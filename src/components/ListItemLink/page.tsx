"use client";
import React, { forwardRef, ReactNode } from "react";
import "./styles.scss";
import Image from "next/image";
import ArrowRight from "../../../public/icons/chevrons/chevron-right-dark-ocean-blue.svg";

interface ListItemLinkProps {
  className?: string;
  highlightText: string;
  simpleText?: string;
  imageLeft?: string;
  isImageCircle?: boolean;
  hasArrowRight?: boolean;
  onClick?: (a: any) => void;
  hasSeparator?: boolean;
  rightNodeContent?: ReactNode;
  iconFill?: boolean;
}

const ListItemLink = forwardRef<HTMLDivElement, ListItemLinkProps>(
  (props, ref) => {
    const {
      onClick,
      hasArrowRight,
      highlightText,
      imageLeft,
      isImageCircle,
      simpleText,
      className,
      hasSeparator,
      rightNodeContent,
      iconFill,
    } = props;

    const listItemClass = () => {
      if (imageLeft && !rightNodeContent) {
        return "column-for-image";
      } else if (imageLeft && rightNodeContent && hasArrowRight) {
        return "column-for-image-and-node";
      } else if (imageLeft && rightNodeContent && !hasArrowRight) {
        return "column-for-image-and-node-without-arrow";
      } else if (!imageLeft && rightNodeContent) {
        return "column-for-node";
      } else {
        return "";
      }
    };

    return (
      <div
        id="list-item-link"
        className={`${className ?? ""} ${listItemClass()}`}
        onClick={onClick}
        ref={ref}
      >
        {imageLeft && (
          <div
            className={`item__image-left-container ${
              isImageCircle ? "image-circle" : ""
            }`}
          >
            <Image
              width={100}
              height={100}
              src={imageLeft}
              alt="left icon"
              className={`item__left-icon ${iconFill ? "icon-fill" : ""}`}
            />
          </div>
        )}

        <div className="item__main-container">
          <p
            className="main-container__highlight-text no-margin"
            data-highlight
          >
            {highlightText}
          </p>
          {simpleText && (
            <p className="main-container__simple-text no-margin" data-simple>
              {simpleText}
            </p>
          )}
        </div>
        {rightNodeContent && (
          <section className="list-item-link__right-node">
            {rightNodeContent}
          </section>
        )}

        {hasArrowRight && (
          <Image width={100} height={100} src={ArrowRight} alt="arrow-right" />
        )}

        {hasSeparator && <div className="separator" />}
      </div>
    );
  }
);

export default ListItemLink;
