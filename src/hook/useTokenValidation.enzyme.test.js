import React from 'react';
import { mount } from "enzyme";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { asyncTasks } from 'await-async-task';

import useTokenValidation from "./useTokenValidation";
import {TokenValidationStatus} from "../constants/TokenValidationStatus";

const axiosMock = new MockAdapter(axios);

const HookWrapper = ({ hook }) => {
    return <div hook={hook()} />;
};

const validateUrl = "/validate/token";
const token = "randomString";
const fullValidateUrl = `${validateUrl}/${token}`;

const setup = () => {
    const wrapper = mount(<HookWrapper hook={() => useTokenValidation({ validateUrl, token })} />);

    const getResult = () => {
        wrapper.update();
        return wrapper.find("div").props().hook;
    };

    return { wrapper, getResult };
};

describe('useTokenValidation', () => {
    it('should validate token with success', async () => {
        axiosMock.onGet(fullValidateUrl).replyOnce(200);
        const { getResult } = setup();

        expect(getResult()).toEqual([TokenValidationStatus.Validating]);

        await asyncTasks();

        expect(getResult()).toEqual([TokenValidationStatus.Success]);
    });

    it('should fails with validation', async () => {
        axiosMock.onGet(fullValidateUrl).replyOnce(404);
        const { getResult } = setup();

        expect(getResult()).toEqual([TokenValidationStatus.Validating]);

        await asyncTasks();

        expect(getResult()).toEqual([TokenValidationStatus.Error]);
    });
});
