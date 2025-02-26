"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import whiteWaves from "../../../public/icons/oceanLines/ocean-lines-white.svg";

interface SplashPageProps {
  backgroundColor: string;
  finishLoadingTrigger: () => void;
}

const SplashPage: React.FC<SplashPageProps> = (props) => {
  const { backgroundColor, finishLoadingTrigger } = props;
  const [fade, setFade] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 2000);

    const navigateTimeout = setTimeout(() => {
      finishLoadingTrigger();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(navigateTimeout);
    };
  }, [router]);

  return (
    <section
      style={{ backgroundColor }}
      className={`loading-page ${fade ? "hidden-fade-out" : ""}`}
    >
      <div className="loading-page__logo-container">
        hi
        <Image src={whiteWaves} alt="Mare logo" width={100} height={100} />
      </div>
    </section>
  );
};

export default SplashPage;
