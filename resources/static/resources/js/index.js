var app = {
    $wrapper: $wrapper = document.getElementById('wrapper'),
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
    update_form: update_form,
    update: update,
    remove: remove
};
var employee = {
    login: login,
    customer_list_form: customer_list_form,
    customer_list: customer_list,
    admin_login: admin_login
};
var session = {
    set_value: set_value,
    get_value: get_value
}
//customerId, customerName, ssn, phone, city
function customer_list_form(){
    return '<h2>고객 목록</h2>'
    +'<table>'
    +'  <tr>'
    +'    <th>아이디</th>'
    +'    <th>고객명</th>'
    +'    <th>주민번호</th>'
    +'    <th>전화번호</th>'
    +'    <th>도시</th>'
    +'  </tr>'
    +'  <tbody id="tbody">'
    +'  </tbody>'
    +'</table>'
}
function set_value(x){
    sessionStorage.setItem(x.name, x.value);
}
function get_value(x){
    return sessionStorage.getItem(x);
}
function init() {
    $wrapper.innerHTML = customer.login_form();
    document.getElementById('login_btn')
        .addEventListener('click', () => {
            customer.login({userid : 'customerId',
                            domain : 'customers'
                            });
    });
    document.getElementById('join_btn')
        .addEventListener('click', () => {
            $wrapper.innerHTML = customer.join_form();
            document.getElementById('ok_btn')
                .addEventListener('click', () => {
                    customer.join();
            });
    });
    document.getElementById('admin_btn')
        .addEventListener('click', () => {
            employee.admin_login();
    });
}

function admin_login(){
    let isAdmin = confirm('관리자입니까?');
    if(isAdmin){
        let pass = prompt('관리자 번호를 입력하세요');
        if(pass == 1000){
            employee.customer_list('1');
        }else{
            alert('입력한 번호가 일치하지 않습니다.');
        }
    }else{
        alert('관리자만 접속이 가능합니다.');
    }
}
function create_customer_row(x){
    return '<tr><td>'+x.customerId+'</td><td>'+x.customerName+'</td><td>'
            +x.ssn+'</td><td>'+x.phone+'</td><td>'+x.city+'</td></tr>';
}
function customer_list(x){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'customers/page/'+x, true);
    xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8;');
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let d = JSON.parse(xhr.responseText);
            $wrapper.innerHTML = employee.customer_list_form();
            let tbody = document.getElementById('tbody');
            let i = 0;
            d.list.forEach((v, i) => {
                tbody.innerHTML += create_customer_row(v);
            });
            let blocks = document.createElement('div');
            blocks.setAttribute('id', 'blocks');
            wrapper.appendChild(blocks);
            let spans = document.createElement('div');
            i = (Math.ceil(x*1/5)-1)*5+1;
            let t = i+5;
            let tc = Math.ceil(d.pxy.totalCount*1/d.pxy.pageSize);
            if(tc<t){t=tc+1};
            for(;i<t;i++){
                let span = document.createElement('span');
                span.setAttribute('style', 'display:inline-block;padding-right:20px;border: 1px solid black;cursor:pointer');
                span.setAttribute('class', 'page-num');
                span.innerHTML = i;
                if(x == span.innerHTML){
                    span.style.backgroundColor = 'red';
                }
                spans.appendChild(span);
                
            }
            blocks.appendChild(spans);
            let clss = document.getElementsByClassName('page-num');
            i = 0;
            for(;i<clss.length;i++){
                (function(i){
                    clss[i].addEventListener('click',function(){
                        customer_list(this.innerText);
                    })
                })(i)
            }
            let p = (Math.ceil(x*1/5)-2)*5+1;
            let n = Math.ceil(x*1/5)*5+1;
            if(d.pxy.existPrev){
                let prevBlock = document.createElement('span');
                prevBlock.setAttribute('id', 'back-arrow');
                prevBlock.setAttribute('style','display:inline-block;padding-right:20px;border: 1px solid black;cursor:pointer');
                prevBlock.textContent="<";
                blocks.prepend(prevBlock);
                document.getElementById('back-arrow').addEventListener('click', () => {
                    customer_list(p);
                });
            }
            if(d.pxy.existNext){
                let nextBlock = document.createElement('span');
                nextBlock.setAttribute('id', 'forward-arrow');
                nextBlock.setAttribute('style','display:inline-block;padding-right:20px;border: 1px solid black;cursor:pointer');
                nextBlock.textContent=">";
                blocks.appendChild(nextBlock);
                document.getElementById('forward-arrow').addEventListener('click', () => {
                    customer_list(n);
                });
            }
        }
    };
    xhr.send();
}

function join_form() {
    return '<form>'
        + '	아이디<br>'
        + '	<input type="text" id="customerId" name="customerId"><br>'
        + '	비밀번호<br>'
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
        + '  아이디:<br>'
        + '  <input type="text" id="customerId" name="customerId">'
        + '  <br>'
        + '  비밀번호:<br>'
        + '  <input type="password" id="password" name="password">'
        + '  <br><br>'
        + '  <input id="login_btn" type="button" value="로그인">'
        + '  <input id="join_btn" type="button" value="회원가입">'
        + '  <input id="admin_btn" type="button" value="관리자">'
        + '</form> ';
}
function login(x) {
    id = document.getElementById(x.userid).value;
    pass = document.getElementById('password').value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', x.domain+'/' + id + '/' + pass, true);
    xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8;');
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let d = JSON.parse(xhr.responseText);
            if (xhr.responseText) {
                if(x.domain === 'customers'){
                    session.set_value({'name':'userid', 'value':d.customerId});
                    session.set_value({'name':'username', 'value':d.customerName});
                    customer.mypage(d);
                }else{
                    employee.customer_list();
                }
            } else {
                alert('ID/PW 확인해주세요');
                $wrapper.innerHTML = customer.login_form();
            }
        }
    };
    xhr.send();
}
function mypage_form(x) {
    let temp = x;
    return '<h1>마이페이지</h1>'
            + '	<h4>아이디</h4>'
            + '	<span id="customerId" name="customerId">'+temp.customerId+'</span><br>'
            + '	<h4>비밀번호</h4>'
            + '	<span id="password" name="password">'+temp.password+'</span><br>'
            + '	<h4>이름</h4>'
            + '	<span id="customerName" name="customerName">'+temp.customerName+'</span><br>'
            + '	<h4>주민번호</h4>'
            + '	<span id="ssn" name="ssn">'+temp.ssn+'</span><br>'
            + '	<h4>전화번호</h4>'
            + '	<span id="phone" name="phone">'+temp.phone+'</span><br>'
            + '	<h4>도시</h4>'
            + '	<span id="city" name="city">'+temp.city+'</span><br>'
            + '	<h4>주소</h4>'
            + '	<span id="address" name="address">'+temp.address+'</span><br>'
            + '	<h4>우편번호</h4>'
            + '	<span id="postalcode" name="postalcode">'+temp.postalcode+'</span><br>'
            + '	<br>'
            + '	<input id="update_btn" type="button" value="수정">'
            + '	<input id="delete_btn" type="button" value="탈퇴">';
}
function mypage(x) {
    let d = x;
    $wrapper.innerHTML = customer.mypage_form(d);
    document.getElementById('update_btn')
            .addEventListener('click', () => {
                alert('세션 테스트 ID : '+session.get_value('userid'));
                alert('세션 테스트 Name : '+session.get_value('username'));
                //customer.update(d);
    });
    document.getElementById('delete_btn')
            .addEventListener('click', () => {
                remove(d);
    });
}
function count() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'customers/count', true);
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert('성공');
            document.getElementById('wrapper').innerHTML = '총 고객수 : <h1>' + xhr.responseText + '</h1>';
        }
    }
    xhr.send();
}
function update_form(x){
    let temp = x;
    return '<h1>마이페이지</h1>'
        + ' <form>'
        + '	<h4>아이디</h4>'
        + '	<span id="customerId" name="customerId">'+temp.customerId+'</span><br>'
        + '	<h4>비밀번호</h4>'
        + '	<input type="text" id="password" name="password" value="'+temp.password+'"><br>'
        + '	<h4>이름</h4>'
        + '	<input type="text" id="customerName" name="customerName" value="'+temp.customerName+'"><br>'
        + '	<h4>주민번호</h4>'
        + '	<span id="ssn" name="ssn">'+temp.ssn+'</span><br>'
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
function update(x){
    let d = x;
    $wrapper.innerHTML = customer.update_form(d);
                document.getElementById('put_btn')
                        .addEventListener('click', () => {
                            let data = {
                                customerId: document.getElementById('customerId').innerText,
                                customerName: document.getElementById('customerName').value,
                                password: document.getElementById('password').value,
                                ssn: document.getElementById('ssn').innerText,
                                phone: document.getElementById('phone').value,
                                city: document.getElementById('city').value,
                                address: document.getElementById('address').value,
                                postalcode: document.getElementById('postalcode').value
                            };
                            let xhr = new XMLHttpRequest();
                            xhr.open('PUT', 'customers/'+data.customerId, true);
                            xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8;');
                            xhr.onload = ()=> {
                                if(xhr.readyState === 4 && xhr.status === 200){
                                    let d = JSON.parse(xhr.responseText);
                                    customer.mypage(d);
                                }
                            };
                            xhr.send(JSON.stringify(data));
                });
                document.getElementById('put_back_btn')
                        .addEventListener('click', () => {
                            $wrapper.innerHTML = customer.mypage(d);
                });
}
function remove(x){
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'customers/'+x.customerId, true);
    xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8;');
    xhr.onload = ()=> {
        if(xhr.readyState === 4 && xhr.status === 200){
            let d = JSON.parse(xhr.responseText);
            if(d.result === 'SUCCESS'){
                alert(customerId+'님의 탈퇴가 완료되었습니다');
                app.init();
            }
        }
    };
    xhr.send(JSON.stringify(x));
}