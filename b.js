/**
 * 初始化设置
 */
var bIsWarningFrame=true;

//告警温度值
var dangervalue=25;

/**
 * 各个传感器的数据
 */
var bIsDanger=false;
var devindex=0;
var mapindex=1;
var floordanger=[0,0,0,0,0];//楼告警点个数
var getDataFlag=0;
var temperature=[0,0,0,0,0,0,0,0,0,0];//当前温度
var mac=[0,0,0,0,0,0,0,0,0,0];//机器地址
var time=[0,0,0,0,0,0,0,0,0,0];//当前时间
var pos_left=[0,0,0,0,0,0,0,0,0,0];
var pos_top=[0,0,0,0,0,0,0,0,0,0];
var inflag=0;
//setting
var music = new Array();
music[0]="1.mp3";
music[1]="2.mp3";
music[2]="3.mp3";
music[3]="4.mp3";
var msnum=4;//记录报警声音数量
var temp=dangervalue;
var alarmmusic=0;
var flag=false;
var musicl=alarmmusic;
var Hisval=new Array();
var Hisdev=new Array();
var history=[[0],[0],[0],[0]];//历史记录
var bIsWaring=false;
var Isnormal=["正常","异常"];
var normal=["","","",""];

var data1=false;
var data2=false;
/*初始化加载函数*/
function load()
{   
	jQuery(document).ready(function(){
		   $("#map1").click(function(e){   //定义了mousemove事件发生时的处理函数
		      
			   alert(e.pageY +', '+ e.pageX);  //事件处理函数的参数是一个event对象，从这个对象中可以获取当前鼠标的位置（e.pageX和e.pageY），然后将它们显示在status页面元素中
		   }); 
		})
	
	/*设置功能初始化*/	
	
	initionset();
	noteforall();
	$("#warninglist").hide();
	$("#floorlist").hide();
	$("#setlist").hide();
	$("#guidemain").show();	
	$('#historychart').hide();
	$('#map').hide();
	$('#warningframe').hide();
	$('#warningframe_list').hide();	
	TogetFloorData();
	$('#warningframe_floor1').hide();
	$('#warningframe_floor2').hide();
	
	bIsWarnFrame=true;//?
}
function noteforall()
{
	$('#floorlist_info1').append("数据加载中...");
    $('#floorlist_info2').append("数据加载中...");
    $('#warninglist_info1').append("数据加载中...");
    $('#warninglist_info2').append("数据加载中...");
    $('#charttext').append("数据加载中...");
}
function TogetFloorData(){	
	 devindex=0;	
	 bIsDanger=false;	
	 mapindex=0;	
	 FLAG=true;	
	 
	bIsWarningFrame=false;	
	getFloorData(2);
	getFloorData(1);	
	setTimeout("TogetFloorData()",30000);
}
function initionset()
{
	temp=getCookie("tempc");
	if(temp==null)
		temp=dangervalue;
	else
		 temp=temp*1;
	dangervalue=temp;
	//alert(dangervalue);
	alarmmusic=getCookie("music");
	if(alarmmusic==null)
		alarmmusic=0;
	else
		alarmmusic=alarmmusic*1;
	musicl=alarmmusic;	
	flag=true;
	setAlarm(musicl);		
	document.getElementById("img_temp_dis").innerHTML=temp;
}
function genWarningFrame(iii)
{
	if(iii==1)
		{
	if(floordanger[1]>=1)
	{
		$('#warningframe_floor1').empty();
		$('#warningframe_floor1').html("500有"+floordanger[1]+"处高温");
		$('#warningframe_floor1').css("color","red");
	}
	else
		{
		$('#warningframe_floor1').empty();
			$('#warningframe_floor1').html("500无高温，请放心");
			$('#warningframe_floor1').css("color","red");
		}
		}
	else
		{
	if(floordanger[2]>=1)
	{
		$('#warningframe_floor2').empty();
		$('#warningframe_floor2').html("504有"+floordanger[2]+"处高温");
		$('#warningframe_floor2').css("color","red");
	}
	else
	{
		$('#warningframe_floor2').empty();
		$('#warningframe_floor2').html("504无高温，请放心");
		$('#warningframe_floor2').css("color","red");
	}
		}
}

function showMap(map_index,inf)
{
	inflag=inf;
	Widget.Multimedia.AudioPlayer.stop();
	$('#floorlist').hide();
	$('#historychart').hide();	
	$('#warninglist').hide();
	$('#setlist').hide();
	$('#sensorselect').show();
	$("#guidemain").hide();	
	$('#warningframe_floor1').hide();
	$('#warningframe_floor2').hide();
	$('#warningframe').show();
	$('#map').show();	
	$('#floormap'+map_index).show();
	$('#floorword').show();
	mapindex=map_index-1;
	if(map_index==1)
		{
			$('#floormap2').hide();
			$('#floorinfo').html("500有"+floordanger[1]+"处高温");
			}
	else
		{
			$('#floormap1').hide();
			$('#floorinfo').html("504有"+floordanger[2]+"处高温");
			}
	
	if(bIsWarningFrame==true)
		{
			$('#warningclose').hide();
			$('#historychart').hide();
			$('#mapclose').show();
		}
	else
		{
			$('#warningclose').hide();
			$('#historychart').hide();
			$('#mapclose').show();
		}
}

function frontFloor(){
	
	mapindex=(mapindex+1)%2;
	if(mapindex==0){
		$('#floormap1').show();		
		$('#floormap2').hide();
		$('#floorinfo').html("500有"+floordanger[1]+"处高温");
		
	}
	else{
		$('#floormap2').show();		
		$('#floormap1').hide();
		$('#floorinfo').html("504有"+floordanger[2]+"处高温");
		
	}
}

function nextFloor()

{
	mapindex=(mapindex+1)%2;
	if(mapindex==0){
		$('#floormap1').show();		
		$('#floormap2').hide();
		$('#floorinfo').html("500有"+floordanger[1]+"处高温");
	}
	else{
		$('#floormap2').show();		
		$('#floormap1').hide();
		$('#floorinfo').html("504有"+floordanger[2]+"处高温");		
	}
}

function backFromMap()
{
	$('#floormap1').hide();
	$('#floormap2').hide();
	$('#historychart').hide();
	$('#warningclose').show();
	$('#mapclose').hide();
	if(bIsWarningFrame==true)
		{
			closeMap();
		}
	else if(inflag==2)
		{
		
			$('#warningframe').hide();
			
			$('#warninglist').hide();
			$('#setlist').hide();
			$('#guidemain').hide();
			
			$('#floorlist').show();
}
	else if(inflag==1)
		{
		
		$('#warningframe').show();
		
		$('#warninglist').show();
		$('#setlist').hide();
		$('#guidemain').hide();
		
		$('#floorlist').hide();}
}

function closeMap()
{
	
	$('#map').hide();	
	$('#warningframe_list').show();
	$("#warningframe").show();
	$('#warningframe_floor1').show();
	$('#warningframe_floor2').show();
	$('#historychart').hide();
	$('#floorlist').hide();
	$('#warninglist').hide();
	$('#setlist').hide();	
	$("#guidemain").hide();
}


function closeWarningFrame()
{
	bIsWarningFrame=false;
	$("#warningframe").hide();
	$('#floorlist').hide();
	$('#warninglist').hide();
	$('#setlist').hide();
	$('#historychart').hide();
	Widget.Multimedia.AudioPlayer.stop();
	$("#guidemain").show();
	$('#guidewarnlist_wx').show();
	$('#guidewarnlist').hide();
	$('#guidefloorlist').hide();
	$('#guidefloorlist_wx').show();
	$('#setting_wx').show();
	$('#setting').hide();

}
function showSetList()
{
	initionset();
	$("#warningframe").hide();
	$('#floorlist').hide();
	$('#warninglist').hide();
	$('#setlist').hide();
	$('#historychart').hide();
	$("#guidemain").hide();	
	$('#setlist').show();
	$('#guidewarnlist_wx').show();
	$('#guidewarnlist').hide();
	$('#guidefloorlist').hide();
	$('#guidefloorlist_wx').show();
	$('#setting_wx').hide();
	$('#setting').show();	
}

function genFloorList(ii)

{
	if(ii==1)
		{
	if(floordanger[1]>=1)
		{
		$('#floorlist_info1').empty();
			$('#floorlist_info1').html("500有"+floordanger[1]+"处高温");
			$('#floorlist_info1').css("color","red");
		}
	else
		{
		$('#floorlist_info1').empty();
			$('#floorlist_info1').html("500无高温");
			$('#floorlist_info1').css("color","white");
		}
		}
	else
	if(floordanger[2]>=1)
		{
		$('#floorlist_info2').empty();
			$('#floorlist_info2').html("504有"+floordanger[2]+"处高温");
			$('#floorlist_info2').css("color","red");
		}
	else
		{
		$('#floorlist_info2').empty();
			$('#floorlist_info2').html("504无高温");
			$('#floorlist_info2').css("color","white");
		}
	$('#floorlist_info3').html("走廊无高温");
}

function showFloorList()
{
	$('#floorlist').show();
	$('#floorlist_floor1').show();
	$('#floorlist_floor2').show();
	$('#floorlist_floor3').show();
	$('#guidemain').hide();
	$('#guidewarnlist_wx').show();
	$('#guidewarnlist').hide();
	$('#guidefloorlist').show();
	$('#guidefloorlist_wx').hide();
	$('#setting_wx').show();
	$('#setting').hide();
	$('#historychart').hide();
}

function backFromFloorList()
{
	$('#floorlist').hide();
	$('#guidemain').show();	
}

function showWarningList()
{
	$('#guidewarnlist_wx').hide();
	$('#guidewarnlist').show();
	$('#warninglist').show();
	$('#guidemain').hide();
	$('#warninglist_info1').show();
	$('#warninglist_info2').show();
	if(floordanger[1]>=1)
		{
			$('#warninglist_floor1').show();
		}
	else
		{
			$('#warninglist_floor1').hide();
		}
	if(floordanger[2]>=1)
		{
			$('#warninglist_floor2').show();
		}
	else
		{
			$('#warninglist_floor2').hide();
		}
	
	$('#guidefloorlist').hide();
	$('#guidefloorlist_wx').show();
	$('#setting_wx').show();
	$('#setting').hide();
	$('#historychart').hide();
	
}

function backFromWarningList()
{
	$('#warninglist').hide();
	$('#guidemain').show();
}

function genWarningList()
{
	/*if(floordanger[1]>=1)*/
		{   $('#warninglist_info1').empty();
			$('#warninglist_info1').html("500有"+floordanger[1]+"处高温");
		}
	/*if(floordanger[2]>=1)*/
		{   $('#warninglist_info2').empty();
			$('#warninglist_info2').html("504有"+floordanger[2]+"处高温");
		}
}

function getFloorData(floorid)
{	
	//alert("start");
	/*获取各个楼层信息*/
	$.ajax({ //1
		type:"GET",
		cache:false,
		dataType:"xml",
		url:"http://device.mobroad.com/warning/locations/floor/"+floorid,	
		timeout:15000,
		error:function(dat){
		getDataFlag++;
		if(getDataFlag>3)
			{
		var r=confirm("获取数据失败，是否重试？");
		
		getDataFlag=0;
			}
		if(r==true)
		{getFloorData(floorid);}
	},
		success:function(data){	//2
		                    
		Dealdata(data,floorid);
		}//2
	});//1
}
function Dealdata(Ddate,flooridflag){	

	 
	 floordanger[flooridflag]=0;
	if(flooridflag==1)
	 {data1=true;
	 $('#floormap1').empty();
	 $('#floormap1').append("<div id='sensorselect1'></div>");
	 }
	if(flooridflag==2)
	 {data2=true;
	 $('#floormap2').empty();
	 $('#floormap2').append("<div id='sensorselect2'></div>");
	 }
	/*devindex=0;*/
	var items=$("item",Ddate);
	$('#warninglist_word'+flooridflag).empty();

		jQuery.each(items,function(){//3								
			temperature[devindex]=$("value",this).text();
			mac[devindex]=$("device_id",this).text();
			time[devindex]=$("time",this).text();
			pos_left[devindex]=$("position_left",this).text();
			pos_top[devindex]=$("position_top",this).text();
	
			if(temperature[devindex]>=dangervalue)
				{	//4
					$('#warninglist_word'+flooridflag).append("<div style='color:red  '>监测点:"+mac[devindex]+"号 "+"当前温度:"+temperature[devindex]+"</div>");
					floordanger[flooridflag]++;//报警点数加一
					/*报警标志设置*/
					bIsDanger=true;		//用来标记显示报警点颜色				
					bIsWarningFrame=true;					
				}//4				
			else
				{//5	
				if(temperature[devindex]>=dangervalue-5)
					{$('#warninglist_word'+flooridflag).append("<div style='color:yellow  '>监测点:"+mac[devindex]+"号 "+"当前温度:"+temperature[devindex]+"</div>");}
					bIsDanger=false;  //用来标记显示报警点颜色	
				}	//5			
			drawMap(flooridflag,devindex,pos_left[devindex],pos_top[devindex],bIsDanger);
			
			devindex=devindex+1;
		});//3				
		
		genWarningFrame(flooridflag);
		genFloorList(flooridflag);
		
		setTimeout("Reaction()",1500);
	
		
}
function Reaction(){
	if(bIsWarningFrame==true&&data1==true&&data2==true)
	{
		data1=false;
		data2=false;	
	genWarningList();	
	playWarningSound(musicl);		
	$("#warninglist").hide();
	$("#floorlist").hide();
	$("#setlist").hide();
	$("#guidemain").hide();
	$('#historychart').hide();
	$('#map').hide();
	$('#warningframe').show();
	$('#warningframe_list').show();			
	$('#warningframe_floor1').show();
	$('#warningframe_floor2').show();
	$('#warningclose').show();
	}
	
}
function showSensorInfo(floorid1,devindex1)
{
	
	var divid='#sensorselect'+floorid1;
	$('#floorword').empty();
	$('#floorword').html("<div>监测点："+mac[devindex1]+"</div>"+"<div>时间："+time[devindex1]+"</div>"+"<div>温度："+temperature[devindex1]+"</div>");
	$(divid).css("position","absolute");
	var top1=parseFloat(pos_top[devindex1]);
	var left1=parseFloat(pos_left[devindex1]);	
	$(divid).css("top",top1+'px');
    $(divid).css("left",left1+'px');
    $(divid).show();
}

/*判断传感器告警等级  在地图上加载告警点*/
function drawMap(floorid,devindex1,pleft,ptop,bIsDanger)
{
	var pointid="dev_"+devindex1;  
	jQuery("#"+pointid).empty();
    jQuery("#floormap"+floorid).append("<div id='"+pointid+"' "+"onclick='showSensorInfo("+floorid+","+devindex1+")'"+">"+"</div>");
    $("#"+pointid).css("position","absolute");
    $("#"+pointid).css('height',50+'px');
    $("#"+pointid).css('width',50+'px');
    $("#"+pointid).css("top",ptop+'px');
    $("#"+pointid).css("left",pleft+'px');
   
    if(bIsDanger==true)
    	{
    		$("#"+pointid).css("background","url(img/sensor_red.png) no-repeat");
    	}
    else
    	{
    		if(temperature[devindex1]>=dangervalue-5)
    			{
    				$("#"+pointid).css("background","url(img/sensor_yellow.png) no-repeat");
    			}
    		else
    			{
    				$("#"+pointid).css("background","url(img/sensor_green.png) no-repeat");
    			} 	
    	}
}
function showchart()
{
$('#floorlist').hide();
	$('#warninglist').hide();
	$('#setlist').hide();
	$('#sensorselect').hide();
	$("#guidemain").hide();	
	$('#warningframe_floor1').hide();
	$('#warningframe_floor2').hide();
	$('#warningframe').hide();
	$('#map').hide();
	$('#floormap2').hide();
	$('#floormap1').hide();
	$('#floorword').hide();
	$('#historychart').show();
    draw_chart();

}
function draw_chart(){
	$('#charttext').empty();
	$('#chart').empty();
	$('#chart').append("<br>&nbsp;&nbsp;&nbsp;&nbsp;数据加载中，请稍后……");
	var nma;
	if(mapindex==0)
		nma=500;
	else
		nma=504;
	
	$('#charttext').append(nma+"各监测点历史曲线");
	getHistory();
}
function redraw(){
	$('#chart').empty();
	draw_charts();
	
}
function backtomap(){	
	showMap(mapindex+1,inflag);
}
//温度超过30度发出告警声音的
function getHistory()
{ 
	history=[[0],[0],[0],[0],[0]];
	var i=0;
	$.ajax({
		type:"GET",
		cache:false,
		url:"http://device.mobroad.com/warning/history/locations/"+(mapindex+1),
		dataType:"xml",
	    success: function(data){
		   var items=$("item",data);	   
		   $.each(items, function(){			   
			   Hisval[i] = $("value",this).text();
			   Hisdev[i] = $("device_id",this).text();			  
			   history[i]=Hisval[i].split("|");								
				jQuery.each(history[i], function(j) {
					history[i][j] = parseFloat(history[i][j]);					
				});					
				i++;    
		   });
		   $('#chart').empty();
		   draw_charts();
		}
	});

}
function playWarningSound(i)
{
	Widget.Multimedia.AudioPlayer.stop();
	Widget.Multimedia.AudioPlayer.open(music[i]);
    Widget.Multimedia.AudioPlayer.play(10);
}
//setting
function setAlarm(i){	
	for(var j=0;j<4;j++)
		{if(i==j)
			{			
			$("#alarm_"+j).css("background-image","url('img/cmcc_check_nor_on_black.png')");
			}
			else
		$("#alarm_"+j).css("background-image","url('img/cmcc_check_nor_off_black.png')");
		}
	alarmmusic=i;
	if(flag==true)
		flag=false;
	else
	playing(i);
}	

function saveSeting(){
		
	setCookie("music",alarmmusic);
	setCookie("tempc",temp);
	dangervalue=temp;
	musicl=alarmmusic;
	alert("保存成功");
	 devindex=0;	
	 bIsDanger=false;	
	 mapindex=0;	
	 FLAG=true;	
	 data1=false;
	 data2=false;	
	bIsWarningFrame=false;	
	getFloorData(1);
	getFloorData(2);
	BackSeting();
	/*devindex=0;	
	 bIsDanger=false;	
	 mapindex=0;
	 floordanger=[0,0,0,0,0];//楼告警点个数
   FLAG=true;
	temperature=[0,0,0,0,0,0,0,0,0,0];//当前温度
	 mac=[0,0,0,0,0,0,0,0,0,0];//机器地址
	 time=[0,0,0,0,0,0,0,0,0,0];//当前时间
	pos_left=[0,0,0,0,0,0,0,0,0,0];
	 pos_top=[0,0,0,0,0,0,0,0,0,0];
	 flag=[0,0,0,0,0];//告警等级	
	 $('#floormap1').empty();
	 $('#floormap2').empty();
	 $('#floormap1').append("<div id='sensorselect1'></div>");
	 $('#floormap2').append("<div id='sensorselect2'></div>");
		bIsWarningFrame=false;*/
	/*getFloorData(1);
	getFloorData(2);确保设置后数据即时更新的代码部分*/
}


function playing(i){
	
	Widget.Multimedia.AudioPlayer.stop();
	Widget.Multimedia.AudioPlayer.open(music[i]);
    Widget.Multimedia.AudioPlayer.play(1);
		
	
    }
function dec(){
	document.getElementById("img_dec_h").style.display="block";	
	temp=temp-1;
	jQuery("#img_temp_dis").empty();
	document.getElementById("img_temp_dis").innerHTML=temp;
	setTimeout("xch()",200);
	
}
function add(){
	document.getElementById("img_add_h").style.display="block";
	temp=temp+1;
	jQuery("#img_temp_dis").empty();
	
	document.getElementById("img_temp_dis").innerHTML=temp;
	setTimeout("xch()",200);
}
function xch()
{
	document.getElementById("img_add_h").style.display="none";
	document.getElementById("img_dec_h").style.display="none";
}
function BackSeting()
{
	Widget.Multimedia.AudioPlayer.stop();
	$("#guidemain").show();	
	$('#setlist').hide();
}
/*function BackSetingN()
 {
	BackSeting();
	Widget.Multimedia.AudioPlayer.stop();	
	alarmmusic=getCookie("music");
	alert(alarmmusic);
	
	temp=getCookie("tempc");
	alert(temp);
	initionset();
 }*/

///////////cookie
function setCookie(name,value) 
{ 
var Days = 30; 
var exp  = new Date(); 
exp.setTime(exp.getTime() + Days*24*60*60*1000); 
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 
function getCookie(name) 
{ 
var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)")); 
if(arr != null) return unescape(arr[2]); return null; 
} 



