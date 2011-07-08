		function draw_charts(){
			
				/*jQuery.each(history, function(i){
				history[i] = parseFloat(history[i]);
				});
				alert(history);*/
			//history[0]=[1,6,9,7,8,5,2,4,6,8,7,2,5,6,5,2,6,9,4,4];
			var chart = GetMyChart( "chart",history);
		
		}

		function GetMyChart(aDivId, aDataArray)
		{
			var RName;
			if(mapindex==0)
				  RName=500;
			else
				  RName=504;
			var chart = new Highcharts.Chart(
			{
				chart: 
				{
					renderTo: aDivId, 
					defaultSeriesType: 'line',
					zoomType:'x'
				},
				title: 
				{
					text: RName+'历史温度走势图'
				},
				subtitle: 
				{
					text: 'Source: http://thebulletin.metapress.comf'
				},
				xAxis: 
				{categories: ['12小时前', ' ', ' ', ' ', ' ', ' ', '9小时前', ' ', ' ', ' ', ' ', ' ', '6小时前 ', ' ', ' ', ' ', ' ', ' ', '3小时前', ' ', ' ', ' ', ' ', ' '],

					maxZoom: 5,
					title: {
						text: '时间'
					}
				},
				yAxis: 
				{
					title: 
					{
						text: '历史温度'
					},
					labels: 
					{
						formatter: function() 
						{
							return this.value +'°C';
						}
					}
				},
				point: {
					
				}
				,
				tooltip: 
				{
					formatter: function() 
					{
						/*return this.series.name +'\'s temperature<b>'+'</b><br/> of point '+ this.x+' is '+
							Highcharts.numberFormat(this.y, 0, null, ' ')+'°C' ;*/
						return this.series.name +'在'+ this.x+'时<br>的温度是：'+
						Highcharts.numberFormat(this.y, 0, null, ' ')+'°C' ;
					}					
				},
				plotOptions: 
				{
					area: 
					{
					lineWidth  : 8,
						pointStart: 1,
						marker: 
						{
					       
							enabled: false,
							symbol: 'circle',
							radius: 2,
							states: 
							{
								hover: 
								{
									enabled: true
								}
							}
						}
					}
				},
				legend: {					
					style: {
						left: '30px',
						bottom: '0px',
						right: 'auto',
						top: 'auto'
					},
					itemStyle: {
						listStyle: 'none',
						margin: '0 1em 0 0',
						padding: 0,
						font: '20px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
						cursor: 'pointer',
						color: '#3E576F'
					}
				},
				series:
				[
					{
						name: 'Sensor'+Hisdev[0],
						data: aDataArray[0]
					},
					{
						name: 'Sensor'+Hisdev[1],
						data: aDataArray[1]
					},
					{
						name: 'Sensor'+Hisdev[2],
						data: aDataArray[2]
					}/*,
					{
						name: 'Sensor'+Hisdev[3],
						data: aDataArray[3]
					},
					{
						name: 'Sensor'+Hisdev[4],
						data: aDataArray[4]
					}*/
					
				]
			});
			
		}