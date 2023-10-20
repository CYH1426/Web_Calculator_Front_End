function $(id){return document.getElementById(id);}
var str;
var result;
var radian;
var equation;
function display(str0)	//显示到文本框
{
    str = document.getElementById("text");
    str.value = str.value + str0;
}

function equals()	//等于
{
    str = document.getElementById("text");

    equation = str.value;
    equation = equation.replaceAll("+","!");
    equation = equation.replaceAll("%","~");
    equation = equation.replaceAll('^','b');


    str.value =str.value.replaceAll('π','Math.PI');
    str.value =str.value.replaceAll('E','Math.E');
    str.value =str.value.replaceAll('^','**');
    str.value =str.value.replaceAll('%','/100');
    str.value = str.value.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
    str.value = str.value.replace(/log\(([^)]+)\)/g, 'Math.log($1)');

    if (/(\d+\.\d+e[\\+\-]?\d+)/.test(str.value)) {
        // Parse the scientific notation and evaluate it
        str.value = str.value.replace(/(\d+\.\d+e[\\+\-]?\d+)/g, function(match) {
            return parseFloat(match);
        });
    }

    if (radian===false) {
        str.value = str.value.replace(/sin\(([^)]+)\)/g, 'Math.sin($1* (Math.PI / 180))');
        str.value = str.value.replace(/cos\(([^)]+)\)/g, 'Math.cos($1* (Math.PI / 180))');
        str.value = str.value.replace(/tan\(([^)]+)\)/g, 'Math.tan($1* (Math.PI / 180))');
    }else {
        str.value = str.value.replace(/sin\(([^)]+)\)/g, 'Math.sin($1)');
        str.value = str.value.replace(/cos\(([^)]+)\)/g, 'Math.cos($1)');
        str.value = str.value.replace(/tan\(([^)]+)\)/g, 'Math.tan($1)');
    }


    result = eval(str.value);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (){
        if (this.readyState === 4){
            if (this.status === 200){
            }else {
                alert(this.status);
            }
        }
    }
    xhr.open("GET","/Calculator/StoreServlet?equation="+equation+"&result="+result,true);
    xhr.send();
    str.value = result;
}

function back()		//退格
{
    str = document.getElementById("text");
    str.value = str.value.substring(0, str.value.length - 1);
}

function reset()	//清除
{
    str = document.getElementById("text");
    str.value = "";
}


function power(){
    str = document.getElementById("text");
    str.value = str.value + "^";
}


function conversion(){
    str = document.getElementById("transfer");
    let blt = document.getElementById("form");
    if (str.value==="转为角度制"){
        radian=false;
        str.value="转为弧度制";
        blt.value="角度";
    }else if (str.value==="转为弧度制"){
        radian=true;
        str.value="转为角度制"
        blt.value="弧度";
    }
}


function openHistoryModal() {
    // 创建一个新子窗口，指定大小和位置
    var modal = document.getElementById("historyModal");
    modal.style.display = "block";
    var html="";
    // 在子窗口中显示历史记录内容（这里需要您自己定义历史记录内容）
    var table = document.getElementById("history");

    html+='<tr>';
    html+='<td>算式</td><td>结果</td>';
    html+='</tr>';
    // 打开子窗口后，可以在其中执行JavaScript来修改子窗口的内容
    var jsonStr;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (){
        if (this.readyState === 4){
            if (this.status === 200){
                jsonStr = this.responseText;
                var records = JSON.parse(jsonStr);
                for (var i=0;i<records.length;i++){
                    var record = records[i];
                    html+='<tr>';
                    html+='<td>'+record.equation+'</td><td>'+record.answer+'</td>';
                    html+='</tr>';
                }
                table.innerHTML=html;
            }else {
                alert("fail")
                alert(this.status);
            }
        }
    }
    xhr.open("POST","/Calculator/HistoryServlet",true);
    xhr.send();
}

function closeHistoryModal() {
    // 隐藏历史记录模态对话框
    var modal = document.getElementById("historyModal");
    modal.style.display = "none";
}


function clearHistory(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (){
        if (this.readyState === 4){
            if (this.status === 200){
                alert(this.responseText);
                closeHistoryModal();
            }else {
                alert("fail")
                alert(this.status);
            }
            }
        }
    xhr.open("POST","/Calculator/ClearHistoryServlet",true);
    xhr.send();
}

function getAns(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (){
        if (this.readyState === 4){
            if (this.status === 200){
                var ans=this.responseText;
                display(ans);
            }else {
                alert("无过往记录")
                alert(this.status);
            }
        }
    }
    xhr.open("POST","/Calculator/GetAnsServlet",true);
    xhr.send()


}