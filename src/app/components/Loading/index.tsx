"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import LoadingStep1 from "../../public/loading/loading-step1.svg";
import LoadingStep2 from "../../public/loading/loading-step2.svg";
import LoadingStep3 from "../../public/loading/loading-step3.svg";
import LoadingStep4 from "../../public/loading/loading-step4.svg";
import LoadingStep5 from "../../public/loading/loading-step5.svg";
import LoadingStep6 from "../../public/loading/loading-step6.svg";
import LoadingStep7 from "../../public/loading/loading-step7.svg";
import LoadingStep8 from "../../public/loading/loading-step8.svg";

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { className } = props;
  const [current<Image width={100} height={100} , setCurrent<Image width={100} height={100} ] = useState(0);

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
      setCurrent<Image width={100} height={100} ((prev) => (prev + 1) % loopingLoading.length);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="loading-component" className={className ?? ""}>
      <Image width={100} height={100}  src={loopingLoading[current<Image width={100} height={100} ]} alt="loading" />
    </div>
  );
};

export default Loading;
