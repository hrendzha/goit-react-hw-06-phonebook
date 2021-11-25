import { useSelector, useDispatch } from 'react-redux';
import { filterChange } from '../../redux/contacts/contacts-actions';
import { getFilter } from '../../redux/contacts/contacts-selectors';
import s from './Filter.module.css';

function Filter() {
    const filter = useSelector(getFilter);
    const dispatch = useDispatch();

    return (
        <label className={s.field}>
            <span className={s.label}>Find contacts by name</span>
            <input
                type="text"
                name="filter"
                value={filter}
                autoComplete="off"
                onChange={e => dispatch(filterChange(e.target.value))}
            />
        </label>
    );
}

export default Filter;
