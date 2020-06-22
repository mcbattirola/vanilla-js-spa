import PermissionsTable from "./permissionsTable";
import promiseXHR from "../promiseXHR";
import { Renderizable, User } from "../interfaces";
import { HTMLElementConstructor, MainTableClasses } from "../types";

export default class UsersTable extends HTMLElementConstructor implements Renderizable {
    changeComponentHandler: (component: Renderizable) => HTMLElement | Promise<HTMLElement>;
    async render() {
        const userRequest = await promiseXHR("https://simple-users-backend.herokuapp.com/user", "GET");
        const users: User[] = JSON.parse(userRequest.response);
        return this.createUsersTable(users);
    };

    createUsersTable(users: User[]): HTMLElement {
        const table = document.createElement("table");
        table.className = MainTableClasses.table;

        table.appendChild(this.createUsersTableHeader())

        for (let index = 0; index < users.length; index++) {
            const user: User = users[index];
            table.appendChild(this.createUserTr(user));
        }

        return table;
    };

    createUsersTableHeader(): HTMLElement {
        const header = document.createElement("tr");
        header.className = MainTableClasses.header;
        let thClass = MainTableClasses.th;

        header.appendChild(this.createElementAndSetInnerHTML("th", "ID", thClass));
        header.appendChild(this.createElementAndSetInnerHTML("th", "Name", thClass));
        header.appendChild(this.createElementAndSetInnerHTML("th", "Login", thClass));

        return header;
    }

    createUserTr(user: User): HTMLElement {
        const tr = document.createElement("tr");
        tr.className = `${MainTableClasses.tr} ${MainTableClasses.trHover}`;
        tr.onclick = (event: MouseEvent) => this.HandleUserClick(user, event);

        let tdClass = MainTableClasses.td;

        const idTd = this.createElementAndSetInnerHTML("td", user.id.toString(), tdClass);
        tr.appendChild(idTd);

        const nameTd = this.createElementAndSetInnerHTML("td", user.name, tdClass);
        tr.appendChild(nameTd);

        const loginTd = this.createElementAndSetInnerHTML("td", user.login, tdClass);
        tr.appendChild(loginTd);

        return tr;
    }

    HandleUserClick(user: User, event: MouseEvent) {
        console.log('user: ', user)
        this.changeComponentHandler(new PermissionsTable(user));
    }

}