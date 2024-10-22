import EmptyImage from "../../../../public/assets/images/stack.png";

export default function EmptyProfile() {
  return (
    <div className="mx-6 my-24 flex flex-col items-center justify-center">
      <img src={EmptyImage.src} alt="empty" className="" />
      <p className="text-[#696C80] text-lg font-bold pt-10 pb-2">My Profile</p>
      <p className="text-[#696C80] text-sm">
        To see your profile details and KYC Status, please connect your wallet.
      </p>
    </div>
  );
}
