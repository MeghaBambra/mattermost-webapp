// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React from 'react';
import {shallow} from 'enzyme';

import {savePreferences} from 'actions/user_actions.jsx';

import {mountWithIntl} from 'tests/helpers/intl-test-helper.jsx';

import UserSettingsDisplay from 'components/user_settings/user_settings_display.jsx';

jest.mock('actions/user_actions.jsx', () => ({
    savePreferences: jest.fn()
}));

describe('components/user_settings/UserSettingsDisplay', () => {
    global.window.mm_config = {};

    const user = {
        id: 'user_id',
        username: 'username',
        locale: 'en'
    };

    const requiredProps = {
        user,
        updateSection: jest.fn(),
        updateTab: jest.fn(),
        activeSection: '',
        closeModal: jest.fn(),
        collapseModal: jest.fn(),
        setRequireConfirm: jest.fn(),
        setEnforceFocus: jest.fn()
    };

    afterEach(() => {
        global.window.mm_config = {};
    });

    beforeEach(() => {
        global.window.mm_config.EnableLinkPreviews = 'true';
        global.window.mm_config.EnableThemeSelection = 'false';
        global.window.mm_config.DefaultClientLocale = 'en';
    });

    test('should match snapshot, no active section', () => {
        const wrapper = shallow(<UserSettingsDisplay {...requiredProps}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, collapse section', () => {
        const props = {...requiredProps, activeSection: 'collapse'};
        const wrapper = shallow(<UserSettingsDisplay {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, link preview section with EnableLinkPreviews is false', () => {
        global.window.mm_config.EnableLinkPreviews = 'false';
        const props = {...requiredProps, activeSection: 'linkpreview'};
        const wrapper = shallow(<UserSettingsDisplay {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, link preview section with EnableLinkPreviews is true', () => {
        global.window.mm_config.EnableLinkPreviews = 'true';
        const props = {...requiredProps, activeSection: 'linkpreview'};
        const wrapper = shallow(<UserSettingsDisplay {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, clock section', () => {
        const props = {...requiredProps, activeSection: 'clock'};
        const wrapper = shallow(<UserSettingsDisplay {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, message display section', () => {
        const props = {...requiredProps, activeSection: 'message_display'};
        const wrapper = shallow(<UserSettingsDisplay {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, channel display mode section', () => {
        const props = {...requiredProps, activeSection: 'channel_display_mode'};
        const wrapper = shallow(<UserSettingsDisplay {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, languages section', () => {
        const props = {...requiredProps, activeSection: 'languages'};
        const wrapper = shallow(<UserSettingsDisplay {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, theme section with EnableThemeSelection is false', () => {
        global.window.mm_config.EnableThemeSelection = 'false';
        const props = {...requiredProps, activeSection: 'theme'};
        const wrapper = shallow(<UserSettingsDisplay {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, theme section with EnableThemeSelection is true', () => {
        global.window.mm_config.EnableThemeSelection = 'true';
        const props = {...requiredProps, activeSection: 'theme'};
        const wrapper = shallow(<UserSettingsDisplay {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('should have called handleSubmit', () => {
        const updateSection = jest.fn();

        const props = {...requiredProps, updateSection};
        const wrapper = mountWithIntl(<UserSettingsDisplay {...props}/>);

        savePreferences.mockImplementation((args, cb) => {
            cb();
        });

        wrapper.instance().handleSubmit();
        expect(updateSection).toHaveBeenCalledWith('');
    });

    test('should have called updateSection', () => {
        const updateSection = jest.fn();
        const props = {...requiredProps, updateSection};
        const wrapper = mountWithIntl(<UserSettingsDisplay {...props}/>);

        wrapper.instance().updateSection('');
        expect(updateSection).toHaveBeenCalledWith('');

        wrapper.instance().updateSection('linkpreview');
        expect(updateSection).toHaveBeenCalledWith('linkpreview');
    });

    test('should have called closeModal', () => {
        const closeModal = jest.fn();
        const props = {...requiredProps, closeModal};
        const wrapper = mountWithIntl(<UserSettingsDisplay {...props}/>);

        wrapper.find('#closeButton').simulate('click');
        expect(closeModal).toHaveBeenCalled();
    });

    test('should have called collapseModal', () => {
        const collapseModal = jest.fn();
        const props = {...requiredProps, collapseModal};
        const wrapper = mountWithIntl(<UserSettingsDisplay {...props}/>);

        wrapper.find('.fa-angle-left').simulate('click');
        expect(collapseModal).toHaveBeenCalled();
    });

    test('should update militaryTime state', () => {
        const wrapper = mountWithIntl(<UserSettingsDisplay {...requiredProps}/>);

        wrapper.instance().handleClockRadio('false');
        expect(wrapper.state('militaryTime')).toBe('false');

        wrapper.instance().handleClockRadio('true');
        expect(wrapper.state('militaryTime')).toBe('true');
    });

    test('should update channelDisplayMode state', () => {
        const wrapper = mountWithIntl(<UserSettingsDisplay {...requiredProps}/>);

        wrapper.instance().handleChannelDisplayModeRadio('full');
        expect(wrapper.state('channelDisplayMode')).toBe('full');

        wrapper.instance().handleChannelDisplayModeRadio('centered');
        expect(wrapper.state('channelDisplayMode')).toBe('centered');
    });

    test('should update messageDisplay state', () => {
        const wrapper = mountWithIntl(<UserSettingsDisplay {...requiredProps}/>);

        wrapper.instance().handlemessageDisplayRadio('clean');
        expect(wrapper.state('messageDisplay')).toBe('clean');

        wrapper.instance().handlemessageDisplayRadio('compact');
        expect(wrapper.state('messageDisplay')).toBe('compact');
    });

    test('should update collapseDisplay state', () => {
        const wrapper = mountWithIntl(<UserSettingsDisplay {...requiredProps}/>);

        wrapper.instance().handleCollapseRadio('false');
        expect(wrapper.state('collapseDisplay')).toBe('false');

        wrapper.instance().handleCollapseRadio('true');
        expect(wrapper.state('collapseDisplay')).toBe('true');
    });

    test('should update linkPreviewDisplay state', () => {
        const wrapper = mountWithIntl(<UserSettingsDisplay {...requiredProps}/>);

        wrapper.instance().handleLinkPreviewRadio('false');
        expect(wrapper.state('linkPreviewDisplay')).toBe('false');

        wrapper.instance().handleLinkPreviewRadio('true');
        expect(wrapper.state('linkPreviewDisplay')).toBe('true');
    });

    test('should update display state', () => {
        const wrapper = mountWithIntl(<UserSettingsDisplay {...requiredProps}/>);

        wrapper.instance().handleOnChange({display: 'linkPreviewDisplay'});
        expect(wrapper.state('display')).toBe('linkPreviewDisplay');

        wrapper.instance().handleOnChange({display: 'collapseDisplay'});
        expect(wrapper.state('display')).toBe('collapseDisplay');
    });
});
