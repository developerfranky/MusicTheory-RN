import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Button,
  AsyncStorage,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';

import * as RNIap from 'react-native-iap';
import * as colors from '../colors';
import { setHasPurchaseFullVersion  } from '../../redux_actions';
import {scaledSize} from '../utils';

const itemSkus = Platform.select({
  ios: [
    'upgrade_to_pro'
  ],
  android: [
    'upgrade_to_pro'
  ]
});

class UpgradeScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {products: [], progressTitle: 'Upgrade Now!'  };
    this.purchasePro = this.purchasePro.bind(this);
    this.getPurchases = this.getPurchases.bind(this);
  }

  // async function() {
  //   try {
  //     await RNIap.prepare();
  //     // Ready to call RNIap.getProducts(), etc.
  //   } catch(err) {
  //     // alert('error in async func');
  //     // console.warn(err); // standardized err.code and err.message available
  //   }
  // }  

  renderProducts() {
    return this.state.products.map(iap => {
      console.log('inside renderProducts');
      return <View key={iap.productId}>
        <Text style={{fontWeight: 'bold'}}>Product Information</Text>
        <Text>{iap.title}:{iap.description} Only {iap.localizedPrice}</Text>
      </View>
    });
  }

  async componentDidMount() {
    console.log('RNIap.ap');
    console.log(RNIap.ap);
    try {
      await RNIap.prepare();
      const products = await RNIap.getProducts(itemSkus);
      // alert('success');
      console.log(products)
      this.setState({ products });
    } catch(err) {
      alert('error in prepare: ' + err.message)
      console.warn(err); // standardized err.code and err.message available
    }
  }
  
  componentWillUnmount() {
    RNIap.endConnection();
  } 

  async getPurchases() {
    console.log('running getPurchases.');
    try {
      const purchases = await RNIap.getAvailablePurchases();
      purchases.forEach(purchase => {
        if (purchase.productId == 'upgrade_to_pro') {
          this.props.setHasPurchaseFullVersion();
          AsyncStorage.setItem('user_is_pro', 'true', (error) => {
              if (error) {
                  console.log(error);
              };
          });
        } 
      })
    } catch(err) {
      // console.warn(err); // standardized err.code and err.message available
      // alert(err.message);
    }
  }


  purchasePro() {
    console.log('pressed purchase pro');
    this.setState({ progressTitle: 'Please wait...' });
    RNIap.buyProduct('upgrade_to_pro').then(purchase => {
        console.log(purchase.transactionReceipt);
        this.setState({
          // receipt: purchase.transactionReceipt, // save the receipt if you need it, whether locally, or to your server.
          progressTitle: 'Purchase Successful!',
          // coins: this.state.coins + 100
        });
        this.props.setHasPurchaseFullVersion();
        AsyncStorage.setItem('user_is_pro', 'true', (error) => {
            if (error) {
                console.log(error);
            };
        });
      }).catch(err => {
        // resetting UI
        console.warn(err); // standardized err.code and err.message available
        this.setState({ progressTitle: 'Upgrade Now!' });
        alert(err.message);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <Text style={{fontSize: scaledSize(22), fontWeight: 'bold', textAlign: 'center', margin: 30, }}>Experience Music Minutes Seamlessly</Text>
          <Text style={{fontSize: scaledSize(18), textAlign: 'center', margin: 10 }}>Hate ads and interruptions? Music Minutes Pro is what you want.</Text>
          <Text style={{fontSize: scaledSize(18), textAlign: 'center', margin: 10 }}>No more coin system, all topics will be unblocked.</Text>
          <Text style={{fontSize: scaledSize(18), textAlign: 'center', margin: 10 }}>Pro membership is for life and all future pro features will be included in the upgrade.</Text>
          <Text style={{fontSize: scaledSize(18), textAlign: 'center', margin: 10 }}>{this.state.progressTitle}</Text>
        </ScrollView>
        {this.props.user_is_pro && 
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10}}>You have upgraded to pro!</Text>
        }
        {!this.props.user_is_pro && 
        <View style={styles.bottom}>
          {this.renderProducts()}
          <Button 
            onPress={this.purchasePro}
            title="Upgrade Now"
            style={styles.purchase_button}
            />
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  bottom: {
    backgroundColor: colors.light_gray,
    padding: 10,
  },
  purchase_button: {
    paddingTop: 'auto',
  },
});

const mapStateToProps = (state) => {
    const { user_is_pro } =  state.purchases;
    return { user_is_pro };
 };

export default connect(mapStateToProps, {setHasPurchaseFullVersion})(UpgradeScreen);
