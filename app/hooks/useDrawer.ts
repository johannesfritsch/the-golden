import { createContext, useContext } from 'react';

export const DrawerContext = createContext<{ drawerOpen: boolean; toggleDrawer: () => void }>({ drawerOpen: false, toggleDrawer: () => {} });

export const useDrawer = () => useContext(DrawerContext);
