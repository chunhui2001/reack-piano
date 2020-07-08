import React, { Component } from 'react';
import styled, { css } from "styled-components";

export class _Select0 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: null
        };
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            options: this.props.options,
            open: false
        });
    }

    onOpenClick = () => {
        let _open = this.state.open;
        this.setState({
            ...this.state,
            open: !_open
        });
    }

    onSelectChanged = (value) => {
        let currentSelected = this.getSelected();
        if (!this.state.options || this.state.options.length === 0) {
            return null;
        }
        let _options = this.state.options.map(m => {
            return {
                ...m,
                selected: m.value === value
            }
        });
        this.setState({
            ...this.state,
            options: _options,
            open: false
        });
        if (currentSelected.value === value) {
            return;
        }
        const { onSelectChanged } = this.props;
        if (onSelectChanged) {
            onSelectChanged(value);
        } 
    }

    getOptionsSection() {
        if (!this.state.options || this.state.options.length === 0) {
            return null;
        }
        return <ul className={ this.state.open ? 'open' : ''}>{
            this.state.options.map((m, i) => {
                return <li key={i} onClick={this.onSelectChanged.bind(this, m.value)}>{m.text}</li>;
            })}
        </ul>;
    }

    getSelected() {
        if (!this.state.options || this.state.options.length === 0) {
            return null;
        }
        let v = this.state.options.filter(f => f.selected);
        if (v && v[0]) {
            return v[0];
        }
        return this.state.options[0];
    }

	render() {
		return <div className={`${this.props.className} Select0`}>
            <div style={{display:'table', height:'100%'}} onClick={this.onOpenClick.bind(this)}>
                 { !this.getSelected() && <span className={'sel'}>--请选择--</span> }
                 { this.getSelected() && <span className={'sel'}>{this.getSelected().text}</span> }
            </div>
            { this.getOptionsSection() }
        </div>;
	}

}

let mixinSelect0 = css`&{
    background-color: burlywood;
    display: table;
    position: relative;
    height:100%
    :hover {
        background-color: darkgoldenrod;
    }
    > ul {
        margin: 0;
        padding: 0;
        list-style: none;
        position: absolute;
        left: 0;
        top:100%;
        margin-top: 0%;
        min-width: 100%;
        display: none;
        text-align: center;
    }
    > ul.open {
        display: inline;
    }
    > ul > li {
        background-color: aquamarine;
    }
    > ul > li:hover {
        background-color: red;
    }
    .sel {
        padding: 0 .625em;
        display: table-cell;
        height: 100%;
        vertical-align: middle;
    }
}`;

const Select0 = styled(_Select0)`
    ${mixinSelect0}
`;

export default Select0;
