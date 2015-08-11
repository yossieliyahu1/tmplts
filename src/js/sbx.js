

'use strict';

var $ = require("jquery");
var React = require("react");

var SBX = React.createClass( {

    handleClick : function () {
        this.props.hndlr.search($("#sbx").val());
    },

    render: function () {
        return <div>
                    <input id="sbx" type="text" className="search-box" placeholder="Enter your search" />
                    <input id="srch" type="button" value="Search" onClick={this.handleClick} />
            </div>
    }
});

var Searched = React.createClass( {

	propLen : 0,

	handleClick : function (e) {
		var st = e.target.innerText;
		this.props.hndlr.search(st);
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		if(nextProps.terms.length > this.propLen){
			this.propLen = nextProps.terms.length;
			return true;
		}
		return false;
	},

	render: function () {
		return <div>
                    {
                    	this.props.terms.map(function (b) {
                    		return <div className="searched-item" onClick={this.handleClick} >{b}</div>
                    		}, this)
                    }
            </div>
	}
});

module.exports = {
	SBX : SBX,
	Searched : Searched
}