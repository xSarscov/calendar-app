import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
	name: "calendar",
	initialState: {
		events: [],
		activeEvent: null,
		isLoadingEvents: false,
	},
	reducers: {
		onSetActiveEvent: (state, { payload }) => {
			state.activeEvent = payload;
		},
		onAddNewEvent: (state, { payload }) => {
			state.events.push(payload);
			state.activeEvent = null;
		},
		onUpdateEvent: (state, { payload }) => {
			state.events = state.events.map((event) => {
				if (event._id === payload._id) {
					return payload;
				}

				return event;
			});
		},
		onDeleteEvent: (state) => {
			if (state.activeEvent) {
				state.events = state.events.filter(
					(event) => event._id !== state.activeEvent._id
				);
				state.activeEvent = null;
			}
		},
		onSetIsLoadingEvent: (state, { payload }) => {
			state.isLoadingEvents = payload;
		},
		onLoadEvents: (state, { payload = [] }) => {
            payload.forEach(event => {
                const exists = state.events.some(e => e.id === event.id);
                if (!exists) {
                    state.events.push(event);
                }
            });
        },
	},
});

// Action creators are generated for each case reducer function
export const {
	onSetActiveEvent,
	onAddNewEvent,
	onUpdateEvent,
	onDeleteEvent,
	onSetIsLoadingEvent,
	onLoadEvents,
} = calendarSlice.actions;
