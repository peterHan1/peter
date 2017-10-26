$(function(){
        var menuId = '';
        pageForm={
          	init:function(){
	            menuId = $.fn.getPramVal('menu-id'); 
	            this.innerPage(menuId);
	            this.pageswiper();
	            this.eventFn(); 
	            this.moveLine();
	            this.moveL();
          	},

        pageswiper:function(){
            var swiper = new Swiper('.page-swiper', {
                  pagination: '.swiper-pagination',
                  paginationClickable: true,
                  loop:true,
                  nextButton: '.swiper-button-next',
                  prevButton: '.swiper-button-prev'
              });
          },     
        moveLine:function(){
        	$('.moveline .ul1').moveline({
	            color:'#983788',
	            position:'inner',
	            click:function(ret){
	              ret.ele.addClass('active').siblings().removeClass('active');
	            }
	          });
        },

      	/**
       * jumpPage 跳转页面
       * @param pageId
       */
      	innerPage: function (menuId) {
          var pageObj = [
              {
                 'menuId':'1',
                 'url': '/html/about.html'
              },{
                'menuId':'2',
                 'url': '/html/product.html'
              },{
                'menuId':'3',
                 'url': '/html/case.html'
              },{
                'menuId':'5',
                 'url': '/html/recruitment.html'
              },{
                'menuId':'10',
                 'url': '/html/condition.html'
              },{
                'menuId':'11',
                 'url': '/html/newsDetails.html'
              },{
                'menuId':'12',
                 'url': '/html/detailsPage.html'
              },{
                'menuId':'100',
                 'url': '/html/solution.html'
              }
          ],
          url = '';
          for(var key in pageObj){
              if(pageObj[key].menuId === menuId){
                url = pageObj[key].url
              }
          }
          
          $.fn.introducedPage(url);
          
      	},
        /*判断导航栏下面*/
        moveL:function(){
            var numMenu = Number(menuId);

            $('.nav-ul li:eq('+numMenu+')').addClass('active').siblings().removeClass('active');
        },
        ChangeParam:function(name,value){
            var url=window.location.href ;
            var newUrl="";
            var reg = new RegExp("(^|)"+ name +"=([^&]*)(|$)");
            var tmp = name + "=" + value;
            if(url.match(reg) != null){
               newUrl= url.replace(eval(reg),tmp);
              }else{
               if(url.match("[\?]")){
                  newUrl= url + "&" + tmp;
               }else{
                  newUrl= url + "?" + tmp;
               }
            }
           	location.href=newUrl;
        },
            /*event事件*/
	    eventFn:function(){
	        $(document).bindHack('click','.nav-ul li',function(){
	           var menuId = $(this).attr('data-id');
	           var menupageUrl = $(this).attr('data-url');
	           console.log(menuId,menupageUrl)
	               if(menuId == '0'){
	                   $.fn.openPage('/index.html');
	               }else if(menuId == '4'){
	                   $.fn.openPage('../html/assistant.html?menu-id=4');
	               }else if(menuId == '6'){
	                  $.fn.openPage('../html/login.html')
	                }else{
	                   pageForm.ChangeParam('menu-id',menuId)
	                   pageForm.innerPage(menuId);               
	               }
	        })
	        $('.cd-primary-nav li').bindHack('click',function(e){
	            var menuId = $(this).attr('data-id');
	          //  var pageUrl = $(this).attr('data-page');
	            if(menuId == '0'){
	              $.fn.openPage('/index.html')
	            }else if(menuId == '4'){
	              $.fn.openPage('html/assistant.html?menu-id=4')
	            }else if(menuId == '6'){
	              $.fn.openPage('html/login.html')
	            }else{
	              if(menuId){ 
	                $.fn.openPage('/html/aboutUs.html?menu-id='+menuId);
	              }
	            }
	            e.stopPropagation();
	        })
	
	        $('.inservice a').bindHack('click',function(){
	              var menuId = $(this).attr('data-id');
	              pageForm.ChangeParam('menu-id',menuId)
	              pageForm.innerPage(menuId);
	        })  
	
	      }

        }
        pageForm.init();
});
