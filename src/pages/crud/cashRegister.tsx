import {GenericPage} from "./crudPage";
import {CashRegister} from "../../@types/CashRegister";
import {CashRegisterList} from "../../components/cash/cashRegisterList";
import CashRegisterForm from "../../components/cash/cashRegisterForm";
import {useState} from "react";
import {Box} from "@mui/system";
import {Modal} from "@mui/material";
import CashRegisterDetail from "../../components/cash/cashRegisterDetail";

export const CashRegisterPage: React.FC = () => {
    const [openHistoryModal, setOpenHistoryModal] = useState<CashRegister | null>(null);
    const  openingHistoryModal = (cashRegister: CashRegister) => {
        setOpenHistoryModal(cashRegister);
    }
    const closeHistoryModal = () => {
        setOpenHistoryModal(null);
    }

    return (
        <Box>
            <GenericPage
                endpoint='cash-register'
                defaultItem={{
                    cashRegisterId: 0,
                    initialBalance: 0,
                    currentBalance: 0,
                    openDate: new Date(),
                } as CashRegister}
                formComponent={(props)=><CashRegisterForm onCancel={props.onCancel} onSubmit={props.onSubmit} selectedItem={props.selectedItem}/>}
                listComponent={(props)=><CashRegisterList openHistoryModal={openingHistoryModal} setSelected={props.setSelected} items={props.items}/>}
            />
            {
                openHistoryModal &&
                <Modal open={openHistoryModal !== null} onClose={closeHistoryModal}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',  bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, }}>
                        <CashRegisterDetail cashRegisterSelected={openHistoryModal} />
                    </Box>
                </Modal>
            }
        </Box>
    );
};
