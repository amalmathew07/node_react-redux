import React, { PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';


const getCaret = direction => {
    if (direction === 'asc') {
        return (
            <span> <i className="fa fa-sort-asc" aria-hidden="true"/></span>
        );
    }

    if (direction === 'desc') {
        return (
            <span> <i className="fa fa-sort-desc" aria-hidden="true"/></span>
        );
    }

    return (
        <span> <i className="fa fa-sort" aria-hidden="true" /></span>
    );
};



const titleFormatter = (cell, row) => {
  return `<a href=${row.watchHref} target="_blank">${cell}</a>`;
};



class CelebList extends React.Component {

    constructor(props) {
        super(props);

        this.options = {
            sortIndicator: true,
            noDataText: 'No data'
        };

        this.selectRowProp = {
            mode: 'radio',
            bgColor: '#c1f291',
            onSelect: props.handleRowSelect,
            clickToSelect: true, 
            hideSelectColumn: true            
        };
    }



    render() {


        return (
            <BootstrapTable data={this.props.celebs}  selectRow={this.selectRowProp}  options={this.options} bordered={false} striped hover condensed>
                <TableHeaderColumn dataField="id" isKey>Celebrity Id</TableHeaderColumn>
                
                <TableHeaderColumn 
                    dataField="celebName"
                    dataFormat={titleFormatter} 
                    caretRender={getCaret}
                    columnTitle
                >
                    Celebrity Name
                </TableHeaderColumn>

                <TableHeaderColumn 
                    dataField="celebStage"
                    caretRender={getCaret}
                    columnTitle
                >
                    Stage
                </TableHeaderColumn>                           
            </BootstrapTable>
        );
    }

}



CelebList.propTypes = {
    celebs: PropTypes.array.isRequired,
    handleRowSelect: PropTypes.func.isRequired
};



export default CelebList;
