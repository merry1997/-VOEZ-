var oIndex = 0;
$(function() {
	$('#main').height($(window).height() - $('header').height());
	//首页动画效果
	animateImage();
	//封装动画效果
	//首页
	function animateImage() {
		$('.main-one-img,.redeem_code,.play,.download').show().addClass('animated slideInDown');
		setTimeout(function() {
			$('.people').show().addClass('animated slideInDown');
		}, 300);
	}

	function animateImage2() {
		if(oIndex == 0) {
			$('.main-one-img,.redeem_code,.play,.download,.people').removeClass('animated slideOutUp');
			setTimeout(function() {
				animateImage();
			}, 600);
		} else if(oIndex > 0) {
			$('.main-one-img,.redeem_code,.play,.download,.people').removeClass('animated slideInDown');
			$('.main-one-img,.redeem_code,.play,.download,.people').addClass('animated slideOutUp');
			setTimeout(function() {
				$('.main-one-img,.redeem_code,.play,.download,.people').hide();
			}, 600);
		}
	}
	//白色蒙版

	function baismb() {
		if(oIndex == 1) {
			$('.news .news-content').animate({
				padding: $('.news').width() / 2.4 + 'px',
				'opacity': 1
			}, 1000);
			setTimeout(function() {
				$('.news-con').animate({
					'opacity': 1
				}, 700);
			}, 1000);
		} else {
			$('.news .news-content').animate({
				padding: '0px',
				'opacity': 0
			}, 1000);
			$('.news-con').animate({
				'opacity': 0
			}, 300);
		}
		if(oIndex == 2) {
			$('.int .news-content').animate({
				padding: $('.news').width() / 2.5 + 'px',
				'opacity': 1
			}, 600);
			setTimeout(function() {
				$('.intro').animate({
					'opacity': 1
				}, 700);
			}, 600);
		} else {
			$('.int .news-content').animate({
				padding: '0px',
				'opacity': 0
			}, 600);
			$('.intro').animate({
				'opacity': 0
			}, 300);
		}
		if(oIndex == 4) {
			$('.diary .news-content').animate({
				padding: $('.news').width() / 2.9+ 'px',
				'opacity': 1
			}, 600);
			setTimeout(function() {
				$('.diary-content').animate({
					'opacity': 1
				}, 700);
			}, 600);
		} else if(oIndex < 4) {
			$('.diary .news-content').animate({
				padding: 0,
				'opacity': 0
			}, 600);
			$('.diary-content').animate({
				'opacity': 0
			}, 600);
		}
	}
	//页面滚动
	var scrollFun = function(ev) {
		$('.content').height($(window).height() - $('header').height() - 55);
		var event = window.event || ev;
		if(event.wheelDelta) {
			if(event.wheelDelta > 0) {
				setTimeout(conUp, 300);
			} else {
				setTimeout(conDown, 300);
			}
		} else if(event.detail) {
			if(event.detail < 0) {
				conUp();
			} else {
				conDown();
			}
		}
	}

	//给页面绑定滚动事件

	if(document.addEventListener) {
		document.addEventListener('DOMMouseScroll', scrollFun, false);
	}

	var oDelay = 0,
		timer, gonin = false;
	//封装向下滚
	function conDown() {
		if(oDelay < 0) { //判断用于检测第一次鼠标滚动
			clearTimeout(timer)
			timer = setTimeout(function() {
				oDelay++;
			}, 100)
		} else if(!gonin) {
			gonin = true;
			oIndex++;
			animateImage2();
			baismb();
			if(oIndex > $('.content').length - 1) {
				oIndex = $('.content').length - 1
			}
			conGo();
		}
	}
	//封装滚动方法 上
	function conUp() {
		if(oDelay < 0) { //判断用于检测第一次鼠标滚动
			clearTimeout(timer)
			timer = setTimeout(function() {
				oDelay++;
			}, 100)
		} else if(!gonin) {
			gonin = true;
			oIndex--;
			animateImage2();
			baismb();
			if(oIndex < 0) {
				oIndex = 0
			}
			conGo();
		}
	}
	//封装滚动方法
	function conGo() {
		$('#main').animate({
			scrollTop: ($('.content').height() + 55) * oIndex
		}, 300, function() {
			gonin = false;
			oDelay = 0;
			$('.nav-list li').eq(oIndex).addClass('nav-lis').siblings().removeClass('nav-lis');
		})
	}

	//点击导航到相应的模块
	$('.nav-list li').click(function() {
		oIndex = $(this).index();
		conGo();
		animateImage2();
		baismb();
	});
	//日记展开部分滚轮
	var scrdrag = $('.scroll_drag');
	var scrollTrack = $('.scroll_track');
	var viewDiv = $('.viewcon_div');
	//拖拽滚动条
	scrdrag.mousedown(function() {
		scrollDrag();
	});
	//封装滚动条拖拽
	function scrollDrag(event) {
		var event = event || window.event;
		var scrdragY = event.clientY - parseFloat(scrdrag.css('top'));
		var viewConH = $('.diarybox').height() * 0.43;
		$('.viewcon').bind('mousemove', conMove);

		function conMove(event) {
			var event = event || window.event;
			var a = viewDiv.height() - viewConH;
			var c = scrollTrack.height() - scrdrag.height();
			scrdrag.css("top", event.clientY - scrdragY + "px");
			var b = parseFloat(scrdrag.css('top')) / c;
			viewDiv.css("top", "-" + a * b + "px");
			if(parseFloat(scrdrag.css('top')) <= 0) {
				scrdrag.css('top', '0');
				viewDiv.css('top', '0');
			}
			if(parseFloat(scrdrag.css('top')) >= viewConH - scrdrag.height()) {
				scrdrag.css('top', scrollTrack.height() - scrdrag.height() + "px");
				viewDiv.css('top', "-" + a + "px");
			}
		}
		$(document).mouseup(function() {
			$('.viewcon').unbind('mousemove', conMove);
		});
		return false;
	}
	//日记鼠标滚论事件
	function scroll(event) {
		var event = event || window.event;
		var viewConH = $('.diarybox').height() * 0.43;
		var isDown = true;
		if(event.wheelDelta) {
			isDown = event.wheelDelta > 0 ? false : true
		} else {
			isDown = event.detail > 0 ? true : false
		}
		if(isDown) {
			var a = viewDiv.height() - viewConH;
			var c = scrollTrack.height() - scrdrag.height();
			if(parseFloat(viewDiv.css('top')) > -a - 10) {
				viewDiv.css('top', parseFloat(viewDiv.css('top')) - 10 + "px");
				var b = (-parseFloat(viewDiv.css('top'))) / a;
				scrdrag.css('top', c * b + "px");
			}
		} else {
			console.log('向上')
			var a = viewDiv.height() - viewConH;
			var c = scrollTrack.height() - scrdrag.height();
			if(parseFloat(viewDiv.css('top')) < 0) {
				viewDiv.css('top', parseFloat(viewDiv.css('top')) + 10 + "px");
				var b = (-parseFloat(viewDiv.css('top'))) / a;
				scrdrag.css('top', c * b + "px");
			} else {
				viewDiv.css('top', 0);
				scrdrag.css('top', 0);
			}
		}
		return isDown;
	}
	//鼠标移入到文本区域时取消页面鼠标滚轮事件，移除恢复	
	$('#booo').mouseover(function() {
		console.log("11")
		window.onmousewheel = document.onmousewheel = null;
	});
	$('#booo').mouseout(function() {
		window.onmousewheel = document.onmousewheel = scrollFun;
		console.log("22")
	});
	window.onmousewheel = document.onmousewheel = scrollFun;

	$('#booo').mousewheel(function() {
		scroll();
	});

});

//当页面高度发生变化时，scrtop也要改变
$(window).resize(function() {
	var viewConH = $('.diarybox').height() * 0.43;
	$('#main').scrollTop(($('.content').height() + 55) * oIndex);

});