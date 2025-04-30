import Image from "next/image";
import Button from "../common/Button";

const HeroSection = ({ title, description, buttonText }) => {
  return (
    <div className="relative w-full h-[100vh] md:h-[400px] flex items-center justify-center rounded-lg overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image src="/d25fa2121b31a4ad14c9ebd02127f629.jpeg" alt="Background Hero" layout="fill" objectFit="cover" priority />
      </div>
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 w-[90%] md:w-[80%] p-0 md:p-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white">{title}</h2>
        <p className="text-lg font-dm-sans mt-4 text-white">{description}</p>
        <Button className="mt-6 px-6 py-3">{buttonText}</Button>
      </div>
    </div>
  );
};

export default HeroSection;
