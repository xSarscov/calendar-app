import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch();
    const { isDateModalOpen } = useSelector(state => state.ui);

    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }

    const toggleDateModal = () => {
        if (isDateModalOpen) {
            openDateModal()
        } else {
            closeDateModal()
        }
    }

    return {
        isDateModalOpen,

        openDateModal,
        closeDateModal,
        toggleDateModal,
    }
}