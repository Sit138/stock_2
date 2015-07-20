function addTagP(i) {//добавляет на страницу <p> в наш <div>
    var block = document.getElementById('blockWithPhone'),
        p = document.createElement('p');
    p.setAttribute("id", ""+i);
    block.appendChild(p);
}

function openJson(file){
    var xhttp = new XMLHttpRequest(),
        json, i;
    xhttp.open('GET', file + '.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        try{
            if(xhttp.readyState == 4) {
                console.log(xhttp.status);
                document.getElementById('blockWithPhone').style.display = 'block';
                json = eval('('+xhttp.responseText+')');
                for(i = 0; i < json.phonebase.length; i++){
                    addTagP(i);
                    document.getElementById(""+i).innerHTML = json.phonebase[i].name + " "
                        + json.phonebase[i].surname + " " + json.phonebase[i].number;
                }

            }
        }
        catch (e) {
            document.getElementById('blockWithPhone').style.display = 'none';
            alert('Sorry, the data error...');
        }
    }
}

function openXML(file) {
    var xhttp = new XMLHttpRequest(),
        textXml, phone, i,
        name, surname, number;
    xhttp.open('POST', file + '.xml', true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        try {
            if(xhttp.readyState == 4) {
                document.getElementById('blockWithPhone').style.display = "block";
                textXml = xhttp.responseXML;
                phone = textXml.getElementsByTagName('phone');
                name = textXml.getElementsByTagName('name');
                surname = textXml.getElementsByTagName('surname');
                number = textXml.getElementsByTagName('number');
                for(i = 0; i < phone.length; i++) {
                    addTagP(i);
                    document.getElementById(""+i).innerHTML = name[i].childNodes[0].nodeValue + " "
                        + surname[i].childNodes[0].nodeValue + " " + number[i].childNodes[0].nodeValue;
                }
                console.log(phone.length);
            }
        }
        catch (e) {
            document.getElementById('blockWithPhone').style.display = 'none';
            alert("Data error...");
        }

    }
}