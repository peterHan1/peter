$(function(){	
	charts();
	chartsM();
	chartsE();
	function charts(){
		var myChart = echarts.init(document.getElementById('main'));
		var seven = ['12-09', '12-10', '12-11', '12-12', '12-13', '12-14', '12-15'];
		var sevenM = [1274.55, 445.66, 567.77, 1521, 643, 1565, 196];	
	        option = {
			    color: ['#ff711c'],
			    barWidth:'50%',
			    grid:{	
			    	left:'1%',
			    	top:'15%',
			       	bottom:'7%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : seven,
			            min:100,
			            axisTick: {
			                show:false,
			            },
			            axisLabel:{
	                    	show:true,	
	                    	interval:'1%',
	                    	rotate:35,
	                    	margin:10,
	                    	textStyle:{
	                    		color:'#777',
	                    	}
	                    }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisTick: {
			                show:false,
			            },
			            splitLine:{ show:false},		
			            axisLabel:{
	                    	show:true,
	                    	textStyle:{
	                    		color:'#777',
	                    	}
	                    }
			        }
			    ],
			    series : [
			        {
			            name:'成交量',
			            type:'bar',	            
			            data:sevenM,
			           
			             itemStyle: {
			                 normal: {
			                     label: {
			                         show: true,
			                         position: 'top',
			                         textStyle: {
			                            color: '#ff711c',
			                         }
			                     }
			                 }
			             },         
			        }
			    ]
			};
	        myChart.setOption(option);
	}

	function chartsM(){
		var myChart = echarts.init(document.getElementById('mainM'));
		var month = ['6月', '7月', '8月', '9月', '10月', '11月'];
		var moneyM = [24000, 6000, 8000, 28000, 11000, 26000];
		
	        option = {
			    color: ['#ff711c'],   
			    grid: {
			        left: '1%',
			        top:'15%',
			       	bottom:'1%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : month,
			            axisTick: {
			            	show:false,			                
			            },
			            axisLabel:{
	                    	show:true,
	                    	textStyle:{
	                    		color:'#777',		
	                    	}
	                    }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisTick: {
			            	show:false,			                
			            },
			            splitLine:{ show:false},			          
			            axisLabel:{
	                    	show:true,
	                    	textStyle:{
	                    		color:'#777',
								
	                    	}
	                    }
			        }
			    ],
			    series : [
			        {
			            type:'bar',
			            barWidth:'50%',			           
			            data:moneyM,     
			            itemStyle: {
			                 normal: {
			                     label: {
			                         show: true,
			                         position: 'top',
			                         textStyle: {
			                            color: '#ff711c',
			                         }
			                     }
			                 }
			             },         
			        }
			    ]
			};
	        myChart.setOption(option);
	};

	function chartsE(){
		var myChart = echarts.init(document.getElementById('eachData'));		
		var citys = [
						{city:"宁波",num:"501.88"},
						{city:"武汉",num:"461.88"},
						{city:"郑州",num:"351.88"},
						{city:"北京",num:"999.88"},
						{city:"深圳",num:"131.88"},
						{city:"广州",num:"555.88"},
						{city:"杭州",num:"321.88"},
						{city:"上海",num:"333.88"},
						{city:"苏州",num:"222.88"},
						{city:"辽宁",num:"236.88"}]
		var compare = function (obj1, obj2) {
			    var val1 = obj1.num;
			    var val2 = obj2.num;
			    if (val1 < val2) {
			        return 1;
			    } else if (val1 > val2) {
			        return -1;
			    } else {
			        return 0;
			    }            
			} 
			var arrs = citys.sort(compare);
			var city = [];
			var moneyData = [];	
			for( i in arrs){
				city.push(arrs[i].city);
				moneyData.push(arrs[i].num);
			};
	        option = {		        	
			    grid: {
			    	top:'8%',
			        left:'2%',
			        bottom: '1%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'value',
			             axisLine:{		
	                        show:false,
	                   },
	                    splitLine:{ show:false},
	                    axisTick:{
	                    	show:false,//x轴坐标刻度
	                    },
	                    axisLabel:{show:false},
			        }
			    ],
			    yAxis : [
			        {
			            type : 'category',
			            data : city,	
	                    inverse:{show:true},
			            splitLine:{ show:false},
			            axisTick:{show:false,//x轴坐标刻度
			            },
			            axisLine:{show:false},
			             axisLabel:{
	                    	show:true,
	                    	textStyle:{
	                    		color:'#333',
								
	                    	}
	                    }
			        }
			    ],
			    series : [
			        {
			            type:'bar',	 
	        			barMinHeight:50,			            
	        			barMaxHeight:100,
			            data:moneyData,
			             markPoint : {
			                data : [
			                    {
			                    	type : 'max',
			                    	symbol:'image://./img/king-bg.png',
			                    	symbolSize:[30,30],
			                    	symbolOffset:['130%',0],
			                    	label:{
			                    		normal:{
			                    			show:false,
			                    		}
			                    	}
			                	}
			                ]
			            },
			            itemStyle: {			            	
			                 normal: {
			                     label: {
			                        show: true,				                        
			            			formatter: '{c}万',			            			
			                        textStyle: { 			                        	
			                        	fontSize:'10',
			                        	color: '#fff',
			                        }
			                     },
			                     color: function (params){
                        			var colorList = ['#ff271c','#ff411c','#ff711c','#fe9f66','#fdb58a','#fbae09','#ffcc1c','#1c81ff','#5aa3fe','#988bfd'];
                       				 return colorList[params.dataIndex];
                    			}
			                 }
			             },         
			        }
			    ]
			};
	        myChart.setOption(option);
	}
	
	
	
	
	
	
})
