(function(){
    const preObject = document.getElementById('display_table');
    const DBRefObject = firebase.database().ref().child('display_table');
    DBRefObject.on('value',snap => console.log(snap.val()));
}());
