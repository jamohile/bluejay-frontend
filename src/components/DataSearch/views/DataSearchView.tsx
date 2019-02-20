import React, { Component } from 'react';
import { InputBase } from '../../UI/Input/Input';
import './dataSearchView.css';

interface DataSearchViewProps{
    // Used when the search string is changed.
    onChange: (search:string) => void;
}

/**
 * This view allows us to search through and filter the data we have.
 */
class DataSearchView extends Component<DataSearchViewProps>{

    render(){
        const {onChange} = this.props;

        return(
            <div className = 'dataSearch'>
                <InputBase error={false}>
                    <input
                        onChange = {(e:any) => onChange(e.target.value)}
                        className='text'
                        type='text'
                        placeholder = 'Filter'
                    />
                </InputBase>
            </div>
        )
    }
}

export default DataSearchView;