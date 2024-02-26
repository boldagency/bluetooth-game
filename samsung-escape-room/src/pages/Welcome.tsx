import { IonButton, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Welcome.css';
import SamsungHeader from '../components/SamsungHeader';

const Welcome: React.FC = () => {
  return (
    <IonPage>

      <IonContent fullscreen className='content'>
        <SamsungHeader/>
        <IonRow className="ion-align-items-center ion-justify-content-center">
          <IonCol className="ion-align-items-center ion-justify-content-center">
            <IonText>
              <h2  className='ion-text-center'>
                Welcome to Galaxy AI Escape room
              </h2>
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow className="ion-align-items-center ion-justify-content-center">
          <IonCol className="ion-align-items-center ion-justify-content-center">
            <IonButton color='primary' href='/register' expand="block">Next</IonButton>
          </IonCol>
        </IonRow>
        <div className='bg'>
        <IonImg src="/splash.png" className='img'></IonImg>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
