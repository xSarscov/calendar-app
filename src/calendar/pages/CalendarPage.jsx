import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"
import { CalendarEvent, CalendarModal, Navbar } from "../";
import { getMessagesES, localizer } from "../../helpers";
import { useState } from "react";
import { useUiStore, useCalendarStore } from "../../hooks";

export const CalendarPage = () => {
	
	const { openDateModal, } = useUiStore();
	const { events, activeEvent, setActiveEvent } = useCalendarStore();

	const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

	const eventStyleGetter = (event, start, end, isSelected) => {
		console.log({event, start, end, isSelected});

		const style = {
			backgroundColor: "#347CF7",
			borderRadius: "0px",
			opacity: .8,
			color: "white"
		}

		return {
			style
		}
	}
	
	const onDoubleClick = (event) => {
		openDateModal()
	}

	const onSelect = (event) => {
		setActiveEvent(event);
	}

	const onViewChanged = (event) => {
		localStorage.setItem('lastView', event);
		setLastView(event)
	}

	return (
		<>
			<Navbar />
			<Calendar
				culture="es"
				localizer={localizer}
				events={events}
				defaultView={ lastView }
				startAccessor="start"
				endAccessor="end"
				style={{ height: "calc(100% - 80px)" }}
				messages={ getMessagesES() }
				eventPropGetter={ eventStyleGetter }
				components={{
					event: CalendarEvent
				}}
				onDoubleClickEvent={ onDoubleClick }
				onSelectEvent={ onSelect }
				onView={ onViewChanged }
			/>
			<CalendarModal />
		</>
	);
};
