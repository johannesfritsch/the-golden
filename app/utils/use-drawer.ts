import { createContext, useContext } from "react";

export type DrawerContextType = {
    drawerOpen: boolean;
    toggleDrawer: () => void;
};

export const DrawerContext = createContext<DrawerContextType | null>(null);

export const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error("useDrawer must be used within a DrawerProvider");
    }
    return context;
};