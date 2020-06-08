define(['jquery'],function($){
    $.fn.ensureVertical = function(scrollContent,callback) {
        var $this = $(this).first();
        var $parent = scrollContent;
        var scrollTop =  parseInt($parent.scrollTop());

        //-- 容器的padding
        var contentPaddingTop = parseInt($parent.css("padding-top"));
        var contentPaddingBottom = parseInt($parent.css("padding-bottom"));

        //-- 当前焦点的margin
        var marginTopThis = parseInt($this.css('margin-top'));
        var marginBottomThis = parseInt($this.css('margin-bottom'));
        var outerHeight = marginTopThis + marginBottomThis + parseInt($this.outerHeight());

        //-- 当前焦点距离容器的top
        var positionTop = parseInt($this.position().top);
        var top = scrollTop + positionTop + marginTopThis - contentPaddingTop;
        var bottom =  positionTop + outerHeight + contentPaddingBottom;
        var newPosition = null;
        if (scrollTop > top) {
            newPosition = {scrollTop: top};
        } else if ( bottom > parseInt($parent.innerHeight()) ) {
            newPosition = { scrollTop:scrollTop + bottom - parseInt($parent.innerHeight())};
        }
    
        if (newPosition) {
            $parent.animate(newPosition, {
                duration: 300,
                done: callback.bind(this)
            },'swing');
        } else {
            setTimeout(callback.bind(this));
        }
        return this;
    };
    $.fn.ensureHorizontal = function(callback) {
        var $this = $(this).first();
        var $parent = $this.parent();
        var scrollContent = $parent.parent();

        if(!$parent.hasClass("horizontal-scroll")){
            setTimeout(callback.bind(this));
            return false;
        }

        var scrollLeft = parseInt(scrollContent.scrollLeft());
        //-- 容器的padding
        var contentPaddingLeft = parseInt($parent.css("padding-left"));
        var contentPaddingRight = parseInt($parent.css("padding-right"));
        
        //-- 当前item的宽
        var marginLeftThis = parseInt($this.css('margin-left'));
        var marginRightThis = parseInt($this.css('margin-right'));
        var outerWidth = marginLeftThis + marginRightThis + parseInt($this.outerWidth());
        //-- 当前item 距离容器的left距离
        var positionLeft = parseInt($this.position().left);
      
        var right =  positionLeft + outerWidth + contentPaddingRight;
        var newPosition = null;
        if (positionLeft < contentPaddingLeft) {
            newPosition = {scrollLeft: scrollLeft - (contentPaddingLeft-positionLeft) + marginLeftThis };
        } else if ( right > parseInt(scrollContent.innerWidth()) ) {
            newPosition = { scrollLeft:scrollLeft + right - parseInt(scrollContent.innerWidth())};
        }
    
        if (newPosition) {
            scrollContent.animate(newPosition, {
                duration: 300,
                done: callback.bind(this)
            },'swing');
        } else {
            setTimeout(callback.bind(this));
        }
        return this;
    };
})