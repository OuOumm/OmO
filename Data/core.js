$(".article-poster-button").on("click",function(){
	create_poster();
});
$('[data-event="poster-close"]').on('click', function(){
	$('.article-poster, .poster-popover-mask, .poster-popover-box').fadeOut()
});
$('[data-event="poster-download"]').on('click', function(){
	download_poster();
});
function create_poster(){
	var id = $(".article-poster").data("id");
	if(!id){
    	alert("请刷新页面");
    	return false;
	}
	var moleft = $.ajax({
        type: "get",
        url: "/index.php/ArticlePoster/make",
        data: {cid:id},
        timeout: 60000,
        dataType: "json",
        beforeSend: function (moleft) {
           $(".article-poster-button").html("正在生成...");
		   $(".article-poster-button").attr("disabled",true);
        },
        success: function(json) {
        	if(json.status == 200){
                $('.article-poster-images').attr("src", json.data);
                $(".poster-download").data("url", json.data);
                $('.article-poster, .poster-popover-mask, .poster-popover-box').fadeIn()
            	$(".article-poster-button").html("生成海报");
	    		$(".article-poster-button").attr("disabled",false);
        	}else{
        		if(json.data){
        			alert(json.data);
        		}else{
        			alert("网络超时，请重试");
        		}
            	$(".article-poster-button").html("生成失败");
	    		$(".article-poster-button").attr("disabled",false);
        	}
        },
        error: function (textStatus) {
        	alert("生成失败，请重试");
            $(".article-poster-button").html("请重试");
	    	$(".article-poster-button").attr("disabled",false);
        },
        complete: function (XMLHttpRequest,status) {
            if(status == 'timeout') {
            	moleft.abort();
                $(".article-poster-button").html("网络超时");
	    		$(".article-poster-button").attr("disabled",false);
            }
        }
    });
}
function download_poster(){
	var $a = document.createElement('a');
	$a.setAttribute("href", $(".poster-download").data("url"));
	$a.setAttribute("download", "");
	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
	$a.dispatchEvent(evObj);
}