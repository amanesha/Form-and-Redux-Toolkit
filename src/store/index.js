import { createSlice, configureStore } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "register",
  initialState: {
    fname: "",
    lname: "",
    email: "",
    country: "",
    state: "",
    phone: "",
    password: "",
    confirmPassword: "",
    countries: [],
    states: [],
  },
  reducers: {
    setCountries(state, action) {
      state.countries = action.payload;
    },
    setState(state, action) {
      state.states = action.payload;
    },
    saveData(state, action) {
      switch (action.payload.type) {
        case "fname":
          state.fname = action.payload.fname;
          break;
        case "lname":
          state.lname = action.payload.lname;
          break;
        case "email":
          state.email = action.payload.email;
          break;
        case "country":
          state.country = action.payload.country;
          break;
        case "state":
          state.state = action.payload.state;
          break;
        case "phone":
          state.phone = action.payload.phone;
          break;
        case "password":
          state.password = action.payload.password;
          break;
        case "confirmPassword":
          state.confirmPassword = action.payload.confirmPassword;
          break;

        default:
          state;
          break;
      }
    },
  },
});

const store = configureStore({ reducer: registrationSlice.reducer });

export const registrationAction = registrationSlice.actions;

export default store;
