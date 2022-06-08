
interface IReport {
    course: string;
    grade: number;
}

interface IStudent {
    firstName: string;
    lastName: string;
    reports: IReport[];
}

class Student implements IStudent {
    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.reports = [];
    }
    firstName: string;
    lastName: string;
    reports: IReport[];
}

export type { IStudent, IReport, Student };