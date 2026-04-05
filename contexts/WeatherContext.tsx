import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WeatherData, MicroclimateAnalysis, Alert } from '../types';

export interface WeatherContextState {
    location: string;
    setLocation: (l: string) => void;
    displayLocation: string;
    setDisplayLocation: (l: string) => void;
    coordinates: {lat: number, lng: number} | null;
    setCoordinates: (c: {lat: number, lng: number} | null) => void;
    weatherData: WeatherData | null;
    setWeatherData: (d: WeatherData | null) => void;
    loading: boolean;
    setLoading: (l: boolean) => void;
    error: string | null;
    setError: (e: string | null) => void;
    weatherClass: string;
    setWeatherClass: (c: string) => void;
    activeAlert: Omit<Alert, 'id' | 'uid' | 'status' | 'createdAt' | 'relatedView' | 'relatedEntityId'> | null;
    setActiveAlert: (a: Omit<Alert, 'id' | 'uid' | 'status' | 'createdAt' | 'relatedView' | 'relatedEntityId'> | null) => void;
    microclimateData: MicroclimateAnalysis | null;
    setMicroclimateData: (d: MicroclimateAnalysis | null) => void;
    microclimateLoading: boolean;
    setMicroclimateLoading: (l: boolean) => void;
    microclimateError: string | null;
    setMicroclimateError: (e: string | null) => void;
}

const WeatherContext = createContext<WeatherContextState | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [location, setLocation] = useState<string>('');
    const [displayLocation, setDisplayLocation] = useState<string>('');
    const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [weatherClass, setWeatherClass] = useState<string>('sunny');
    const [activeAlert, setActiveAlert] = useState<Omit<Alert, 'id' | 'uid' | 'status' | 'createdAt' | 'relatedView' | 'relatedEntityId'> | null>(null);

    const [microclimateData, setMicroclimateData] = useState<MicroclimateAnalysis | null>(null);
    const [microclimateLoading, setMicroclimateLoading] = useState<boolean>(false);
    const [microclimateError, setMicroclimateError] = useState<string | null>(null);

    return (
        <WeatherContext.Provider value={{
            location, setLocation,
            displayLocation, setDisplayLocation,
            coordinates, setCoordinates,
            weatherData, setWeatherData,
            loading, setLoading,
            error, setError,
            weatherClass, setWeatherClass,
            activeAlert, setActiveAlert,
            microclimateData, setMicroclimateData,
            microclimateLoading, setMicroclimateLoading,
            microclimateError, setMicroclimateError
        }}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (context === undefined) {
        throw new Error('useWeather must be used within a WeatherProvider');
    }
    return context;
};
