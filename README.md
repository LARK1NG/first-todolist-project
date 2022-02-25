# JavaScript로 To do list 만들기

![image description](https://blog.kakaocdn.net/dn/14xky/btrt83OZaBi/a4XRcZuIK88ProXI7NRpdk/img.gif)

</br>

제가 만들어 본 **to do list 프로젝트**를 사용하는 모습입니다.

</br>

> 제가 만든 to do list 웹으로 **[이동](https://hs-todo-list.netlify.app/)** 해보세요.

</br>

___
## 구현하고 싶은 기능
</br>

1. 입력창에 할 일을 입력하고 **+버튼**이나 **Enter키**를 누르면 리스트에 할 일이 **생성**.
2. 마친 할 일을 클릭 시 **체크 표시**, 다시 클릭 시 **체크 해제**.
3. 할 일 옆에 있는 **X**를 누르면 할 일 **삭제**.
4. 할 일을 입력 안하고 +버튼이나 Enter키를 누르면 **"할 일을 입력해주십시오."** 라는 **경고 실행**.

</br>

___
## 구현 방법
</br>

### HTML

</br>

``` HTML
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>To Do List</title>
        <script src="https://kit.fontawesome.com/98f8ca3915.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="style.css">
    </head>
```

</br>

우선 기본 HTML 골격에다가 **`<head>`** 태그에 **`<link rel="stylesheet" href="style.css">`** 를 넣어주면서 css를 따로 빼주었습니다.

</br>

``` HTML
 <body>
        <div id = "todolist">   <!--전체적인 id-->
            <div class = "main_title">  <!--대제목-->
                <h1>To DO List</h1>
            </div>

            <div class = "input__section"> <!--할 일 적은 것을 받을 인풋 클래스-->
                <form onsubmit="return false;"> <!--엔터 누를 시 새로고침 방지-->
                    <div>
                        <input type="text" class="item" autofocus="true">
                    </div>
                    <div>
                        <button type="button" class="input__button"><i class="fas fa-plus-circle"></i></button>
                    </div>
                </form>
            </div>

            <div class="item__list"></div> <!--인풋 받은 할 일들을 리스트로 표시해줄 클래스-->

        </div>
        <script src="main.js" defer></script>
    </body>
</html>

<!--autofocus = 웹 접속 시 해당 부분으로 포커싱한다-->
```

</br>

그리고 `<body>` 부분에는 **`todoList` wrapper**로 전체를 감싸주었습니다. 그리고 할 일을 입력하는 부분을 `input__section`으로 지정해주었고, 할 일을 표시해주는 리스트를 `item__list`로 지정해주었습니다. 또 `<form>` 태그에 **`onsubmit="return false;"`** 를 주어 **Enter키**를 누를 때 웹이 리프레쉬 되는 현상을 방지해주었고, **fontawesome**을 통해 **+버튼**을 예쁜 서클 모양으로 구현해주었습니다.
그리고 `<script src="main.js" defer></script>`로 자바스크립트를 연결해주었습니다.

</br>

### JavaScript

</br>

``` js
'use strict';   // strict(JavaScript의 함정을 발견하여 오류로 통지해주는 구조) 모드 사용

let itemList = [];                                          // itemList라는 배열 선언
let inputbutton = document.querySelector(".input__button"); // input__button 클래스 불러오기
let input = document.querySelector(".item")                 // item 클래스 불러오기
inputbutton.addEventListener("click", addItem);             // Click 이벤트 발생 시, addItem 함수 실행
input.addEventListener("keypress", (e) => {                 // enter키가 눌리는 이벤트 발생 시, addItem 함수 실행
    if (e.key === 'Enter') {
        addItem();
    }
});

/*  strict = JavaScript의 함정을 발견하여 오류로 통지해주는 구조
    let = 변수 선언
    const = 상수 선언
    document.querySelector = id나 class, 여러가지 선택자를 불러오는 기능
    addEventLIstener(이벤트이름, 콜백함수) = 어떠한 이벤트가 발생하였을 때, 함수를 불러오는 기능*/

```

</br>

`let`을 통해 `itemList`를 선언해주었고, **`document.querySelector`**를 사용하여 **`input__button`**과 **`item`**의 값을 불러오는 함수도 **선언**하여, **`addEventListener`** 로 **`Click`** 과 **`Enter키 keypress`** 이벤트가 발생 시 **`addItem()`**이 **실행**되도록 구현해주었습니다.

</br>

``` js
function addItem() {                                        // addItem이라는 콜백함수 선언
    const item = document.querySelector(".item").value;     // item 클래스에 입력된 값을 불러오기
    if (item === "") {                                      // item이 ""이면
        alert("할 일을 입력해주십시오.");                    // alert 실행
        return;
    }

    itemList.push(item);                            // itemList에 push
    document.querySelector(".item").value = "";     // push 후 item 클래스의 값을 제거
    document.querySelector(".item").focus();        // 제거 후 item 클래스에 포커싱
    showList();                                     // showList() 실행
}


/*  function = 함수를 선언
    value = 값
    push = 보내는 기능
 */

```

</br>

**`addItem()`** 을 선언해주었고, **`document.querySelector`** 를 사용해 item클래스의 value 값을 불러왔습니다. 그리고 **`console.log(item);`** 을 사용하여 item클래스의 value 값을 봐보니 **빈 문자열("")** 이 출력되었습니다. 그래서 `if(item === "")`일 때 `alert("할 일을 입력해주십시오".)`가 **출력**되도록 해주었습니다. 그리고 return을 해주어 value 값이 있을 때에는 `ItemList`에 value 값을 **push** 후 input을 빈 문자열("")을 주어 **초기화** 해주고, **포커싱**을 input으로 해주었습니다.

</br>

``` js
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
```

</br>

그리고 **`showList()`** 함수에는 input의 value 값을 받은 `itemList`를 for문을 활용하여 리스트에 `<li>` 형태로 보여지도록 구현해줬습니다. 그리고 `close` 클래스에 **순서대로 저장**되고, x의 유니코드인 `"\u00D7"`을 주어 리스트에 x가 같이 보여지도록 해줬습니다.

또 deletebuttons 라는 함수를 생성하여 `close` 클래스에 있는 모듣 element를 가져오고, for문을 통해 **"Click"** 시 `deletaItem` 함수가 실행되도록 구현해줬습니다.

</br>

``` js
function deleteItem() {                         // deleteItem() 함수 선언
    let id = this.getAttribute("id");           // id 속성 부여 및 가져오기
    itemList.splice(id, 1);                     // itemList에서 부여된 id부터 1까지 제거
    document.querySelector(".item").focus();    // input에 포커싱
    showList();                                 // showList() 실행
}

/*  Attribute = 속성
    getAttribute = 속성을 가져오는, 접근하는 함수
    splice = 배열에서 특정항목을 제거
 */
```

</br>

`deleteItem()` 함수는 close 클래스에 준 id 값을 불러와 `splice`를 통해 리스트에서 **제거**되게 구현을 해줬고, 제거한 후에는 다시 input에 포커싱이 되도록 해주었습니다.

</br>

``` js
let checkList = document.querySelector('.item__list');  // item__list 클래스 불러오기
checkList.addEventListener('click', event => {          
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked');
  }                                                     // click 시 checked가 존재한다면 제거, 존재하지 않다면 추가
});
```

그리고 `checkList` 함수는 `itme__list` 클래스를 볼러와서 리스트에 `<li>` 형태의 값들을 **'click'** 시 'checked'를 주고, 'checked'상태인 값들은 해제해주는 것으로 할 일 체크를 구현해줬습니다.

</br>

### CSS

``` css
@import url('https://fonts.googleapis.com/css2?family=Hi+Melody&display=swap');

body {
    background: linear-gradient(90deg, #02aab0, #00cdac);
    font-family: 'Hi Melody', cursive;
    margin-left: 0px;
    margin-right: 0px;
    caret-color: #02aab0;
}
```

우선 구글 폰트에서 예쁜 폰트를 가져와서 바꿔주었고, `<body>`에 그라데이션으로 백그라운드 컬러를 주었고, 입력창에 깜빡거리는 커서도 배경색에 맞춰 컬러를 바꿔주었습니다.

</br>

``` css
#todolist {
    text-align: center;
}

.main_title {
    color: white;
    margin: 30px;
}

.input__section form {
    display: inline-flex;
    align-items: center;
}

.item {
    width: 300px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid #fbe7c6;
    padding: 0 30px;
}

*:focus {
    outline: none;
}

.input__button {
    background-color: transparent;
    font-size: 30px;
    line-height: 60px;
    margin-left: 10px;
    color: white;
    border: 0;
    padding-top: 5px;
}

ul {
    margin: 0px;
    padding: 0px;
    list-style: none;
}

ul li {
    cursor: pointer;
    position: relative;
    padding: 12px 8px 12px 8px;
    background: #eee;
    font-size: 18px;
    transition: 0.3s;
}

ul li:hover {
    background: #ddd;
}

.close {
    position: absolute;
    right: 20px;
    top: 0px;
    align-items: center;
    text-align: center;
    margin: 8px 60px;
    padding: 4px 10px;
    border: none;
}

.close:hover {
    background: linear-gradient(90deg, #02aab0, #00cdac);
    border-radius: 100%;
    color: white;
}
```

그리고 웬만하면 가운데로 예쁘게 정렬을 해주었고, 그리고 focus를 `ouline: none;`을 주어 클릭 했을 때 테두리가 생기는 것을 방지해주었습니다.

</br>

``` css
ul li.checked {
    background: #ddd;
    color: #272341;
    text-decoration: line-through;
}

ul li.checked::before {
    content: "";
    position: absolute;
    border-color: #272341;
    border-style: solid;
    border-width: 0 2px 2px 0;
    top: 13px;
    left: 90px;
    transform: rotate(45deg);
    height: 15px;
    width: 7px;
}
```

그리고 할 일 체크는 `text-decoration: line-through;`로 'checked'가 되면 가운데에 줄이 그어지도록 해주었고, 'checked'가 되면 직사각형을 자르고 기울여서 ✓가 되어서 출력되도록 구현해주었습니다.

``` css
@media screen and (max-width: 768px) {
    body {
        margin: 0;
    }

    #todolist {
        max-width: 100%;
    }

    .input__section form {
        display: inline-flex;
        align-items: center;
    }

    .item {
        width: 200px;
        height: 30px;
        border-radius: 15px;
        border: 1px solid #fbe7c6;
        padding: 0px 30px;
    }

    .close {
        position: absolute;
        right: 20px;
        top: 0px;
        align-items: center;
        text-align: center;
        margin: 8px 15px;
        padding: 4px 8px;
        border: none;
    }
}
```

그리고 모바일 환경을 생각하여 768px가 최대인 상황을 구현해주었습니다.

</br>

> 이상 저의 To do list 프로젝트를 마치겠습니다. 읽어주셔서 감사합니다.