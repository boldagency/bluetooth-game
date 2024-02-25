import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Room.css';
import SamsungHeader from '../components/SamsungHeader';
import { useState } from 'react';
const state = {
  select: 0,
  instructions: 1,
  game: 2,
  code: 3,
  leaderboard: 4
}

const instructionCards = [
  {
    title: "Circle To Search"
  },
  {
    title: "Live Translate"
  },
  {
    title: "Transcript Assist"
  },
  {
    title: "Photo Assist"
  }
]
const Room: React.FC = () => {
  const [gameState, setGameState] = useState(state.select);
  const [selectedRoom, selectRoom] = useState(undefined);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerId, setTimerId] = useState(null);

  // Function to start the timer
  const startTimer = () => {
    if (!timerId) {
      setStartTime(Date.now());
      const id = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000); // Update every second
      setTimerId(id);
    }
  };

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
                  <IonCard color='light'>
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
            <IonRow className="ion-align-items-center ion-justify-content-center  ion-margin-top">
              <IonCol className="logo ion-align-items-center ion-justify-content-center">
                
              </IonCol>
            </IonRow>
          </>
        }
      </IonContent>
    </IonPage>
  );
};

export default Room;
