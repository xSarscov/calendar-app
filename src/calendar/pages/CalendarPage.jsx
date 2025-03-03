import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"

import { CalendarEvent, CalendarModal, Navbar, FabAddNew, FabDelete } from "../";
import { getMessagesES, localizer } from "../../helpers";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";

export const CalendarPage = () => {
	
	const { openDateModal, isDateModalOpen } = useUiStore();
	const { events, activeEvent, setActiveEvent, hasEventSelected, startLoadingEvents } = useCalendarStore();
	const { user } = useAuthStore();

	const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

	const eventStyleGetter = (event, start, end, isSelected) => {

		const style = {
			backgroundColor: event.user._id === user.uid ? "#347CF7" : "#465660",
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

	useEffect(() => {
	  startLoadingEvents();
	}, [])
	

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
			<FabAddNew />
			{
				hasEventSelected && (
					<FabDelete />
				)
			}
		</>
	);
};
