import { Reducer } from "redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialState = {} as any;

export const Roles = {
  Admin: "ROLES_ADMIN",
  Moderator: "ROLES_MODERATOR",
  User: "ROLES_MODERATOR",
};

export type RolesArray = Array<keyof typeof Roles>;
type MeUser = {
  username: string;
  roles: RolesArray;
};
export type StoreState = {
  meUser: MeUser;
  allContent: string;
  userContent: string;
  adminContent: string;
  moderatorContent: string;
};

type StoreAction = {
  type: string;
  payload: any;
};

const initialEmptyState: StoreState = {
  meUser: {
    username: "",
    roles: [],
  },
  allContent: "",
  adminContent: "",
  moderatorContent: "",
  userContent: "",
};

const actionType = {
  ADD_ME_USER: "ADD_ME_USER",
  SET_ALL_CONTENT: "SET_ALL_CONTENT",
};

const reducer: Reducer<StoreState, StoreAction> = (
  state: StoreState = initialEmptyState,
  action: StoreAction
) => {
  const { payload, type } = action;
  switch (type) {
    case actionType.ADD_ME_USER:
      return {
        ...state,
        meUser: {
          username: payload.username,
          roles: payload.roles,
        },
      };

    case actionType.SET_ALL_CONTENT:
      return {
        ...state,
        allContent: payload,
      };

    default:
      return state as StoreState;
  }
};

const middleware = [thunk];

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
