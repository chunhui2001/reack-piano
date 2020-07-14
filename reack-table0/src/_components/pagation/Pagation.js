/* eslint-disable */
import React, { Component } from 'react';

export class Pagation extends Component {

    pageGroupSize = 8;

    constructor (props) {
        super(props);
        this.state = {};
    }

    componentDidMount () {
        let pageGroupCount = Math.ceil(this.props.pc / 8); // 计算页组数量
        let pageGroupIndex = Pagation.calculatePageGroupIndex(this.props.pc, pageGroupCount, this.props.pi);
        let pageGroupRange = Pagation.calculateGroupRangeByGroupIndex(this.props.pc, pageGroupCount, pageGroupIndex);
        this.setState({
            pc: this.props.pc,
            pi: this.props.pi,
            gc: pageGroupCount,               // 总页组数量
            gi: pageGroupIndex,   // 当前是第几个页组
            gr: pageGroupRange   // 当前组范围
        });
    }

    static getDerivedStateFromProps(props, state) {
        let pageGroupCount = Math.ceil(props.pc / 8); // 计算页组数量
        let pageGroupIndex = Pagation.calculatePageGroupIndex(props.pc, pageGroupCount, props.pi);
        let pageGroupRange = Pagation.calculateGroupRangeByGroupIndex(props.pc, pageGroupCount, pageGroupIndex);
        return {
            pc: props.pc,
            pi: props.pi,
            gc: pageGroupCount,               // 总页组数量
            gi: pageGroupIndex,   // 当前是第几个页组
            gr: pageGroupRange   // 当前组范围
        };
    }

    // 计算页组下标
    static calculatePageGroupIndex(pageCount, pageGroupCount, pageIndex) {
        for (let groupIndex=0; groupIndex<pageGroupCount; groupIndex++) {
            let groupRange = Pagation.calculateGroupRangeByGroupIndex(pageCount, pageGroupCount, groupIndex);
            if (pageIndex >= groupRange.left && pageIndex <= groupRange.right) {
                return groupIndex;
            }
        }
        return -1;
    }

    // 当前页组范围
    static calculateGroupRangeByGroupIndex(pageCount, pageGroupCount, groupIndex) {
        for (let i=0; i<pageGroupCount; i++) {
            if (i === groupIndex) {
                let groupRangeLeft = i * 8;
                let groupRangeRight = groupRangeLeft + 8 - 1;
                if (groupRangeRight > pageCount-1) {
                    groupRangeRight = pageCount-1;
                }
                return { left: groupRangeLeft, right: groupRangeRight };
            }
        }
        return null;
    }

    getPagerItems() {
        const pageRange = this.state.gr;
        let pItems = [];
        for (let i=pageRange.left; i<=pageRange.right; i++) {
            pItems.push({text: i+1, index: i});
        }
        return pItems.map((item) => {
            return <li onClick={this._onPagerClick.bind(this, item.index, 'current')} key={item.index} className={ item.index === this.state.pi ? 'current' : '' }>{item.text}</li>
        });
    }

    getPager() {
        const pageCount = this.state.pc;
        if (pageCount && pageCount > 0) {
            return (<ul className={'pager'} style={{float: 'left'}}>
                { this.getPagerItems() }
                <li className={'clr'}></li>
            </ul>)
        } else {
            return (<ul className={'pager'} style={{float: 'left'}}>
                <li key={0}>{0}</li>
                <li className={'clr'}></li></ul>)
        }
    }

    getPagerPrev() {
        return <ul className={'pager'} style={{ marginRight: '10px', float: 'left'}}>{
            <li onClick={this._onPagerClick.bind(this, null, 'prev')} className={ 'prev' }>上一页</li>
        }<li className={'clr'}></li></ul>
    }

    getPagerNext() {
        return <ul className={'pager'} style={{ marginLeft: '10px', float: 'left'}}>{
            <li onClick={this._onPagerClick.bind(this, null, 'next')} className={ 'next' }>下一页</li>
        }<li className={'clr'}></li></ul>
    }

    getPagerFirst() {
        return <ul className={'pager'} style={{ marginRight: '5px', float: 'left'}}>{
            <li onClick={this._onPagerClick.bind(this, null, 'first')} className={ 'first' }>首页</li>
        }<li className={'clr'}></li></ul>
    }

    getPagerLast() {
        return <ul className={'pager clr'} style={{ marginLeft: '5px', float: 'left'}}>{
            <li onClick={this._onPagerClick.bind(this, null, 'last')} className={ 'last' }>尾页</li>
        }<li className={'clr'}></li></ul>
    }

    _onPagerClick(index, action) {
        const { onPagerClick } = this.props;
        onPagerClick(index, action);
    }

    render () {
        return (
            <div className={'pagation'}>
                <div style={{display: 'inline-block', verticalAlign: 'top', fontFamily: 'simsun'}}>
                    { this.getPagerFirst() }
                    { this.getPagerPrev() }
                    { this.getPager() }
                    { this.getPagerNext() }
                    { this.getPagerLast() }
                    <div style={{clear:'both'}}></div>
                </div>
            </div>
        );
    }

}

export default Pagation;
