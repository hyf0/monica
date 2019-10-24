import * as userEffects from './user/effects';
import * as projectEffects from './project/effects';

import { IReduxState } from './reducers';
import { IAction } from './action';
import * as globalEffects from './global/effects';


export type TReduxThunk = (dispatch: TDispatch, getState: () => IReduxState) => Promise<unknown>;
type TDispatch = <ARG_TYPE = IAction | ((...args: unknown[]) => TReduxThunk)>(action: ARG_TYPE ) => ARG_TYPE;

export {
    userEffects,
    projectEffects,
    globalEffects,
}
