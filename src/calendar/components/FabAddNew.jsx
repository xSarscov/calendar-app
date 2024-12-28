import { addHours } from "date-fns";
import { useUiStore, useCalendarStore } from "../../hooks";

export const FabAddNew = () => {

  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClick = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        id: "123",
        name: "Ernesto"
      }
    })
    openDateModal();
  }

  return (
		<button 
      onClick={handleClick} 
      className="btn btn-primary fab"
    >
			<i className="fas fa-plus"></i>
		</button>
	);
};
