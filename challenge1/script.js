(function(){
    'use strict';
    console.log('testing') //- this worked! YIPPIE!

    const hover1 = document.querySelector('#hover1');
    const hover2 = document.querySelector('#hover2');
    const hover3 = document.querySelector('#hover3');

    const vid1 = document.querySelector('#vid1');
    const vid2 = document.querySelector('#vid2');
    const vid3 = document.querySelector('#vid3');
    
    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');

    //makes videos appear/disappear
    hover1.addEventListener('mouseover', () => {
        //console.log('hover1');
        vid1.className = 'visible';
        vid2.className = 'hidden';
        vid3.className = 'hidden';
        line1.className = 'visible';
        line2.className = 'hidden';
        line3.className = 'hidden';

    });
    hover2.addEventListener('mouseover', () => {
        console.log('hover2');
        vid2.className = 'visible';
        vid1.className = 'hidden';
        vid3.className = 'hidden';
        line2.className = 'visible';
        line1.className = 'hidden';
        line3.className = 'hidden';
    });
    hover3.addEventListener('mouseover', () => {
        console.log('hover3');
        vid3.className = 'visible';
        vid1.className = 'hidden';
        vid2.className = 'hidden';
        line3.className = 'visible';
        line1.className = 'hidden';
        line2.className = 'hidden';
    });

    //makes fullscreen/not fullscreen

    const fullScreenButton = document.querySelector('.fa-expand')

    fullScreenButton.addEventListener('click', function(){
        if (!document.fullscreenElement){
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    })
})();