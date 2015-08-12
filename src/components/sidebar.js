
var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Link = require('react-router').Link;

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;


var Component = React.createClass({

	render: function() {
 
		var rows = this.props.rows.map(function(row, idx) {

			return (<NavItem key={"sidebar_" + idx} className="">
									<Link to={row.lnk} >{row.val}</Link>
							   </NavItem>)
		});

		return <Nav> 
					{rows}
				</Nav>
	}

});



module.exports = Component;