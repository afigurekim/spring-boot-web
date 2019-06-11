alert('자바스크립트 연결 성공 !!');

var wrapper = document.querySelector('#wrapper');
wrapper.innerHTML = '<h1>SPA 시작</h1>'
+'<div id="content">삭제할 내용</div>'
+'<button id="btn">지워버리자</button>'
+'<button id="btn2">추가하자</button>';

var btn = document.querySelector('#btn');
var content = document.querySelector('#content');

btn.addEventListener('click', function(){
    content.innerHTML = '';
});

var btn2 = document.querySelector('#btn2');

btn2.addEventListener('click', function() {
    var temp = document.createTextNode('새로 추가됨');
    content.appendChild(temp);
});
