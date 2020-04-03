import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import Scanner from "react-native-document-scanner";

class ReceiptScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipt: null,
      flashEnabled: false,
      useFrontCam: false,
      captureMultiple: true,
    };
  }

  renderDetectionType() {
    switch (this.state.lastDetectionType) {
      case 0:
        return "Receipt is not recognized"
      case 1:
        return "Take the receipt from another angle";
      case 2:
        return "Put the receipt closer.";
      default:
        return "No receipt detected yet.";
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.receipt ?
          <Image style={{ flex: 1, width: 300, height: 200 }} source={{ uri: `data:image/jpeg;base64,${this.state.receipt}` }} resizeMode="contain" /> :
          <Scanner
            useBase64
            onPictureTaken={data => this.setState({ receipt: data.croppedImage })}
            overlayColor="rgba(190,210,24,0.7)"
            enableTorch={this.state.flashEnabled}
            useFrontCam={this.state.useFrontCam}
            brightness={0.2}
            saturation={0}
            quality={1.0}
            contrast={1.2}
            onRectangleDetect={({ stableCounter, lastDetectionType }) => this.setState({ stableCounter, lastDetectionType })}
            detectionCountBeforeCapture={10}
            detectionRefreshRateInMS={50}
            captureMultiple={this.state.captureMultiple}
            style={styles.scanner}
          />
        }
        <Text style={styles.instructions}>
          ({this.state.stableCounter || 0} correctly formated receipts detected
        </Text>
        <Text style={styles.instructions}>
          {this.renderDetectionType()}
        </Text>
        {this.state.receipt === null ?
          null :
          <TouchableOpacity style={styles.newPic} onPress={() => this.setState({ receipt: "" })}>
            <Text>Take another picture</Text>
          </TouchableOpacity>
        }
        <TouchableOpacity style={[styles.button, styles.left]} onPress={() => this.setState({ flashEnabled: !this.state.flashEnabled })}>
          <Text>📸 Use Flash</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.right]} onPress={() => this.setState({ useFrontCam: !this.state.useFrontCam })}>
          <Text>🧾 Use Front Cam</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  newPic: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    top: 20,
    bottom: 20,
    height: 40,
    width: 120,
    backgroundColor: '#FFF',
  },
  left: {
    left: 20,
  },
  right: {
    right: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  scanner: {
    flex: 1,
    width: 400,
    height: 200,
    borderColor: 'orange',
    borderWidth: 1
  }
});

export default ReceiptScanner