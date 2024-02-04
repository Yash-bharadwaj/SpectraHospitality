"use strict";(function($,window,document,undefined){var pluginName="emailautocomplete";var defaults={suggClass:"eac-sugg",domains:["yahoo.com","hotmail.com","gmail.com","me.com","aol.com","mac.com","live.com","comcast.net","googlemail.com","msn.com","hotmail.co.uk","yahoo.co.uk","facebook.com","verizon.net","sbcglobal.net","att.net","gmx.com","outlook.com","icloud.com"]};function EmailAutocomplete(elem,options){this.$field=$(elem);this.options=$.extend(true,{},defaults,options);this._defaults=defaults;this._domains=this.options.domains;this.init();}
EmailAutocomplete.prototype={init:function(){if(!Array.prototype.indexOf){this.doIndexOf();}
this.fieldLeftOffset=null;var $wrap=$("<div class='eac-input-wrap' />").css({display:this.$field.css("display"),position:this.$field.css("position")==='static'?'relative':this.$field.css("position"),fontSize:this.$field.css("fontSize")});this.$field.wrap($wrap);this.$cval=$("<span class='eac-cval' />").css({visibility:"hidden",position:"absolute",display:"inline-block",fontFamily:this.$field.css("fontFamily"),fontWeight:this.$field.css("fontWeight"),letterSpacing:this.$field.css("letterSpacing")}).insertAfter(this.$field);var heightPad=(this.$field.outerHeight(true)-this.$field.height())/2;this.$suggOverlay=$("<span class='"+this.options.suggClass+"' />").css({display:"block","box-sizing":"content-box",lineHeight:this.$field.css('lineHeight'),paddingTop:heightPad+"px",paddingBottom:heightPad+"px",fontFamily:this.$field.css("fontFamily"),fontWeight:this.$field.css("fontWeight"),letterSpacing:this.$field.css("letterSpacing"),position:"absolute",top:0,left:0}).insertAfter(this.$field);this.$field.on("keyup.eac",$.proxy(this.displaySuggestion,this));this.$field.on("blur.eac",$.proxy(this.autocomplete,this));this.$field.on("keydown.eac",$.proxy(function(e){if(e.which===39||e.which===9||e.which===32||e.which===13){this.autocomplete();}
if(e.which===9&&!this.$field.hasClass('email-focus')){this.$field.addClass('email-focus');e.preventDefault();}else{if(e.which===32){e.preventDefault();}
this.$field.removeClass('email-focus');}},this));this.$field.on("click",$.proxy(function(e){this.autocomplete();},this));this.$suggOverlay.on("mousedown.eac touchstart.eac",$.proxy(this.autocomplete,this));},suggest:function(str){str=$.trim(str.toLowerCase());var str_arr=str.split("@");if(str_arr.length>1){str=str_arr.pop();if(!str.length){return"";}}else{return"";}
var match=this._domains.filter(function(domain){return domain.indexOf(str)===0;}).shift()||"";return match.replace(str,"");},autocomplete:function(){if(typeof this.suggestion==="undefined"||this.suggestion.length<1){return false;}
this.$field.val(this.val+this.suggestion);this.$suggOverlay.text("");this.$cval.text("");},displaySuggestion:function(e){this.val=this.$field.val();this.suggestion=this.suggest(this.val);if(!this.suggestion.length){this.$suggOverlay.text("");}else{e.preventDefault();}
this.$suggOverlay.text(this.suggestion);this.$cval.text(this.val);if(this.fieldLeftOffset===null){this.fieldLeftOffset=(this.$field.outerWidth(true)-this.$field.width())/2;}
var cvalWidth=this.$cval.width();if(this.$field.outerWidth()>cvalWidth){this.$suggOverlay.css('left',this.fieldLeftOffset+cvalWidth+"px");}},doIndexOf:function(){Array.prototype.indexOf=function(searchElement,fromIndex){if(this===undefined||this===null){throw new TypeError('"this" is null or not defined');}
var length=this.length>>>0;fromIndex=+fromIndex||0;if(Math.abs(fromIndex)===Infinity){fromIndex=0;}
if(fromIndex<0){fromIndex+=length;if(fromIndex<0){fromIndex=0;}}
for(;fromIndex<length;fromIndex++){if(this[fromIndex]===searchElement){return fromIndex;}}
return-1;};}};$.fn[pluginName]=function(options){return this.each(function(){if(!$.data(this,"yz_"+pluginName)){$.data(this,"yz_"+pluginName,new EmailAutocomplete(this,options));}});};})(jQuery,window,document);