import lightL1 from "../../../public/light_l1.svg";
import lightL2 from "../../../public/light_l2.svg";
import lightL3 from "../../../public/light_l3.svg";
import "./AnimatedCompInHome.css";

const AnimatedCompInHome = () => {
  return (
    <div className="">
      <div className="absolute right-0 top-[260px] md:top-[360px] animate-l3">
        <img src={lightL3} alt="LightL3 " />
      </div>

      <div className="absolute right-0 top-[260px] md:top-[390px] animate-l2">
        <img src={lightL2} alt="LightL2 " />
      </div>

      <div className="absolute right-0 top-[260px] md:top-[420px] animate-l1">
        <img src={lightL1} alt="LightL1" />
      </div>
    </div>
  );
};

export default AnimatedCompInHome;
