
'use strict';


var $ = require("jquery");
var React = require("react");


var TopBar = require("./topbar");
var Search = require("./sbx");
var ContentArea = require("./content");
var Footer = require("./footer");


var adsrv = require("./adsrv");

var rpt = {
	snd : function (typ, feed, cmpnnt){

	}
}


var SWU = React.createClass( {

    getInitialState : function () {
        return {
        	offersData : [],
        	searchTerms : []
        }
    },

    rpt : function (typ, feed, cmpnnt){
    	rpt.snd(typ, feed, cmpnnt);
    },

    // adsrv.js    
    renderOffers : function (data) {
    	if(!data || !data.length){
    		return;
    	}
    	
    	console.log("re-render offers " + data[0].desc.short + "   " + data);
    	var newData = this.state.offersData;
    	for(var d in data){
    		newData.push(data[d]);
    	}

    	this.setState({ offersData : newData });
    },
    
    // sbx.js
    search : function (st) {
    	
    	var strms = this.state.searchTerms;
    	if($.inArray(st, strms) < 0){
    		strms.push(st);
    	}
    	
    	this.setState({ searchTerms : strms, offersData : [] });

        adsrv.gt(st, this);
    },

	// drag
	//<div id="drgbl" ondrop="drop(event)" ondragover="allowDrop(event)"></div> 
    render: function () {
    	return <div className="container-fluid">
                    <TopBar />
                    <Search.SBX hndlr={this} />
					<Search.Searched hndlr={this} terms={this.state.searchTerms} />
					<ContentArea offers={this.state.offersData} />
                    <Footer />
                </div>
    }
});

//window.onload = function () {
React.render(<SWU />, 
    document.getElementById('main'));
//};



$(function () {
	$(window).on("load resize", function () {
		$(".fill-screen").css("height", window.innerHeight);
	});

	// add Bootstrap's scrollspy
	/*
	$('body').scrollspy({
		target: '.navbar',
		offset: 160
	});
	*/

	// smooth scrolling
	$('nav a, .down-button a').bind('click', function () {
		$('html, body').stop().animate({
			scrollTop: $($(this).attr('href')).offset().top - 100
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});

	/*
	try{
		// initialize WOW for element animation
		new WOW().init();
	}
	catch (e) {
		alert(e);
	}
	*/
	// parallax scrolling with stellar.js
	// $(window).stellar();
});