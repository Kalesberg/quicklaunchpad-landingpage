import Checkbox from "components/common/Checkbox";

const ColumnsModal: React.FC<{
    openModal: boolean | undefined;
    setOpenModal: (arg: boolean) => void;
    columns: any
    setColumns: (arg: any) => void;
  }> = ({ openModal, setOpenModal, columns, setColumns }) => {



    const handleCheckboxChange = async (event: any) => {
        setColumns({
            ...columns,
            [event.target.id]: event.target.checked
        })
    }
  
    return (
      openModal && (<>
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
        <div className="fixed w-full h-full top-0 left-0 z-[99] " onClick={() => setOpenModal(false)}></div>
      </>
      )
    );
  };
  
export default ColumnsModal;
  