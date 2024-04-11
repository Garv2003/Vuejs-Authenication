import { defineStore } from "pinia";
import { useToast } from 'vue-toastification'


export const useToasterStore = defineStore({
    id: "toaster",
    state: () => ({
        toast: useToast()
    }),
    actions: {
        showSuccessToast(message: string) {
            this.toast.success(message);
        },
        showErrorToast(message: string) {
            this.toast.error(message);
        },
        showInfoToast(message: string) {
            this.toast.info(message);
        },
        showWarningToast(message: string) {
            this.toast.warning(message);
        },
    },
    getters: {
        getToast(): any {
            return this.toast;
        }
    }
});
