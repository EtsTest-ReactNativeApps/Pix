import {useNavigation} from '@react-navigation/native';
import {Reaction} from 'mobx';
import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {HEADER_HEIGHT} from '../constants';

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${({insetTop}) => HEADER_HEIGHT + insetTop}px;
  padding: 0 10px;
  padding-top: ${({insetTop}) => insetTop}px;
  background: ${({theme}) => theme.secondary};
`;

const SectionWrapper = styled.View`
  width: 33%;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 15px;
`;

const EmptyPlaceholder = styled.View`
  width: 40px;
`;

interface Props {
  title: string;
  action?(): void;
  leftComponent?: React.Component;
  rightComponent?: React.Component;
  back?: boolean;
}

const CustomHeader = ({
  action,
  title,
  leftComponent,
  rightComponent,
  back,
}: Props) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <Wrapper insetTop={insets.top}>
      <SectionWrapper>
        {leftComponent ? (
          leftComponent
        ) : back ? (
          <Pressable onPress={navigation.goBack}>
            <Text>🙅‍♀️</Text>
          </Pressable>
        ) : (
          <EmptyPlaceholder />
        )}
      </SectionWrapper>
      <SectionWrapper style={{alignItems: 'center'}}>
        <Title>{title}</Title>
      </SectionWrapper>
      <SectionWrapper style={{alignItems: 'flex-end'}}>
        {rightComponent ? (
          rightComponent
        ) : action ? (
          <Pressable onPress={action}>
            <Text>👉</Text>
          </Pressable>
        ) : (
          <EmptyPlaceholder />
        )}
      </SectionWrapper>
    </Wrapper>
  );
};

export default CustomHeader;
