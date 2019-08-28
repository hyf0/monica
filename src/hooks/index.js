import { store } from '../store';

import { createUseStore } from './helper';

export const useStore = createUseStore(store);

export const foo = 'oo';
