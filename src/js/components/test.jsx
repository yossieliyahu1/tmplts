

var React = require("react");
var $ = require("jquery");


var Test = React.createClass({

  render : function(){


  	 return (<span>Hello {this.props.name}!</span>);

  }


});


module.exports = Test;