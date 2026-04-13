export class UserModel {
    id: string;
    firstName: string;
    lastName: string;
    email: string;

    constructor(id: string, firstName: string, lastName: string, email: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    get initials(): string {
        const firstInitial = this.firstName ? this.firstName.charAt(0).toUpperCase() : '';
        const lastInitial = this.lastName ? this.lastName.charAt(0).toUpperCase() : '';
        return firstInitial + lastInitial;
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
