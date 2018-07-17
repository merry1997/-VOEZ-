$(function() {
	//登陆界面
	$('.regist,.login').click(function() {
		$('.login_content').animate({
			'height': '100%'
		}, 500);
	});
	$('.login-close').click(function() {
		$('.login_content').animate({
			'height': '0%'
		}, 500);
	});
	$('.logSubmit').click(function() {
		if($('.iptlo1').val().length == 0) {
			$('.lead_box .box_text').html('手机号码/用户名（龙渊账号）不能为空');
			$('.lead_box').fadeIn();
		} else if($('.iptlo2').val().length == 0) {
			$('.lead_box .box_text').html('请输入密码');
			$('.lead_box').fadeIn();
		} else {
			$.get('act.php', {
				user: $('.iptlo1').val(),
				pass: $('.iptlo2').val()
			}, function(d) {
				if(d.msg == "登陆成功") {
					$('.lead_box .box_text').html(d.msg);
					$('.lead_box').fadeIn();
					setTimeout(function() {
						$('.lead_box').fadeOut();
						$('.login_content').animate({
							'height': '0%'
						}, 500);
						$('.loginn').hide();
						$('.loginner').fadeIn();
						$('.loginner b').html($('.iptlo1').val());
					}, 1500)
				} else {
					$('.lead_box .box_text').html(d.msg);
					$('.lead_box').fadeIn();
				};
			}, 'json');
		}

	});
	$('.loginner').toggle(function() {
		$('.loginner-login').removeClass('flipOutX').fadeIn().addClass('animated flipInX');
	}, function() {
		$('.loginner-login').removeClass('flipInX').fadeOut().addClass('animated flipOutX');
	});
	$(!'.loginner').click(function() {
		$('.loginner-login').fadeOut();

	});
	$('.loginner-login2 .login2-out').click(function() {
		$('.loginner-login,.loginner').hide();
		$('.loginn').fadeIn();
	})
	$('.lead_box a').click(function() {
		$('.lead_box').fadeOut();
	});
	$('.lead_box .box_button').click(function() {
		$('.lead_box').fadeOut();
	});
	
	//换头像
	var txSRC = null;
	$('.loginner-login2 figure img').click(function(){
		txSRC = $(this).attr('src');
	});
	$('.loginner-login2 .login2-huan').click(function(){
		if(txSRC==null){
			$('.lead_box .box_text').html('请选择头像');
			$('.lead_box').fadeIn();
		}else{
			$('.loginner-login,.loginner img').fadeOut();
			$('.loginner-login,.loginner img').attr('src',txSRC);
			$('.loginner-login,.loginner img').fadeIn();
			$('.loginner-login').removeClass('flipInX').fadeOut().addClass('animated flipOutX');
			txSRC = null;
		}
	});
	
	$('.wangjipassword a').click(function() {
		$('.lead_box .box_text').html('忘记了也没用');
		$('.lead_box').fadeIn();
	});
	$('.register1').click(function() {
		$('.lead_box .box_text').html('无法注册');
		$('.lead_box').fadeIn();
	});

});