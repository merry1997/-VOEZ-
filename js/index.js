$(function() {

	//加载头部底部
	$('header').load('header.html');
	//弹出视频
	$('.video-box').click(function() {
		$('.alertvideo-box').fadeIn();
	});
	$('.alertvideo-box b').click(function() {
		$('.alertvideo-box').fadeOut();
		$(".alertvideo")[0].pause();
	});
	$('.vid-con span').click(function() {
		$('.alertvideo-box').fadeIn();
	});

	//音乐开关
	$(".audiobgm").toggle(function() {
		$(".bgm")[0].play();
		$('.switch').attr('src', 'image/audio_on.png');
	}, function() {
		$(".bgm")[0].pause();
		$('.switch').attr('src', 'image/audio_off.png');
	});
	var mainCon = 0
	//动态设置下载区域宽度
	setInterval(function() {
		$('.download').width($('.download').height() * 2.4);
		$('.content').height($(window).height() - $('header').height() - 55);
		$('.hotvid').width($(this).height() * 1.32);
		$('.vid-con img').height($(window).height() / 5.5);
		$('.news-banner3').height($('.news-banner2').height());
		$('.news-banner3').width($('.news-banner2').width());
	}, 10);

	//点击下载
	$('.ios-down,.android-down,.guanzhu4').click(function() {
		$('.lead_box .box_text').html('暂无下载');
		$('.lead_box').fadeIn();
	});
	$('.mores,.nav1 a').click(function() {
		$('.lead_box .box_text').html('暂无更多');
		$('.lead_box').fadeIn();
	});
	//存储a标签内容
	var navV = null;
	$(".nav1-list li").click(function() {
		navV = $(this).find('a').text();
		$('.lead_box .box_text').html(navV);
		$('.lead_box').fadeIn();
	});
	$('.down-box b').click(function() {
		$('.down-box').fadeOut();
	});
	$('.redeem_code img').click(function() {
		$('.login_content').animate({
			'height': '100%'
		}, 500);
	});
	
	//精彩视频
	$('.vid-con').hover(function() {
		$(this).find('span').removeClass('animated slideOutUp');
		$(this).find('span').show().addClass('animated slideInDown');
	}, function() {
		$(this).find('span').removeClass('animated slideInDown');
		$(this).find('span').addClass('animated slideOutUp');
	});

	var i = 0;
	//banner1点击按钮
	$('.news-sw li').click(function() {
		clearInterval(timer);
		i = $(this).index();
		$('.news-sw li').removeClass('on');
		$(this).addClass('on');
		$('.news-list li').fadeOut();
		$('.news-list li').eq(i).fadeIn();
		timer = setInterval(autoban, 3000);
	})
	//自动
	var timer = setInterval(autoban, 3000);

	function autoban() {
		i++;
		if(i > $('.news-sw li').length - 1) {
			i = 0;
		}
		$('.news-sw li').removeClass('on');
		$('.news-sw li').eq(i).addClass('on');
		$('.news-list li').fadeOut();
		$('.news-list li').eq(i).fadeIn();
	}
	//banner2点击nav
	var n = 0;
	$('.nav1 span').click(function() {
		n = $(this).index();
		if(n == 1) {
			$('.nav1 .bb').animate({
				left: "4em"
			}, 300);
		}
		if(n == 0) {
			$('.nav1 .bb').animate({
				left: "0em"
			}, 300);
		}
		$('.nav1-list ul').hide();
		$('.nav1-list ul').eq(n).show().addClass('animated flipInX');
	});

	//人物介绍
	var jIndex = 0;
	//点击略缩图改变img的src
	$('.intro ul li>span').on('click', function() {
		jIndex = $(this).attr('class');
		$('.person,.persontxt').css('opacity', '0');
		$('.intro ul li>span').removeClass('active');
		$(this).addClass('active');
		$('.person').attr('src', 'image/' + $(this).attr('name') + '.png').addClass('animated slideInRight').animate({
			'opacity': 1
		}, 1000, function() {
			$(this).removeClass('slideInRight');
		});
		$('.persontxt').attr('src', 'image/' + $(this).attr('name') + 'txt.png').addClass('animated slideInLeft').animate({
			'opacity': 1
		}, 1000, function() {
			$(this).removeClass('slideInLeft');
		});

	});
	//日记选项卡
	$('.diarynav li').click(function() {
		$('.diarynav li').removeClass('active');
		$(this).addClass('active');
		$('.diarybox').fadeOut();
		if($(this).attr('id') == "one") {
			$('.multipleLine').fadeIn();
			$('.nodata').fadeOut();
		} else {
			$('.multipleLine').fadeOut();
			$('.nodata').fadeIn();
		}
	});
	//日记轮播
	var rjIndex = 0; //ul下标
	//点击上一页
	$('.hd .prev').click(function() {
		$('.hd ul li').removeClass('on');
		rjIndex--;
		if(rjIndex < 0) {
			rjIndex = $('.ulWrap ul').length - 1;
		}
		$('.hd ul li').eq(rjIndex).addClass('on');
		$('.ulWrap').animate({
			top: -$('.ulWrap ul').height() * rjIndex + "px"
		}, 500);
	});
	//点击下一页
	$('.hd .next').click(function() {
		$('.hd ul li').removeClass('on');
		rjIndex++;
		if(rjIndex > $('.ulWrap ul').length - 1) {
			rjIndex = 0;
		}
		$('.hd ul li').eq(rjIndex).addClass('on');
		$('.ulWrap').animate({
			top: -$('.ulWrap ul').height() * rjIndex + "px"
		}, 500);
	});

	//点击小圆点
	$('.hd ul li').click(function() {
		$('.hd ul li').removeClass('on');
		rjIndex = $(this).index();
		$(this).addClass('on');
		$('.ulWrap').animate({
			top: -$('.ulWrap ul').height() * rjIndex + "px"
		}, 500);
	});
	//li下标
	var ulWrali = 0;
	//ul下标
	var ulin = 0;
	//日记展开
	$('.ulWrap ul li').click(function() {
		$('.multipleLine').fadeOut();
		$('.diarybox').fadeIn();
		ulWrali = $(this).index();
		rjIndex = $(this).parent().index();
		//将获取到的数据写入到diarybox
		$('.diarybox').find('.pic').html($(this).find('.pic').html());
		$('.diarybox').find('.txt').html($(this).find('.txt').html());
		$('.diarybox').find('.viewcon_div').html($(this).find('.viewcon').html());
		scrollH();
	});
	//点击上一页
	$('.diarybox_pre').click(function() {
		ulWrali--;
		if(ulWrali < 0) {
			rjIndex--;
			if(rjIndex < 0) {
				rjIndex = $('.ulWrap ul').length - 1;
			}
			ulWrali = $('.ulWrap ul').eq(rjIndex).find('li').length - 1;
		}
		diaryBox();
		scrollH();
	});
	//点击下一页
	$('.diarybox_next').click(function() {
		ulWrali++;
		//当ulWrali大于当前li所在父级中li的length-1的时候，ul下标++进行ul翻页，且ulWrali变为0
		if(ulWrali > $('.ulWrap ul').eq(rjIndex).find('li').length - 1) {
			rjIndex++;
			//当ul下标到达最后一个的时候，下标变为0
			if(rjIndex > $('.ulWrap ul').length - 1) {
				rjIndex = 0;
			}
			ulWrali = 0;
		}
		diaryBox();
		scrollH();
	});
	//封装日记展开部分写入的函数
	function diaryBox() {
		$('.diarybox').find('.pic').html($('.ulWrap ul').eq(rjIndex).find('li').eq(ulWrali).find('.pic').html());
		$('.diarybox').find('.txt').html($('.ulWrap ul').eq(rjIndex).find('li').eq(ulWrali).find('.txt').html());
		$('.diarybox').find('.viewcon_div').html($('.ulWrap ul').eq(rjIndex).find('li').eq(ulWrali).find('.viewcon').html());
	}

	//封装滚动条高度函数
	function scrollH() {
		//由于无法获取隐藏元素高度，所以重父级获取子元素高度
		var uih = $('.diarybox').height() * 0.43;
		if($('.viewcon_div').height() > uih) {
			//文本内容高度大于显示区域高度时根据比例设置滚动条高度，并且显示滚动条
			$('.scroll_drag').height($('.scroll_track').height() / ($('.viewcon_div').height() / uih));
			$('.scroll_track').show();
		} else {
			//文本内容高度小于显示区域高度时滚动条高度为0，并将其隐藏
			$('.scroll_drag').height(0);
			$('.scroll_track').hide();
		}
	}
	//点击中间返回按钮
	$('.diarybox_close').click(function() {
		$('.multipleLine').fadeIn();
		$('.diarybox').fadeOut();
		$('.hd ul li').removeClass('on');
		$('.hd ul li').eq(rjIndex).addClass('on');
		//同步显示当前li的ul的位置，以及小圆点
		$('.ulWrap').css("top", "-" + $('.ulWrap ul').height() * rjIndex + "px");
	})

});