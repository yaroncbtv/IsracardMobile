import * as React from 'react';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import {StyleProp, ViewStyle} from 'react-native';

// Props for LeftContent component
type LeftContentProps = {
  icon: string;
  style?: StyleProp<ViewStyle>;
};

// LeftContent component with props
const LeftContent: React.FC<LeftContentProps> = props => (
  <Avatar.Icon {...props} icon={props.icon} />
);

// Props for MyComponent
type Card = {
  title: string;
  //   subtitle: string;
  content: string;
  imageUri: string;
};

const CardComponent: React.FC<Card> = ({title, content, imageUri}) => (
  <Card style={{margin: 10}}>
    {/* <Card.Title
      title={title}
      subtitle={subtitle}
      left={props => <LeftContent {...props} icon="folder" />}
    /> */}
    <Card.Content>
      <Text variant="titleLarge">{title}</Text>
      <Text variant="bodyMedium">{content}</Text>
    </Card.Content>
    <Card.Cover source={{uri: imageUri}} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
);

export default CardComponent;
