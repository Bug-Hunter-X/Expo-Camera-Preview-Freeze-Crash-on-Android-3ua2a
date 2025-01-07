```javascript
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

const BugSolution = () => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(CameraType.back);
  const [cameraRef, setCameraRef] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraSwitch = async () => {
    if (cameraRef) {
      try {
        await cameraRef.setType(type === CameraType.back ? CameraType.front : CameraType.back);
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
      } catch (error) {
        Alert.alert('Camera Error', `Error switching cameras: ${error.message}`);
      }
    }
  };

  if (hasPermission === null) {
    return <View><Text>Requesting camera permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={(ref) => setCameraRef(ref)}>
      </Camera>
      <Button title="Flip Camera" onPress={handleCameraSwitch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default BugSolution;
```