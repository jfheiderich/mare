import React from "react";
import "./styles.scss";

interface LabelWithValueProps {
  className?: string;
  labelText: string;
  valueText: string;
}

const LabelWithValue: React.FC<LabelWithValueProps> = (props) => {
  const { className, labelText, valueText } = props;

  return (
    <div id="label-with-value" className={className ?? ""}>
      <p className="label-text">{labelText}</p>
      <p className="value-text">{valueText}</p>
    </div>
  );
};

export default LabelWithValue;
