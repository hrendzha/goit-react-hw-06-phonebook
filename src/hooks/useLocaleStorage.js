import { useState, useEffect, useRef } from 'react';
import * as storage from '../js/localStorage';

export default function useLocaleStorage(key, defaultValue) {
    const [state, setState] = useState(() => storage.load(key) || defaultValue);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        storage.save(key, state);
    }, [key, state]);

    return [state, setState];
}
