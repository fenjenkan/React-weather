import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../../data/data";

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    deleteUser: (state,action) => {
        const userFound = state.find(user => user.id == action.payload)
        if (userFound){
            state.splice(state.indexOf(userFound), 1)
        }
    },
    updateUser: (state,action) => {
        const {id,user,ciudad,lat,lon} = action.payload
        const foundUser = state.find(user => user.id == id)
        if (foundUser){
          foundUser.user = user,
          foundUser.ciudad = ciudad;
          foundUser.lat = lat;
          foundUser.lon = lon

        }
    }
  },
});

export const { addUser,deleteUser,updateUser } = userSlice.actions;
export default userSlice.reducer;
