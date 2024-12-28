import { useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { addHours, differenceInSeconds } from "date-fns";
import { es } from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks";
import { useEffect } from "react";

registerLocale('es', es)

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

Modal.setAppElement("#root");

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, setActiveEvent } = useCalendarStore()

    const [formValues, setFormValues] = useState({
        title: '',
        notes:  '',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return ( formValues.title.length > 0 )
        ? 'is-valid'
        : 'is-invalid';

    }, [formSubmitted, formValues.title])

    useEffect(() => {
        if (activeEvent) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent])
    

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

	const onCloseModal = () => {
		closeDateModal();
	};

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds( formValues.end,formValues.start )
        if (isNaN(difference) || difference <= 0 || !formValues.start && !formValues.end ) {
            Swal.fire({
                title: 'Error',
                text: 'Invalid dates.',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return;
        }

        if (formValues.title.length === 0) {
            return;
        }

        console.log({event})
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
            className={"modal"}
            overlayClassName={"modal-fondo"}
            closeTimeoutMS={200}>
            <h1> New event </h1>
            <hr />
            <form 
                className="container"
                onSubmit={onSubmit}
            >
                <div className="form-group mb-2">
                    <label>Start date</label>
                    <DatePicker
                        className="form-control" 
                        placeholderText="Start date"
                        selected={ formValues.start }
                        onChange={ (event) => onDateChange(event, "start") }
                        dateFormat={"Pp"}
                        showTimeSelect
                        locale={"es"}
                        timeCaption="Time"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>End date</label>
                    <DatePicker
                        minDate={formValues.start}
                        className="form-control"
                        placeholderText="End date"
                        selected={ formValues.end }
                        onChange={ (event) => onDateChange(event, "end") }
                        dateFormat={"Pp"}
                        showTimeSelect
                        locale={"es"}
                        timeCaption="Time"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Title</label>
                    <input
                        type="text"
                        className={`form-control ${ titleClass }`}
                        placeholder="Event title"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        A short description
                    </small>
                </div>

                <div className="form-group mb-2">
                    <label>Notes</label>
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    >
                    </textarea>
                    <small id="emailHelp" className="form-text text-muted">
                        Additional information
                    </small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block">
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>
            </form>
        </Modal>
    );
};
