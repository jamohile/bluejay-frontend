import React, { Component } from 'react';
import {connect} from 'react-redux';
import { StoreState } from '../../../utilities/store/reducers/root';
import { InputBase } from '../../UI/Input/Input';
import DataSearchView from '../views/DataSearchView';
import { dataSearchChangedAction } from '../../../utilities/store/actions/data';

interface DataSearchContainerProps{
    // Used to relay changes in the search query.
    onChange?: (search: string) => void;
}

/**
 * This component allows the user to filter the returned rows by value content.
 */
class DataSearchContainer extends Component<DataSearchContainerProps, {}>{
    render(){
        const onChange = this.props.onChange as (search:string) => void;

        return (
            <DataSearchView
                onChange = {onChange}
            />
        )
    }
}

const mapStateToProps = (state:StoreState) => {

}

const mapDispatchToProps = (dispatch:(({}) => void)) => {
    return{
        onChange: (search: string) => dispatch(dataSearchChangedAction(search))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataSearchContainer)