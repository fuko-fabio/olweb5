import React from "react";
import axios from "axios"
import {TokenValidationStatus} from "../constants/TokenValidationStatus";

const withTokenValidation = (validateUrl) => (Component) => {
    return class extends React.Component {
        state = {
            status: TokenValidationStatus.Validating
        };

        cancelTokenSource = axios.CancelToken.source();

        async componentDidMount () {
            const { token } = this.props.match.params;
            try {
                await axios.get(
                    `${validateUrl}/${token}`,
                    { cancelToken: this.cancelTokenSource.token });
                this.setState({status: TokenValidationStatus.Success});
            } catch (e) {
                if (!axios.isCancel(e)) {
                    this.setState({status: TokenValidationStatus.Error});
                }
            }
        }

        componentWillUnmount() {
            if (this.cancelTokenSource) {
                this.cancelTokenSource.cancel();
            }
        }

        render () {
            return <Component {...this.props} tokenValidationStatus={this.state.status}/>
        }
    }
};

export default withTokenValidation;
