import { Renderizable, User, ModulePermissions, Permission } from "../interfaces";
import { HTMLElementConstructor, MainTableClasses } from "../types";

export default class PermissionsTable extends HTMLElementConstructor implements Renderizable {
    changeComponentHandler: (component: Renderizable) => void;
    private user: User;

    constructor(user: User) {
        super();
        this.user = user;
    }
    render() {
        const table = this.createPermissionsTable(this.user);
        return table;
    };

    createPermissionsTable(user: User): HTMLElement {
        const table = document.createElement("table");
        table.className = MainTableClasses.table;

        table.appendChild(this.createTableHeader())

        for (let index = 0; index < user.permissions.length; index++) {
            const systemModule: ModulePermissions = user.permissions[index];
            table.appendChild(this.createModulesTr(systemModule))
        }

        return table;
    };

    createTableHeader(): HTMLElement {
        const header = document.createElement("tr");
        header.className = MainTableClasses.header;
        let thClass = MainTableClasses.th;

        header.appendChild(this.createElementAndSetInnerHTML("th", "Module", thClass));
        header.appendChild(this.createElementAndSetInnerHTML("th", "Create", thClass));
        header.appendChild(this.createElementAndSetInnerHTML("th", "Read", thClass));
        header.appendChild(this.createElementAndSetInnerHTML("th", "Update", thClass));
        header.appendChild(this.createElementAndSetInnerHTML("th", "Delete", thClass));

        return header;
    }

    createModulesTr(systemModule: ModulePermissions) {
        const tr = document.createElement("tr");
        tr.className = MainTableClasses.tr;

        let tdClass = MainTableClasses.td;

        const nameTd = this.createElementAndSetInnerHTML("td", systemModule.moduleName, tdClass);
        tr.appendChild(nameTd);
        
        tr.appendChild(this.createElementAndSetInnerHTML("td", systemModule.permissions.create.toString(), tdClass));
        tr.appendChild(this.createElementAndSetInnerHTML("td", systemModule.permissions.read.toString(), tdClass));
        tr.appendChild(this.createElementAndSetInnerHTML("td", systemModule.permissions.update.toString(), tdClass));
        tr.appendChild(this.createElementAndSetInnerHTML("td", systemModule.permissions.delete.toString(), tdClass));

        return tr;
    }
}
