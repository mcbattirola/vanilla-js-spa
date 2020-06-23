import { Renderizable, User, ModulePermissions, Permission } from "../interfaces";
import { HTMLElementConstructor, MainTableClasses, CssUtiliyClasses } from "../types";
import UsersTable from "./usersTable";

export default class PermissionsTable extends HTMLElementConstructor implements Renderizable {

    changeComponentHandler: (component: Renderizable) => HTMLElement | Promise<HTMLElement>;
    private user: User;

    constructor(user: User) {
        super();
        this.user = user;
    }

    render() {
        const container = document.createElement("div");
        container.appendChild(this.createElementAndSetInnerHTML("h1", `${this.user.name} (${this.user.login}) - PERMISSIONS`, "app-main-title"));
        container.appendChild(this.createPermissionsTable(this.user));
        container.appendChild(this.createBackLink());
        return container;
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

        header.appendChild(this.createElementAndSetInnerHTML("th", "Module", `${thClass} ${CssUtiliyClasses.alignTextLeft}`));
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
        tr.appendChild(this.createPermissionCheckboxTd(systemModule.permissions.create));
        tr.appendChild(this.createPermissionCheckboxTd(systemModule.permissions.read));
        tr.appendChild(this.createPermissionCheckboxTd(systemModule.permissions.update));
        tr.appendChild(this.createPermissionCheckboxTd(systemModule.permissions.delete));

        return tr;
    }

    createPermissionCheckboxTd(enabled: boolean): HTMLElement {
        const td = document.createElement("td");
        td.className = CssUtiliyClasses.alignTextCenter;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.setAttribute("disabled", "true");
        checkbox.checked = enabled

        td.appendChild(checkbox);
        return td;
    }

    createBackLink(): HTMLElement {

        const linkContainer = this.createElementAndSetInnerHTML("div", "", MainTableClasses.footer);
        const link = document.createElement("a");
        link.innerHTML = "Back";
        link.className = "app-return-button"
        link.onclick = (event: MouseEvent) => this.goBack();

        linkContainer.appendChild(link);
        return linkContainer;
    }

    goBack(): void {
        this.changeComponentHandler(new UsersTable);
    }
}
