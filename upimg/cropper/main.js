$(function(){
			$(".btn").on("click",function(){
				$("#cropper").show();
    			$("#imageBox").hide();
    			$(".action").hide();
    			$(".save").addClass("color");
				layer.open({
					type: 1, 
					title: false,
					closeBtn : 0,
					content: $('#windows_show'),
					skin: 'windows_show'
				});
			});
			$(".right").on("click",function(){
				layer.closeAll();
			});
			$(".cancel").on("click",function(){
				layer.closeAll();
			});
		var options =
		{
			thumbBox: '.thumbBox',
			spinner: '.spinner',
			imgSrc: 'img/avatar.jpg'
		}
		var cropper = $('.imageBox').cropbox(options);
		var file_upl = document.getElementById('inp');
		file_upl.select(file_upl);
		var realpath = document.selection.createRange().text;
		console.log()
        $('#inp').on('change', function(){
//      	PreviewImage(this,'imageBox','imageBox');
        	 var file = this.value;
        	 console.log(file)
        	 if(!/.(gif|jpg|png|GIF|JPG|PNG)$/.test(file)){
      			alert("您上传的必须是图片且大小小于2M");
           		return false; 
    		}else{
    			$("#cropper").hide();
    			$("#imageBox").show();
    			$(".action").show();
    			$(".save").removeClass("color");
    			if(this.files && this.files[0]) {
					console.log("h5: " + file);
					var reader = new FileReader();
					reader.onload = function(e) {
						options.imgSrc = e.target.result;
						cropper = $('.imageBox').cropbox(options);
					}
					reader.readAsDataURL(this.files[0]);

					this.files = [];
				} else {
					var url = document.selection.createRange().text;
					
					console.log("ie: " + url);
					
					if(this) {
						var url = this.value;
						console.log("666 :" )
						$(".imageBox").css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale,src=\""+url+"\")");

					}
				}	           
    		}  
        })
        $('.save').on('click', function(){
        	if($(this).hasClass("color")){
				return false;
			}else{
				var img = cropper.getDataURL();
	            $('#crop_img').attr("src",img);
	            layer.closeAll();
			}
            
        })
        $('#btnZoomIn').on('click', function(){
            cropper.zoomIn();
        })
        $('#btnZoomOut').on('click', function(){
            cropper.zoomOut();
        })
        var x;
        var isMove = false;
        var ZoomBar=$("#ZoomBar");
       	var maxWidth =$("#ZoomDist").width() - $("#ZoomBar").width();
       	//鼠标按下时候的x轴的位置
        ZoomBar.mousedown(function(e){
            isMove = true;
            x = e.pageX - parseInt(ZoomBar.css('left'), 10);
            var site=e.pageX-x;
            $(document).mousemove(function(e){
	            var _x = e.pageX - x;
	            if(isMove){
	                if(_x > 0 && _x <= maxWidth){
	                    ZoomBar.css({'left': _x});
	                    if(site<=_x){
	                    	cropper.zoomMove();
	                    }else if(site>=_x){
	                    	cropper.zoomBack();
	                    }
	                }
	            }
	        }).mouseup(function(e){
	            isMove = false;
	            var _x = e.pageX - x;
	        });
	         
        });
        
	});