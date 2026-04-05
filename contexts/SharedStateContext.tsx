import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface SharedStateContextType {
    state: Record<string, any>;
    setSharedState: (key: string, value: any) => void;
}

const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined);

export const SharedStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<Record<string, any>>({});

    const setSharedState = useCallback((key: string, value: any) => {
        setState(prev => {
            const newValue = typeof value === 'function' ? value(prev[key]) : value;
            return { ...prev, [key]: newValue };
        });
    }, []);

    return (
        <SharedStateContext.Provider value={{ state, setSharedState }}>
            {children}
        </SharedStateContext.Provider>
    );
};

export function useSharedState<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const context = useContext(SharedStateContext);
    if (!context) throw new Error('useSharedState must be used within SharedStateProvider');

    const value = context.state[key] !== undefined ? context.state[key] : initialValue;
    
    const setValue = useCallback((newValue: T | ((val: T) => T)) => {
        context.setSharedState(key, newValue);
    }, [context, key]);

    return [value as T, setValue as React.Dispatch<React.SetStateAction<T>>];
}
