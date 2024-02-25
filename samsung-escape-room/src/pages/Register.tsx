import { IonButton, IonCol, IonContent, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, useIonRouter } from '@ionic/react';
import './Register.css';
import SamsungHeader from '../components/SamsungHeader';
import { useState } from 'react';

const Register: React.FC = () => {
  const registerUser = (e:any) => {
    e.preventDefault();
    if (name && name !== '' && mobile && mobile !== '' && id && id !== '') {
      router.push('/room')
    } else {
      console.log("err",name,mobile,id)
    }
  }
  const [name, setName] = useState(undefined);
  const [mobile, setMobile] = useState(undefined);
  const [id, setId] = useState(undefined);
  const router = useIonRouter();
  return (
    <IonPage>

      <IonContent fullscreen className='content'>
        <SamsungHeader />
        <IonRow className="ion-align-items-center ion-justify-content-center">
          <IonCol className="ion-align-items-center ion-justify-content-center">
            <IonText>
              <h2 className='ion-text-center'>
                Complete your registration
              </h2>
            </IonText>
          </IonCol>
        </IonRow>
        <form className="ion-padding" onSubmit={registerUser}>
          <IonItem className='ion-margin-bottom'>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput required type='text' onIonChange={(e) => setName(e?.target?.value)} />
          </IonItem>
          <IonItem className='ion-margin-bottom'>
            <IonLabel position="floating">Mobile Number</IonLabel>
            <IonInput required type="tel" onIonChange={(e) => setMobile(e?.target?.value)}/>
          </IonItem>
          <IonItem className='ion-margin-bottom'>
            <IonLabel position="floating">ID Number</IonLabel>
            <IonInput required type="text" onIonChange={(e) => setId(e?.target?.value)}/>
          </IonItem>
          <IonButton className="ion-margin-top" type="submit" expand="block">
            Register
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Register;
