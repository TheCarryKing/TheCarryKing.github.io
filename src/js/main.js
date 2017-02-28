$(document).ready(function() {
	var picList = $('#container .slide_animate li');
	var arrowLeft = $('#container .slide_action_left a');
	var arrowRight = $('#container .slide_action_right a');
	var slideSwitch = $('#container .slide_switch a');
	var len = picList.length;
	var timer;
	var target = [];
	//将图片列表初始化
	for (var i = 0; i < picList.length; i++) {
		picList[i].className='p'+(picList.length-i);
		target[i] = 'p'+(picList.length-i);
	}

	arrowRight.click(function(){
		var cls = picList[0].className;
		/* Act on the event */
		for(i=0;i<len;i++){
			if(i==len-1){
				picList[i].className=cls;
			}else{
				picList[i].className=picList[i+1].className;
			}
			if (picList[i].className=='p3') {
				var newIndex = picList[i].getAttribute('index');
				showSwitch(newIndex);
			}
		}
	});

	arrowLeft.click(function(){
		var cls = picList[len-1].className;
		/* Act on the event */
		for(i=len-1;i>=0;i--){
			if(i===0){
				picList[i].className=cls;
			}else{
				picList[i].className=picList[i-1].className;
			}
			if (picList[i].className=='p3') {
				var newIndex = picList[i].getAttribute('index');
				showSwitch(newIndex);
			}
		}
	});


	function showSwitch(index){
		for (var j = 0; j <len; j++) {
			if (slideSwitch[j].className == 'slide_switch_bg_current') {
				slideSwitch[j].className='slide_switch_bg';
			}		
		}
		slideSwitch[index].className = 'slide_switch_bg_current';
	}

	function play(){
		clearInterval(timer);
		timer = setInterval(function(){
			arrowRight.click();
		},5000);
	}
	function stop(){
		clearInterval(timer);
	}
	$('#container .slide_section').mouseover(function() {
		stop();
	});

	$('#container .slide_section').mouseout(function() {
		play();
	});

	play();

	for ( i = 0; i < len; i++) {
		slideSwitch[i].onclick = function(){
			var newIndex= this.getAttribute('index');
			showSwitch(newIndex);
			var oIndex;//之前显示的图片索引
			var num1,num2;
			for (var j = 0; j < len; j++) {
				if ( picList[j].className=='p3') {
				oIndex= picList[j].getAttribute('index');
				}
			}
			
			if (newIndex==oIndex) {
				return;
			}

			for(j = 0;j<len;j++){
				num1 = parseInt(newIndex)+j;
				num2 = j+parseInt(newIndex)-len;
				if(j<=(len-1-newIndex)){
					// console.log(target[num1]);
					picList[j].className = target[num1];
				}else{
					// console.log(target[num2]);
					picList[j].className = target[num2];
				}
			}
			
		};
	}

// The Second Slide
	var flag = false;

	$('#container1 .slide_action_right a').click(function() {
		/* Act on the event */
		if(flag){
			return;
		}
		flag = true;
		$('#container1 .item').animate({
			left: '-=1200px'},
			400, function() {
			/* stuff to do after animation is complete */
			if ($('#container1 .item:last').css('left')=='-2400px') {
				$('#container1 .item:first').css('left','1200px');
			}
			if(	$('#container1 .item:first').css('left')=='0px'){
				$('#container1 .item').css('left','0px');
			}
			flag = false;
		});
	});
	$('#container1 .slide_action_left a').click(function() {
		/* Act on the event */
		if(flag){
			return;
		}
		flag = true;
		if ($('#container1 .item:last').css('left')=='0px') {
			$('#container1 .item:last').css('left','-3600px');
		}
		$('#container1 .item').animate({
			left: '+=1200px'},
			400, function() {
			/* stuff to do after animation is complete */
			if ($('#container1 .item:first').css('left')=='1200px') {
				$('#container1 .item:eq(1)').css('left','-2400px');
			}
			if ($('#container1 .item:first').css('left')=='2400px') {
				$('#container1 .item:first').css('left','-1200px');
			}
			flag = false;
		});
	});
});