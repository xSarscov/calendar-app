import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {

  const { startDeletingEvent } = useCalendarStore();

  const handleClick = () => {
    startDeletingEvent();
  }

  return (
		<button 
      onClick={handleClick} 
      className="btn btn-danger fab-danger"
    >
			<i className="fas fa-trash-alt"></i>
		</button>
	);
};
