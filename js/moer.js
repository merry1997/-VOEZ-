$(function() {
	$('header').load('header.html');
	$('.moer-warp').height($(window).height() - 55);

	//点击按钮
	var moerIndex = 0;
	$('.moer-listBox li').click(function() {
		moerIndex = $(this).index();
		$('.moer-listBox li').removeClass('moer-active').css('backgroundImage', '');
		$(this).addClass('moer-active').css('backgroundImage', 'url(./image/color_' + moerIndex + '.png)');
		$('.moer-warp').css('backgroundImage', 'url(./image/bg' + moerIndex + '.png)');
	});
	$('.moer-brige').click(function() {
		$('.moer-new11 a').removeClass('moer-news');
		$(this).addClass('moer-news');
		$('.moer-warp').addClass('moer-warp1');
		$('.moer-icon').fadeOut();
		$('.moer-txt').fadeIn();
	});
	$('.moer-new11 a').eq(0).click(function() {
		$('.moer-new11 a').removeClass('moer-news');
		$(this).addClass('moer-news');
		$('.moer-warp').removeClass('moer-warp1');
		$('.moer-icon').fadeIn();
		$('.moer-txt').hide();
	});
	$('.gohome').click(function() {
		parent.location.reload();
	});
});