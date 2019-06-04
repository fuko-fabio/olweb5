import React from "react";
import withTokenValidation from "../hoc/withTokenValidation";
import {TOKEN_VALIDATION_URL} from "../config";
import {TokenValidationStatus} from "../constants/TokenValidationStatus";

const HocExample  = ({ tokenValidationStatus }) => {
    switch (tokenValidationStatus) {
        case TokenValidationStatus.Error:
            return "Error";
        case TokenValidationStatus.Validating:
            return "Loading";
        case TokenValidationStatus.Success:
            return <div>My awesome hook example</div>;
    }
};

export default withTokenValidation(TOKEN_VALIDATION_URL)(HocExample);
