export class HTMLElementConstructor {
    createElementAndSetInnerHTML(tag: string, value: string, className?: string): HTMLElement {
        const element = document.createElement(tag);
        element.innerHTML = value;
        if (className) {
            element.className = className
        }
        return element;
    }
}

export abstract class MainTableClasses {
    public static table = "app-table";
    public static header = "app-table-header";
    public static tr = "app-table-tr";
    public static trHover = "app-table-tr--hover";
    public static th = "app-table-th";
    public static td = "app-table-td";
    public static footer = "app-table-footer";
}