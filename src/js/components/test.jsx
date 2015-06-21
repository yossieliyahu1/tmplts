

var React = require("react");
var $ = require("jquery");


var Test = React.createClass({

  render : function(){


  	 return (<div>Hello world {this.props.name}</div>);

  }


});


module.exports = Test;