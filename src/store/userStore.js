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
            const persisted = sessionStorage.getItem('user');
            if (!persisted) return;
            const userData = JSON.parse(persisted);
            this._id = userData._id;
            this.firstName = userData.firstName;
            this.lastName = userData.lastName;
            this.email = userData.email;
            this.role = userData.role;
            this.accessToken = userData.accessToken;

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
