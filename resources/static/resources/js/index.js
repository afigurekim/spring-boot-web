var app = (function(){
    let init = function(){
        login_form();
    }
    let login_form = function(){
        var wrapper = document.querySelector('#wrapper');
        wrapper.innerHTML = '<form action="/action_page.php">'
        +'  First name:<br>'
        +'  <input type="text" name="firstname" value="Mickey">'
        +'  <br>'
        +'  Last name:<br>'
        +'  <input type="text" name="lastname" value="Mouse">'
        +'  <br><br>'
        +'  <input id="btn1" type="submit" value="로그인">'
        +'  <input id="btn2" type="submit" value="회원가입">'
        +'</form> ';
    
        var btn2 = document.querySelector('#btn2');
    
        btn2.addEventListener('click', function(){
            join_form();
        });
    }
    let join_form = function(){
        //var wrapper = document.querySelector('#wrapper');
        wrapper.innerHTML = '<form>'
        +'	ID<br>'
        +'	<input type="text" name="id"><br>'
        +'	PW<br>'
        +'	<input type="password" name="pw"><br>'
        +'	이름<br>'
        +'	<input type="text" name="name"><br>'
        +'	주민번호<br>'
        +'	<input type="password" name="ssn"><br>'
        +'	전화번호<br>'
        +'	<input type="text" name="phone"><br><br>'
        +'	<input id="btn3" type="submit" value="확인">'
        +'	<input id="btn4" type="reset" value="취소">'
        +'</form>';
    
        var btn3 = document.querySelector('#btn3');
    
        btn3.addEventListener('click', function() {
            login_form();
        });
    };
    return {init : init};
})();
