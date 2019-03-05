﻿(function ( $ ) {
    $.fn.refreshbtn = function (options) {
        var defaults = {
            width: 28,
            height: 28
        }
        options = $.extend(defaults, options);
        var w = options.width;
        var h = options.height;
        if (Number(window.innerWidth) < 768) {
            w = w - 8;
            h = h - 8;
        }
        $(this).html('<div id="btnChat" style="width:' + w + 'px;height:' + h + 'px;display:none;position:absolute;bottom:0px;"><i class="fa fa-comments-o fa-3x "></i></div>');
        
        $('#btnChat').click(function () {
            if($('#chatcontainer').css('position')=='absolute'){
                $('#chatcontainer').css({zIndex:1,position:'static',display:'none',left:'auto'});
                $('.close').hide();
                $('#chatSection').hide();
                $('#chatsectionhead').hide();
            }
            else{
                $('#chatcontainer').css({zIndex:5,position:'absolute',display:'block',left:'13%',top:'42px',maxWidth:'250px'});
                $('.close').show();
                $('#chatSection').show();
                $('#chatsectionhead').hide();
            }
        });
        $('.close').click(function(){
            $('#chatcontainer').css({zIndex:1,position:'static',display:'none',left:'auto'});
            $('.close').hide();
            $('#chatSection').hide();
            $('#chatsectionhead').hide();
        });
    }
}(jQuery));
