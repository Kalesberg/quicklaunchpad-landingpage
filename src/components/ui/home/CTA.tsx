import Button from "components/common/Button";
import Image from "next/image";
import React from "react";

const CTA: React.FC = () => {
  return (
    <section className="relative z-10 text-center mt-16 mb-28 py-28 rounded-3xl overflow-hidden">
      <div className="backdrop-blur-[128px] h-full w-full bg-[#1B1E29] absolute top-0 left-0 -z-[1] opacity-95 rounded-3xl"></div>
      <Image
        src="/assets/images/4dee09caf5949d0260bcdbb0b8e9a52a.png"
        alt="icon"
        width={69}
        height={69}
        className="absolute -top-[10px] left-[223px] -z-10"
      />
      <Image
        src="/assets/images/4dee09caf5949d0260bcdbb0b8e9a52a.png"
        alt="icon"
        width={107}
        height={107}
        className="absolute top-[25px] left-[1156px] -z-10"
      />
      <Image
        src="/assets/images/16d9b2619ca2ede7a727ce0ca4123322.png"
        alt="icon"
        width={100}
        height={100}
        className="absolute top-[214px] left-[242px] -z-10"
      />
      <Image
        src="/assets/images/16d9b2619ca2ede7a727ce0ca4123322.png"
        alt="icon"
        width={142}
        height={142}
        className="absolute top-[336px] left-[854px] -z-10"
      />
      <Image
        src="/assets/images/61f9cecdd6b70427d57f664b3019cfbe.png"
        alt="icon"
        width={99}
        height={99}
        className="absolute top-[357px] -z-10"
      />
      <Image
        src="/assets/images/61f9cecdd6b70427d57f664b3019cfbe.png"
        alt="icon"
        width={99}
        height={99}
        className="absolute -top-10 left-[563px] -z-10"
      />
      <Image
        src="/assets/images/61f9cecdd6b70427d57f664b3019cfbe.png"
        alt="icon"
        width={63}
        height={63}
        className="absolute top-[314px] left-[1071px] -z-10"
      />
      <Image
        src="/assets/images/e8f7a8bf48ae1f7d705385eaec5ed919.png"
        alt="icon"
        width={74}
        height={74}
        className="absolute top-24 left-[62px] -z-10"
      />
      <Image
        src="/assets/images/e8f7a8bf48ae1f7d705385eaec5ed919.png"
        alt="icon"
        width={94}
        height={94}
        className="absolute top-[149px] left-[997px] -z-10"
      />
      <h2 className="text-6xl font-bold mb-4 max-w-[650px] mx-auto">
        Want to be a part of our launchpads?
      </h2>
      <div className="flex items-center justify-center gap-4 mt-[50px]">
        <Button
          variant="primary"
          size="medium"
          className="max-w-[141px] w-full"
        >
          Apply to raise
        </Button>
        <Button
          variant="secondary"
          size="medium"
          className="max-w-[115px] w-full bg-[#EBECF2] text-black"
        >
          Learn more
        </Button>
      </div>
    </section>
  );
};

export default CTA;
