import React, { useContext, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { UserContext } from '../../App';
import { LoginService } from '../../services/login.service';

const Login: React.FC = () => {

  const [loginMethod, setLoginMethod] = useState("TELEGRAM");
  const [username, setUser] = useState("MinoWolf");
  const [password, setPassword] = useState("mino123");
  const [loginCode, setLoginCode] = useState("");
  const [page, setPage] = useState("REGISTER");
  const user = useContext(UserContext);

  const doLogin = async () => {
    try {
      const loginToken = await new LoginService().loginTelegram(username, loginCode);
      alert(loginToken.data.token);
      console.log(loginToken);
    } catch (e) {
      console.error(e);
    }
  }

  const doRegister = async () => {
    try {
      const register = await new LoginService().regsterTelegram(loginCode);
      console.log(register);
      alert(register.data.message);
    } catch (e) {
      console.log(e.response);
      alert(e.response.data.message);
    }
  }

  const renderCardContent = () => {
    switch (page) {
      
      case "LOGIN":
        return (
          <IonCardContent>
            <IonText>
              Olá, seja bem-bindo(a)!<br />
                    Se você já possui uma conta escolha um método de login abaixo.<br />
                    Se você  não possuiu uma conta ainda está eseprando o que? Escolha um método de cadastro abaixo e crie uma conta agora mesmo.
                  </IonText>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Métood de login:</IonLabel>
                <IonSelect value={loginMethod} onIonChange={(e: any) => { setLoginMethod(e.target.value); }}>
                  <IonSelectOption value={'USERNAME'}>Usuário e Senha</IonSelectOption>
                  <IonSelectOption value={'TELEGRAM'}>Telegram</IonSelectOption>
                </IonSelect>
              </IonItem>
              {
                loginMethod == 'USERNAME' ?
                  (
                    <>
                      <IonItem>
                        <IonLabel position="stacked">Usuário</IonLabel>
                        <IonInput type="text" value={username} onIonChange={(e: any) => { setUser(e.target.value); }}></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel position="stacked">Senha</IonLabel>
                        <IonInput type="password" value={password} onIonChange={(e: any) => { setPassword(e.target.value) }}></IonInput>
                      </IonItem>
                    </>
                  ) :
                  (
                    <>
                      <IonItem>
                        <IonLabel position="stacked">Usuário</IonLabel>
                        <IonInput type="text" value={username} onIonChange={(e: any) => { setUser(e.target.value); }}></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel position="stacked">Código de login</IonLabel>
                        <IonInput type="text" value={loginCode} onIonChange={(e: any) => { setLoginCode(e.target.value); }}></IonInput>
                      </IonItem>
                    </>
                  )
              }
              <IonButton mode="ios" expand="block" onClick={(e) => { e.preventDefault(); doLogin(); }}>
                <IonLabel>Entrar</IonLabel>
              </IonButton>
              <IonButton mode="ios" expand="block" fill="clear" onClick={(e) => { e.preventDefault(); setPage("REGISTER") }}>
                <IonLabel>Ainda não possui um cadastro? Realizar cadastro</IonLabel>
              </IonButton>
            </IonList>
          </IonCardContent>
        );
        break;
      case "REGISTER":
        return (
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Métood de Cadastro:</IonLabel>
                <IonSelect value={loginMethod} onIonChange={(e: any) => { setLoginMethod(e.target.value); }}>
                  <IonSelectOption value={'USERNAME'}>Usuário e Senha</IonSelectOption>
                  <IonSelectOption value={'TELEGRAM'}>Telegram</IonSelectOption>
                </IonSelect>
              </IonItem>
              {
                loginMethod == 'USERNAME' ?
                  (
                    <>
                      <IonText>
                        Preencha os dados de cadastro abaixo para serem utilizados futuramente para realizar login no aplicativo.<br />
                        Outras informações como nome completo e telefone estarão disponíveis para serem preenchidas após o cadastro.
                      </IonText>
                      <IonItem>
                        <IonLabel position="stacked">Usuário</IonLabel>
                        <IonInput type="text" value={username} onIonChange={(e: any) => { setUser(e.target.value); }}></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel position="stacked">Senha</IonLabel>
                        <IonInput type="password" value={password} onIonChange={(e: any) => { setPassword(e.target.value) }}></IonInput>
                      </IonItem>
                    </>
                  ) :
                  (
                    <>
                      <IonText>
                        Em seu telegram procure por <IonText color="primary">@Baauth_bot</IonText> e em seguida, envie:&nbsp;&nbsp;
                        <IonText color="primary">/start</IonText> - para obter um código de cadastro. Cole-o no campo abaixo e clique em "Cadastrar".
                      </IonText>
                      <IonItem>
                        <IonLabel position="stacked">Código de Cadastro</IonLabel>
                        <IonInput type="text" style={{textAlign: "center"}}
                          value={loginCode} onIonChange={(e: any) => { setLoginCode(e.target.value); }}></IonInput>
                      </IonItem>
                    </>
                  )
              }
              <br />
              <IonButton mode="ios" expand="block" fill="solid" color="tertiary" onClick={(e) => { e.preventDefault(); doRegister(); }}>
                <IonLabel>Cadastrar</IonLabel>
              </IonButton>
              <IonButton mode="ios" expand="block" fill="clear" onClick={(e) => { e.preventDefault(); setPage("LOGIN") }}>
                <IonLabel>Já possui um cadastro? Realizar login</IonLabel>
              </IonButton>
            </IonList>
          </IonCardContent>
        );
        break;
      default:
        return ("A page");
        break;
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                {renderCardContent()}
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;