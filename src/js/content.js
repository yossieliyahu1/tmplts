
'use strict';

var $ = require("jquery");
var React = require("react");

var Offer = require("./offer");

var ContentArea = React.createClass({

	render: function () {

		console.log("content -- rendering offers " + this.props.offers.length);
        
		return <div id="swu-content" className="content-area container-fluid row">
				<div className="col-md-12" >
                    {
						this.props.offers.map(function (b) {
							// return <SquareOffer data={b} />
							
							return <Offer.Wide data={b} />
                        }, this)
                    }
				</div>
            </div>
    }
});

module.exports = ContentArea;