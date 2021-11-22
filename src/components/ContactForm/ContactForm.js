import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

export default function ContactForm({ contacts, onSubmit }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleInputChange = e => {
        const { name, value } = e.target;

        name === 'name' ? setName(value) : setNumber(value);
    };

    const resetState = () => {
        setName('');
        setNumber('');
    };

    const isContactNameExist = () =>
        contacts.find(contact => contact.name === name);

    const handleSubmit = e => {
        e.preventDefault();

        if (isContactNameExist()) {
            alert(`${name} is already in contacts`);
            return;
        }

        onSubmit({ name, number });
        resetState();
    };

    return (
        <form className={s.contactForm} onSubmit={handleSubmit}>
            <div className={s.fieldWrapper}>
                <label className={s.field}>
                    <span className={s.label}>Name</span>
                    <input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                        required
                        value={name}
                        onChange={handleInputChange}
                    />
                </label>
                <label className={s.field}>
                    <span className={s.label}>Number</span>
                    <input
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                        required
                        value={number}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <button type="submit">Add contact</button>
        </form>
    );
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    contacts: PropTypes.array.isRequired,
};
