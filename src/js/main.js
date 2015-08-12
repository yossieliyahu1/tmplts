
'use strict';


var $ = require("jquery");
var React = require("react");


var Sidebar = require("../components/sidebar");



var Main = React.createClass( {
	
	render: function () {

		var tmp = [{

			val : "abc",
			lnk : "http://ynet.co.il",
			prm : ""
		},

	{

		val : "rrrrrrr",
		lnk : "http://google.co.il",
		prm : ""
	}
	
		];
    	return <div className="container-fluid">
					<Sidebar rows={tmp} />
                </div>
    }
});

React.render(<Main />, document.getElementById('main'));

