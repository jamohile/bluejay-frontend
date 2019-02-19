import * as React from 'react';
import { DataRow } from "../../../utilities/store/reducers/data";
import './dataTableView.css';

/**
 * Interfaces, used to allow typing in all views.
 */
interface DataTableViewProps {
    rows: DataRow[],
    loaded: boolean,
    loading: boolean,
    error: boolean,
    excessRows: number,
    onReload: () => void
}

interface DataTableViewState {
    stale: boolean;
}

interface ReloadViewProps {
    onReload: () => void;
    stale: boolean
}

interface ExcessViewProps {
    num: number;
}
interface RowViewProps {
    number: number,
    value: string,
    count: number,
    age: number
}

interface RowsViewProps {
    rows: DataRow[];
    excessRows: number;
}

/**
 * Uses children Views to display a table of the rows coresponding to the selected field.
 * Not using a table was chosen for the sake of formatting in this case.
 * If necessary, implementing this using existing table views could be done.
 */
export class DataTableView extends React.Component<DataTableViewProps, DataTableViewState> {
    constructor(props: DataTableViewProps) {
        super(props);
        this.state = {
            stale: false
        }
    }

    componentWillReceiveProps() {
        this.setState({ stale: false })
        setTimeout(() => this.setState({ stale: true }), 10000);
    }
    render() {
        const { rows, loaded, loading, error, excessRows, onReload } = this.props;

        return (
            <div className='dataTable'>
                <HeaderView />
                {
                    error &&
                    <ErrorView />
                }

                {
                    loading &&
                    <LoadingView />
                }
                {
                    !loading && (loaded || error) &&
                    <ReloadButton
                        onReload={onReload}
                        stale={this.state.stale}
                    />
                }
                {
                    !error && loaded && !loading &&
                    <RowsView
                        rows={rows}
                        excessRows={excessRows}
                    />
                }
            </div>
        )
    }
}

// The header of the DataTable with column labels.
export const HeaderView = () => (
    <div className='headerView'>
        <span className='text number'>#</span>
        <span className='text value'>Value</span>
        <span className='text count'>Count</span>
        <span className='text age'>Age</span>
    </div>
)

// An animated loading indicator, shown when loading data for the given field.
export const LoadingView = () => (
    <div className='cardView loadingView'>
        <span className='text'>One moment...</span>
    </div>
)

// A button to trigger reload of the current field. If stale, reccomends a reload.
export const ReloadButton = ({ onReload, stale }: ReloadViewProps) => (
    <div className='cardView reloadView'
        onClick={onReload}
    >
        <span className='text'>Reload <b>{stale ? ' - This data may be out of date.' : ''}</b></span>
    </div>
)

// Displays an error if it occurred.
export const ErrorView = () => (
    <div className='cardView errorView'>
        <span className='text'>Something went wrong.</span>
    </div>
)

// Displays the number of excess columns.
export const ExcessView = ({ num }: ExcessViewProps) => (
    <div className='cardView excessView'>
        <span className='text'>{num} rows were omitted.</span>
    </div>
)

// Displays data for a single row of data.
export const RowView = ({ number, value, count, age }: RowViewProps) => (
    <div className='cardView rowView'>
        <span className='faded text number'>{number}</span>
        <span className='text value'>{value}</span>
        <span className='faded text count'>{count}</span>
        <span className='faded text age'>{age}</span>
    </div>
)

// Takes in a set of rows, displays each one along with an ExcessView if needed.
export const RowsView = ({ rows, excessRows }: RowsViewProps) => (
    <div className='rowsView'>
        {
            excessRows > 0 &&
            <ExcessView num={excessRows} />
        }
        {
            rows.map((r: DataRow, i: number) => (
                <RowView
                    key={'row_' + i}
                    number={i + 1}
                    value={r.value}
                    count={r.count}
                    age={r.age}
                />
            ))
        }
    </div>
)