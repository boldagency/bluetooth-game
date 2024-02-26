import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Room.css';
import SamsungHeader from '../components/SamsungHeader';
import { useRef, useState } from 'react';
import { trophy } from 'ionicons/icons';

const state = {
  select: 0,
  instructions: 1,
  game: 2,
  code: 3,
  leaderboard: 4
}

const quest = {
  'classroom': {
    questions: [
      {
        question: "What does the professor talk about in the video?",
        answer: "AI"
      },
      {
        question: "Titanium is a ____",
        answer: "metal"
      },
      {
        question: "Question Question Question",
        answer: "answer"
      }
    ]
  },
  'korean-alley': {
    questions: [
      {
        question: "What is the name of the neighborhood / street in South Korea known for historic artsy, large market for antique and traditional cultural artwork?",
        answer: "Insadong"
      },
      {
        question: "Titanium is a ____",
        answer: "metal"
      },
      {
        question: "Question Question Question",
        answer: "answer"
      }
    ]
  }
}

const instructionCards = [
  {
    id: "open-modal",
    title: "Circle To Search"
  },
  {
    id: "open-modal2",
    title: "Live Translate"
  },
  {
    id: "open-modal22",
    title: "Transcript Assist"
  },
  {
    id: "open-modal2222",
    title: "Photo Assist"
  }
]
const Room: React.FC = () => {
  const [gameState, setGameState] = useState(state.select);
  const [selectedRoom, selectRoom] = useState(undefined);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const answer = useRef(undefined)

  // Function to start the timer
  const startTimer = () => {
    if (!timerId) {
      setStartTime(Date.now());
      const id = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000); // Update every second
      setTimerId(id);
      setActiveQuestion(0);
    }
  };

  const handleAnswer = (e) => {
    e.preventDefault();
    // check is correct answer
    const ans = answer?.current.value.toLowerCase();
    const correctAns = quest[selectedRoom].questions[activeQuestion].answer;
    if (correctAns.toLowerCase() === ans) {
      setWrongAnswer(false)
      if (activeQuestion < quest[selectedRoom].questions.length - 1) {
        setActiveQuestion(c => c + 1);
        e.target.reset();
      } else {
        stopTimer();
        setGameState(state.code)
      }
    } else {
      setWrongAnswer(true)
    }
  }

  // Function to stop the timer and return the elapsed time
  const stopTimer = () => {
    clearInterval(timerId);
    setTimerId(null);
    const timeElapsed = Date.now() - startTime;
    setElapsedTime(timeElapsed);
    return timeElapsed;
  };

  return (
    <IonPage>

      <IonContent fullscreen className='content'>
        <SamsungHeader />
        {
          gameState === state.select && <>
            <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-bottom">
              <IonCol className="ion-align-items-center ion-justify-content-center">
                <IonText>
                  <h2 className='ion-text-center'>
                    Choose an escape room...
                  </h2>
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center ion-justify-content-center  ion-margin-top">
              <IonCol className="logo ion-align-items-center ion-justify-content-center">
                <IonButton color='primary' fill='outline' onClick={() => { selectRoom('classroom'); setGameState(state.instructions) }} size='large' expand='block'>Escape from Class Room</IonButton>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center ion-justify-content-center  ion-margin-top">
              <IonCol className="logo ion-align-items-center ion-justify-content-center">
                <IonButton color='primary' fill='outline' onClick={() => { selectRoom('korean-alley'); setGameState(state.instructions) }} size='large' expand='block'>Escape from Korean Alley</IonButton>
              </IonCol>
            </IonRow>
          </>
        }
        {
          gameState === state.instructions && <IonGrid>
            <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-bottom">
              {
                instructionCards.map((ins, i) => <IonCol key={i} size='6' className="ion-align-items-center ion-justify-content-center">
                  <IonCard color='light' id={ins.id}

                    onClick={() => modal.current?.present()}>
                    <IonCardContent>{ins.title}</IonCardContent>
                  </IonCard>
                </IonCol>)
              }
            </IonRow>
            <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-bottom">
              <IonCol className="ion-align-items-center ion-justify-content-center ion-text-center">
                <IonButton color='primary' onClick={() => { setGameState(state.game); startTimer(); }}>Start</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        }
        {
          gameState === state.game && <>
            <IonRow className="ion-padding ion-align-items-center ion-justify-content-center  ion-margin-top">
              <IonCol className="logo ion-align-items-center ion-justify-content-center">
                <IonText className='question'>
                  <h3 className=''>
                    {quest[selectedRoom].questions[activeQuestion].question}
                  </h3>
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center ion-justify-content-center  ion-margin-top">
              <IonCol className="logo ion-align-items-center ion-justify-content-center">
                <form className="ion-padding" onSubmit={handleAnswer}>
                  <IonItem className='ion-margin-bottom'>
                    <IonLabel position="stacked">Answer</IonLabel>
                    <IonInput fill="solid" required type='text' ref={answer} />
                    {
                      wrongAnswer && <IonText color="danger" className='error'>
                        Wrong answer! Try again...
                      </IonText>
                    }
                  </IonItem>
                  <IonButton className="ion-margin-top" type="submit" expand="block">
                    Next
                  </IonButton>

                </form>
              </IonCol>
            </IonRow>
          </>
        }
        {
          gameState === state.code && <>
            <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-bottom">
              <IonCol className="ion-align-items-center ion-justify-content-center">
                <IonCard color='light' className='code-card'>
                  <IonCardContent className='ion-text-center'>
                    <h1>Congratulations!</h1>
                    <IonIcon
                      className='ion-margin-top ion-margin-bottom'
                      icon={trophy} color='dark' size='large'></IonIcon>
                    <h2>Use the code below to escape</h2>
                    <h1>0000</h1>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </>
        }



        {/* VIDEO MODAL */}
        <IonModal ref={modal} trigger="open-modal"
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton onClick={() => modal.current?.dismiss()}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <video
              autoPlay={true}
              controls={true}
              playsInline={true}
              width="100%"
              height="100%"
            >
              <source src={'/circle-search.mp4'} type="video/mp4" />
            </video>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Room;
