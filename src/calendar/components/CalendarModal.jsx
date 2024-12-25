import { useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { addHours } from "date-fns";
import { es } from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";

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

const initialFormState = {
    title: 'Ernesto',
    notes:  'Vargas',
    start: new Date(),
    end: addHours(new Date(), 2)
};

Modal.setAppElement("#root");

export const CalendarModal = () => {

    const [formValues, setFormValues] = useState({
        title: 'Ernesto',
        notes:  'Vargas',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

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
		console.log("cerrando modal");
	};

    return (
        <Modal
            isOpen={true}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
            className={"modal"}
            overlayClassName={"modal-fondo"}
            closeTimeoutMS={200}>
            <h1> New event </h1>
            <hr />
            <form className="container">
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
                        className="form-control"
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
