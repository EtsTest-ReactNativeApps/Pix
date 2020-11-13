import React, {useState, useContext} from 'react';
import {Dimensions} from 'react-native';
import PixelArt from '../components/PixelArt';
import styled from 'styled-components/native';
import CustomHeader from '../components/CustomHeader';
import {SCREEN_PADDING} from '../theme';
import firestore from '@react-native-firebase/firestore';
import User from '../stores/User';

const ScrollView = styled.ScrollView`
  background: ${({theme}) => theme.secondary};
`;

const PublishButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 70px;
  background: ${({theme}) => theme.accent};
  border-radius: 4px;
`;

const PublishText = styled.Text`
  color: ${({theme}) => theme.secondary};
  font-size: 14px;
  font-weight: 600;
`;

const ContentWrapper = styled.View`
  padding: ${SCREEN_PADDING}px;
  margin-top: 15px;
`;

const Label = styled.Text`
  font-weight: 600;
  font-size: 14px;
  margin: 5px 0;
`;

const TextInput = styled.TextInput`
  border-radius: 4px;
  background: ${({theme}) => theme.secondary};
  border: 1px;
  border-color: ${({theme}) => theme.uiAccent};
  padding: 10px;
  font-size: 12px;
  margin-bottom: 10px;
  height: 100px;
`;

const Publish = ({route}) => {
  const {canvasData, backgroundColor} = route.params;
  const userStore = useContext(User);
  const [desc, setDesc] = useState('');

  const sendPost = () => {
    const data = {
      user: {
        id: userStore.user.uid,
        displayName: userStore.user.displayName,
      },
      data: {
        backgroundColor,
        pixels: canvasData,
      },
      desc,
      likes: [],
    };
    firestore()
      .collection('Posts')
      .add(data)
      .then(() => {
        console.log('post submitted!');
        // navigate
      });
  };

  const headerRight = (
    <PublishButton onPress={sendPost}>
      <PublishText>Publish</PublishText>
    </PublishButton>
  );

  return (
    <>
      <CustomHeader title="Publish" back rightComponent={headerRight} />
      <ScrollView>
        <PixelArt
          data={canvasData}
          backgroundColor={backgroundColor}
          size={Dimensions.get('window').width}
        />
        <ContentWrapper>
          <Label>A quick word about your masterpiece ?</Label>
          <TextInput
            value={desc}
            onChangeText={(str) => str.length < 200 && setDesc(str)}
            multiline></TextInput>
          <Label>I’m participating in this month challenge</Label>
        </ContentWrapper>
      </ScrollView>
    </>
  );
};

export default Publish;
