import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ShipmentContext = createContext();
export const useShipmentContext = () => useContext(ShipmentContext);

export default function ShipmentProvider ({ children }){
    const [shipmentData, setShipmentData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = window.location.search.split('?')[1];
                const response = await axios.get(`https://tracking.bosta.co/shipments/track/${id}`);
                setShipmentData(response.data);
            } catch (error) {
                console.error('Error fetching shipment data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <ShipmentContext.Provider value={shipmentData}>
            {children}
        </ShipmentContext.Provider>
    );
};
