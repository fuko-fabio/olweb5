import React from "react";
import useTokenValidation from "../hook/useTokenValidation";
import {TOKEN_VALIDATION_URL} from "../config";
import {TokenValidationStatus} from "../constants/TokenValidationStatus";

const HookExample  = ({ match: { params: { token } } }) => {
    const [validationStatus] = useTokenValidation({validateUrl: TOKEN_VALIDATION_URL, token});

    switch (validationStatus) {
        case TokenValidationStatus.Error:
            return "Error";
        case TokenValidationStatus.Validating:
            return "Loading";
        case TokenValidationStatus.Success:
            return <div>My awesome hook example</div>;
    }
};

export default HookExample;
