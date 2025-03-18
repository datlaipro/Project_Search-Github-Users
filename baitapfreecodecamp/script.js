document.addEventListener("DOMContentLoaded", function () {
  var cua_hang = document.getElementById("store");

  var text = document.getElementById("thong bao"); // tất cả chỗ này dùng để lấy các thẻ element rồi tương tác với chúng sau
  var vaohang = document.getElementById("chay");
  var acttack = document.getElementById("actack");

  var exp = document.getElementById("exp");
  var heal = document.getElementById("heal");
  var thongbao1 = document.getElementById("TB");
  var gold = document.getElementById("gold");
  var tam = 0;
  let Health = 100; // các biến này chứa giá trị của trò chơi ban đầu 
  var tam2 = 0;
  var XP = 0;
  let golds = 50;// dùng biến dạng mảng toàn cục để truyền tham chiếu (vì mảng trong js được truyền vào hàm theo kiểu tham chiếu )
  // chỉ số máu của  fanged beast
  var weapon = ["stick"];// mảng chứa vũ khí sau mỗi lần mua 
  var weapons = ["dagger", "claw hammer", "sword"];
  /*  khai báo biến tam và gold này thành biến toàn cục như thế này  vì  muốn chương trình tiếp tục xử lí giá trị chứ không muốn 
                   cập nhật giá trị lại từ đầu(dùng một lần rồi bỏ :))) */
  var weaponDagger = 10;//  chỉ số tấn công của vũ khí ban đầu
  var notication = "  You attack it with your " + weapon[weapon.length - 1];


  function Buy_gold_health() { // thao tác với các chức năng của nút go to store
    cua_hang.onclick = function () {
      cua_hang.innerText = 'Buy 10 health (10 gold) ';
      text.innerText = "You enter the store.";
      vaohang.innerText = " Buy weapon (30 gold)";
      acttack.innerText = " Go to town square";

      vaohang.onclick = function () {
        if (golds >= 30) { // nếu biến golds ở dưới(*) thỏa mãn điều kiện này thì lệnh sẽ chạy 
          // nếu độ dài mảng vũ khí(weapon.length <=3) thì mới cho mua vũ khí else không cho mua vũ khí nữa
          if (weapon.length < 4) {
            golds = golds - 30;
            tam2++;
            tam++;
            if (tam == 1) {// điều kiện này để chọn vũ khí mua
              weapon.push(weapons[0]);
              weaponDagger = 15;
            } else if (tam == 2) {
              weapon.push(weapons[1]);
              weaponDagger = 30;
            } else if (tam == 3) {
              weapon.push(weapons[2]);
              weaponDagger = 50;
            }
            text.innerText = `You now have a ${weapon[weapon.length - 1]}. In your inventory you have: ${weapon.join(", ")}`;

            gold.innerText = "Gold: " + golds;
          } else if (weapon.length > 1) {
            text.innerText = "You already have the most powerful weapon!";
            vaohang.innerText = " Sell weapon for 15 gold";

            vaohang.onclick = function () {// chức năng bán vũ khí 
              var sell_weapons = weapon.shift();

              golds += 15;
              gold.innerText = "Gold: " + golds;
              text.innerText = `You sold a ${sell_weapons} . In your inventory you have: ${weapon.join(", ")}`;
              if (weapon.length < 1) {//vì điều kiện này khiến mảng weapon bị rỗng nên mới cần gán lại ở dưới

                text.innerText = "Don't sell your only weapon!";
                weapon = ["sword"];
                vaohang.onclick = function () {// chặn không cho mã chạy lên :))
                };
              }
            }
          }
        } else {
          if (golds < 0) { // điều kiện này đảm bảo chỉ số không bị âm 

            gold.innerText = "Gold: " + 0;
            text.innerText = "You do not have enough gold to buy a weapon";
          } else {
            gold.innerText = "Gold: " + golds;
            text.innerText = "You do not have enough gold to buy a weapon";
          }
        }

      }
      cua_hang.onclick = function () { // hàm sử lý việc mua Health
        if (golds >= 10) { // nếu số vàng trên 10 vàng thì đủ tiền mua health
          golds = golds - 10; //(*)

          Health += 10;
          heal.innerText = 'Health: ' + Health;//sau khi mua health thì cập nhật giá trị health
          gold.innerText = "Gold: " + golds;

        } else if (golds < 10) {
          text.innerText = "You do not have enough gold to buy health."
        }
      }
      acttack.onclick = function () {
        xulyketthucluotchoi();
      }
    }
  }
  function xulyketthucluotchoi() {//hàm xử lí thao tác run/Go to town square/nút thứ 3 trong game

    cua_hang.innerText = "Go to store";
    vaohang.innerText = "Go to cave";
    acttack.innerText = "Fight dragon";
    thongbao1.innerText = "";
    text.innerText = "You are in the town square. You see a sign that says Store."
    Buy_gold_health();// hàm sử lí thao tác mua vàng
    Attack_Slime(); // hàm sử lí chức năng của nút bấm go to cave 
    AttackDragon();
  }
  Buy_gold_health();

  function xulyquaylaitrangchu() {
    cua_hang.innerText = "Go to store";
    vaohang.innerText = "Go to cave";
    acttack.innerText = "Fight dragon";
    thongbao1.innerText = "";
    text.innerText = "You are in the town square. You see a sign that says Store."
    Health = 100;// gán lại giá trị cho biến này để khi thua sẽ cập nhật giá trị lại từ đầu nếu không khi gọi các hàm ở bên dưới giá trị sẽ không được cập nhật lại khi thua
    golds = 50;
    heal.innerText = "Health: " + Health;
    gold.innerText = "Gold: " + golds;
    exp.innerText = "Exp: " + 0;
    Buy_gold_health();// hàm sử lí thao tác mua vàng
    Attack_Slime(); // hàm sử lí chức năng của nút bấm go to cave 
    AttackDragon();
  }


  function Attack_Slime() { // hàm này sử lý thao tác tấn công slime

    vaohang.onclick = function () {//thao tác nút bấm go to cave
      cua_hang.innerText = "Fight slime "
      vaohang.innerText = " Fight fanged beast "
      acttack.innerText = "Go to town square"
      text.innerText = "You enter the cave. You see some Slime."

      cua_hang.onclick = function () {// thao tác nút bấm Fight slime
        cua_hang.innerText = "Attack "
        vaohang.innerText = " Dodge"
        acttack.innerText = "Run"
        text.innerText = "You are fighting a monster."
        thongbao1.innerText = "Monster Name: slime Health: 15"
        vaohang.onclick = function () {
          text.innerText = "You dodge the attack from the slime"
        }
        Attack(2, 15, "The slime attacks", 2, 13, "slime Health: ");// hàm sử lí tấn công quái "Slime"
      }

      vaohang.onclick = function () {// nút sử lí tấn công quái "Fanged Beast"
        cua_hang.innerText = "Attack "
        vaohang.innerText = " Dodge"
        acttack.innerText = "Run"
        text.innerText = "You are fighting a monster."
        thongbao1.innerText = "Monster Name: fanged beast Health: 60"
        Attack(5, 60, "The fanged beast attacks", 8, 53, "fanged beast Health: ");// hàm sử lí tấn công quái "Fanged Beast"
        vaohang.onclick = function () {
          text.innerText = "You dodge the attack from the fanged beast"
        }
      }
      


      acttack.onclick = function () {
        xulyketthucluotchoi();//hàm xử lí nút bấm Go to town square ở trong phần go to cave 
      }
    }
    AttackDragon();

  }
  Attack_Slime();
  function generateRandomArray(size, min, max) { // hàm sinh số ngẫu nhiên để cho trò chơi somayman
    const result = [];
    for (let i = 0; i < size; i++) {
      result.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return result;
  }

  function somayman(params) {// hàm sử lí trò chơi ẩn 
    var mangrandom = generateRandomArray(10, 0, 10);

    var i = 0
    var tam1 = true;
    for (i; i < mangrandom.length; i++) {
      if (mangrandom[i] == params) {
        tam1 = false;

        break;
      }
    }
    if (Health >= 10) {


      if (tam1 == true) {
        Health -= 10;
        heal.innerText = "Health: " + Health;
        text.innerText =

          `You picked ${params}. Here are the random numbers:

      ${mangrandom.join('\n ')}
        \n
        "Wrong! You lose 10 health!"`
      } else {
        golds += 10;
        gold.innerText = "Gold: " + golds;
        text.innerText =

          `You picked ${params}. Here are the random numbers:

      ${mangrandom.join('\n ')}
        \n
          "You win! You receive 10 gold."`
      }
    } else if (Health < 10) {
      vaohang.innerText = "REPLAY?";
      cua_hang.innerText = "REPLAY?";
      acttack.innerText = "REPLAY?";
      text.innerText = "You die."
      Health = [100];// gán lại giá trị cho biến này để khi thua sẽ cập nhật giá trị lại từ đầu nếu không khi gọi các hàm ở bên dưới giá trị sẽ không được cập nhật lại khi thua
      golds = [50];
      heal.innerText = "Health: " + Health;
      gold.innerText = "Gold: " + golds;
      exp.innerText = "Exp: " + 0;
      Attack_Slime();
      Buy_gold_health();
      xulyketthucluotchoi();
      AttackDragon();
    }
  }

  function Attack(damage, HpMonters, monsterinformation, XpMonters, GoldMonsters, HPInformation) {


    cua_hang.onclick = function () {
      // hàm sử lí sự kiện tấn công/attack
      var random = Math.floor(Math.random() * 30);

      if (random < 20) {
        // điều kiện này để mỗi một lần ấn nút tấn công (attack) thì sẽ có tỉ lệ trúng/xịt

        var randomDagger = Math.floor(Math.random() * weaponDagger);
        Health -= randomDagger * damage;// lượng hp của người chơi sẽ giảm căn cứ theo loại vũ khí có trên người 

        HpMonters -= randomDagger;
        text.innerText = monsterinformation + notication;
      } else {
        text.innerText = monsterinformation + notication + " You missed!";

      }

      if (Health <= 0) {
        heal.innerText = "Health: " + 0;
        text.innerText = "You Die";
        vaohang.innerText = "REPLAY?";
        cua_hang.innerText = "REPLAY?";
        acttack.innerText = "REPLAY?";
        cua_hang.onclick = function () {
          xulyquaylaitrangchu();
        };
        vaohang.onclick = function () {
          xulyquaylaitrangchu();
        };
        acttack.onclick = function () {
          xulyquaylaitrangchu();
        };
      } else {
        heal.innerText = "Health: " + Health;
      }

      if (HpMonters <= 0) {``
        text.innerText =
          "The monster screams 'Arg!' as it dies. You gain experience points and find gold.";
        XP += XpMonters;
        golds += GoldMonsters;
        cua_hang.innerText = "Go to town square";
        vaohang.innerText = "Go to town square";
        acttack.innerText = "Go to town square";
        thongbao1.innerText = "";
        exp.innerText = "EXP: " + XP;
        gold.innerText = "Gold: " + golds; // cập nhật giá trị vàng sau khi giết quái vật

        acttack.onclick = function () {
          //(1)
          cua_hang.innerText = "2";
          vaohang.innerText = "8";
          acttack.innerText = "Go to town square ?";
          text.innerText =
            "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!";

          cua_hang.onclick = function () {
            //hàm xử lí thao tác nút số 2

            somayman(2);
          };
          vaohang.onclick = function () {
            //hàm xử lí thao tác nút số 8
            somayman(8);
          };
          acttack.onclick = function () {
            xulyketthucluotchoi();
          };
        };
        cua_hang.onclick = function () {
          //khi tấn công xong thì nút này sử lý việc quay trở lại trang chủ
          xulyketthucluotchoi();

        }
        vaohang.onclick = function () {
          // khi tấn công xong thì nút này sử lý việc quay trở lại trang chủ
          xulyketthucluotchoi();
        }

      } else {
        thongbao1.innerText = "Monster Name: " + HPInformation + HpMonters;
      }
    };
  }

  function AttackDragon() {// hàm sử lí tấn công dragon
    acttack.onclick = function () {
      cua_hang.innerText = "Attack "
      vaohang.innerText = " Dodge"
      acttack.innerText = "Run"
      text.innerText = "You are fighting a monster."
      thongbao1.innerText = "Monster Name: dragon Health: 300"

      Attack(50, 300, "The dragon attacks. ", 0, 0, "dragon Health: ");
      acttack.onclick = function () {
        xulyketthucluotchoi();//hàm xử lí nút bấm Go to town square ở trong phần go to cave 
      }
      vaohang.onclick = function () {
        text.innerText = "You dodge the attack from the dragon "
      }

    }
  }
});




