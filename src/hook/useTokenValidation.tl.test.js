import { renderHook } from 'react-hooks-testing-library'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import useTokenValidation from "./useTokenValidation";
import {TokenValidationStatus} from "../constants/TokenValidationStatus";

const axiosMock = new MockAdapter(axios);

const validateUrl = "/validate/token";
const token = "randomString";
const fullValidateUrl = `${validateUrl}/${token}`;

describe('useTokenValidation', () => {
    it('should validate token with success', async () => {
        axiosMock.onGet(fullValidateUrl).replyOnce(200);
        const { result, waitForNextUpdate } = renderHook(() => useTokenValidation({ validateUrl, token }));

        expect(result.current).toEqual([TokenValidationStatus.Validating]);

        await waitForNextUpdate();

        expect(result.current).toEqual([TokenValidationStatus.Success]);
    });

    it('should fails with validation', async () => {
        axiosMock.onGet(fullValidateUrl).replyOnce(404);
        const { result, waitForNextUpdate } = renderHook(() => useTokenValidation({ validateUrl, token }));

        expect(result.current).toEqual([TokenValidationStatus.Validating]);

        await waitForNextUpdate();

        expect(result.current).toEqual([TokenValidationStatus.Error]);
    });
});
