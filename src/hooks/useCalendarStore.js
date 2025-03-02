import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onSetIsLoadingEvent, onLoadEvents } from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth)

    const setActiveEvent = (calendarEvent) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    }

    const startSavingEvent = async( calendarEvent ) => {
        if (calendarEvent._id) {
            dispatch(onUpdateEvent({...calendarEvent}));
        } else {
            dispatch(onSetIsLoadingEvent(true));
            try {
                const { data } = await calendarApi.post('/events/new', {...calendarEvent});
                dispatch( onAddNewEvent({...calendarEvent, id: data.event.id, user }) );    
            } catch (error) {
                console.log(error)
            } finally {
                dispatch(onSetIsLoadingEvent(false));
            }
        }
    }

    const startDeletingEvent = () => {
        dispatch( onDeleteEvent() )
    }

    const startLoadingEvents = async() => {
        dispatch(onSetIsLoadingEvent(true));
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.events);
            dispatch( onLoadEvents(events) );
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(onSetIsLoadingEvent(false));
        }
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents,
    }
}