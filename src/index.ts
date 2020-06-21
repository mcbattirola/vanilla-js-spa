import promiseXHR from "./promiseXHR";
import UsersTable from "./usersTable";

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

const initApp = async () => {
    try {
        const rootElement = document.getElementById('app');
        const mainContent = document.createElement("main");
        mainContent.className = "app-container";

        const userRequest = await promiseXHR("https://simple-users-backend.herokuapp.com/user", "GET");
        const users: User[] = JSON.parse(userRequest.response);

        mainContent.append(createUsersTable(users));
        rootElement.appendChild(mainContent);

    } catch (error) {

    }
};

const createUsersTable = (users: User[]): HTMLElement => {
    const table = document.createElement("table");
    table.className = "app-table";

    table.appendChild(createUsersTableHeader())

    for (let index = 0; index < users.length; index++) {
        const user: User = users[index];
        table.appendChild(createUserTr(user));
    }

    return table;
};

const createUsersTableHeader = () : HTMLElement => {
    const header = document.createElement("tr");
    header.className = "app-table-header";
    
    header.appendChild(createElementAndSetInnerHTML("th", "ID", "app-table-th"));
    header.appendChild(createElementAndSetInnerHTML("th", "Name", "app-table-th"));
    header.appendChild(createElementAndSetInnerHTML("th", "Login", "app-table-th"));

    return header;
}

const createUserTr = (user: User): HTMLElement => {
    const tr = document.createElement("tr");
    tr.className = "app-table-tr";
    tr.onclick = (event: MouseEvent) => HandleUserClick(user.id, event);

    const idTd = createElementAndSetInnerHTML("td", user.id.toString(), "app-table-td");
    tr.appendChild(idTd);

    const nameTd = createElementAndSetInnerHTML("td", user.name, "app-table-td");
    tr.appendChild(nameTd);

    const loginTd = createElementAndSetInnerHTML("td", user.login, "app-table-td");
    tr.appendChild(loginTd);

    return tr;
}

const HandleUserClick = (userId: number, event: MouseEvent) => {
    console.log('userId: ', userId)
}

const createElementAndSetInnerHTML = (tag: string, value: string, className?: string) : HTMLElement => {
    const element = document.createElement(tag);
    element.innerHTML = value;
    if (className) {
        element.className = className
    }
    return element;    
}


window.addEventListener("load", initApp)
