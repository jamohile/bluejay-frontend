import React from 'react';
import renderer from 'react-test-renderer';
import { HeaderView, LoadingView, ReloadButton, ExcessView, RowView, RowsView, DataTableView } from './DataTableView';

const sampleRows = [
    {
        value: 'apple',
        age: 4,
        count: 7
    }, {
        value: 'banana',
        age: 100,
        count: 155
    }, {
        value: 'pear',
        age: 5,
        count: 17
    }];

    it('Renders HeaderView.', () => {
        const tree = renderer.create(
            <HeaderView/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Renders LoadingView.', () => {
        const tree = renderer.create(
            <LoadingView/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders normal ReloadView.', () => {
        const tree = renderer.create(
            <ReloadButton/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders stale ReloadView.', () => {
        const tree = renderer.create(
            <ReloadButton stale/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders ExcessView.', () => {
        const tree = renderer.create(
            <ExcessView num/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders a single RowView', () => {
        const row = sampleRows[0];
        const tree = renderer.create(
            <RowView
                age = {row.age}
                value = {row.value}
                count = {row.count}
                key = {row.value}
                number = {0}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders RowsView', () => {
        const tree = renderer.create(
           <RowsView
                rows={sampleRows}

           />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders DataTable with excess', () => {
        const tree = renderer.create(
           <DataTableView
                rows={sampleRows}
                excessRows={123}
                onReload={() => {}}
                loaded
           />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders DataTable with excess', () => {
        const tree = renderer.create(
           <DataTableView
                rows={sampleRows}
                excessRows={123}
                onReload={() => {}}
                loaded
           />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders Loading DataTable', () => {
        const tree = renderer.create(
           <DataTableView
                rows={sampleRows}
                excessRows={123}
                onReload={() => {}}
                loading
           />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders error DataTable', () => {
        const tree = renderer.create(
           <DataTableView
                rows={sampleRows}
                excessRows={123}
                onReload={() => {}}
                error
           />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });