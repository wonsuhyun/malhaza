$(document).ready(function(){
    $(".with-clear").each(function(){
        if($(this).find("input").val().length > 0){
            $(this).find(".btn-clear").show();
        }
    })

    $(".drop-d .selected").on("click",function(){
        $(this).siblings(".option").slideToggle(200)
    })
    $(".drop-d .option ul li").on("click",function(){
        $(this).parents(".drop-d").find(".selected").text($(this.val()));
        $(this).parents(".option").slideUp(200)
    })
    /*
     * 레이어 팝업
     * */
    $(".btn-popup").on("click",function(){
//        $('html, body').css({'overflow': 'hidden'});
        var name = $(this).attr('layer-name');
        $('.layer-popup[layer-name=' + name + ']').addClass("show");
        popup();
    })

    $(".btn-pop-close").on("click",function(){
        $(this).parents().parents(".layer-popup").removeClass("show")
        $('html, body').css({'overflow': 'auto'});
    })

    $(".popClose").on("click",function(){
        $(this).parents().parents(".layer-popup").removeClass("show")
        $('html, body').css({'overflow': 'auto'});
    })

    $(".auto-popup").addClass("on");
    /* ------------------------------------------------------------------------------------------------------------------
        탭
    ------------------------------------------------------------------------------------------------------------------ */
    $(".tab .tab-item").on("click",function(){
        var idx = $(this).index();
        if($(this).parents(".tab").hasClass("swiper-type")){
            $(this).addClass('on').siblings('.tab-item').removeClass('on');
            $(this).parents('.tab-list').siblings('.tab-conts').children('.tab-cont').removeClass('on').eq(idx).addClass('on');
            $(this).parents('.tab-list').siblings('.tab-ver').find('.tab-item').removeClass('on').eq(idx).addClass('on');
            $(this).parents('.tab-list').siblings('.fix-ver').find('.tab-item').removeClass('on').eq(idx).addClass('on');
        }else{
            $(this).addClass('on').siblings('.tab-item').removeClass('on');
            $(this).parents('.tab-list').siblings('.tab-conts').children('.tab-cont').removeClass('on').eq(idx).addClass('on');
        }
    })

    $(".acodian-wrap .aco-title").on("click",function(){
        if(!$(this).parent(".aco-item").hasClass("on")){
            $(".aco-item").removeClass("on")
            $(".inner-box").stop().slideUp(200);
            $(this).parent(".aco-item").addClass("on");
        }else{
            $(this).parent(".aco-item").removeClass("on");
        }
        $(this).siblings(".inner-box").stop().slideToggle(200)
       
    })

    // 전체동의
    $(".check-area .all-check input[type=checkbox]").on("change",function(){
		if($(this).prop("checked")==true){
			$(this).parent(".all-check").siblings(".check-items").find("input[type=checkbox]").prop("checked",true)
			$(this).parent(".all-check").siblings(".check-items").find("input[type=checkbox]").val("Y")
		}else{
			$(this).parent(".all-check").siblings(".check-items").find("input[type=checkbox]").prop("checked",false)
			$(this).parent(".all-check").siblings(".check-items").find("input[type=checkbox]").val("N")
		}
	})
    $(".check-area .check-items input[type=checkbox]").on("change",function(){
        var nonchecked = 0
        $(this).parent(".check-items").find('input[type=checkbox]').each(function(){
            if($(this).prop("checked")==false){
                nonchecked +=1
                $(this).val('N')
            }else{
            	$(this).val('Y')
            }
        })
        if(nonchecked==0){
           $(this).parent(".check-items").siblings(".all-check").find("input[type=checkbox]").prop("checked",true)
        }else{
           $(this).parent(".check-items").siblings(".all-check").find("input[type=checkbox]").prop("checked",false)
        }
    })

   /*gnb */
    $(".hamberger").on("click",function(){
        $(".gnb-wrap").addClass("on")
        $("html,body").css({"overflow":"hidden"})
    })
    $(".close-gnb").on("click",function(){
        $(".gnb-wrap").removeClass("on")
        $("html,body,.wrapper").css({"overflow":"auto"})
    })

})

$(window).on('load', function() {
    if($(".wrapper").find(".footer").length > 0){
        var footerH = $(".wrapper .footer").outerHeight();
        $(".wrapper").css({"padding-bottom":footerH})
    }
});

$(window).scroll(function(e) {
  
});

$(document).on('touchstart touchmove touchend', function(e) {
    
});

function popup() {
$('html, body').css({'overflow': 'hidden'});
    $('.layer-popup').each(function() {
        var winH = $(window).height();
        var popH = $(this).find('.popup').outerHeight();
    });

    /* 레이어팝업 스크롤 다운시 */
    $('.layer-popup .popup .pop-cont').scroll(function() {
        var popTop = $(this).scrollTop();
        if (popTop > 0) {
            $(this).closest('.popup').addClass('scroll');
        } else {
            $(this).closest('.popup').removeClass('scroll');
        }
    });
}

function validater(type,_this){
    switch(type){
        case "email" :
            var validateCheckter = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,3}$/i;
            if(validateCheckter.test(_this.val())){
                _this.parent().siblings(".validate").find("span").removeClass("on")
                _this.parent().siblings(".validate").find(".pass").addClass("on")
            }else{
                _this.parent().siblings(".validate").find("span").removeClass("on")
                _this.parent().siblings(".validate").find(".non-pass").addClass("on")
            }
            break;
        case "password" :
            var pw=_this.val()
            var num = pw.search(/[0-9]/g);
            var eng = pw.search(/[a-z]/ig);
            var spe = pw.search(/[\~\!\@\#\$\%\^\&\*\(\)\_\+]/gi);
            var espe = /[A-Za-z0-9\~\!\@\#\$\%\^\&\*\(\)\_\+]/; //문자+특수문자+숫자 외 금지
            var id = $("#webId").val() || "";
           
            var type01 = false;
            var type02 = false;
            var type03 = true;
            var type04 = true;
            var type05 = true;

            if(id !== ""){
                id = id.split("@")[0];
            }

            if(pw.trim().length > 0){
                $(".vali03").addClass("on");
                $(".vali04").addClass("on");
                $(".vali05").addClass("on");
            }

            if(pw.length < 10 || pw.length > 20){
                $(".vali01").removeClass("on")
                type01=false
            }else{
                $(".vali01").addClass("on")
                type01=true
            }

            if( (num < 0 && eng < 0) || (eng < 0 && spe < 0) || ( spe < 0 && num < 0) ){
                $(".vali02").removeClass("on")
                type02 = false;
            }else{
                $(".vali02").addClass("on")
                type02 = true;
            }
            
           
            for(var i =0 ; i < pw.length ; i ++){
                if(espe.test(pw.charAt(i)) === false ){
                    $(".vali03").removeClass("on");
                    type03=false
                }
            }
           
            if(pwVali(pw,3)){
				$(".vali04").removeClass("on");
	 			type04=false
			}
            
            if(id.trim().length > 0 ){
                if(pw.indexOf(id)>-1){
					$(".vali05").removeClass("on");
					type05=false
				}
            }
            
            if(type01 == true && type02 == true && type03 == true && type04 == true && type05 == true){
                _this.parent().siblings(".validate").find("span").removeClass("on")
                _this.parent().siblings(".validate").find(".pass").addClass("on")
            }else{
                _this.parent().siblings(".validate").find("span").removeClass("on")
                _this.parent().siblings(".validate").find(".non-pass").addClass("on")
            }
            break;
    }

}


function pwVali(str, max){
	if(!max) max = 4; // 글자수를 지정하지 않으면 4로 지정
    var i, j, k, x, y;
    var buff = ["0123456789","9876543210","abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    var src, src2, ptn="";

    for(i=0; i<buff.length; i++){
        src = buff[i]; // 0123456789
        src2 = buff[i] + buff[i]; // 01234567890123456789
        for(j=0; j<src.length; j++){
            x = src.substr(j, 1); // 0
            y = src2.substr(j, max); // 0123
            ptn += "["+x+"]{"+max+",}|"; // [0]{4,}|0123|[1]{4,}|1234|...
            ptn += y+"|";
        }
	}
	
    ptn = new RegExp(ptn.replace(/.$/, "")); // 맨마지막의 글자를 하나 없애고 정규식으로 만든다.

    if(ptn.test(str)) return true;
    return false;
}
