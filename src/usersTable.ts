import promiseXHR from "./promiseXHR";

export interface Renderizable {
    changeComponentHandler: (component: Renderizable) => void;
    render: () => HTMLElement | Promise<HTMLElement>;
}

class PermissionsTable implements Renderizable {
    changeComponentHandler: (component: Renderizable) => void; 
    render() {
        const table = document.createElement("table");
        return table;
    };
}

interface User {
    id: number;
    name: string;
    login: string;
    permissions: ModulePermissions[]
}

interface ModulePermissions {
    moduleId: number;
    moduleName: string;
    permissions: Permission[];
}

interface Permission {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}

export class UsersTable implements Renderizable {
    changeComponentHandler: (component: Renderizable) => HTMLElement | Promise<HTMLElement>;
    async render() {
        const userRequest = await promiseXHR("https://simple-users-backend.herokuapp.com/user", "GET");
        const users: User[] = JSON.parse(userRequest.response);
        return this.createUsersTable(users);
    };

    createUsersTable(users: User[]): HTMLElement {
        const table = document.createElement("table");
        table.className = "app-table";

        table.appendChild(this.createUsersTableHeader())

        for (let index = 0; index < users.length; index++) {
            const user: User = users[index];
            table.appendChild(this.createUserTr(user));
        }

        return table;
    };

    createUsersTableHeader(): HTMLElement {
        const header = document.createElement("tr");
        header.className = "app-table-header";

        header.appendChild(this.createElementAndSetInnerHTML("th", "ID", "app-table-th"));
        header.appendChild(this.createElementAndSetInnerHTML("th", "Name", "app-table-th"));
        header.appendChild(this.createElementAndSetInnerHTML("th", "Login", "app-table-th"));

        return header;
    }

    createUserTr(user: User): HTMLElement {
        const tr = document.createElement("tr");
        tr.className = "app-table-tr";
        tr.onclick = (event: MouseEvent) => this.HandleUserClick(user.id, event);

        const idTd = this.createElementAndSetInnerHTML("td", user.id.toString(), "app-table-td");
        tr.appendChild(idTd);

        const nameTd = this.createElementAndSetInnerHTML("td", user.name, "app-table-td");
        tr.appendChild(nameTd);

        const loginTd = this.createElementAndSetInnerHTML("td", user.login, "app-table-td");
        tr.appendChild(loginTd);

        return tr;
    }

    HandleUserClick(userId: number, event: MouseEvent) {
        console.log('userId: ', userId)
        // instancia tabela de permissoes
        // passa os dados pra ela
        this.changeComponentHandler(new PermissionsTable);
    }

    createElementAndSetInnerHTML(tag: string, value: string, className?: string): HTMLElement {
        const element = document.createElement(tag);
        element.innerHTML = value;
        if (className) {
            element.className = className
        }
        return element;
    }

}