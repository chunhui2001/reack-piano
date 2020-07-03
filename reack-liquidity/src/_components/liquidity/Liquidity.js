import React, { Component } from 'react';
import styled, { css } from "styled-components";

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

    componentWillMount() {
        this.setState({
			...this.state,
			currentInstrument: 'JPY',
			tickers: TICKETS['JPY']
		});
    }

	getTickers() {
		let _tickers = this.state.tickers.map((c, i) => {
			return <div key={i} className={"ticket"}>
				<div className={'tick-header'} style={{textAlign:'left', marginBottom: '0.30em'}}>
					<span className={`crypto-icons ${c.split('/')[0].toLowerCase()} x18`} style={{marginRight:'6px'}}></span>
					<span style={{fontSize:'18px'}}>{c}</span>
					<span style={{marginLeft: '20%',fontSize: '14px', color: 'darkgray', fontWeight: 'bold'}}>23:56:20</span>
					<span className={'crypto-icons star x18'} style={{padding:0,color:'darkgray',float:'right'}}>&#9734;</span>
				</div>
				<div style={{marginBottom:'-20px'}}>
					<span style={{border:'solid 1px gray', fontSize:'14px', backgroundColor: 'gainsboro', borderTop: 'none', padding:'0 5px'}}>100</span>
				</div>
				<div style={{width:'50%', height:'90px', float:'left', backgroundColor: 'white'}}>
					<div style={{border:'solid 1px gray',height:'100%', borderRight:'none'}}></div>
				</div>
				<div style={{width:'50%', height:'90px', float:'left', backgroundColor: 'white'}}>
					<div style={{border:'solid 1px gray',height:'100%'}}></div>
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
					{this.getTickers()}
				</div>
			</div>
		);
	}

}


let mixin = css`&{
	max-width: 1136px;
    margin: auto;
	.clear{
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
		height:165px;
		background-color:gainsboro;
		margin-right:.625em;
		margin-bottom:.625em;
		padding:.525em;
		text-align:center;
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
    }
    .crypto-icons.star{
    	width:auto;
    	height:auto;
    }
}`;

const Liquidity = styled(_Liquidity)`
    ${mixin}
`;


export default Liquidity;
