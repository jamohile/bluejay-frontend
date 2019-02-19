import React from 'react';
import renderer from 'react-test-renderer';
import {LoadingView, ErrorView, OptionView, FieldSelectView} from './FieldSelectView';

const sampleField = 'someField';
const sampleFieldOptions = ['someField, someOther, Another'];

it('Renders LoadingView.', () => {
    const tree = renderer.create(
        <LoadingView/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Renders ErrorView.', () => {
    const tree = renderer.create(
        <ErrorView/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Renders OptionsView.', () => {
    const tree = renderer.create(
        <OptionView
            selected = {sampleField}
            options = {sampleFieldOptions}
            onChange = {(field) => {}}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Renders loaded FieldSelectView', () => {
    const tree = renderer.create(
        <FieldSelectView
            fieldOptions = {sampleFieldOptions}
            selected = {sampleField}
            onChange = {(field) => {}}
            loaded
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

it('Renders loading FieldSelectView', () => {
    const tree = renderer.create(
        <FieldSelectView
            fieldOptions = {sampleFieldOptions}
            selected = {sampleField}
            onChange = {(field) => {}}
            loading
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

it('Renders error FieldSelectView', () => {
    const tree = renderer.create(
        <FieldSelectView
            fieldOptions = {sampleFieldOptions}
            selected = {sampleField}
            onChange = {(field) => {}}
            error
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

