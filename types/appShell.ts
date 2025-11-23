import { ReactNode } from "react";

export type AppShellProps = {
    title?: string;
    description?: string;
    actions?: ReactNode;
    children: ReactNode;
};