

(function () {

	
	$(".sidebar li").click(function () {
		$.each($(".sidebar li"), function () {
			$(this).removeClass("active");
		});
		$(this).addClass("active");
	});

})();