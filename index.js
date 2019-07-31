chrome.contextMenus.create({
  "id":"sendCopiedTextToMail",
  "title": "Send Selected Data On Mail",
  "contexts": ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(itemData){
  copyToClipboard(itemData.selectionText);
});


const copyToClipboard = str => {
  console.log("copyToClipboard");
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  var d = new Date();
  var date = d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear();
  popUpWindow("https://mail.google.com/mail/?view=cm&fs=1&tf=1&body="+str+"&subject=copiedtexton"+date,"gmail",1000,1000);
  document.body.removeChild(el);
};


function popUpWindow(URL, windowName, windowWidth, windowHeight) {
  var centerLeft = (screen.width/2)-(windowWidth/2);
  var centerTop = (screen.height/2)-(windowHeight/2);
  var windowFeatures = 'toolbar=no, location=no, directories=no, status=no, menubar=no, titlebar=no, scrollbars=no, resizable=no, ';
  return window.open(URL, windowName, windowFeatures +' width='+ windowWidth +', height='+ windowHeight +', top='+ centerTop +', left='+ centerLeft);
 }