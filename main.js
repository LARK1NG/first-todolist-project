'use strict';   // strict 모드 사용

let itemList = [];                                          // itemList라는 배열 선언
let inputbutton = document.querySelector(".input__button"); // input__button 클래스 불러오기
inputbutton.addEventListener("click", addItem);             // Click 이벤트 발생 시, addItem 함수 실행

/*  strict = JavaScript의 함정을 발견하여 오류로 통지해주는 구조
    let = 변수 선언
    const = 상수 선언
    document.querySelector = id나 class, 여러가지 선택자를 불러오는 기능
    addEventLIstener(이벤트이름, 콜백함수) = 어떠한 이벤트가 발생하였을 때, 함수를 불러오는 기능*/

function addItem() {                                    // addItem이라는 콜백함수 선언
    let item = document.querySelector(".item").value;   // item 클래스에 입력된 값을 불러오기
    if (item != null) {                                 // item이 null이 아닐 때
        itemList.push(item);                            // itemList에 push
        document.querySelector(".item").value = " ";    // push 후 item 클래스의 값을 제거
        document.querySelector(".item").focus();        // 제거 후 item 클래스에 포커싱
    }

    showList();                                         // showList() 실행

}

/*  function = 함수를 선언
    value = 값
    push = 보내는 기능
 */

function showList() {       // showList() 함수 선언
    let list = "<ul>"   
    for (let i = 0; i <itemList.length; i++) {
        list += "<li>" + itemList[i] + "<span class='close' id=" + i + ">" + "\u00D7" + "</span></li>";
    }                       // close 클래스에 <li> 형태의 요소 생성과 x표 생성
    list += "</ul>";        // for문을 통해 배열에 들어오는 요소 <ul>형태로 list 변수에 담기
    document.querySelector(".item__list").innerHTML = list;     // innerHTML 속성으로 item__list 클래스에 list 변수 담기

    let deleteButtons = document.querySelectorAll(".close");    // querySelectorAll로 클래스가 close인 모든 element를 가져오기                                                                
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteItem); // click시 deleteItem 함수 실행
    }
}

/*  \u00D7 = X를 뜻하는 유니코드
    innerHTML = element에 포함된 HTML 또는 XML 마크업을 가져오거나 설정
 */
    
function deleteItem() {     // deleteItem() 함수 선언
    let id = this.getAttribute("id");   // id 속성 부여 및 가져오기
    itemList.splice(id, 1);             // itemList에서 부여된 id부터 1까지 제거
    showList();                         // showList() 실행
}

/*  Attribute = 속성
    getAttribute = 속성을 가져오는, 접근하는 함수
    splice = 배열에서 특정항목을 제거
 */

let checkList = document.querySelector('.item__list');  // item__list 클래스 불러오기
checkList.addEventListener('click', event => {          
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked');
  }                                                     // click 시 checked가 존재한다면 제거, 존재하지 않다면 추가
});