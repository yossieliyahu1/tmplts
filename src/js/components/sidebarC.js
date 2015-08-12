
(function () {

	$(".sidebar a").click(function () {
		$.each($(".sidebar a"), function () {
			$(this).removeClass("active");
		});
		$(this).addClass("active");
	});

})();