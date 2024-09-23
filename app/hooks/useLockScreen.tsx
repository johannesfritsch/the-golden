import { createContext, useCallback, useContext, useState } from "react";

type LockScreenContextType = {
    isLockScreenVisible: boolean;
    showLockScreen: () => void;
    hideLockScreen: () => void;
};

const LockScreenContext = createContext<LockScreenContextType | undefined>(undefined);

export const LockScreenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLockScreenVisible, setIsLockScreenVisible] = useState(false);

    const showLockScreen = useCallback(() => {
        setIsLockScreenVisible(true);
    }, []);

    const hideLockScreen = useCallback(() => {
        setIsLockScreenVisible(false);
    }, []);

    return (
        <LockScreenContext.Provider value={{ isLockScreenVisible, showLockScreen, hideLockScreen }}>
            {children}
        </LockScreenContext.Provider>
    );
};

export const useLockScreen = (): LockScreenContextType => {
    const context = useContext(LockScreenContext);
    if (!context) {
        throw new Error('useLockScreen must be used within a LockScreenProvider');
    }
    return context;
};