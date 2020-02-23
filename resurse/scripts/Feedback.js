window.onload = function(){
    
    var h = document.createElement("H1");
  var t = document.createTextNode("Ce ai adauga la acest joc?");
  h.appendChild(t);
  document.body.appendChild(h);
  var x = document.createElement("INPUT");
  x.setAttribute("type", "text");

  document.body.appendChild(x);
  var h = document.createElement("H1");
  var t = document.createTextNode("Cat de mult ti-a placut acest joc?");
  h.appendChild(t);
  document.body.appendChild(h);
  
  var y = document.createElement("SELECT");
  y.setAttribute("id", "mySelect");
  
  document.body.appendChild(y);
  var h = document.createElement("H1");
  var t = document.createTextNode("Te-a impresionat acest site?");
  h.appendChild(t);
  document.body.appendChild(h);
  var z = document.createElement("option");
  z.setAttribute("value", "Putin");
  var t = document.createTextNode("Putin");
  z.appendChild(t);
  document.getElementById("mySelect").appendChild(z);
  var z = document.createElement("option");
  z.setAttribute("value", "CatDeCat");
  var t = document.createTextNode("Cat de cat");
  z.appendChild(t);
  document.getElementById("mySelect").appendChild(z);
  var z = document.createElement("option");
  z.setAttribute("value", "Mult");
  var t = document.createTextNode("Mult");
  z.appendChild(t);
  document.getElementById("mySelect").appendChild(z);
  var x = document.createElement("INPUT");
  x.setAttribute("type", "checkbox");
  document.body.appendChild(x);
}