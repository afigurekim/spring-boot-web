var app = {
    $wrapper: $wrapper = document.querySelector('#wrapper'),
    init: init
};
var customer = {
    mypage: mypage,
    login_form: login_form,
    join: join,
    join_form: join_form,
    count: count
};
function init() {
    $wrapper.innerHTML = customer.login_form();
    document.querySelector("#login_btn").addEventListener('click', () => {
        alert('로그인 버튼 클릭');
        id = document.getElementById('customerId').value;
        pass = document.getElementById('password').value;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'customers/' + id + '/' + pass, true);
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8;');
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.responseText) {
                    $wrapper.innerHTML = customer.mypage();
                } else {
                    alert('로그인 실패');
                    $wrapper.innerHTML = customer.login_form();
                }
            }
        };
        xhr.send();
    });
    document.querySelector('#join_btn').addEventListener('click', () => {
        $wrapper.innerHTML = customer.join_form();
        document.querySelector('#ok_btn').addEventListener('click', () => {
            alert('가입 버튼 클릭');
            customer.join();
        });
    });
}
function count() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'customers/count', true);
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert('성공');
            document.querySelector('#wrapper').innerHTML = '총 고객수 : <h1>' + xhr.responseText + '</h1>';
        }
    }
    xhr.send();
}
function mypage() {
    return '<h1>마이페이지</h1>';
}
function login_form() {
    return '<form>'
        + '  First name:<br>'
        + '  <input type="text" id="customerId" name="customerId">'
        + '  <br>'
        + '  Last name:<br>'
        + '  <input type="text" id="password" name="password">'
        + '  <br><br>'
        + '  <input id="login_btn" type="button" value="로그인">'
        + '  <input id="join_btn" type="button" value="회원가입">'
        + '</form> ';
}
function join() {
    let xhr = new XMLHttpRequest();
    let data = {
        customerId: document.getElementById('customerId').value,
        customerName: document.getElementById('customerName').value,
        password: document.getElementById('password').value,
        ssn: document.getElementById('ssn').value,
        phone: document.getElementById('phone').value,
        city: document.getElementById('city').value,
        address: document.getElementById('address').value,
        postalcode: document.getElementById('postalcode').value
    };
    xhr.open('POST', 'customers', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8;');
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let d = JSON.parse(xhr.responseText);
            if(d.result === 'SUCCESS'){
                alert('회원가입 성공 : ' + d.result);
                app.init();
            }else{
                alert('회원가입 실패');
            }
        } else {
            alert('AJAX 실패');
        }
    }
    xhr.send(JSON.stringify(data));
}
function join_form() {
    return '<form>'
        + '	ID<br>'
        + '	<input type="text" id="customerId" name="customerId"><br>'
        + '	PW<br>'
        + '	<input type="password" id="password" name="password"><br>'
        + '	이름<br>'
        + '	<input type="text" id="customerName" name="customerName"><br>'
        + '	주민번호<br>'
        + '	<input type="text" id="ssn" name="ssn"><br>'
        + '	전화번호<br>'
        + '	<input type="text" id="phone" name="phone"><br>'
        + '	도시<br>'
        + '	<input type="text" id="city" name="city"><br>'
        + '	주소<br>'
        + '	<input type="text" id="address" name="address"><br>'
        + '	우편번호<br>'
        + '	<input type="text" id="postalcode" name="postalcode"><br>'
        + '	<br>'
        + '	<input id="ok_btn" type="button" value="확인">'
        + '	<input id="reset_btn" type="reset" value="취소">'
        + '</form>';
}