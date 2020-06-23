import PermissionsTable from "./permissionsTable";
import promiseXHR from "../promiseXHR";
import { Renderizable, User } from "../interfaces";
import { HTMLElementConstructor, MainTableClasses, CssUtiliyClasses } from "../types";

export default class UsersTable extends HTMLElementConstructor implements Renderizable {

    changeComponentHandler: (component: Renderizable) => HTMLElement | Promise<HTMLElement>;
    
    async render() {
        const userRequest = await promiseXHR("https://simple-users-backend.herokuapp.com/user", "GET");
        const users: User[] = JSON.parse(userRequest.response);

        const container = document.createElement("div");

        container.appendChild(this.createElementAndSetInnerHTML("h1", "USERS", "app-main-title"));
        container.appendChild(this.createUsersTable(users))
        return container;
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
        let thClass = `${MainTableClasses.th} ${CssUtiliyClasses.alignTextLeft}`;

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

        tr.appendChild(this.createElementAndSetInnerHTML("td", user.id.toString(), tdClass));
        tr.appendChild(this.createElementAndSetInnerHTML("td", user.name, tdClass));
        tr.appendChild(this.createElementAndSetInnerHTML("td", user.login, tdClass));

        return tr;
    }

    HandleUserClick(user: User, event: MouseEvent) {
        this.changeComponentHandler(new PermissionsTable(user));
    }
}