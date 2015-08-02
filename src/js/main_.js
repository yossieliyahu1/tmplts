
'use strict';


var $ = require("jquery");
var React = require("react");

var Router = require('react-router');
var Route = Router.Route;





var About = React.createClass( {
	render : function () {
		return <div><h1>About -- </h1></div>
		}
});

var Inbox = React.createClass({
	render : function () {
		return <div><h1>Inbox</h1></div>
		}
});

var App = React.createClass({
	render : function () {
		console.log(2);
		return <div>
                <h1>App</h1>
                <RouteHandler/>
            </div>
	}
});

var RouteHandler = Router.RouteHandler;

// declare our routes and their hierarchy
var routes = (
    <Route handler={App}>
        <Route path="about" handler={About}/>
        <Route path="inbox" handler={Inbox}/>
    </Route>
);


// localhost:3221/cntnt/:typ?q=


Router.run(routes, Router.HashLocation, function (Root, state) {
	console.log(1);
	React.render(<Root/>, document.body);
});
