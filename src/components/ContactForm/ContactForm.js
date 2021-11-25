import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './ContactForm.module.css';
import { addContact } from '../../redux/contacts/contacts-actions';
import { getContacts } from '../../redux/contacts/contacts-selectors';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();

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

        dispatch(addContact({ name, number }));
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
