export interface User {
    id: number;
    name: string;
    login: string;
    permissions: ModulePermissions[]
}

export interface ModulePermissions {
    moduleId: number;
    moduleName: string;
    permissions: Permission[];
}

export interface Permission {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}

export interface Renderizable {
    changeComponentHandler: (component: Renderizable) => void;
    render: () => HTMLElement | Promise<HTMLElement>;
}
