import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', {
    state: () => {
        return {
            _id: null,
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            accessToken: '',
        };
    },
    actions: {
        setUser(userData) {
            this._id = userData._id;
            this.firstName = userData.firstName;
            this.lastName = userData.lastName;
            this.email = userData.email;
            this.role = userData.role;
            this.accessToken = userData.accessToken;

            sessionStorage.setItem('_id', userData._id);
            sessionStorage.setItem('firstName', userData.firstName);
            sessionStorage.setItem('lastName', userData.lastName);
            sessionStorage.setItem('email', userData.email);
            sessionStorage.setItem('role', userData.role);
            sessionStorage.setItem('accessToken', userData.accessToken);
        },
        getPersistedUser() {
            const _id = sessionStorage.getItem('_id');
            const firstName = sessionStorage.getItem('firstName');
            const lastName = sessionStorage.getItem('lastName');
            const email = sessionStorage.getItem('email');
            const role = sessionStorage.getItem('role');
            const accessToken = sessionStorage.getItem('accessToken');

            if (!_id || !firstName || !lastName || !email || !role || !accessToken) return;

            this._id = _id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.role = role;
            this.accessToken = accessToken;

        },
        logout() {
            this._id = null;
            this.firstName = '';
            this.lastName = '';
            this.email = '';
            this.accessToken = '';
            this.role = '';
            sessionStorage.removeItem('_id');
            sessionStorage.removeItem('firstName');
            sessionStorage.removeItem('lastName');
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('accessToken');
        },
    },
});
