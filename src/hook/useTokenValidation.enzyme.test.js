import React from 'react';
import { mount } from "enzyme";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { asyncTasks } from 'await-async-task';

import useTokenValidation from "./useTokenValidation";
import {TokenValidationStatus} from "../constants/TokenValidationStatus";

const axiosMock = new MockAdapter(axios);

const HookWrapper = ({ hook }) => {
    const hookResult = hook ? hook() : undefined;
    return <div hook={hookResult} />;
};

const validateUrl = "/validate/token";
const token = "randomString";
const fullValidateUrl = `${validateUrl}/${token}`;

const setup = () => {
    const props = { validateUrl, token };
    const wrapper = mount(<HookWrapper hook={() => useTokenValidation(props)} />);

    const getHookResult = () => {
        wrapper.update();
        return wrapper.find("div").props().hook;
    };

    return { wrapper, getHookResult };
};

describe('useTokenValidation', () => {
    it('should validate token with success', async () => {
        axiosMock.onGet(fullValidateUrl).replyOnce(200);
        const { getHookResult } = setup();

        expect(getHookResult()).toEqual([TokenValidationStatus.Validating]);

        await asyncTasks();

        expect(getHookResult()).toEqual([TokenValidationStatus.Success]);
    });

    it('should fails with validation', async () => {
        axiosMock.onGet(fullValidateUrl).replyOnce(404);
        const { getHookResult } = setup();

        expect(getHookResult()).toEqual([TokenValidationStatus.Validating]);

        await asyncTasks();

        expect(getHookResult()).toEqual([TokenValidationStatus.Error]);
    });
});
