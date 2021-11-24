function addLog(message) {
    setTimeout(function() {
        document.getElementById("log").innerHTML += `<li>${message}</li>`;
    }, 1000);
}

function init() {
    addLogInit();
    showSQL();
}

function addLogInit() {
    addLog("初始化伺服器中...");
    addLog("...完成");
}

function checkUser() {
    addLog("檢查認證中...");
    addLog("找尋使用者中...");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == `' or 1=1 --` || password == `' or 1=1 --`) {
        loginSuccess();
    } else {
        loginFail();
    }
 
}

function loginFail() {
    addLog("認證失敗");
    addLog("使用者不存在");
    document.getElementById("status").innerHTML = `<div class="fail">\n登入失敗\n</div>`;
}

function loginSuccess() {
    addLog("認證成功");
    document.getElementById("status").innerHTML = `<div class="success">\n登入成功\n</div>`;
}

function showSQL() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    sql = `SELECT * \n  FROM users\n WHERE username = '${username}'\n   AND password = '${password}'`;
    document.getElementById("sql").innerText = sql;
}

//TODO: 判斷 or、判斷'='前後有無一樣、判斷有無'--'、email 與 password 都要可以成功注入
//TODO: 增加敘述

/**
 * 1. 這是一個低安全、容易受攻擊的網站，我們要來試試如何攻擊這個網頁。
 * 2. 我們會用到一個觀念 - SQL 注入
 * 3. 首先，我們先在帳密輸入 user, pass
 * 4. 可以發現登入失敗
 * 5. 接著，我們可以在密碼處輸入' or 1=1 -- 進行注入
 * 6. 可以觀看 SQL 語法，'的部分將字串截斷，or 讓敘述只要一個為真就為真，所以我們在後面建立一個為真的敘述，並用 -- 把後面的敘述註解
 * 7. 這樣便可以成功注入登入了
 */