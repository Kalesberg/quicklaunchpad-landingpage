import Checkbox from "components/common/Checkbox";

const ColumnsModal: React.FC<{
    openModal: boolean | undefined;
    setOpenModal: (arg: boolean) => void;
    columns: any
    setColumns: (arg: any) => void;
  }> = ({ openModal, setOpenModal, columns, setColumns }) => {



    const handleCheckboxChange = async (event: any) => {
        console.log(event.target.checked);
        console.log(event.target.id);

        setColumns({
            ...columns,
            [event.target.id]: event.target.checked
        })
    }
  
    return (
      openModal && (
        <div className="absolute top-[60px] left-0 w-[220px] bg-[#1b1e29] shadow-sm shadow-slate-800 p-4 rounded-2xl z-[999]">
          {Object.keys(columns).map((key) =>
          <div className="mt-3">
            <Checkbox
                label={key}
                id={key}
                checked={columns[key]}
                handleCheckboxChange = {handleCheckboxChange}
            />
          </div>
          )}
        </div>
      )
    );
  };
  
export default ColumnsModal;
  