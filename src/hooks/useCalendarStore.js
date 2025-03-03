import { useDispatch, useSelector } from "react-redux";
import {
	onSetActiveEvent,
	onAddNewEvent,
	onUpdateEvent,
	onDeleteEvent,
	onSetIsLoadingEvent,
	onLoadEvents,
} from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector((state) => state.calendar);
	const { user } = useSelector((state) => state.auth);

	const setActiveEvent = (calendarEvent) => {
		dispatch(onSetActiveEvent(calendarEvent));
	};

	const startSavingEvent = async (calendarEvent) => {
		
        dispatch(onSetIsLoadingEvent(true));
        try {
			if (calendarEvent.id) {
				await calendarApi.put(
					`/events/${calendarEvent.id}`,
					calendarEvent
				);
				dispatch(onUpdateEvent({ ...calendarEvent, user: { _id: user.uid, name: user.name } }));

                Swal.fire({
                    title: 'Success',
                    text: 'Event has been updated.',
                    heightAuto: false,
                    icon: 'success',
                });

				return;
			}

			const { data } = await calendarApi.post("/events/new", {
				...calendarEvent,
			});

			dispatch(
				onAddNewEvent({ ...calendarEvent, id: data.event.id, user: { _id: user.uid, name: user.name } })
			);

            Swal.fire({
                title: 'Success',
                text: 'Event has been created.',
                heightAuto: false,
                icon: 'success',
            });
		} catch (error) {
			Swal.fire({
                title: 'Error',
                text: error.msg,
                heightAuto: false,
                icon: 'error',
            })
		} finally {
            dispatch(onSetIsLoadingEvent(false));
        }
	};

	const startDeletingEvent = async() => {
        if (!activeEvent) return;

        dispatch(onSetIsLoadingEvent(true));

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);

    		dispatch(onDeleteEvent());

            Swal.fire({
                title: 'Success',
                text: 'Event has been removed.',
                heightAuto: false,
                icon: 'success',
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.msg,
                heightAuto: false,
                icon: 'error',
            })
        } finally {
            dispatch(onSetIsLoadingEvent(true));
        }

	};

	const startLoadingEvents = async () => {
		dispatch(onSetIsLoadingEvent(true));
		try {
			const { data } = await calendarApi.get("/events");
			const events = convertEventsToDateEvents(data.events);
			dispatch(onLoadEvents(events));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(onSetIsLoadingEvent(false));
		}
	};

	return {
		events,
		activeEvent,
		hasEventSelected: !!activeEvent,

		startDeletingEvent,
		setActiveEvent,
		startSavingEvent,
		startLoadingEvents,
	};
};
