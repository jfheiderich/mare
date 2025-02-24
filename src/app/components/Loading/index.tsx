import React, { useEffect, useState } from "react";
import "./styles.scss";
import LoadingStep1 from "assets/loading/loading-step1.svg";
import LoadingStep2 from "assets/loading/loading-step2.svg";
import LoadingStep3 from "assets/loading/loading-step3.svg";
import LoadingStep4 from "assets/loading/loading-step4.svg";
import LoadingStep5 from "assets/loading/loading-step5.svg";
import LoadingStep6 from "assets/loading/loading-step6.svg";
import LoadingStep7 from "assets/loading/loading-step7.svg";
import LoadingStep8 from "assets/loading/loading-step8.svg";

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { className } = props;
  const [currentImg, setCurrentImg] = useState(0);

  const loopingLoading = [
    LoadingStep1,
    LoadingStep2,
    LoadingStep3,
    LoadingStep3,
    LoadingStep4,
    LoadingStep5,
    LoadingStep6,
    LoadingStep7,
    LoadingStep8,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % loopingLoading.length);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="loading-component" className={className ?? ""}>
      <img src={loopingLoading[currentImg]} alt="loading" />
    </div>
  );
};

export default Loading;
