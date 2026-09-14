/* Text-to-speech via the Web Speech API. */

function speak(text){
  try{
    if('speechSynthesis' in window){
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; u.rate = 0.92;
      window.speechSynthesis.speak(u);
    }
  }catch(e){}
}

export { speak };
