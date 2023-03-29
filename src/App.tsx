import { useEffect, useRef, useState } from 'react'

import { get_game } from './data';
import useSound from 'use-sound';
import buzzerSFX from "../sounds/buzzer.mp3";
import dingSFX from "../sounds/ding.mp3";

function App() {
  const [r, refresh] = useState(false);
  const rRef = useRef(r);

  const [hideWelcome, setHideWelcome] = useState(false);
  const hideWelcomeRef = useRef(hideWelcome);
  const showWinner = useRef(false);
  const [leftTeamName, setLeftTeamName] = useState("");
  const [rightTeamName, setRightTeamName] = useState("");

  const leftTeamScore = useRef(0);
  const rightTeamScore = useRef(0);
  const roundScore = useRef(0);
  const leftTeamX  = useRef(0);
  const rightTeamX = useRef(0);

  const questionIndex = useRef(0);
  const answer1Visibility = useRef(false);
  const answer2Visibility = useRef(false);
  const answer3Visibility = useRef(false);
  const answer4Visibility = useRef(false);
  const answer5Visibility = useRef(false);
  const answer6Visibility = useRef(false);
  const answer7Visibility = useRef(false);
  const answer8Visibility = useRef(false);

  const [playBuzzer] = useSound(buzzerSFX);
  const [playDing] = useSound(dingSFX);

  const questions = get_game();

  const setGameUp = () => {
    setHideWelcome(true);
    hideWelcomeRef.current = true;
    rRef.current = !rRef.current;
    refresh(rRef.current);
  }
  
  const answered= (nr:number) => {
    if (!showAnswer(nr))
      return; 
    roundScore.current = (roundScore.current + questions[questionIndex.current].answers[nr-1].points);
  }

  const showAnswer = (nr:number) : boolean =>  {

    switch(nr) {
      case 1: if(answer1Visibility.current == true) return false; playDing(); answer1Visibility.current = true; return true;
      case 2: if(answer2Visibility.current == true) return false; playDing(); answer2Visibility.current = true; return true;
      case 3: if(answer3Visibility.current == true) return false; playDing(); answer3Visibility.current = true; return true;
      case 4: if(answer4Visibility.current == true) return false; playDing(); answer4Visibility.current = true; return true;
      case 5: if(answer5Visibility.current == true) return false; playDing(); answer5Visibility.current = true; return true;
      case 6: if(answer6Visibility.current == true) return false; playDing(); answer6Visibility.current = true; return true;
      case 7: if(answer7Visibility.current == true) return false; playDing(); answer7Visibility.current = true; return true;
      case 8: if(answer8Visibility.current == true) return false; playDing(); answer8Visibility.current = true; return true;
    }

    return false;
  }

  const modify_x = (leftTeam: boolean, delta: number) =>{

    if (delta >= 0.0) {
      playBuzzer();
    }
     

    if (leftTeam) {
      leftTeamX.current = Math.min(3, Math.max(0,leftTeamX.current + delta));
    } else {
      rightTeamX.current = Math.min(3, Math.max(0,rightTeamX.current + delta));
    }
  }

  const resetRound = (leftWon: boolean) => {
    if(leftWon) {
      leftTeamScore.current += roundScore.current;
    } else {
      rightTeamScore.current += roundScore.current;
    }

    roundScore.current = 0;

    if( questionIndex.current + 1 == questions.length) {
      showWinner.current = true;
      return;
    }

    leftTeamX.current = 0;
    rightTeamX.current = 0;
    questionIndex.current += 1;
    answer1Visibility.current = (false);
    answer2Visibility.current = (false);
    answer3Visibility.current = (false);
    answer4Visibility.current = (false);
    answer5Visibility.current = (false);
    answer6Visibility.current = (false);
    answer7Visibility.current = (false);
    answer8Visibility.current = (false);
  }

  const handleKeyDown = (ev: globalThis.KeyboardEvent) => {

    if( !hideWelcomeRef.current ) return;

    switch(ev.key) {
      case '1': answered(1); break;
      case '2': answered(2); break;
      case '3': answered(3); break;
      case '4': answered(4); break;
      case '5': answered(5); break;
      case '6': answered(6); break;
      case '7': answered(7); break;
      case '8': answered(8); break;
      case 'q': showAnswer(1); break;
      case 'w': showAnswer(2); break;
      case 'e': showAnswer(3); break;
      case 'r': showAnswer(4); break;
      case 't': showAnswer(5); break;
      case 'y': showAnswer(6); break;
      case 'u': showAnswer(7); break;
      case 'i': showAnswer(8); break;
      case 'z': modify_x(true, -1); break;
      case 'x': modify_x(true, 1); break;
      case 'c': modify_x(false, -1); break;
      case 'v': modify_x(false, 1); break;
      case ',': resetRound(true); break;
      case '.': resetRound(false); break;
    }

    rRef.current = !rRef.current;
    refresh(rRef.current);
  }

  useEffect(() => {

    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    }

  }, [])

  

  return (
    <div data-theme="lofi" className="flex h-screen w-screen justify-center items-center">
      
      <div className={`self-center card h-5/6 w-5/6 shadow-lg transition-all hover:shadow-2xl rounded-3xl p-20 text-center flex flex-col gap-10 ${hideWelcome ? "hidden" : ""}`} >
        <button className='btn btn-ghost self-end grow hover:bg-transparent' onClick={setGameUp}>
          <svg fill="#666666" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460.775 460.775">
          <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
            c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
            c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
            c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
            l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
            c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
          </svg></button>
        <h1 className='text-8xl grow text-center'>Welcome to<br/><i className='font-black'>Young Adult Feud!</i></h1>
        <p className='text-2xl'>Please enter your names:</p>
        <div className='flex flex-row gap-10'>
          <input className='input input-lg grow' type="text" placeholder='Left Team' value={leftTeamName} onChange={(e) => {setLeftTeamName(e.target.value)}}/>
          <input className='input input-lg grow' type="text" placeholder='Right Team'value={rightTeamName} onChange={(e) => {setRightTeamName(e.target.value)}}/>
        </div>
      </div>

      <div className={`self-center w-full h-full transition-all p-10 text-center flex flex-col gap-10 ${hideWelcome && !showWinner.current ? "" : "hidden"}`}>
        <div className='flex flex-row'>
          <h1 className='text-5xl text-center w-1/3'>{leftTeamName}: <i className='font-black'>{leftTeamScore.current}</i><br/><p className='font-bold text-red-600' >{"X".repeat(leftTeamX.current)}</p></h1>
          <h1 className='text-3xl w-1/3 text-center'>Runda Curenta<br/> <i className='font-black'>{roundScore.current}</i></h1>
          <h1 className='text-5xl text-center w-1/3'>{rightTeamName}: <i className='font-black'>{rightTeamScore.current}</i><br/><p className='font-bold text-red-600'>{"X".repeat(rightTeamX.current)}</p></h1>
        </div>
        <div className='w-full h-full flex justify-center items-center'><h1 className='text-6xl text-center font-bold '>{questions[questionIndex.current].body}</h1></div>
        <div className='flex flex-row gap-20'>
          <div className='flex flex-col w-1/2 gap-5'>
              { answer1Visibility.current ? 
                <h1 className='text-5xl text-center w-full p-10 rounded-2xl shadow-xl'>{questions[questionIndex.current].answers[0].body}: <i className='font-bold'>{questions[questionIndex.current].answers[0].points}</i></h1> 
                : <div className='text-5xl font-black text-center w-full p-10 rounded-2xl bg-gray-200' >1</div>
              }
              { answer2Visibility.current ? 
                <h1 className='text-5xl text-center w-full p-10 rounded-2xl shadow-xl'>{questions[questionIndex.current].answers[1].body}: <i className='font-bold'>{questions[questionIndex.current].answers[1].points}</i></h1> 
                : <div className='text-5xl font-black text-center w-full p-10 rounded-2xl  bg-gray-200' >2</div>
              }
              { answer3Visibility.current ? 
                <h1 className='text-5xl text-center w-full p-10 rounded-2xl shadow-xl'>{questions[questionIndex.current].answers[2].body}: <i className='font-bold'>{questions[questionIndex.current].answers[2].points}</i></h1> 
                : <div className='text-5xl font-black text-center w-full p-10 rounded-2xl bg-gray-200' >3</div>
              }
              { answer4Visibility.current ? 
                <h1 className='text-5xl text-center w-full p-10 rounded-2xl shadow-xl'>{questions[questionIndex.current].answers[3].body}: <i className='font-bold'>{questions[questionIndex.current].answers[3].points}</i></h1> 
                : <div className='text-5xl font-black text-center w-full p-10 rounded-2xl  bg-gray-200' >4</div>
              }
            </div>
            <div className='flex flex-col h-full w-1/2 gap-5'>
              { answer5Visibility.current ? 
                <h1 className='text-5xl text-center w-full p-10 rounded-2xl shadow-xl'>{questions[questionIndex.current].answers[4].body}: <i className='font-bold'>{questions[questionIndex.current].answers[4].points}</i></h1> 
                : <div className='text-5xl font-black text-center w-full p-10 rounded-2xl  bg-gray-200 grow' >5</div>
              }
              { answer6Visibility.current ? 
                <h1 className='text-5xl text-center w-full p-10 rounded-2xl shadow-xl'>{questions[questionIndex.current].answers[5].body}: <i className='font-bold'>{questions[questionIndex.current].answers[5].points}</i></h1> 
                : <div className='text-5xl font-black text-center w-full p-10 rounded-2xl bg-gray-200' >6</div>
              }
              { answer7Visibility.current ? 
                <h1 className='text-5xl text-center w-full p-10 rounded-2xl shadow-xl'>{questions[questionIndex.current].answers[6].body}: <i className='font-bold'>{questions[questionIndex.current].answers[6].points}</i></h1> 
                : <div className='text-5xl font-black text-center w-full p-10 rounded-2xl  bg-gray-200' >7</div>
              }
              { answer8Visibility.current ? 
                <h1 className='text-5xl text-center w-full p-10 rounded-2xl shadow-xl'>{questions[questionIndex.current].answers[7].body}: <i className='font-bold'>{questions[questionIndex.current].answers[7].points}</i></h1> 
                : <div className='text-5xl font-black text-center w-full p-10 rounded-2xl bg-gray-200' >8</div>
              }
            </div>
          
        </div>
      </div>
     
      <div className={`w-full h-full flex justify-center items-center  ${showWinner.current ? "" : "hidden"}`}>
      <h1 className='text-8xl grow text-center'>and the winner is...<br/><i className='font-black'>{leftTeamScore.current > rightTeamScore.current ? leftTeamName : rightTeamName}</i></h1>
      </div>
      
    </div>
    
  )
}

export default App;
