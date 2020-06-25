/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from "styled-components";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import $ from "jquery";

export class _DialogBox extends React.Component {

    bodyElement = null;
    modelComponent = null;

    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false
        }
    }

    componentDidMount() {
        this.bodyElement = document.body;
    }

    scrollTop = 0;

    openDialog = () => {
        const { onClick, param } = this.props;
        this.setState({ isDialogOpen: true });
        this.scrollTop = $(document).scrollTop();
        disableBodyScroll(this.bodyElement);
        //this.bodyMargin();
        if (onClick) {
        	onClick(this, param);
        }
    }

    bodyMargin() {
       $('body').css("width", $('body').width() + 'px');
    }

    handleClose = () => {
        this.setState({ isDialogOpen: false });
        enableBodyScroll(this.bodyElement);
    }

    componentWillUnmount() {
        clearAllBodyScrollLocks();
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        let classSelector = '.' + this.props.className.replace(' ', '.');
        let target = $(classSelector).find('.ui-dialog-container')[0];
        if (target) {
            //ReactDOM.findDOMNode(target).style.top = this.scrollTop + 'px';
            ReactDOM.findDOMNode(target).style.top = '0px';
        }
    }

    getComponent() {
        if (this.modelComponent) {
            return this.modelComponent;
        }
        return <h1>DIALOG BOX CONTENT HERE</h1>;
    }

    getBoxContent() {
        if (!this.state.isDialogOpen) return null;
        const { widths, heights } = this.props;
        return (
            <div className="ui-dialog-container">
                <div className={"ui-dialog"}>
                    <div className={"box-wapper"} style={{maxWidth: widths ? widths : '650px'}}>
                        <div className={"box-header"}>
                            <button onClick={this.handleClose} type="button" className="button">Close</button>
                        </div>
                        <div className={"box-content"} style={{maxHeight: heights ? heights : '400px'}}>
                            {this.getComponent()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={`${this.props.className} box-dialog`} style={{display: 'inline-block'}}>
                <button style={this.props.style} type="button" onClick={this.openDialog} className="link-button">
                    { this.props.text || "Open Dialog"}
                </button>
                { this.getBoxContent() }
            </div>
        );
    }

}


let mixin = css`&{
    text-align: center;
    .ui-dialog-container  {
        background-color:rgba(0,0,0,.125);
        position: fixed;
        left: 0;
        z-index: 100;
        height: 100%;
        width: 100%;
        display: table;
    }
    .ui-dialog {
        transform: none !important;
        display: table-cell;
        vertical-align: middle;
        background-color: transparent;
    }
    .box-wapper {
        margin:auto;
        max-width: 650px;
        min-width: 350px;
        background-color: white;    
        border: solid 2px gainsboro;
        border-radius: 5px;
        box-shadow: 0px 0px 5px #0e0e0e;
    }
    
    .box-wapper-200 {
        margin-top: -6.25em;
    }
    
    .box-wapper-300 {
        margin-top: -4.25em;
    }
    
    .box-header {
        margin: 0px;
        padding: .325em;
        border-bottom: solid 1px gainsboro;
        text-align: right;
    }
    .box-content {
        max-height: 400px;
        overflow-y: scroll;
    }
    .link-button {
        border: none;
        background-color: transparent;
        color: #007bff;
    }
}`;

const DialogBox = styled(_DialogBox)`
    ${mixin}
`;

export default DialogBox;
