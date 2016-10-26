// alert('this is script.js file');
'use strict';

var test = [{
    question: '1. Что такое HTML?',
    answers: ['Язык гипертекстовой разметки', 'Язык программирования Hybrid', 'Язык программирования C#', 'Нет правильного ответа'],
    value: ['true', 'false', 'false', 'false']
}, {
    question: '2. Какого типа данных нет в javascript?',
    answers: ['Boolean', 'Decimal', 'String', 'Все ответы верны'],
    value: ['false', 'true', 'false', 'false']
}, {
    question: '3. Какие вызовы parseInt вернут число?',
    answers: ['parseInt("1px")', 'parseInt("-1.2")', 'parseInt("0 минут")', 'parseInt("$1.2")'],
    value: ['true', 'true', 'true', 'false']
}];


localStorage.setItem('test', JSON.stringify(test));
var memory = localStorage.getItem('test');
memory = JSON.parse(memory);


$(function() {
    var $html = $('#test').html();
    var tmpl = _.template($html);
    $('body').append(tmpl(memory));
});

// -------------- Проверка ответов -------------- //

$(function () {



    var $answer = $('input[type="checkbox"]');
        $answer.on('click', function() {
            if($(this).prop('checked') === true){
                $(this).attr('checked', 'checked');
            } else {
                $(this).removeAttr('checked');
            }
        });

    var $quest1 = $('.question1 input[type="checkbox"]');
    var $quest2 = $('.question2 input[type="checkbox"]');
    $quest1.on('click', function () {
        $quest1.filter(':checked').not(this).removeAttr('checked');
    });
    $quest2.on('click', function () {
        $quest2.filter(':checked').not(this).removeAttr('checked');
    });

    var $submitResults = $('input[type="button"]');
        $submitResults.on('click', function () {
            event.preventDefault();
            var $result = true;
            $answer.each(function() {
                if ($(this).prop('checked') != ($(this).attr('value') == 'true')) {
                    $result = false;
                    return false;
                }
            });
            console.log($result);


            var $trueResultsArray = _.flatMap(memory, 'value');
            console.log($trueResultsArray);
            // Запись атрибутов 'value' выбранных чекбоксов в массив
            var $resultsArray = $answer.map(function() {
                if ($(this).prop('checked')) {
                    return this.value;
                }
            }).get();
            console.log($resultsArray);
            var rightAnswers = 0;
            var trueRightAnswers = 0;
            var badAnswers = 0;
            for (var n = 0; n < $resultsArray.length; n++) {
                if ($resultsArray[n] == 'true') {
                    rightAnswers++;
                } else {
                    badAnswers++;
                }
            }
            for (var z = 0; z < $trueResultsArray.length; z++) {
                if ($trueResultsArray[z] == 'true') {
                    trueRightAnswers++;
                }
            }
            var count = (rightAnswers * 100) / trueRightAnswers;

            if ($result === false) {
                $('.modal-title').html('К сожалению, но Вы тест не прошли!');
                $('.modal-result').html('Вы ответили верно на : ' + count + '% вопросов');
            }

            if ( $resultsArray.length > trueRightAnswers) {
                $('.modal-title').html('К сожалению, но Вы тест не прошли!');
                $('.modal-result').html('Повторим попытку снова?');
            }

            if ($result === true) {
                $('.modal-title').html('ОТЛИЧНО! Так держать!');
                $('.modal-result').html('Вы ответили верно на : ' + count + '% вопросов');
            }

            $('.overlay').fadeIn(400, function(){
                $('.modal-window')
                    .css('display', 'block')
                    .animate({opacity: 1, top: '50%'}, 200);
            });

            $('.modal-close, .overlay, .modal-buttons input').on('click', function(){
                $('.modal-window')
                    .animate({opacity: 0, top: '45%'}, 200,
                        function(){
                            $(this).css('display', 'none');
                            $('.overlay').fadeOut(250);
                        }
                    );
                $answer.each(function() {
                    $(this).removeAttr('checked');
                    localStorage.clear();
                });
            });

        });
});
