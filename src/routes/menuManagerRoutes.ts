import { RenderIconsProps } from "../tools/RenderIcon";

export type menuRoutesItems = {
    iconName: RenderIconsProps['iconName'];
    label: string;
    path: string;
};

export const menuRoutes: Array<menuRoutesItems> = [
    {
        iconName: 'Home',
        path: '/home',
        label: 'Home'
    },
    {
        iconName: 'ListTodo',
        path: '/tasks',
        label: 'Tarefas'
    }
]