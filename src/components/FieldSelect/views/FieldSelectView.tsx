import * as React from 'react';
import './fieldSelectView.css';
import { string } from 'prop-types';

// Properties for the whole FieldSelectView. This is the highest level component here.
export interface FieldSelectViewProps {
    // Handles a new field being selected.
    onChange: (field:string) => void,

    // The possible fields that can be selected.
    fieldOptions: string[],

    // The currently selected fields.
    selected: string,

    // Whether the field options are being loaded from server.
    loading: boolean,

    // Whether the field options are loaded from server.
    loaded: boolean,

    // Whether something went wrong.
    error:boolean
}

// Properties for the select input inside the FieldSelectView.
export interface OptionViewProps {
    // The selected field
    selected: string,
    // The possible fields
    options: string[],
    // Handle a changed field.
    onChange: (field:string) => void;
}

export class FieldSelectView extends React.Component<FieldSelectViewProps> {
    constructor(props:FieldSelectViewProps){
        super(props);
    }

    render() {

        // Retains type information.
        const {loaded, loading, error, fieldOptions, selected, onChange} = this.props;

        return (
            <div className = {'fieldSelect' + (error ? ' error' : '')}>
                {
                    error &&
                    <ErrorView/>
                }
                {
                    loading &&
                    <LoadingView/>
                }

                {
                    loaded &&
                        <OptionView
                            selected = {selected}
                            options = {fieldOptions}
                            onChange = {onChange}
                        />
                }
            </div>
        )
    }
}

// Lets user know app is loading.
export const LoadingView = () => (
    <span className='faded text'>
        One moment..
    </span>
)

// As select view to choose the field being filtered on.
export const OptionView = ({selected, options, onChange}:OptionViewProps) => (
    <span className = 'optionView'>
        <span className = 'faded text'>
            Filter by
        </span>
        <select className='bold text' onChange={(e:any)=>onChange(e.target.value)}>
            {
                //Iterate through fields, add to the select.
                options.map((op:string) =>  (
                    <option
                        key={op}
                        selected = {selected == op}>
                        {op}
                    </option>
                ))
                }
        </select>
    </span>
)

// Lets user know if something went wrong.
export const ErrorView = () => (
    <span className='text'>
        Something went wrong...
    </span>
)
