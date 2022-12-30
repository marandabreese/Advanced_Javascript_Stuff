$(document).ready(function(){
    $("button").click(function() {
        $('ul').css({
            'list-style':'none',
            'display':'flex',
            'flex-direction':'row'
        })
        $('ul li:first-child').css({
            'text-transform':'uppercase'
        })
        $('.container').css({
            'font-family':'Avenir, sans-serif',
            'margin':'0',
            'padding':'auto',
            'background-color':'#cc99ff'
        })
        $('#top-container').css({
            'padding-top':'15px',
            'padding-bottom':'15px'
        })
        $('input').toggle().fadeOut();
    })
    $('button').hover(function() {
        $('button').css({
            'text-transform':'uppercase',
            'background-color':'#cc99ff'
        })
        $('li').css({
            'padding':'10px'
        })
    })
    $("input").blur(function(){
        alert("This input field has lost its focus.");
    });
    $('ul li:first-child').click(function(){
        $('#bottom-container').toggle().slideDown('slow');
    })
})