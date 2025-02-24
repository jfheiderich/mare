import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import whiteWaves from "../../assets/icons/oceanLines/ocean-lines-white.svg";

interface SplashPageProps {
  backgroundColor: string;
  finishLoadingTrigger: () => void;
}

const SplashPage: React.FC<SplashPageProps> = (props) => {
  const { backgroundColor, finishLoadingTrigger } = props;
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 2000);

    const navigateTimeout = setTimeout(() => {
      finishLoadingTrigger();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(navigateTimeout);
    };
  }, [navigate]);

  return (
    <section
      style={{ backgroundColor }}
      className={`loading-page ${fade ? "hidden-fade-out" : ""}`}
    >
      <div className="loading-page__logo-container">
        <img src={whiteWaves} alt="Mare logo" />
      </div>
    </section>
  );
};

export default SplashPage;
