const openTask = document.getElementById("open-task-form-btn");
const boxForm = document.getElementById("task-form");

const inputTitle = document.getElementById("title-input");// phải lấy thẻ html trong này nếu không sẽ lấy value==""
const descriptionInput = document.getElementById("description-input");
const updateTask = document.getElementById("add-or-update-task-btn");
const resultTask = document.getElementById("tasks-container");
const dateInput = document.getElementById("date-input");
openTask.onclick = function () {// hàm sử lí mở ra hộp thoại add new task

    boxForm.classList.remove("hidden");

    const buttonCancel = document.getElementById("close-task-form-btn");
    buttonCancel.onclick = function () {
        boxForm.classList.add("hidden");
    }


}



updateTask.onclick = function (event) {//hàm sử lí việc thêm task mới 



    boxForm.classList.add("hidden");

    const obj = {
        Title: inputTitle.value,
        valueInput: descriptionInput.value,
        Date: dateInput.value
    };

    localStorage.setItem(inputTitle.value, JSON.stringify(obj));
    const storedTask = JSON.parse(localStorage.getItem(inputTitle.value));

    resultTask.insertAdjacentHTML("beforeend",
        `<div>
            <p><b>Title: </b> ${storedTask.Title}</p>
            <p><b>Description: </b> ${storedTask.valueInput}</p>
            <p><b>Date: </b> ${storedTask.Date}</p>
            <button onclick="deleteTask(this)">Delete</button>
            <button onclick="editTask(this)">Edit</button>
        </div>`
    );


    event.preventDefault();
}

function editTask(button) {
    var tam = button.parentNode;
    boxForm.classList.remove("hidden");
    const buttonCancel = document.getElementById("close-task-form-btn");
    buttonCancel.onclick = function () {
        boxForm.classList.add("hidden");
    }
    updateTask.innerText = "updateTask";
    updateTask.onclick = function (event) {

        boxForm.classList.add("hidden");

        const obj = {
            Title: inputTitle.value,
            valueInput: descriptionInput.value,
            Date: dateInput.value
        };

        localStorage.setItem(inputTitle.value, JSON.stringify(obj));
        const storedTask = JSON.parse(localStorage.getItem(inputTitle.value));

        tam.innerHTML =
            `<div>
            <p><b>Title: </b> ${storedTask.Title}</p>
            <p><b>Description: </b> ${storedTask.valueInput}</p>
            <p><b>Date: </b> ${storedTask.Date}</p>
            <button onclick="deleteTask(this)">Delete</button>
            <button onclick="editTask(this)">Edit</button>
        </div>`


        event.preventDefault();
    }

}


function deleteTask(button) {
    const taskDiv = button.parentNode;
    const title = taskDiv.querySelector("p b").nextSibling.textContent.trim();//Tìm phần tử <b>Title:</b> trong <p>Title: ...</p>.
    //Lấy nội dung văn bản sau <b> (chính là tiêu đề của task).

    taskDiv.remove();
    localStorage.removeItem(title);
}
