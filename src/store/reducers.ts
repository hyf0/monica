import userReducer, { IReduxUserState } from "./user/reducer";
import globalReducer, { IReduxGlobalState } from "./global/reducer";
import projectReducer, { IReduxProjectState } from "./project/reducer";

export default {
    user: userReducer,
    global: globalReducer,
    project: projectReducer,
}

export interface IReduxState {
    user: IReduxUserState,
    global: IReduxGlobalState,
    project: IReduxProjectState,
}