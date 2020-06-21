import { Renderizable, User } from "../interfaces";

export  default class PermissionsTable implements Renderizable {
    private user : User;
    
    constructor(user:User) {
        this.user = user;
    }
    changeComponentHandler: (component: Renderizable) => void;
    render() {
        const table = document.createElement("table");
        return table;
    };
}
