//渲染
;
! function($) {
    var list = $('.floorlist ul');
    $.ajax({
        url: 'http://192.168.11.65/h5/umyjs/taobaoitem_test/php/list.php',
        dataType: 'json'
    }).done(function(data) {
        console.log(data);
        var strhtml = '';
        $.each(data, function(index, value) {
            strhtml += `
            <a href="detail.html">
        <li>
        <em><img src="${value.url}"></em>
        
       
         <b>${value.title}</b>
          <p>${value.title}</p>
        <span>￥${value.price}</span>
           
        </li>
        </a>
        `;
        });
        list.html(strhtml);
    });
}(jQuery);


//楼梯
function scroll() {
    var top = $(window).scrollTop();
    top >= 1000 ? $('#leftBar').show() : $('#leftBar').hide();
    $('.floor1').each(function(index, element) {
        var loutop = $(this).offset().top;
        if (loutop >= top) {
            $('#leftBar li').removeClass('active');
            $('#leftBar li').eq($(this).index()).addClass('active');
            return false;
        }
    });
}
scroll();
$(window).on('scroll', function() {
    scroll();
});
$('#leftBar li').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
    var loutop = $('.floor1').eq($(this).index()).offset().top;
    $('html').animate({
        scrollTop: loutop
    });
})

//轮播图
! function($) {
    class Lunbo {
        constructor() {
            this.$lunbo = $('.lunbo');
            this.$ulist = $('.lunbo ul'); //运动的盒子
            this.$piclist = $('.lunbo ul li'); //6个图片
            this.$btnlist = $('.lunbo ol li'); //5个圈圈
            this.$leftarrow = $('#left');
            this.$rightarrow = $('#right');
            this.timer = null;
            this.$num = 0; //存储索引值
        }
        init() {
            let _this = this;
            //1.先改变布局，计算$ulist的宽度
            this.$liwidth = this.$piclist.eq(0).width(); //1个li的宽度(图片的宽度)
            this.$ulist.width(this.$liwidth * this.$piclist.size());

            //2.5个圈圈添加点击事件。让$ulist进行运动。
            this.$btnlist.on('click', function() {
                //this:当前操作的元素对象
                _this.$num = $(this).index() - 1;
                _this.tabSwitch();
            });

            //3.显示左右箭头。
            this.$lunbo.hover(() => {
                //this:当前操作的元素对象
                this.hover();
            }, () => {
                this.out();
            });

            //4.左右箭头添加点击事件。
            this.$rightarrow.on('click', () => {
                this.tabSwitch();
            });

            this.$leftarrow.on('click', () => {
                this.$num -= 2;
                this.tabSwitch();
            });

            //5.自动轮播
            this.timer = setInterval(() => {
                this.$rightarrow.click();
            }, 2000);

        }
        hover() {
            clearInterval(this.timer); //鼠标移入停止自动轮播
            this.$leftarrow.show();
            this.$rightarrow.show();
        }
        out() {
            this.$leftarrow.hide();
            this.$rightarrow.hide();
            this.timer = setInterval(() => { //鼠标移出继续自动轮播。
                this.$rightarrow.click();
            }, 2000);
        }
        tabSwitch() {
            this.$num++;
            if (this.$num === this.$btnlist.size() + 1) {
                this.$ulist.css('left', 0);
                this.$num = 1;
            }

            if (this.$num === -1) {
                this.$ulist.css('left', -this.$liwidth * this.$btnlist.size());
                this.$num = this.$btnlist.size() - 1;
            }


            if (this.$num === this.$btnlist.size()) {
                this.$btnlist.eq(0).addClass('active').siblings('li').removeClass('active');
            } else {
                this.$btnlist.eq(this.$num).addClass('active').siblings('li').removeClass('active');
            }


            this.$ulist.stop(true).animate({
                left: -this.$liwidth * this.$num
            });

        }
    }
    new Lunbo().init();
}(jQuery);
// var curIndex = 0,
//     imgLen = $(".imgList li").length; //图片总数
// $(".imgList").css("width", (imgLen + 1) * 1920 + "px");
// var autoChange = setInterval(function() {
//     if (curIndex < imgLen - 1) {
//         curIndex++;
//     } else {
//         curIndex = 0;
//     }
//     changeTo(curIndex);
// }, 3000);

// function autoChangeAgain() {
//     autoChange = setInterval(function() {
//         if (curIndex < imgLen - 1) {
//             curIndex++;
//         } else {
//             curIndex = 0;
//         }
//         changeTo(curIndex);
//     }, 3000);
// }

// function changeTo(num) {
//     var goLeft = num * 1920;
//     $(".imgList").animate({
//         left: "-" + goLeft + "px"
//     }, 500);
// }



// require(['config'], function() {
//     require(['jquery'], ['jq_lazyload'], function() {
//         ! function() {

//         }(jQuery)
//     })
// })