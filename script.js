(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            h = h % 12;
            h = h ? h : 12;

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();

        let linn = document.getElementById("linn");

        if (linn.value === "") {

            alert("Palun valige linn nimekirjast");

            linn.focus();

            return;


        } else {

            let saatekulu;
            if (linn.value === "tln") {
                saatekulu = 0;
            } else if (linn.value === "trt" || linn.value === "nrv") {
                saatekulu = 2.5;
            } else {
                saatekulu = 3;
            }
            e.innerHTML = saatekulu + " &euro;";

        }

        console.log("Tarne hind on arvutatud");
    }

})();

// map

let mapAPIKey = "AhTCBR9JIdfNStxBzTdJOl976q9SSeRUYwnjfNTSNmEMCurZERSgpXuxVQCGkiu7";

var map, infobox;

function GetMap() {

    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
        title: 'Tartu Ülikool',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        subTitle: 'Hea koht',
        text: 'UT'
    });

    let viljandi = new Microsoft.Maps.Location(
        58.364549, 
        25.602642
    );

    let pushpin2 = new Microsoft.Maps.Pushpin(viljandi, {
        title: 'Viljandi',
        description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ',
        subTitle: 'Rohelise Maja kohvik',
        text: 'Rohe'
    });

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        mapTypeId: Microsoft.Maps.MapTypeId.canvasDark,
        disablePanning: true,
        zoom: 9
    });

    infobox = new Microsoft.Maps.Infobox(centerPoint, {
        visible: false
    });

    infobox.setMap(map);

    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    map.entities.push(pushpin);
    map.entities.push(pushpin2);
        
}

function pushpinClicked(e) {

    if (e.target.metadata) {

        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}
// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

