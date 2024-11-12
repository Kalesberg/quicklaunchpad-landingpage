import Button from "components/common/Button";
import Image from "next/image";
import React from "react";

const CTA: React.FC = () => {
  return (
    <section className="relative z-10 text-center mb-[88px] lg:mb-[120px] py-10 px-4 md:px-0 mx-4 lg:mx-0 rounded-2xl lg:rounded-3xl overflow-hidden" style={{ WebkitMaskImage: '-webkit-radial-gradient(circle, white 100%, black 100%)', WebkitTransform: 'translateZ(0)'}}>
      <div className="backdrop-blur-[128px] h-full w-full bg-[#1B1E29] absolute top-0 left-0 -z-[1] opacity-95 rounded-2xl lg:rounded-3xl overflow-hidden"></div>
      <Image
        src="/assets/images/4dee09caf5949d0260bcdbb0b8e9a52a.png"
        alt="icon"
        width={62}
        height={58}
        className="block lg:hidden absolute -top-[10px] -left-[4px] -z-10"
      />
      <Image
        src="/assets/images/4dee09caf5949d0260bcdbb0b8e9a52a.png"
        alt="icon"
        width={62}
        height={58}
        className="block lg:hidden absolute -bottom-[10px] -right-[26px] -z-10"
      />
      <Image
        src="/assets/images/16d9b2619ca2ede7a727ce0ca4123322.png"
        alt="icon"
        width={57}
        height={54}
        className="block lg:hidden absolute -bottom-[14px] left-[16px] -z-10"
      />
      <Image
        src="/assets/images/16d9b2619ca2ede7a727ce0ca4123322.png"
        alt="icon"
        width={81}
        height={75}
        className="block lg:hidden absolute top-1/3 -right-[30px] -z-10"
      />
      <Image
        src="/assets/images/61f9cecdd6b70427d57f664b3019cfbe.png"
        alt="icon"
        width={70}
        height={65}
        className="block lg:hidden absolute top-1/2 -left-[30px] -z-10"
      />
      <Image
        src="/assets/images/61f9cecdd6b70427d57f664b3019cfbe.png"
        alt="icon"
        width={70}
        height={65}
        className="block lg:hidden absolute -top-9 right-10 -z-10"
      />
      <Image
        src="/assets/images/4dee09caf5949d0260bcdbb0b8e9a52a.png"
        alt="icon"
        width={69}
        height={69}
        className="hidden lg:block absolute -top-[10px] left-[223px] -z-10"
      />
      <Image
        src="/assets/images/4dee09caf5949d0260bcdbb0b8e9a52a.png"
        alt="icon"
        width={107}
        height={107}
        className="hidden lg:block absolute top-[25px] left-[1156px] -z-10"
      />
      <Image
        src="/assets/images/16d9b2619ca2ede7a727ce0ca4123322.png"
        alt="icon"
        width={100}
        height={100}
        className="hidden lg:block absolute top-[214px] left-[242px] -z-10"
      />
      <Image
        src="/assets/images/16d9b2619ca2ede7a727ce0ca4123322.png"
        alt="icon"
        width={142}
        height={142}
        className="hidden lg:block absolute top-[336px] left-[854px] -z-10"
      />
      <Image
        src="/assets/images/61f9cecdd6b70427d57f664b3019cfbe.png"
        alt="icon"
        width={99}
        height={99}
        className="hidden lg:block absolute top-[357px] -z-10"
      />
      <Image
        src="/assets/images/61f9cecdd6b70427d57f664b3019cfbe.png"
        alt="icon"
        width={99}
        height={99}
        className="hidden lg:block absolute -top-10 left-[563px] -z-10"
      />
      <Image
        src="/assets/images/61f9cecdd6b70427d57f664b3019cfbe.png"
        alt="icon"
        width={63}
        height={63}
        className="hidden lg:block absolute top-[314px] left-[1071px] -z-10"
      />
      <Image
        src="/assets/images/e8f7a8bf48ae1f7d705385eaec5ed919.png"
        alt="icon"
        width={74}
        height={74}
        className="hidden lg:block absolute top-24 left-[62px] -z-10"
      />
      <Image
        src="/assets/images/e8f7a8bf48ae1f7d705385eaec5ed919.png"
        alt="icon"
        width={94}
        height={94}
        className="hidden lg:block absolute top-[149px] left-[997px] -z-10"
      />
      <h2 className="text-[#EBECF2] text-2xl lg:text-[30px] font-bold leading-8 lg:leading-9 mb-8 max-w-full mx-auto px-6">
      Ready to launch your project on Polygon with QuickLaunch? Apply below!
      </h2>
      <div className="flex items-center justify-center mt-6 lg:mt-[50px]">
        <Button
          variant="primary"
          size="medium"
          className="max-w-[250px] !h-12 w-full !bg-[#448AFF]"
        >
          Apply now
        </Button>
      </div>
    </section>
  );
};

export default CTA;
