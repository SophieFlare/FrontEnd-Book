import SubjectPage from "../components/ui/SubjectPage.jsx";

const topics = [
  "Redux Fundamentals",
  "Redux Core Principles",
  "Redux vs React Context",
  "Redux vs useReducer",
  "Unidirectional Data Flow",
  "Store",
  "createStore vs configureStore",
  "Actions",
  "Action Types",
  "Action Creators",
  "Dispatch",
  "Reducers",
  "Pure Functions & Immutability",
  "State Shape & Normalization",
  "combineReducers",
  "Middleware",
  "Custom Middleware",
  "Redux Thunk",
  "Async Logic in Redux",
  "Redux Toolkit Fundamentals",
  "configureStore",
  "createSlice",
  "createAction",
  "createReducer",
  "createAsyncThunk",
  "Thunk Lifecycle Actions",
  "Extra Reducers",
  "Immer",
  "createEntityAdapter",
  "Selectors",
  "createSelector & Reselect",
  "Memoization",
  "React Redux Provider",
  "useSelector",
  "useDispatch",
  "useStore",
  "connect HOC",
  "mapStateToProps",
  "mapDispatchToProps",
  "ownProps",
  "Shallow Equality",
  "Redux Performance Optimization",
  "RTK Query",
  "createApi",
  "fetchBaseQuery",
  "Queries vs Mutations",
  "Cache Management",
  "Cache Invalidation & Tags",
  "Optimistic Updates",
  "Polling & Refetching",
  "Redux DevTools",
  "Redux Testing",
  "Redux Architecture Best Practices",
  "Common Redux Interview Challenges",
];

export default function Redux() {
  return (
    <SubjectPage
      title="Redux"
      short="RX"
      description="Master Redux architecture, actions, reducers, middleware, Redux Toolkit, React Redux integration and RTK Query."
      topics={topics}
    />
  );
}