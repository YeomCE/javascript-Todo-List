// 유저가 값을 입력한다.
// + 버튼 클릭 시 할 일이 추가된다.
// check  버튼 클릭 시 할 일이 끝나며 취소선이 생긴다.
//   1. false -> true 변환
//     true  : 끝난 것으로 간주하여 취소선

// delete 버튼 클릭 시 할 일이 삭제된다.
// 진행중 또는 완료 탭을 클릭 시 언더바가 이동한다.
// 진행중 또는 완료 탭을 클릭 시 해당 탭에 해당하는 내용만 출력한다.
// All 탭을 클릭 시 다시 전체 아이템으로 돌아온다.

let taskInput = document.getElementById("task-input");
let inputButton = document.querySelector(".input-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let selectedMenu = "all";
let filterList = [];
let underLineSelect = document.getElementById("under-line");


// + 버튼 클릭
inputButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
        filter(event)
    });
}

// 엔터 키 작동
taskInput.addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
})

// input에 focus 시 글자 초기화
taskInput.addEventListener("focus", function () {
    taskInput.value = "";
})



// + 버튼 클릭
function addTask() {
    let task = {
        id: random(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    filter();
}
// function addTask() {
//     let task = {
//         id: "",
//         taskContent: taskInput.value,
//         isComplete: false
//     }
//     taskList.push(task);
//     for (let i = 0; i < taskList.length; i++) { 
//         taskList[i].id = i;
//     }
//     console.log(taskList);
//     render();
// }


function render() {
    let list = [];
    if (selectedMenu == "all") {
        list = taskList;
    }
    else if (selectedMenu == "on-going" || selectedMenu == "done") {
        list = filterList;
    }

    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML +=
                `
            <div class="task task-bg-done">
                <div class = 'task-done'>${list[i].taskContent}</div>
                <div class = "icon">
                    <button onClick = "toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right" style="color: #7b7b7b;"></i></button>
                    <button onClick = "deleteButton('${list[i].id}')"><i class="fa-sharp fa-solid fa-trash" style="color: #ff0000;"></i></button>
                </div>
            </div>  
            `
        }
        else {
            resultHTML +=
                `
        <div class="task">
            <div>${list[i].taskContent}</div>
            <div class = "icon">
                <button onClick = "toggleComplete('${list[i].id}')"><i class="fa-solid fa-check" style="color: #20a730;"></i></button>
                <button onClick = "deleteButton('${list[i].id}')"><i class="fa-sharp fa-solid fa-trash" style="color: #ff0000;"></i></button>
            </div>
        </div>  
        `
        }
        console.log(list)

    }
    document.getElementById("task-board").innerHTML = resultHTML;
    taskInput.value = "";
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function deleteButton(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break
        }
    }
    filter();
}

function filter(event) {
    if (event) {
        selectedMenu = event.target.id;

        underLineSelect.style.width = event.target.offsetWidth + "px";
        underLineSelect.style.left = event.target.offsetLeft + "px";
    }

    filterList = []

    if (selectedMenu == "all") {
        render();
    }
    else if (selectedMenu == "on-going") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
    else if (selectedMenu == "done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function random() {
    return '_' + Math.random().toString(36).substr(2, 9)
}
