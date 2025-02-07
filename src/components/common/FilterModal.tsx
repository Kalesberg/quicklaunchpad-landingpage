const FilterModal: React.FC<{
  openModal: boolean | undefined;
  setOpenModal: (arg: boolean) => void;
}> = ({ openModal, setOpenModal }) => {
  return (
    openModal && (
      <div className="absolute top-[50px] left-0 w-[300px] h-[200px] bg-[#1b1e29] flex justify-center items-center z-999">
        Filter Modal
      </div>
    )
  );
};

export default FilterModal;
