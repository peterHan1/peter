$(function(){
	charts();
	chartsM();
	function charts(){
	var myChart = echarts.init(document.getElementById('ranking'));
	var seven = ['08-30', '08-31', '09-01', '09-02', '09-03', '09-04', '09-05'];
	var sevenM = [1183.69, 1503.12, 1341.7, 952.63, 798.37, 1270.37, 1203.5];	
        option = {
    	  	title: {
		        text: '成交量（万元）',
		        textStyle:{
		        	fontSize: 14,
				    fontWeight: 'normal',
				    color: '#626262',
				    fontFamily:'Microsoft YaHei'
		        }
		    },
		    grid: {
		    	left:'1%',
		    	right:'10%',
		    	top:'15%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : seven,
		            axisTick: {show:false},
		            axisLine:{		
                        lineStyle:{color:'#e4e4e4'}
                    },
		            axisLabel:{show:true,textStyle:{color:'#626262',fontSize:12,fontStyle:'normal'}}
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisTick: {show:false},
		            splitLine:{show:true,lineStyle: {
						            color: ['#e4e4e4'],
						            width: 1,
						            type: 'solid'
						        }},
		            axisLine:{		
                        lineStyle:{color:'#fff',width:1}
                   },
		            axisLabel:{
                    	show:true,
                    	textStyle:{color:'#626262',fontSize:12,fontStyle:'normal'}
                    }
		        }
		    ],
		    series : [
		        {
		            name:'成交量',
		            type:'bar',
		            data:sevenM,
		            barWidth: 12,
		             itemStyle: {
		                 normal: {
		                 	barBorderRadius:[10, 10, 0, 0],
		                 	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				                        offset: 0,
				                        color: '#ff3501'
				                    },{
				                        offset: 0.2,
				                        color: '#ff9741'
				                    },
				                    {
				                        offset: 1,
				                        color: '#ffd6b3'
				                    }]),
		                     label: {
		                         show: true,
		                         position: 'top',
		                         textStyle: {fontSize:12,color: '#ff7400',fontStyle:'normal',baseline:'top'}
		                     }
		                 }
		             }         
		        }
		    ]
		};
        myChart.setOption(option);
}
	function chartsM(){
	var myChart = echarts.init(document.getElementById('monthsData'));
	var seven = ['03月', '04月', '05月', '06月', '07月', '08月'];
	var sevenM = [20066.48, 24480.06, 32809.37, 38141.23, 31667.78, 40349.79];	
        option = {
		   title: {
		        text: '成交量（万元）',
		        textStyle:{
		        	fontSize: 14,
				    fontWeight: 'normal',
				    color: '#626262',
				    fontFamily:'Microsoft YaHei'
		        }
		    },
		    grid: {
		    	left:'1%',
		    	right:'10%',
		    	top:'15%',
		        containLabel: true
		    },
		    xAxis : [
		        {	
		            type : 'category',
		            data : seven,
		            axisTick: {show:false},
		             axisLine:{		
                        lineStyle:{color:'#e4e4e4'}
                    },
		            axisLabel:{show:true,textStyle:{color:'#626262',fontSize:12,fontStyle:'normal'}}
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisTick: {show:false},
		            splitLine:{ show:true,lineStyle: {
						            color: ['#e4e4e4'],
						            width: 1,
						            type: 'solid'
						        }},
		            axisLine:{		
                        lineStyle:{color:'#fff',width:1}
                    },
		            axisLabel:{
                    	show:true,
                    	textStyle:{color:'#626262',fontSize:12,fontStyle:'normal'}
                    }
		        }
		    ],
		    series : [
		        {
		            name:'成交量',
		            type:'bar',
		            data:sevenM,
		            barWidth: 12,
		             itemStyle: {
		                 normal: {
		                 	barBorderRadius:[10, 10, 0, 0],
		                 	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				                        offset: 0,
				                        color: '#ff3501'
				                    },
				                    {
				                        offset: 0.2,
				                        color: '#ff9741'
				                    },
				                    {
				                        offset: 1,
				                        color: '#ffd6b3'
				                    }]),
		                     label: {
		                         show: true,
		                         position: 'top',
		                         textStyle: {fontSize:12,color: '#ff7400',fontStyle:'italic',fontStyle:'normal'}
		                     }
		                 }
		             }         
		        }
		    ]
		};
        myChart.setOption(option);
}
});
