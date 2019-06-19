var app = {
    $wrapper: $wrapper = document.querySelector('#wrapper'),
    init: init
};
var customer = {
    join_form: join_form,
    join: join,
    login_form: login_form,
    login: login,
    mypage_form: mypage_form,
    mypage: mypage,
    count: count,
    update: update,
    remove: remove
};
function init() {
    $wrapper.innerHTML = customer.login_form();
    document.querySelector("#login_btn")
        .addEventListener('click', () => {
            customer.login();
    });
    document.querySelector('#join_btn')
        .addEventListener('click', () => {
            $wrapper.innerHTML = customer.join_form();
            document.querySelector('#ok_btn')
                .addEventListener('click', () => {
                    customer.join();
            });
    });
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
                customer.login();
            }else{
                alert('회원가입 실패');
            }
        } else {
            alert('AJAX 실패');
        }
    }
    xhr.send(JSON.stringify(data));
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
function login() {
    id = document.getElementById('customerId').value;
    pass = document.getElementById('password').value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'customers/' + id + '/' + pass, true);
    xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8;');
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let d = JSON.parse(xhr.responseText);
            if (xhr.responseText) {
                $wrapper.innerHTML = customer.mypage(d);
                document.querySelector("#update_btn")
                        .addEventListener('click', () => {
                            $wrapper.innerHTML = customer.mypage_form(d);
                            document.querySelector("#put_btn")
                                    .addEventListener('click', () => {
                                        customer.update();
                            });
                            document.querySelector("#put_back_btn")
                                    .addEventListener('click', () => {
                                        $wrapper.innerHTML = customer.mypage(d);
                            });
                        });
                document.querySelector("#delete_btn")
                        .addEventListener('click', () => {
                            remove(d);
                        });
            } else {
                $wrapper.innerHTML = customer.login_form();
            }
        }
    };
    xhr.send();
}
function mypage_form(x) {
    let temp = x;
    return '<h1>마이페이지</h1>'
        + ' <form>'
        + '	<h4>ID</h4>'
        + '	<span>'+temp.customerId+'</span><input type="hidden" id="customerId" name="customerId" value="'+temp.customerId+'"><br>'
        + '	<h4>PW</h4>'
        + '	<input type="text" id="password" name="password" value="'+temp.password+'"><br>'
        + '	<h4>이름</h4>'
        + '	<input type="text" id="customerName" name="customerName" value="'+temp.customerName+'"><br>'
        + '	<h4>주민번호</h4>'
        + '	<span>'+temp.ssn+'</span><input type="hidden" id="ssn" name="ssn" value="'+temp.ssn+'"><br>'
        + '	<h4>전화번호</h4>'
        + '	<input type="text" id="phone" name="phone" value="'+temp.phone+'"><br>'
        + '	<h4>도시</h4>'
        + '	<input type="text" id="city" name="city" value="'+temp.city+'"><br>'
        + '	<h4>주소</h4>'
        + '	<input type="text" id="address" name="address" value="'+temp.address+'"><br>'
        + '	<h4>우편번호</h4>'
        + '	<input type="text" id="postalcode" name="postalcode" value="'+temp.postalcode+'"><br>'
        + '	<br>'
        + '	<input id="put_btn" type="button" value="수정 완료">'
        + ' <input id="put_back_btn" type="button" value="취소">'
        + '</form>';
}
function mypage(x) {
    let temp = x;
    return '<h1>마이페이지</h1>'
            + ' <form>'
            + '	<h4>ID</h4>'
            + '	<span>'+temp.customerId+'</span><input type="hidden" id="customerId" name="customerId" value="'+temp.customerId+'"><br>'
            + '	<h4>PW</h4>'
            + '	<span>'+temp.password+'</span><br>'
            + '	<h4>이름</h4>'
            + '	<span>'+temp.customerName+'</span><br>'
            + '	<h4>주민번호</h4>'
            + '	<span>'+temp.ssn+'</span><br>'
            + '	<h4>전화번호</h4>'
            + '	<span>'+temp.phone+'</span><br>'
            + '	<h4>도시</h4>'
            + '	<span>'+temp.city+'</span><br>'
            + '	<h4>주소</h4>'
            + '	<span>'+temp.address+'</span><br>'
            + '	<h4>우편번호</h4>'
            + '	<span>'+temp.postalcode+'</span><br>'
            + '	<br>'
            + '	<input id="update_btn" type="button" value="수정">'
            + '	<input id="delete_btn" type="button" value="삭제">'
            + '</form>';
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
function update(){
    let customerId = document.getElementById('customerId').value;
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
    xhr.open('PUT', 'customers/'+customerId, true);
    xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8;');
    xhr.onload = ()=> {
        if(xhr.readyState === 4 && xhr.status === 200){
            let d = JSON.parse(xhr.responseText);
            if(d.result === 'SUCCESS'){
                $wrapper.innerHTML = customer.login();
            }else{
                
            }
        }else{
            
        }
    };
    xhr.send(JSON.stringify(data));
}
function remove(x){
    let temp = x;
    let customerId = temp.customerId;
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'customers/'+customerId, true);
    xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8;');
    xhr.onload = ()=> {
        if(xhr.readyState === 4 && xhr.status === 200){
            let d = JSON.parse(xhr.responseText);
            if(d.result === 'SUCCESS'){
                alert(customerId+' 계정 삭제 완료');
                app.init();
            }else{
                
            }
        }else{
            
        }
    };
    xhr.send(JSON.stringify(temp));
}