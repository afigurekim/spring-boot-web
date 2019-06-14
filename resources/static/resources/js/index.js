var app = (() => {
    let init = () => {
        login_form();
    }
    let login_form = () => {
        let wrapper = document.querySelector('#wrapper');
        wrapper.innerHTML = '<form>'
        +'  First name:<br>'
        +'  <input type="text" name="firstname" value="Mickey">'
        +'  <br>'
        +'  Last name:<br>'
        +'  <input type="text" name="lastname" value="Mouse">'
        +'  <br><br>'
        +'  <input id="login_btn" type="button" value="로그인">'
        +'  <input id="join_btn" type="button" value="회원가입">'
        +'</form> ';
        document.querySelector("#login_btn").addEventListener('click', () => {
            alert('로그인 버튼 클릭');
            count();
        });
        let join_btn = document.querySelector('#join_btn');
        join_btn.addEventListener('click', () => {
            join_form();
        });
    }

    let count = () => {
        let xhr = new XMLHttpRequest();
        method = 'GET';
        url = 'count';
        xhr.open(method, url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4 && xhr.status === 200){
                alert('성공');
                let wrapper = document.querySelector('#wrapper');
                wrapper.innerHTML = '총 고객수 : <h1>'+xhr.responseText+'</h1>';
            }
        }
        xhr.send();
    }

    let join_form = () => {
        let wrapper = document.querySelector('#wrapper');
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
        +'	<input id="ok_btn" type="button" value="확인">'
        +'	<input id="reset_btn" type="reset" value="취소">'
        +'</form>';
        let ok_btn = document.querySelector('#ok_btn');
        ok_btn.addEventListener('click', () => {
            login_form();
        });
    };
    return {init : init};
})();
