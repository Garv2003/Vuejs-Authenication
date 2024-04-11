import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        user: null,
        isAuthicated: false,
    }),

    actions: {
        setUser(user: any) {
            this.user = user;
        },
        setIsAuthicated(isAuthicated: boolean) {
            this.isAuthicated = isAuthicated;
        },
    },
    getters: {
        getUser(): any {
            return this.user;
        },
    },
});

