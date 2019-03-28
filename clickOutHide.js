/**
 *  $("XXX").clickOutHide({
 	*   hideCallback:function(){},
		noContain: $("#div1,#div2")
		
	});
	
	https://github.com/hoonr/clickOutHide
	
 */
;
(function($) {
	$.fn.clickOutHide = function(option) {
		var param = {
			hideCallback: null,//隐藏后的回调函数
			noContain: null //不包含的元素，即点击了这些元素也不隐藏
		}
		$.extend(param, option);

		var $this = this; // 注意this在这后是否被解绑
		$(document).on("mouseup", function(e) {
			// 判断点击的是否为时间控件
			//console.log($this.parents($this.selector).andSelf().length);
			var $tat = $(e.target);
			var mark = false;
			var $noContain;
			if(param.noContain && param.noContain.length > 0 && param.noContain.selector) {
				$noContain = $(param.noContain.selector);
			}
			if($noContain && $noContain.length > 0) {
				$noContain.each(function() {
					if($tat.parents($(this)).addBack($(this)).is($(this))) {
						mark = true;
					}
				});
			}

			if($tat.parents($this).addBack($this).is($this)) {
				mark = true;
			}

			if(mark) {
				stopPropagation(e);
			} else {
				$this.css('display', 'none');
				if(param.hideCallback && $.isFunction(param.hideCallback)) {
					param.hideCallback();
				}
			}
			return false;
		});

		function stopPropagation(e) {
			if(e.stopPropagation)
				e.stopPropagation();
			else
				e.cancelBubble = true;
		}
	};
})(jQuery);