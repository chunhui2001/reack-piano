import React, { Component } from 'react';
import styled, { css } from "styled-components";


import Select from "../select/Select";

const TICKETS = {
	"JPY": ['BTC/JPY','ETH/JPY','XRP/JPY','LTC/JPY','BCH/JPY','USD/JPY','GBP/JPY','EUR/JPY','AUD/JPY','CAD/JPY','CHF/JPY'],
	"UST": ['BTC/UST','ETH/UST','XRP/UST'],
};

export class _Liquidity extends Component {


	constructor(props) {
		super(props);
		this.state = {
			currentInstrument: 'UST',
			tickers: TICKETS['UST']
		};
	}

    componentDidMount() {
    	let _this = this;
		_this.streamPrices();
		window.setInterval(function() {
			_this.streamPrices();
		}, 300);
        this.setState({
			...this.state,
			currentInstrument: 'JPY',
			tickers: TICKETS['JPY']
		});
    }

	getTickers() {
		let _tickers = this.state.tickers.map((c, i) => {
			return <div key={i} className={"ticket"}>
				<div className={'tick-header'} style={{ textAlign:'left', marginBottom: '0.30em'}}>
					<span className={`crypto-icons ${c.split('/')[0].toLowerCase()} x18`} style={{marginRight:'6px'}}></span>
					<span style={{fontSize:'18px'}}>{c}</span>
					<span style={{marginLeft: '20%',fontSize: '14px', color: 'brown', fontWeight: 'bold'}}>
						{ this.state[c] && this.state[c].couter && this.state[c].couter.ts }
					</span>
					<span className={'crypto-icons star x18'} style={{padding:0,color:'brown',float:'right'}}>&#9734;</span>
				</div>
				{ 
					(
						(!this.state[c] || typeof (this.state[c].invalid) === 'undefined') || 
						(this.state[c] && !this.state[c].invalid)
					)
					&& <div>
						<div style={{marginBottom:'-22px'}}>
							<span style={{border:'solid 1px gray', fontSize:'14px', backgroundColor: 'gainsboro', borderTop: 'none', padding:'2px 10px'}}>
								{ this.state[c] && this.state[c].couter && this.state[c].couter.quantity }
							</span>
						</div>
						<div style={{width:'50%', height:'85px', float:'left', backgroundColor: 'white'}}>
							<div style={{border:'solid 1px gray',height:'100%', borderRight:'none', color: 'red'}}>
								<span style={{display:'block', padding: '18px 0 0px 0'}}>SELL</span>
								<span style={{display:'block', fontSize: '20px', fontWeight: 'bold'}}>
								{ this.state[c] && this.state[c].couter && this.state[c].couter.ask }
								<i>&nbsp;&nbsp;&nbsp;</i></span>
							</div>
						</div>
						<div style={{width:'50%', height:'85px', float:'left', backgroundColor: 'white'}}>
							<div style={{border:'solid 1px gray',height:'100%', color: 'green'}}>
								<span style={{display:'block', padding: '18px 0 0px 0'}}>BUY</span>
								<span style={{display:'block', fontSize: '20px', fontWeight: 'bold'}}>
								{ this.state[c] && this.state[c].couter && this.state[c].couter.bid }
								<i>&uarr;</i></span>
							</div>
						</div>
					</div>
				}
				{ 
					this.state[c] && this.state[c].invalid && <div style={{height:'85px', overflow:'hidden'}}>
						<div style={{backgroundColor: 'antiquewhite', fontStyle: 'italic', color: 'blueviolet',border: 'solid 1px gray',fontSize: '13px',textAlign: 'left',height: 'calc(100% - 2px)'}}>
							<p style={{padding: '8px',margin: 0}}>
								Invalid subscription request Level `{ this.getInputVal(c) }` out of bounds. Leval must be a number 
								between { this.getLevelsByTicket(c)[0] } and { this.getLevelsByTicket(c)[1] } (included).
							</p>
						</div>
					</div>
				}
				<div className={'clear'}></div>
				<div style={{marginTop: '15px'}}>
					<div style={{ float:'left', textAlign:'left', fontSize:'12px', fontWeight: 'bold', color: 'darkgray' }}>
						<span style={{display:'block'}}>Min: { this.getLevelsByTicket(c)[0] }</span>
						<span style={{display:'block'}}>Max: { this.getLevelsByTicket(c)[1] }</span>
					</div>
					<div style={{float:'right',marginRight:'calc(50% - 44px)'}}>
						<input style={{border:'dashed 1px gray', textAlign:'center', padding:'4px', fontSize: '20px', width: '80px' }} type="text" 
						   value={ this.getInputVal(c) }
					       onChange={(e) => this.onInputChange(e, c)} />
					</div>
					<div className={'clear'}></div>
				</div>
				<hr style={{margin:'10px -11px 0 -11px', padding:0}} />
				<div style={{padding: '5px 0'}}>
					<span style={{ display:'inline-block', float:'left', color: 'darkgoldenrod' }}>Order type</span>
					<div style={{display:'inline-block', float:'right'}}>
						<Select></Select>
					</div>
				</div>
			</div>;
		});
		return <div>
			{ _tickers }
			<div className={"clear"}></div>
		</div>
	}

	onInstrumentClick = (instrument) => {
		this.setState({
			...this.state,
			currentInstrument: instrument,
			tickers: TICKETS[instrument]
		});
	}

	onInputChange = (e, ticket) => {
		let _val = e.target.value;
		let _levels = this.getLevelsByTicket(ticket);
		this.setState({
			...this.state,
			[ticket]: {
				val: _val,
				invalid: !(_val >= _levels[0] && _val <= _levels[1]),
				levels: _levels
			}
		});
	}

	getLevelsByTicket(ticket) {
		if (ticket === 'BTC/JPY') {
			return [0.001, 100];
		}
		return [0.001,0.001]
	}

	getInputVal(ticket) {
		if (!this.state[ticket]) {
			return 1;
		}
		if (this.state[ticket].val >= 0 || this.state[ticket].val < 0) {
			return this.state[ticket].val;
		}
		if (!this.state[ticket].val) {
			return 1;
		}
		return this.state[ticket].val;
	}

	streamPrices() {
		let ticketsArray = [];
		for (const [key, value] of Object.entries(TICKETS)) {
			ticketsArray = ticketsArray.concat(value);
		}
		for (let ticket of ticketsArray) {
			let theTicket = this.state[ticket];
			if (!theTicket) {
				theTicket = {};
			}
			theTicket.couter = {
				ts: this.formatDate(new Date()),
				ask: Math.floor((Math.random()*10000)+1),
				bid: Math.floor((Math.random()*10000)+1),
				quantity: Math.floor((Math.random()*10000)+1)
			}
			this.setState({
				...this.state,
				[ticket]: theTicket
			});
		}
	}

	formatDate = (date) => {
		return new Intl.DateTimeFormat('cn', { hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(date);
	}

	render() {
		return (
			<div className={`${this.props.className}`}>
				<div style={{textAlign:'center'}}>
					<span className={'crypto-icons star x90'}>&#9733;</span>
					<span className={'crypto-icons star x90'}>&#9734;</span>
					<span className={'crypto-icons star x90'}>&#9733;</span>
					<span className={'crypto-icons star x90'}>&#9734;</span>
					<span className={'crypto-icons star x90'}>&#9733;</span>
				</div>
				<div style={{textAlign:'center', marginBottom: '1.625em'}}>
					<span className={'crypto-icons btc x90'}></span>
					<span className={'crypto-icons bch x90'}></span>
					<span className={'crypto-icons eth x90'}></span>
					<span className={'crypto-icons ltc x90'}></span>
					<span className={'crypto-icons xrp x90'}></span>
				</div>
				<div className={'instruments'} style={{marginBottom: '.625em'}}>
					<span className={'crypto-icons star x18'} style={{padding:'.15em .25em',color:'darkorchid'}}>&#9733;</span>
					<span onClick={ (e) => this.onInstrumentClick('JPY') } className={ this.state.currentInstrument === 'JPY' ? 'active' : ''}>JPY</span>
					<span onClick={ (e) => this.onInstrumentClick('UST') } className={ this.state.currentInstrument === 'UST' ? 'active' : ''}>UST</span>
				</div>
				<div>
					{ this.getTickers() }
				</div>
			</div>
		);
	}

}


let mixin = css`&{
	max-width: 1136px;
    margin: auto;
	.clear {
		float:none;
		clear:both;
		padding:0;
		margin:0;
		height:0;
		width:0;
	}
	.ticket {
		float:left;
		width:260px;
		background-color:gainsboro;
		margin-right:.625em;
		margin-bottom:.625em;
		padding:.525em;
		text-align:center;
		overflow: hidden;
	}
	.tick-header {
		height:24px
	}
	.tick-header > span {
		height: 100% !important;
	    display: inline-block;
	    float: left;
	    line-height: 25px;
	}
	.instruments > span {
		display: inline-block;
		padding: .325em .625em;
		background-color:gainsboro;
		margin-right:5px;
		height:21px;
	}
	.instruments > span:hover {
		background-color:gray;
	}
	.instruments > span.active {
		background-color:darkmagenta;
		color:white;
	}
    .crypto-icons {
    	display:inline-block;
    	background-size: 100%;
    	background-repeat: no-repeat;
    	background-position: center;
    }
    .crypto-icons.x90 {
    	width:90px;
    	height:90px;
    }
    .crypto-icons.x18 {
    	width:18px;
    	height:18px;
    }
    .crypto-icons.btc{
    	background-image: url('/otc-icons/BTC.svg')
    }
    .crypto-icons.bch{
    	background-image: url('/otc-icons/BCH.svg')
    }
    .crypto-icons.eth{
    	background-image: url('/otc-icons/ETH.svg')
    }
    .crypto-icons.ltc{
    	background-image: url('/otc-icons/LTC.svg')
    }
    .crypto-icons.xrp{
    	background-image: url('/otc-icons/XRP.svg')
    }
    .crypto-icons.star.x90{
    	font-size:90px;
    }
    .crypto-icons.star.x18{
    	font-size:18px;
    	margin-top: -2px;
    }
    .crypto-icons.star{
    	width:auto;
    	height:auto;
    }
    /** customer: BUTTON; **/
	input, input:hover, input:focus {
	    outline:0 !important;
	    /*-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.35);*/
	    /*-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.35);*/
	    /*box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.35);*/
	}
}`;

const Liquidity = styled(_Liquidity)`
    ${mixin}
`;


export default Liquidity;
