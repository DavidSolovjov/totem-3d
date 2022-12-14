import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isloggedin: false,
        list: [],
        profile: null,
        edit: false,
        token: null,
        id: null,
        emailOrWallet: null,
    },
    reducers: {
        saveProfile(state, actions) {
            state.profile = actions.payload;
            state.edit = true;
        },
        editt(state) {
            state.edit = false;
        },
        register(state, actions) {
            state.list.push({
                email: actions.payload.email,
                password: actions.payload.password
            });
        },
        login(state, actions) {
            const item = actions.payload;
            const email = state.list.find(function (data) {
                return data.email == item.email;
            });
            const password = state.list.find(function (data) {
                return data.password == item.password;
            })
            if (email && password) {
                state.isloggedin = true;
            }
            else {
                state.isloggedin = false;
            }
        },
        signin(state) {
            state.isloggedin = true;
        },
        logout(state) {
            localStorage.removeItem('access_token')
            state.token = null;
            state.emailOrWallet = null;
<<<<<<< HEAD
            state.isloggedin = false;
=======
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
        },
        authToken(state, actions) {
            state.token = actions.payload;
        },
        saveId(state, actions) {
            console.log(actions)
            state.id = actions.payload;
        },
        saveEmailOrWallet(state, actions) {
            state.emailOrWallet = actions.payload;
        }
    },
});

export const { register, login, logout, signin, saveProfile, editt, authToken, saveId, saveEmailOrWallet} = authSlice.actions;

export default authSlice.reducer;