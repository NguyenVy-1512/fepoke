
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidators {
 
    static passwordShouldMatch(control: AbstractControl) {
        let password = control.get('password');
        let confirm = control.get('confirm');

        if (password.value != confirm.value)
            return { passwordShouldMatch: true };
        return null;
    }
}