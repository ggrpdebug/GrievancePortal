var nooflevels = 0;
var json_array = [];
var k = 0; 
function addlevel(){
    nooflevels++;
    var level = document.getElementById('levels');
    level.appendChild(document.createTextNode("level "+ nooflevels + " : "));
    var inputtagtext =document.createElement("input");
    inputtagtext.id = "textfield";
    inputtagtext.placeholder = "designation";
    inputtagtext.type ="text";
    level.appendChild(inputtagtext);
    level.appendChild(document.createTextNode("      "));
    var inputtag = document.createElement("input");
    inputtag.id="xlf" + nooflevels;
    inputtag.type ="file";
    level.appendChild(inputtag);
    level.appendChild(document.createElement("hr"));
    if( nooflevels >= 1){
      var btn = document.getElementById("button");
      btn.disabled = false;
    }
}

function start(){
  var a =document.getElementById("xlf" + nooflevels);
  a.addEventListener('change', handleFile, false);
}

/* fixdata and rABS are defined in the drag and drop example */
/* processing array buffers, only required for readAsArrayBuffer */
function fixdata(data) {
var o = "", l = 0, w = 10240;
for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
return o;
}

var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
  function handleFile(e) {
    var files = e.target.files;
    var i;
    for (i = 0; i != files.length; ++i) {
      var f = files[i];
      var reader = new FileReader();
      var name = f.name;
      reader.onload = function(e) {
        var data = e.target.result;
       
        var workbook;
        if(rABS) {
          /* if binary string, read with type 'binary' */
          workbook = XLSX.read(data, {type: 'binary'});
        } else {
          /* if array buffer, convert to base64 */
          var arr = fixdata(data);
          workbook = XLSX.read(btoa(arr), {type: 'base64'});
        }

        /* DO SOMETHING WITH workbook HERE */
        var first_sheet_name = workbook.SheetNames[0];
      /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        console.log(XLSX.utils.sheet_to_html(worksheet));
        var b = XLSX.utils.sheet_to_html(worksheet);
        document.getElementById("yeah").innerHTML = b;
        console.log(XLSX.utils.sheet_to_json(worksheet));
        //console.log(XLSX.utils.sheet_to_csv(worksheet));
        //console.log(XLSX.utils.sheet_to_formulae(worksheet));
        json_array[k] = XLSX.utils.sheet_to_json(worksheet);
        k++;
      };
      reader.readAsBinaryString(f);
    }
  }

function uploadJson(){
    var t = 0;
    for(t = 0;t<k;t++){
      var messageListRef = firebase.database().ref('Level ' + t);
      console.log(t);
       messageListRef.set(json_array[t]);
    }
    var database = firebase.database();
    console.log(database);
    
}


function Submit(){
  window.open ('Second_Page.html','_self',false);
}

