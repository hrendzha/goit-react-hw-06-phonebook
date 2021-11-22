import { useState } from 'react';
import { v4 as generateId } from 'uuid';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import Container from './components/Container';
import * as storage from './js/localStorage';
import useLocaleStorage from './hooks/useLocaleStorage';

function App() {
    const [contacts, setContacts] = useLocaleStorage(
        storage.LS_KEYS.contacts,
        [],
    );
    const [filter, setFilter] = useState('');

    const handleFormSubmit = userInfo =>
        setContacts(contacts => [
            ...contacts,
            {
                id: generateId(),
                ...userInfo,
            },
        ]);

    const handleFilterChange = e => setFilter(e.target.value);

    const getFilteredContacts = () => {
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(({ name }) =>
            name.toLowerCase().includes(normalizedFilter),
        );
    };

    const handleContactDelete = contactId =>
        setContacts(contacts => contacts.filter(({ id }) => id !== contactId));

    return (
        <Container>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={handleFormSubmit} contacts={[...contacts]} />

            <h2>Contacts</h2>
            <Filter value={filter} onChange={handleFilterChange} />
            <ContactList
                contacts={getFilteredContacts()}
                onContactDelete={handleContactDelete}
            />
        </Container>
    );
}

export default App;
