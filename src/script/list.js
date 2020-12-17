//渲染
// define(['pagination', 'jlazyload'], function() {
//     return {
//         init: function() {
//             const $list = $('.list ul');
//             let $array_default = []; //排序前的li放入此数组。
//             let $array = []; //排序后的数组
//             let $prev = []; //li里面的商品的前一个价格
//             let $next = []; //li里面的商品的后一个价格
//             //1.渲染列表页面
//             $.ajax({
//                 url: 'http://10.31.161.29/JS2010/projectname/php/listdata.php',
//                 dataType: 'json'
//             }).done(function(datalist) {
//                 console.log(datalist);
//                 data = datalist.pagedata; //获取接口里面数据
//                 let $strhtml = '';
//                 $.each(data, function(index, value) {
//                     $strhtml += `
//                         <li>
//                             <a href="detail.html?sid=${value.sid}">
//                                 <img class="lazy" data-original="${value.url}" width="200" height="200"/>
//                                 <p>${value.title}</p>
//                                 <span>￥${value.price}</span>
//                             </a>
//                         </li>
//                     `;
//                 });
//                 $list.html($strhtml);
//                 //懒加载
//                 $("img.lazy").lazyload({ effect: "fadeIn" });

//                 //将li元素添加到排序前的数组中。
//                 $array_default = [];
//                 $array = [];
//                 $('.list li').each(function(index, element) { //element:原生的元素对象
//                     $array_default[index] = $(this); //排序前
//                     //比如每页长度是15，数组里面有15项
//                     //index:0-14
//                     //如果数据不够15条，只有10条，替换前面的10条，后面还多余了5条
//                     $array[index] = $(this); //排序后
//                 });
//                 console.log($array_default);


//                 //2.进行分页设置(html页面载入分页的结构)
//                 $('.page').pagination({
//                     pageCount: datalist.pageno, //总的页数
//                     jump: true, //是否开启跳转到指定的页数，布尔值。
//                     prevContent: '上一页', //将图标改成上一页下一页。
//                     nextContent: '下一页',
//                     callback: function(api) {
//                         console.log(api.getCurrent()); //获取当前的点击的页码。
//                         $.ajax({
//                             url: 'http://10.31.161.29/JS2010/projectname/php/listdata.php',
//                             data: {
//                                 page: api.getCurrent()
//                             },
//                             dataType: 'json'
//                         }).done(function(datalist) {
//                             data = datalist.pagedata; //获取接口里面数据
//                             let $strhtml = '';
//                             $.each(data, function(index, value) {
//                                 $strhtml += `
//                                         <li>
//                                             <a href="detail.html?sid=${value.sid}">
//                                                 <img class="lazy" data-original="${value.url}" width="200" height="200"/>
//                                                 <p>${value.title}</p>
//                                                 <span>￥${value.price}</span>
//                                             </a>
//                                         </li>
//                                     `;
//                             });
//                             $list.html($strhtml);
//                             //懒加载
//                             $("img.lazy").lazyload({ effect: "fadeIn" });

//                             //将li元素添加到排序前的数组中。
//                             $array_default = [];
//                             $array = [];
//                             $('.list li').each(function(index, element) { //element:原生的元素对象
//                                 $array_default[index] = $(this); //排序前
//                                 $array[index] = $(this); //排序后
//                             });
//                             console.log($array_default);
//                         });
//                     }
//                 });


//                 //3.点击按钮进行排序
//                 $('button').eq(0).on('click', function() {
//                     //遍历渲染。
//                     $.each($array_default, function(index, value) { //value就是li元素
//                         $list.append(value);
//                     });
//                 });
//                 $('button').eq(1).on('click', function() {
//                     for (let i = 0; i < $array.length - 1; i++) {
//                         for (let j = 0; j < $array.length - i - 1; j++) {
//                             $prev = parseFloat($array[j].find('span').html().substring(1)); //上一个价格
//                             $next = parseFloat($array[j + 1].find('span').html().substring(1)); //下一个价格
//                             if ($prev > $next) {
//                                 //通过价格的比较,交换的是里面的这个li元素
//                                 let temp = $array[j];
//                                 $array[j] = $array[j + 1];
//                                 $array[j + 1] = temp;
//                             }
//                         }
//                     }
//                     //遍历渲染。
//                     $.each($array, function(index, value) { //value就是li元素
//                         $list.append(value);
//                     });
//                 });

//                 $('button').eq(2).on('click', function() {
//                     for (let i = 0; i < $array.length - 1; i++) {
//                         for (let j = 0; j < $array.length - i - 1; j++) {
//                             $prev = parseFloat($array[j].find('span').html().substring(1)); //上一个价格
//                             $next = parseFloat($array[j + 1].find('span').html().substring(1)); //下一个价格
//                             if ($prev < $next) {
//                                 //通过价格的比较,交换的是里面的这个li元素
//                                 let temp = $array[j];
//                                 $array[j] = $array[j + 1];
//                                 $array[j + 1] = temp;
//                             }
//                         }
//                     }
//                     //遍历渲染。
//                     $.each($array, function(index, value) { //value就是li元素
//                         $list.append(value);
//                     });
//                 });


//             });
//         }
//     }
// });
! function($) {
    var array_default = [];
    var array = [];
    var prev = null;
    var next = null;
    const list = $('.main_list .list_box');
    $.ajax({
        url: 'file:///C:/Users/Administrator/Desktop/geli/src/php/list.php',
        dataType: 'json'
    }).done(function(data) {
        console.log(data);
        var strhtml = '';
        $.each(data, function(index, value) {
            strhtml += `
           
        <li>
        <a href="detail.html?sid=${value.sid}">
        <em><img class="lazy" data-original="${value.url}"></em>
          <p>${value.title}</p>
          <span class="geli">华为商城</span>
         <b class="jiage">￥${value.price}</b><strong>包邮</strong>
           <span class="span">已有<i>2631</i>人购买</span>
           <span class="car">加入购物车</span>
           </a>
        </li>
       
        `;
        });
        list.html(strhtml);
        //懒加载
        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
        $('.main_list .list_box li').each(function(index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    });
    //分页
    $('.page').pagination({
        pageCount: 3,
        jump: true,
        prevContent: '上一页',
        nextContent: '下一页',
        callback: function(api) {
            console.log(api.getCurrent());
            $.ajax({
                url: 'file:///C:/Users/Administrator/Desktop/geli/src/php/list.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function(data) {
                var strhtml = '';
                $.each(data, function(index, value) {
                    strhtml += `
            
        <li href="detail.html">
        <a href="detail.html?sid=${value.sid}">
        <em><img class="lazy" data-original="${value.url}"></em>
          <p>${value.title}</p>
          <span class="geli">华为商城</span>
         <b class="jiage">￥${value.price}</b><strong>包邮</strong>
           <span class="span">已有<i>2631</i>人购买</span>
           <span class="car">加入购物车</span>
           </a>
        </li>
      
                    `;
                });
                list.html(strhtml);
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
                $('.list_box li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            })
        }
    });
    //3.排序
    // 默认排序
    $('.paixu').eq(0).on('click', function() {
        $.each(array_default, function(index, value) {
            $('.main_list .list_box').append(value);
        });
        return;
    });
    // 价格升序
    $('.paixu').eq(1).on('click', function() {
        for (var i = 0; i < array.length - 1; i++) {
            for (var j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.jiage').html().substring(1));
                next = parseFloat(array[j + 1].find('.jiage').html().substring(1));
                if (prev > next) {
                    var temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }

        $.each(array, function(index, value) {
            $('.main_list .list_box').append(value);
        });
        return;
    });
    //价格降序
    $('.paixu').eq(2).on('click', function() {
        for (var i = 0; i < array.length - 1; i++) {
            for (var j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.jiage').html().substring(1));
                next = parseFloat(array[j + 1].find('.jiage').html().substring(1));
                if (prev < next) {
                    var temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }

        $.each(array, function(index, value) {
            $('.main_list .list_box').append(value);
        });
        return;
    });
}(jQuery);