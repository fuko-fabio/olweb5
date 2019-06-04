import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {TokenValidationStatus} from "../constants/TokenValidationStatus";

const useTokenValidation = ({ validateUrl, token }) => {
    const [status, setStatus] = useState(TokenValidationStatus.Validating);

    const validateToken = useCallback(
        async (cancelToken) => {
            try {
                await axios.get(`${validateUrl}/${token}`, { cancelToken });
                setStatus(TokenValidationStatus.Success);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    setStatus(TokenValidationStatus.Error);
                }
            }
        },
        [validateUrl, token]
    );

    useEffect(() => {
        const source = axios.CancelToken.source();
        validateToken(source.token);

        return source.cancel;
    }, [validateToken]);

    return [ status ];
};

export default useTokenValidation;
