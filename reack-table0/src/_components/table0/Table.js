/* eslint-disable */
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import _ from 'lodash';

import TableSchema from '../schema/TableSchema';
import { DialogBox } from 'reack-dialog0';

import Pagation from '../pagation/Pagation';

class _Table extends Component {

    constructor (props) {
        super(props);
        this.state = {
            schema: TableSchema(),
            loading: false
        }
    }

    componentDidMount() {
        this.initState();
    }

    initState() {
        let _this = this;
        _this.props.schema.columns = _this.getHeaderColumns();
        this.setState({
            schema: _this.props.schema,
            loading: false,
            _pk: _this.getPk()      // 必须有主键, 主键默认是隐藏的列
        });
    }

    // 设置隐藏主键列
    getHeaderColumns() {
        let columns = _.orderBy(this.props.schema.columns, ['fieldIndex'],['asc']);
        const index = _.findIndex(columns, ['_pk', true]);
        columns[index]['hidden'] = true;
        return columns;
    }

    getPk() {
        const inputColumns = this.props.schema.columns;
        if (inputColumns === null || inputColumns.length === 0) {
            throw new Error('数据列为空');
        }
        const index = _.findIndex(inputColumns, ['_pk', true]);
        return inputColumns[index].fieldName;
    }

    getThStyle(col) {
        if (col.hidden) {
            return {
                display: 'none'
            };
        } else {
            return {};
        }
    }

    getTableColumns() {
        let _this = this;
        const columns = _this.state.schema.columns;
        return columns.map((col,index) => {
            return <th style={_this.getThStyle(col)} key={col.fieldName + '_' + index}>{col.text}</th>;
        });
    }

    getColumnDefineByFieldName(field) {
        let columns = this.state.schema.columns;
        const index = _.findIndex(columns, ['fieldName', field]);
        return columns[index];
    }

    getTableRow(row) {
        let _this = this;
        let columns = _this.state.schema.columns;
        let rowNew = _this.getRowObjectAsSortedAttr(row);
        let fieldArr = columns.map(col => {
           return col.fieldName;
        });
        let tds = _.map(fieldArr, (fieldName,index) => {
            let colDefine = _this.getColumnDefineByFieldName(fieldName);
            if (typeof rowNew['_action'] !== 'undefined') {
                return <td style={_this.getThStyle(colDefine)} key={index}>_action</td>;
            } else {
                if (typeof rowNew[fieldName] === 'undefined') {
                    return <td style={_this.getThStyle(colDefine)} key={index}>N/a</td>;
                } else if (rowNew[fieldName]) {
                    return <td style={_this.getThStyle(colDefine)} key={index}>{rowNew[fieldName]}</td>;
                } else if (rowNew[fieldName] === false) {
                    return <td style={_this.getThStyle(colDefine)} key={index}>否</td>;
                } else if (rowNew[fieldName] === true) {
                    return <td style={_this.getThStyle(colDefine)} key={index}>是</td>;
                } else {
                    return <td style={_this.getThStyle(colDefine)} key={index}>--</td>;
                }
            }

        });
        return (tds);
    }

    // 获取操作列
    getOperColumn() {
        let _this = this;
        return _this.state.schema.operator;
    }

    // 数据显示是根据表头字段顺序排列的
    getRowObjectAsSortedAttr(row) {
        const columns = this.state.schema.columns;
        let result = {};
        _.each(columns, (value, key) => {
            result[value.fieldName] = row[value.fieldName];
        });
        return result;
    }

    getTableBody() {
        if (!this.state._pk) {
            return null;
        }
        const data = this.state.schema.data;
        let _this = this;
        let result = null;
        if (data && data.length > 0) {
            result = data.map((item, index) => {
                return <tr key={item[this.state._pk]}><td style={{textAlign: 'center', borderRight: 'dashed 1px #9c9c9c'}}>{
                    this.getSeqNum(index)
                }</td>{_this.getTableRow(item)}{_this.getOprTd(item)}</tr>;
            });
        } else {
            result = _this.getEmptyBody(this.state.schema.columns.length);
        }
        return result;
    }

    getSeqNum(index) {
        return index + 1 + ( this.state.schema.pi * this.state.schema.ps);
    }

    getOprTd(item) {
        const _operator = this.state.schema.operator;
        if ( !_operator || _operator.length === 0) {
            return null;
        }
        return <td className={'oper'}>{this.getOperDefine(item)}</td>;
    }

    getOperDefine(item) {
        let _this = this;
        const _operator = this.state.schema.operator;
        if (!_operator) return '--';
        let _operatorDefine = _operator.map((type, index) => {
            let _operObj = _this.getOperObject(type);
            if (_operObj.type === 'detail') {
                return <span className={'link'} onClick={_this.getOperClick.bind(_this, 'detail', item[this.state._pk])} key={index}
                             style={{display:'inline-block',marginRight:'5px'}}>
                        {_operObj.text}</span>;
            }
            if (_operObj.type === 'delete') {
                return <span className={'link'} onClick={_this.getOperClick.bind(_this, 'delete', item[this.state._pk])} key={index}>
                        {_operObj.text}</span>;
            }
            if (_operObj.type === 'modal') {
                return <DialogBox key={index} heights={_operObj.height} widths={_operObj.width} text={_operObj.text} param={item[this.state._pk]} style={{color: '#007bff', padding: 0}} onClick={_this.getOperModalClick.bind(_this)} />;
            }
            return null;
        });
        return _operatorDefine;
    }

    getOperObject(type) {
        if (type === 'detail') {
            return {type: 'detail', text: '详情'};
        }
        if (type === 'delete') {
            return {type: 'delete', text: '删除'};
        }
        if (type === 'modal') {
            return {type: 'modal', text: '详情'};
        }
        return type;
    }

    getOperClick(type, pk) {
        const { onOperatorClick } = this.props;
        if (!onOperatorClick) return null;
        onOperatorClick(type, pk);
        //e.preventDefault();
    }

    getOperModalClick(e, param) {
        const { onOperatorClick } = this.props;
        if (!onOperatorClick) return null;
        onOperatorClick('modal', param, e);
    }

    getEmptyBody() {
        const _operator = this.state.schema.operator;
        const _has_opr = _operator && _operator.length > 0;
        let len = this.state.schema.columns.length - 1 + ( _has_opr ? 1 : 0) + 1; // 默认减去隐藏的主键列 + 操作列
        return <tr ><td colSpan={len} className={'empty'}>无数据..</td></tr>;
    }

    static getDerivedStateFromProps(props, state) {
       return { 
            schema: props.schema,
            loading: props.loading ?  true : false
        };
    }

    onPagerClick(index, action) {
        // action: current, prev, next, first, last, to
        const { onPageChange } = this.props;
        if (action === 'current') {
            onPageChange(index);
        }
        if (action === 'next') {
            index = this.state.schema.pi + 1;
            onPageChange(index >= this.state.schema.pc ? 0 : index);
        }
        if (action === 'prev') {
            index = this.state.schema.pi - 1;
            onPageChange(index < 0 ? this.state.schema.pc - 1 : index);
        }
        if (action === 'first') {
            onPageChange(0);
        }
        if (action === 'last') {
            onPageChange(this.state.schema.pc - 1);
        }
    }

    getOprColumn(jsx) {
        const _operator = this.state.schema.operator;
        if ( !_operator || _operator.length === 0) {
            return null;
        }
        return jsx;
    }

    getSeqColumn(p) {
        return (<th style={{textAlign: 'center'}}>序号</th>);
    }

    getPagation() {
        if (this.state.schema.pi === -1) return null;
        return <Pagation pc={this.state.schema.pc} pi={this.state.schema.pi} onPagerClick={this.onPagerClick.bind(this)} />;     
    }

    render() {
        return (
            <div className={`${this.props.className} tb`}>
                <div style={{position: 'relative'}}>
                    <div className={ this.state.loading ? 'loading' : 'loading loaded'}  style={{fontSize: '2em',textTransform: 'uppercase',fontWeight: 'bold'}}>loading..</div>
                    { this.getPagation() }
                    <table>
                        <thead>
                            <tr>{ this.getSeqColumn(<th>操作</th>) }{ this.getTableColumns() }{ this.getOprColumn(<th>操作</th>) }</tr>
                        </thead>
                        <tbody>{ this.getTableBody() }</tbody>
                    </table>
                </div>
            </div>
        );
    }

}


let mixin = css`&{
    overflow: auto;
    text-align: center;
    .loading {
        position: absolute;
        color: red;
        width: 100%;
        height: 100%;
        text-align: center;
        cursor: default;
    }
    .loading.loaded {
        display: none;
        cursor: default;
    }
    table {
        width: 100%;
        border-spacing: 0;
    }
    table > thead {
        color:white;
        background-color: lightslategrey;
        border-bottom: solid 2px black;
        font-size:.9em;
    }
    table > tbody {
        font-size:.85em;
    }
    table > thead > tr > th {
        padding: 0.525em .5em;
        text-align:left;
    }
    table > tbody > tr > td {
        border-bottom: 1px solid #dee2e6;
        padding: .625em .5em;
        text-align:left;
    }
    table > tbody > tr:nth-child(odd){
        background-color:#F4F4F4;
    }
    
    table > tbody > tr:hover {
        background-color:aliceblue;
    }
    .pagation {
        margin: 1em 0;
    }
    .pager {
        padding: 0;
        margin:0;
    }
    .pager > li {
        float: left;
        list-style-type: none;
        background-color: bisque;
        padding: 2px 6px;
        border: solid 1px rosybrown;
        border-left: none;
    }
    .pager > li:hover {
        cursor: pointer;
        background-color: burlywood;
        color:#424242;
    }
    .pager > li.current {
        background-color: darkgoldenrod;
        color:white;
    }
    .pager > li:first-child {
        border: solid 1px rosybrown;
    }
    .pager .clr {
        clear: both;
        float: none;
        width: 0;
        height: 0;
        padding: 0;
        margin: 0;
        border:none;
    }
    .empty {
        font-size: 1.625em;
        background-color: #f9f9f9;
        color: gray;
        padding: .5em;
    }
    .link {
        color: rgb(0, 123, 255);
        cursor:pointer;
        padding-left:.3em;
    }
}`

const Table = styled(_Table)`
    ${mixin}
`;

export default Table;


