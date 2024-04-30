(function(){
    'use strict';
    //console.log('runningJS');
    async function getData(){
        const myOutfits = await fetch('outfits.json');
        const data = await myOutfits.json();
        //console.log(data);

        document.querySelector('#hat').className = `ph ph-cowboy-hat ${data.null.hatcolor}`;
        document.querySelector('#shirt').className = `ph ph-t-shirt ${data.null.shirtcolor}`;
        document.querySelector('#pant').className = `ph ph-pants ${data.null.pantcolor}`;
        document.querySelector('#shoe').className = `ph ph-sneaker ${data.null.shoecolor}`;

        const hotSpots = document.querySelectorAll('.day');
        hotSpots.forEach(function(eachSpot){
            eachSpot.addEventListener('click', function(e){
                const day = e.target.id;
                //console.log(day);
                for (var i=0; i < hotSpots.length; i++){
                    hotSpots[i].className = 'unselected day';
                }; //unselects all days

                document.querySelector(`#${day}`).className = 'selected day'; //selects day clicked on

                document.querySelector('#hat').className = `ph ph-cowboy-hat ${data[day].hatcolor}`;
                document.querySelector('#shirt').className = `ph ph-t-shirt ${data[day].shirtcolor}`;
                document.querySelector('#pant').className = `ph ph-pants ${data[day].pantcolor}`;
                document.querySelector('#shoe').className = `ph ph-sneaker ${data[day].shoecolor}`
                console.log(data[day])
            });
        });
    } 

    getData();

})();