import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";

export interface AuthStateInterface {
    isLoggedIn: boolean;
    isSubmitting: boolean;
    // currentUser: CurrentUserInterface | null | undefined
    isLoading: boolean
    validationErrors: BackendErrorsInterface | null
}