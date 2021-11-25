import { createAction } from '@reduxjs/toolkit';
import { v4 as generateId } from 'uuid';

export const addContact = createAction('contacts/add', contact => ({
    payload: {
        contact: {
            id: generateId(),
            ...contact,
        },
    },
}));

export const deleteContact = createAction('contacts/delete', contactId => ({
    payload: { contactId },
}));

export const filterChange = createAction('contacts/changeFilter', filter => ({
    payload: { filter },
}));
