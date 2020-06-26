import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EmailValidators {
    static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (control.value === 'hello@gmail.com')
                    resolve({ shouldBeUnique: true });
                else
                    resolve(null);
            }, 2000);
        });
    }
}
