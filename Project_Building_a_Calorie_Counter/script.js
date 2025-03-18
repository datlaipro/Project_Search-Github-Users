// project Start from the  3/2/2024
document.addEventListener("DOMContentLoaded", function () {
  const changes = document.getElementById("change");
  const reset = document.querySelector(".clear-btn");
  const ValueButton = document.getElementById("entry");
  const AddentryButton = document.getElementById("chon");
  const Calories_input = document.getElementById("budget");
  const Notification_dialog_box = document.querySelector("#notificationbox");
  const id1 = document.getElementById("1");
  const id2 = document.getElementById("2");
  const id3 = document.getElementById("3");
  const id4 = document.getElementById("4");
  const id5 = document.getElementById("5");
  const inputBreakfast = document.getElementById("breakfast");
  const inputLunch = document.getElementById("lunch");
  const inputDinner = document.getElementById("dinner");
  const inputSnacks = document.getElementById("snacks");
  const inputExercise = document.getElementById("exercise");
  const buttonCalculator = document.querySelector(".calculate-btn");
  var numberOfBreakfast = 0; // biến đếm số lần người dùng chọn vào nút chọn breakfast để tạo ra stt phù hợp cho hộp thoại nhập liệu
  var numberOfLunch = 0;// biến đếm số lần người dùng chọn vào nút chọn lunch để tạo ra stt phù hợp cho hộp thoại nhập liệu
  var numberOfDinner = 0;// biến đếm số lần người dùng chọn vào nút chọn dinner để tạo ra stt phù hợp cho hộp thoại nhập liệu
  var numberOfSnacks = 0;// biến đếm số lần người dùng chọn vào nút chọn snacks để tạo ra stt phù hợp cho hộp thoại nhập liệu
  var numberOfExercise = 0;// biến đếm số lần người dùng chọn vào nút chọn exercise để tạo ra stt phù hợp cho hộp thoại nhập liệu

  AddentryButton.onclick = function () { // xử lí gọi ra hộp thoại nhập liệu của breakfast 
    numberOfBreakfast++;
    CreatElementOfselect(id1, numberOfBreakfast, "typeOfConsumptionCalories");// các đối số gồm thẻ html cần tạo ô nhập liệu,
    //  số thứ tự của hộp thoại nhập liệu, mã nhận biết của ô nhập liệu,đặt id cho các ô nhập liệu mới được tạo ra 
    inputBreakfast.classList.add("hidden");// làm ẩn đi thẻ input ban đầu để phù hợp với yêu cầu của bài toán

    Calculate_the_total_calories()// hàm tính tổng calories mà người dùng nhập vào các ô nhập liệu hiện kết quả ra cho người dùng


  }
  ValueButton.addEventListener("change", function () { // thuộc tính change có tác dụng ghi nhận hành vi khi người dùng chọn một trong các lựa chọn ở thẻ selected
    AddentryButton.onclick = function () {// khi người dùng thay đổi lựa chọn ô seclected thì chặn hành vi click vào nút chọn breakfast

    }

    if (ValueButton.value === "breakfast") {

      AddentryButton.onclick = function () {
        numberOfBreakfast++;
        CreatElementOfselect(id1, numberOfBreakfast, "typeOfConsumptionCalories");
        inputBreakfast.classList.add("hidden");

      }


    } else if (ValueButton.value === "lunch") {
      AddentryButton.onclick = function () {
        numberOfLunch++;
        CreatElementOfselect(id2, numberOfLunch, "typeOfConsumptionCalories");
        inputLunch.classList.add("hidden"); // sau khi hộp thoại nhập liệu được tạo ra thì ẩn đi hộp thoại chọn lựa ban đầu 
      }

    } else if (ValueButton.value === "dinner") {
      AddentryButton.onclick = function () {
        numberOfDinner++;
        CreatElementOfselect(id3, numberOfDinner, "typeOfConsumptionCalories");
        inputDinner.classList.add("hidden");
      }


    } else if (ValueButton.value === "snacks") {
      AddentryButton.onclick = function () {
        numberOfSnacks++;
        CreatElementOfselect(id4, numberOfSnacks, "typeOfConsumptionCalories");
        inputSnacks.classList.add("hidden");
      }



    } else if (ValueButton.value === "exercise") {
      AddentryButton.onclick = function () {
        numberOfExercise++;
        CreatElementOfselect(id5, numberOfExercise, "Burncalorie");
        inputExercise.classList.add("hidden");
      }

    }
    Calculate_the_total_calories();

  });


  function Calculate_the_total_calories() {// hàm tính tổng calories mà người dùng nhập vào các ô nhập liệu hiện kết quả ra cho người dùng

    buttonCalculator.onclick = function () {
      var totalCalories = 0; // khai báo biến cục bộ như thế này để mỗi khi thực hiện tính toán calo thì sẽ được tính lại từ đầu khi giá trị mà người dùng thay đổi
      var Contain_calorie_burning = 0;
      var Calories_of_user = Calories_input.value;
      if (Calories_of_user == "") {// nếu người dùng không nhập gì thì sẽ trả về chuỗi rỗng chứ không phải là null
        alert("bạn không được để trống ô Budget trên đầu ");
        return;
      } else {
        var inputCalories = document.querySelectorAll(".typeOfConsumptionCalories");
        // lấy giá trị của ô nhập liệu khi có nhiều ô nhập liệu 
        for (var i = 0; i < inputCalories.length; i++) {
          let values = inputCalories[i].value.split('\n'); // Tách các dòng
          for (let val of values) {
            totalCalories += parseInt(val) || 0;
            // Cộng từng giá trị sau khi ép kiểu
          }
        }

        var Burncalorie = document.querySelectorAll(".Burncalorie");
        // lấy giá trị của ô nhập liệu khi có nhiều ô nhập liệu 
        for (var j = 0; j < Burncalorie.length; j++) {
          let valuess = Burncalorie[j].value.split('\n'); // Tách các dòng
          for (let vali of valuess) {
            Contain_calorie_burning += parseInt(vali) || 0; //
            // Cộng từng giá trị sau khi ép kiểu
          }

        }
        tam = (totalCalories - Contain_calorie_burning); // lượng calo còn lại sau khi tập exercise


        // tính toán lượng calo sau khi hấp thụ và tiêu thụ 
        if (Calories_of_user - tam < 0) { // nếu kết quả bị âm thì bỏ dấu - phía trước để phù hợp yêu cầu bài toán 
          totalCaloriesConsumed = Calories_of_user - tam;
          totalCaloriesConsumed = Math.abs(totalCaloriesConsumed); // Gán lại giá trị
          Notification_dialog_box.innerHTML = `<div style="
  border: 1px solid white; 
  padding: 20px; 
  text-align: center; 
  width: 550px; 
  background-color: #111125; 
  color: white; 
  font-family: Arial, sans-serif; 
  margin-top: 20px; /* Tự động đẩy xuống khi có nội dung phía trên */
  margin-left: 470px; /*
  position: relative;
">    <h2 style="color:rgb(217, 0, 0); margin-bottom: 10px; " >${totalCaloriesConsumed} Calorie Deficit</h2>
          <div style="border-top: 1px solid white; margin: 10px 0;"></div>
          <p>${Calories_of_user} Calories Budgeted</p>
          <p>${totalCalories} Calories Consumed</p>
          <p>${Contain_calorie_burning} Calories Burned</p>
        </div>`;
        } else {
          totalCaloriesConsumed = Calories_of_user - tam;
          Notification_dialog_box.innerHTML = `<div style="
  border: 1px solid white; 
  padding: 20px; 
  text-align: center; 
  width: 550px; 
  background-color: #111125; 
  color: white; 
  font-family: Arial, sans-serif; 
  margin-top: 20px; /* Tự động đẩy xuống khi có nội dung phía trên */
  margin-left: 470px; /*
  position: relative;
">    <h2 style="color:rgb(116, 217, 0); margin-bottom: 10px; " >${totalCaloriesConsumed} Calorie Surplus</h2>
          <div style="border-top: 1px solid white; margin: 10px 0;"></div>
          <p>${Calories_of_user} Calories Budgeted</p>
          <p>${totalCalories} Calories Consumed</p>
          <p>${Contain_calorie_burning} Calories Burned</p>
        </div>`;
        }


      }
    }
  }
  reset.onclick = function () {
    var elements = document.querySelectorAll(".needtobedeleted");
    console.log(elements);

    for (var i = 0; i < elements.length; i++) {
      elements[i].parentNode.removeChild(elements[i]);
    }
    inputBreakfast.classList.remove("hidden"); // xóa đi thuộc tính class để làm hiện ra hộp thoại như ban đầu 
    inputLunch.classList.remove("hidden");
    inputDinner.classList.remove("hidden");
    inputSnacks.classList.remove("hidden");
    inputExercise.classList.remove("hidden");
    Calories_input.value="";// đặt lại giá trị ở ô Budget về như ban đầu
    
    Notification_dialog_box.innerHTML = "";

  }


  function CreatElementOfselect(id, numerical_order_box_input, Class_of_calories) { // hàm sử lí việc tạo ra hộp thoại nhập liệu 

    id.insertAdjacentHTML('beforeend', `
      <div style="background-color:#111128;padding:21px;border:2px solid #fff;border-radius:8px;width:581px;color:#fff;" class="needtobedeleted">
        <div style="margin-bottom:15px;">
          <label for="entry-name" style="display:block;font-size:16px;margin-bottom:5px; ">Entry ${numerical_order_box_input} Name</label>
          <input type="text" id="entry-name" placeholder="Name" style="width:100%;padding:8px;font-size:16px;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;color:#111;">
        </div>
        <div>
          <label for="entry-calories" style="display:block;font-size:16px;margin-bottom:5px;">Entry ${numerical_order_box_input} Calories</label>
          <input type="number" class=${Class_of_calories} placeholder="Calories" style="width:100%;padding:8px;font-size:16px;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;color:#111;">
        </div>
      </div>
    `) // đây là phương thức thêm một thẻ html mới vào sau đít thẻ html hiện tại
  }






});

