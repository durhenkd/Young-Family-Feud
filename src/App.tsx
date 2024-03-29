import { useEffect, useRef, useState } from 'react'

import { get_game } from './data';
import useSound from 'use-sound';
import buzzerSFX from "../sounds/buzzer.mp3";
import dingSFX from "../sounds/ding.mp3";
import winnerSFX from "../sounds/winner.mp3";

const welcomeCardStyle = "text-white self-center card h-5/6 w-5/6 shadow-xl bg-gradient-to-t from-[#00b4d8] to-[#0077b6] transition-all hover:shadow-2xl rounded-3xl p-20 text-center flex flex-col gap-10"
const startButtonStyle = "btn btn-ghost self-end grow hover:bg-transparent"
const startButtonFill = "#FFFFFF"
const welcomeInputStyle = 'input input-lg grow rounded-xl text-center placeholder:text-center font-bold text-[#0066a5]'
 
const scoreDivStyle = 'flex flex-row text-[#02034d]'
const teamDivStyle = 'flex w-1/3 flex-col gap-2'
const scoreTeamStyle = 'text-5xl text-center'
const scoreRoundStyle = 'text-3xl w-1/3 text-center'
const xStyle = 'text-2xl font-bold text-red-600 border-red-600 border-4 rounded-xl m-1 px-2'
const discussFlagStyle = 'text-3xl text bg-[#00b4d8] text-white rounded-xl m-4 p-2 font-thin'

const questionDivStyle = 'w-full p-10 flex justify-center items-center'
const questionStyle = 'text-[#02034d] text-6xl text-center font-bold'

const answerDivStyle = 'flex flex-row gap-20 h-full'
const answerColumnStyle = 'flex flex-col w-1/2 gap-5'
const showAnswerStyle = "text-5xl text-[#02034d] text-center w-full p-5 rounded-2xl shadow-2xl shadow-[#90e0ef] grow flex items-center justify-center outline outline-4 outline-[#ffd60a] outline-offset-[-8px] bg-white";
const hiddenAnswerStyle = "text-5xl text-white font-black text-center w-full p-7 rounded-2xl bg-gradient-to-t from-[#0087b6] to-[#00b4d8] grow flex items-center justify-center";
const answerPointsStyle = 'ml-4 font-bold bg-gradient-to-t from-[#efa609] to-[#ffd60a] p-2 rounded-2xl'

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

  const questionVisibility = useRef(false);

  const [playBuzzer] = useSound(buzzerSFX);
  const [playDing] = useSound(dingSFX);
  const [playWinner] = useSound(winnerSFX);

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

    if (nr > questions[questionIndex.current].answers.length) 
      return false;

    questionVisibility.current = true;

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

  const setQuestionVisibility = (value: boolean) => {
    questionVisibility.current = value;
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
      playWinner();
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

    questionVisibility.current = (false);
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
      case 's': setQuestionVisibility(true); break;
      case 'h': setQuestionVisibility(false); break;
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
    <div data-theme="lofi" className="flex h-screen w-screen justify-center items-center bg-gradient-to-t from-[#caf0f8] ">
      
      <div className={`${welcomeCardStyle} ${hideWelcome ? "hidden" : ""}`} >
        <button className={startButtonStyle} onClick={setGameUp}>
          <svg fill={startButtonFill} height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460.775 460.775">
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
          <input className={welcomeInputStyle} type="text" placeholder='Left Team' value={leftTeamName} onChange={(e) => {setLeftTeamName(e.target.value)}}/>
          <input className={welcomeInputStyle} type="text" placeholder='Right Team'value={rightTeamName} onChange={(e) => {setRightTeamName(e.target.value)}}/>
        </div>
      </div>

      <div className={`self-center w-full h-full transition-all p-14 text-center flex flex-col gap-5 ${hideWelcome && !showWinner.current ? "" : "hidden"}`}>
        <div className={scoreDivStyle}>
          <div className={teamDivStyle}>
            <h1 className={scoreTeamStyle}>{leftTeamName}: <i className='font-black'>{leftTeamScore.current}</i>{ rightTeamX.current == 2 ? <i className={discussFlagStyle}>sfătuiți-vă!</i> : ""}</h1>
            <div className='flex flex-row justify-center'>{ Array.from({ length: leftTeamX.current }, (_, i) => <span className={xStyle} >X</span>) }</div>
          </div>
          <h1 className={scoreRoundStyle}>{`Runda Nr. ${questionIndex.current + 1}`}<br/> <i className='font-black'>{roundScore.current}</i></h1>
          <div className={teamDivStyle}>
            <h1 className={scoreTeamStyle}>{rightTeamName}: <i className='font-black'>{rightTeamScore.current}</i>{ leftTeamX.current == 2 ? <i className={discussFlagStyle}>sfătuiți-vă!</i> : ""}</h1>
            <div className='flex flex-row justify-center'>{ Array.from({ length: rightTeamX.current }, (_, i) => <span className={xStyle} >X</span>) }</div>
          </div>
        </div>
        <div className={questionDivStyle}>
            <h1 className={questionStyle}>{
             questionVisibility.current ?
             questions[questionIndex.current].body
             : "-"
            }</h1> 
        </div>
        <div className={answerDivStyle}>
          <div className={answerColumnStyle}>
              { answer1Visibility.current ? 
                <h1 className={showAnswerStyle}>{questions[questionIndex.current].answers[0].body}<i className={answerPointsStyle}>{questions[questionIndex.current].answers[0].points}</i></h1>
                : <div className={hiddenAnswerStyle} >1</div>
              }
              { answer2Visibility.current ? 
                <h1 className={showAnswerStyle}>{questions[questionIndex.current].answers[1].body}<i className={answerPointsStyle}>{questions[questionIndex.current].answers[1].points}</i></h1> 
                : <div className={hiddenAnswerStyle} >2</div>
              }
              { answer3Visibility.current ? 
                <h1 className={showAnswerStyle}>{questions[questionIndex.current].answers[2].body}<i className={answerPointsStyle}>{questions[questionIndex.current].answers[2].points}</i></h1> 
                : <div className={hiddenAnswerStyle} >3</div>
              }
              { answer4Visibility.current ? 
                <h1 className={showAnswerStyle}>{questions[questionIndex.current].answers[3].body}<i className={answerPointsStyle}>{questions[questionIndex.current].answers[3].points}</i></h1> 
                : <div className={hiddenAnswerStyle} >4</div>
              }
            </div>
            <div className={answerColumnStyle}>
              { questions[questionIndex.current].answers.length < 5 ? <></> :
                answer5Visibility.current ? 
                <h1 className={showAnswerStyle}>{questions[questionIndex.current].answers[4].body}<i className={answerPointsStyle}>{questions[questionIndex.current].answers[4].points}</i></h1> 
                : <div className={hiddenAnswerStyle}>5</div>
              }
              { questions[questionIndex.current].answers.length < 6 ? <></> :
                answer6Visibility.current ? 
                <h1 className={showAnswerStyle}>{questions[questionIndex.current].answers[5].body}<i className={answerPointsStyle}>{questions[questionIndex.current].answers[5].points}</i></h1> 
                : <div className={hiddenAnswerStyle} >6</div>
              }
              { questions[questionIndex.current].answers.length < 7 ? <></> : 
                answer7Visibility.current ? 
                <h1 className={showAnswerStyle}>{questions[questionIndex.current].answers[6].body}<i className={answerPointsStyle}>{questions[questionIndex.current].answers[6].points}</i></h1> 
                : <div className={hiddenAnswerStyle} >7</div>
              }
              { questions[questionIndex.current].answers.length < 8 ? <></> : 
                answer8Visibility.current ? 
                <h1 className={showAnswerStyle}>{questions[questionIndex.current].answers[7].body}<i className={answerPointsStyle}>{questions[questionIndex.current].answers[7].points}</i></h1> 
                : <div className={hiddenAnswerStyle} >8</div>
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
