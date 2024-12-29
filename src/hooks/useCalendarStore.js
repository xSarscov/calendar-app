import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar)

    const setActiveEvent = (calendarEvent) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    }

    const startSavingEvent = async( calendarEvent ) => {
        if (calendarEvent._id) {
            dispatch(onUpdateEvent({...calendarEvent}));
        } else {
            dispatch( onAddNewEvent({...calendarEvent, _id: new Date().getTime() }) );
        }
    }

    const startDeletingEvent = () => {
        dispatch( onDeleteEvent() )
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
    }
}