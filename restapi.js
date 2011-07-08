jQuery.restrss=function(options){
	options=jQuery.extend({
		link:null,
		data:null,
		success:null
	},options);
	
	
	if(options.link){
		jQuery.ajax({
			url:options.link,
			type:'GET',
			data:options.data,
			dataType:'xml',
			success:function(response){
				var xmlParse=new XMLParse(response);
				if(jQuery.isFunction(options.success)){
					options.success(xmlParse);
				}
			}
		});
	}
};
/**
 * XML解析对象实现
 * @param xml
 * @return
 */
function XMLParse(xml){
	if(xml){
		this.parse(xml);
	}
}
/**
 * XML解析对象原型
 */
XMLParse.prototype={	

	parse:function(xml){
		var parser=null;
		if(jQuery('temperature',xml).length==1){
			parser=new SensorParse(xml);
		}
		if(parser){
			jQuery.extend(this,parser);
		}
	}
};
/**
 * RSS解析对象实现
 * @param xml
 * @return
 */
function SensorParse(xml){
	this.parses(xml);
}
/**
 * RSS解析对象原型
 */
SensorParse.prototype={
	parses:function(xml){

		var temp=jQuery("temperature:first",xml);
		this.items=new Array();
		var feeds=this;
		
		jQuery("item",temp).each(function(){
			if(jQuery(this).find('value:first').text() != null && 
					jQuery(this).find('value:first').text() 

!=""){
				var item=new Item();
				item.value=jQuery(this).find('value:first').text();
				item.time=jQuery(this).find('time:first').text();
				item.device_id=jQuery(this).find('device_id:first').text();
				item.position_left=jQuery(this).find('position_left').text();
				item.position_top=jQuery(this).find('position_top').text();
				feeds.items.push(item);
			}
		});
		
	}
};
/**
 * 新闻条目对象实现
 * @return
 */
function Item(){
}
/**
 * 新闻条目对象原型
 */
Item.prototype={
	title:'',
	link:'',
	description:'',
	value:'',
	time:'',
	device_id:'',
	position_left:'',
	position_top:''
};