
'use strict';

var $ = require("jquery");
var React = require("react");
    
var Footer = React.createClass({
        
    render: function () {

    	return <footer className="container-fluid footer fill-screen">
                    <div className="row">
                        <h1>FOOTER</h1>
                    </div>
               </footer>;
        }
});
    
// React.renderComponent(<Footer />, document.getElementById('main'));


module.exports = Footer;