import { useState, useEffect } from 'react';
import { useToken } from './useToken';

export const useUser = () => {
    const [token] = useToken();

    const getPayloadFromToken = token => {
        const encodedPayload = token.split('.')[1];

        // Creating the buffer object with utf8 encoding
        let bufferObj = Buffer.from(encodedPayload, "base64");

        console.log(bufferObj)

        // Decoding base64 into String
        let string = bufferObj.toString("utf8");

        console.log(string)

        //return JSON.parse(atob(encodedPayload));
        return JSON.parse(string);
    }

    const [user, setUser] = useState(() => {
        if (!token) return null;
        return getPayloadFromToken(token);
    });

    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            setUser(getPayloadFromToken(token));
        }
    }, [token]);

    return user;
}