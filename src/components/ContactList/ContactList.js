import { useSelector, useDispatch } from 'react-redux';
import ContactListItem from '../ContactListItem';
import { deleteContact } from '../../redux/contacts/contacts-actions';
import { getFilteredContacts } from '../../redux/contacts/contacts-selectors';
import s from './ContactList.module.css';

function ContactList() {
    const visibleContacts = useSelector(getFilteredContacts);

    const dispatch = useDispatch();

    return (
        <ul>
            {visibleContacts.map(({ id, name, number }) => (
                <li className={s.listItem} key={id}>
                    <ContactListItem
                        name={name}
                        number={number}
                        onClick={() => dispatch(deleteContact(id))}
                    />
                </li>
            ))}
        </ul>
    );
}

export default ContactList;
