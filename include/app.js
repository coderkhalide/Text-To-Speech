   // check ability for speech resignation
if('speechSynthesis' in window){
    // list of languages is probably not loaded, wait for it
    if(window.speechSynthesis.getVoices().length == 0) {
        window.speechSynthesis.addEventListener('voiceschanged', function() {
            loadVoice();
        });
    }
    else {
        // languages list available, no need to wait
        loadVoice();
    }
    
    let allVoice = [];
    
    //load voices
    function loadVoice (){
        
        allVoice = window.speechSynthesis.getVoices();
        let selectVoice = document.querySelector('#voices');
        for(let i = 0; i < allVoice.length; i++) {
            let option = document.createElement('option');
            option.innerText = allVoice[i].name;
            option.setAttribute('value', i);
            selectVoice.appendChild(option);
        }
        textToSpeech();
        
    }


    let countVoice = document.querySelector('#voices').length;

    if(countVoice == 0){
        location.reload();
    }

    //text to speech
    function textToSpeech(){
        
        let speakBtn = document.querySelector('#speak');

        speakBtn.addEventListener('click', function (e){

            let rate = document.querySelector('#rate').value;
            let pitch = document.querySelector('#pitch').value;
            let volume = document.querySelector('#volume').value;
            let selectVoice = document.querySelector('#voices');
            let message = document.querySelector('#message');
            let speech = new SpeechSynthesisUtterance();
            speech.voice = allVoice[selectVoice.value];
            speech.lang = allVoice[selectVoice.value].lang;
            speech.rate = rate / 10;
            speech.pitch = pitch;
            speech.volume = volume / 10;
            speech.text = message.value;
            window.speechSynthesis.speak(speech);

            

        });

    }
    
}else{
    alert('Your browser does not support speech synthesis.-----We recommend you use Google Chrome.');
}


