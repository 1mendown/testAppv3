import React,{ Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppRegistry,StyleSheet,Text,SafeAreaView,FlatList,Image,View,ActivityIndicator,TouchableWithoutFeedback,Button,Modal,TouchableHighlight,CheckBox} from 'react-native';
import { List, ListItem, SearchBar,} from 'react-native-elements';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
import RadioForm, {RadioButton,RadioButtonInput,RadioButtonLabel} from 'react-native-simple-radio-button';

var sortList = [
  {label: 'Partner Stores', value: 0 },
  {label: 'Highest Ratings', value: 1 },
  {label: 'Nearest', value: 2 },
  {label: 'Alphabetical', value: 3 }
];



class restaurant extends Component {

	static navigationOptions = ({ navigation }) => {
	return {
		title:'Restaurants',
		headerStyle: {
      backgroundColor: '#269fc5',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold', position:'absolute',left:'35%'},
   	}};


  constructor(props){
    super(props);
      this.state = {
          data: [],
          loaded: true,
          error: null,
          query:"",
          fullData:[],
          modal:false,
          one:false,
          two:false,
          three:false,
          four:false,
      };
      this.arrayholder = [];

  }



selectedSort =(value) => {
  if(value == 0) {
    alert('Partner Stores');
  }
  if(value == 1){
    alert('Highest Ratings');
  }
  if(value == 2){
      alert('nearest');

  }
  if(value == 3){
    alert('Alphabetical');
  }
  else{
    return baseURL = 'https://my-json-server.typicode.com/1mendown/mockJson/Restaurants';
  }
}



    Error = (err) => {
        this.setState({loaded: true, error: err.message});
    }


    componentDidMount = () => {

      let url = this.selectedSort();
      let req = new Request(url, {
          method: 'GET'
      });
      fetch(req)
      .then(response=>response.json())
      .then(response = (data)=>{
        this.setState({loaded:true, data});
        this.arrayholder = data;
        this.state.data = this.state.data.sort((a,b)=>{
            return a.distance - b.distance;
        })
      })

      .catch(this.Error)

    }


      searchFilterFunction = (text) => {
        this.setState({
          value: text,
        });

        const newData = this.arrayholder.filter(item => {
          const itemData = `${item.resName.toLowerCase()} ${item.address.toLowerCase()}`;
          const textData = text.toLowerCase();

          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          data: newData,
        });
      };




 renderHeader = () => {
    return (
      <View style={{backgroundColor:'#269fc5'}}>
      <SearchBar placeholder=" Search by Restaurant Name"
      lightTheme
      placeholderTextColor='#269fc5'
      containerStyle={{backgroundColor: '#269fc5'}}
      inputStyle={{backgroundColor:'#fff'}}
      round
      onChangeText={text => this.searchFilterFunction(text)}
      autoCorrect={false}
      value={this.state.value}
      />
      </View>
      )
  };

	handleModal = (bool) => {
		this.setState({
			modal: bool
		})
	}


  renderSeparator = () => {
    return (
        <SafeAreaView
          style={{height:0.5,width:'100%',backgroundColor:'#269fc5',height:1}}>
          </SafeAreaView>

      )
  }



  render() {

    const isLoading = this.state.loading;
          return (

        isLoading ?

           <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

            <ActivityIndicator size="large" color="#269fc5" animating/>
              <Text> Loading Restaurants </Text>

           </View>

           :

          <SafeAreaView style={styles.container}>

          <SafeAreaView style={{backgroundColor:'#269fc5'}}>
                  <View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',top:'5%'}}>
                      <Icon name="md-restaurant" size={36} color="black"/>
                      <Icon name="ios-home" size={36} color="yellow"/>
                      <Icon name="ios-restaurant" size={36} color="black"/>

                    </View>
                    <View style={{alignItems:'flex-end',marginRight:12}}>
                         <Icon name="ios-options" size={36} color="whitesmoke"  onPress={()=> this.handleModal(true)}/>
                    </View>
                  </View>
          </SafeAreaView>



          <FlatList

             data={this.state.data}
               keyExtractor={(item,index) => index.toString()}
                ItemSeparatorComponent ={this.renderSeparator}
                  ListHeaderComponent={this.renderHeader}
                    renderItem={({ item }) =>

             <SafeAreaView style={{flex:1,flexDirection:'row',marginBottom:3}}>
                  <Image style={{width:120,height:120,margin:5,resizeMode:'contain'}}
                      source={{uri:item.image}}/>
                      <View>
                          <Text style={{position:'absolute',top:'15%',color:'#1da548'}}>
                              {item.status}
                          </Text>
                          <Text style={{marginTop:"30%",fontWeight:'bold'}}>
                              {item.resName}
                          </Text>
                          <Text style={{fontSize:12,opacity:0.7}}>
                              {item.address}
                          </Text>
                      <View  style={{position:'absolute',right:"-70%",marginTop:'10%'}}>
                          <Text style={{backgroundColor:'green',padding:2,borderRadius:10,zIndex:2,color:'whitesmoke'}}>
                              {item.ratings} <Icon name="ios-star" size={14} />
                          </Text>
                      </View>
                      <View style={{position:'absolute',right:"-65%",marginTop:'25%'}}>
                          <Text style={{fontSize:12,color:'orange'}}>
                              {item.distance}km
                          </Text>
                      </View>
                      </View>
              </SafeAreaView>
           }
          />


  <Modal transparent={true} visible={this.state.modal} animationType="fade">
        <View style={{width:'80%',height:'50%',justifyContent:'center',alignSelf:'center',top:'15%',backgroundColor:'whitesmoke',borderRadius:25}}>
                     <View style={{position:'absolute',top:'5%',justifyContent:'center',alignSelf:'center',borderBottomWidth:0.5,width:'100%'}}>
                            <View style={{justifyContent:'center',alignSelf:'center'}}>
                              <Text style={{fontSize:20,justifyContent: 'center'}}> Sort by </Text>
                            </View>
                     </View>
                    		<View style={{position:'absolute',right:15,top:4}}>
                    			<Icon name="ios-close" size={40} color="black" onPress={this.handleModal}/>
                    		</View>


                <View style={{postion:'absolute',left:'80%'}}>

                        <RadioForm
                          radio_props={sortList}
                          initial={-1}
                          labelHorizontal={true}
                          buttonColor={'#269fc5'}
                          labelStyle={{position: 'absolute', left: -270,fontSize: 20}}
                          selectedButtonColor={'orange'}
                          selectedLabelColor={'orange'}
                          buttonStyle={{borderRadius: 25}}
                          buttonWrapStyle={{marginLeft: 10}}
                          onPress={(value) => {this.setState({value:value});this.selectedSort(value)}}
                        />


                </View>


               	<View style={{top:'15%'}}>
                      			<View style={{width:'30%',position:'absolute',left:'15%',borderRadius:25 }}>
                      				<Button
                      					style={{borderRadius:25}}
                      					title="Cancel"
                      					onPress={this.handleModal}
                      					/>
                      			</View>
                      			<View style={{width:'30%',position:'absolute',right:'15%',borderRadius:25 }}>
                      				<Button
                      					style={{borderRadius:25}}
                      					title="Okay"
                      					onPress={this.handleModal}
                      					/>
                      			</View>
          		 	</View>
  		     </View>
  		</Modal>
</SafeAreaView>
          );
  }




}

export default restaurant;

const styles = StyleSheet.create({
    container:{
    flex:1,

  }
});
