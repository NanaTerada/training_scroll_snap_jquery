'use striict'

{

    // インジケーターの作成
    $(function() {
        const $boxes = $('.box');
        const boxes_cnt = $boxes.length;
        const $indicator = $('#indicator');
        let indeicatorHtml ='';

        for ( let i = 0; i < boxes_cnt; i++) {
            indeicatorHtml += '<a href="#" class="indicator' + (i + 1) + '"></a>';
        };

        $indicator.html(indeicatorHtml);
    });





    // boxに連番のクラス付与
    // box とは別に　box1 box2・・・のくらす名を付ける

    const $boxes = $('.box');
    $boxes.each(function (index,element) {
        $(element).addClass('box'+(index+1));
    });

     
    
        const $indicator = $('#indicator');
     

        // 状態管理の変数、移行のときのじりじりを回避するため
        let flag = 1;

    $indicator.on('click','a',function(e) {


        e.preventDefault();
        const offset = $('.box' + ($(this).index()+1)).offset().top;
        flag = 3;
        $('html,body').stop(true).animate({ scrollTop: offset}, 500, 'swing', function() {
            flag = 1;
        })
    });
   
    

    // スクロールの上下方向の判定

    // throttle →　scroll や resize イベント時の処理回数を減らすプラグイン？　間引き処理？

    const $window = $(window);

    let prev_pos = $window.scrollTop();　//初期値（画面をリロードしたときの位置）

    // const box1 = $('.box1').offset().top;
    // const box2 = $('.box2').offset().top;

    
    // $.throttle(1000/100
    $window.on('scroll',function() {


        const $boxes = $('.box');
        const boxes_cnt = $boxes.length;
        const $indicator = $('#indicator');
        let indeicatorHtml ='';

        let current_pos = $(this).scrollTop();　//現在の位置





         // インジケーターの点灯・消灯
    for (let i = 0;i < boxes_cnt; i++) {
        const prev_offset = $('.box' + (i + 1)).offset().top;

        if(current_pos >= prev_offset - 1) {
            $('#indicator a').removeClass('active');
            $('#indicator a.indicator' + (i + 1)).addClass('active');

        }

    }


        for(let i = 1;i < boxes_cnt; i++) {
            const prev_offset = $('.box' + i).offset().top;
            const next_offset = $('.box' + (i + 1)).offset().top;


            if((current_pos > prev_offset) && (current_pos < next_offset) && (flag === 1)) {


                if(current_pos > prev_pos) {
                    // 下方向
                    flag = 2;
        
                    $('html, body').stop(true).animate({ scrollTop: next_offset}, 300,'swing',function(){
                        flag = 1;
                });
                } else if ( current_pos < prev_pos ) {
                    // 上方向
                    flag = 2;
                    $('html, body').stop(true).animate({ scrollTop: prev_offset}, 300,'swing',function(){
                        flag = 1;
                });
                }

                prev_pos = current_pos;
        
            }
            }
        });
    // $window.trigger('scroll');


    // イジケーターの点灯・消灯

    


}