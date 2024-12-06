import Image from "next/image";
import EmptyImage from "../../../../public/assets/images/stack.png";

export default function EmptyProfile() {
  return (
    <div className="mx-6 my-24 flex flex-col items-center justify-center">
      <Image
        src={EmptyImage.src}
        alt="empty"
        className=""
        width={128}
        height={128}
      />
      <p className="text-[#696C80] text-lg font-bold pt-10 pb-2">My Profile</p>
      <p className="text-[#696C80] text-sm">
        To see your profile details and KYC Status, please connect your wallet.
      </p>
    </div>
  );
}
