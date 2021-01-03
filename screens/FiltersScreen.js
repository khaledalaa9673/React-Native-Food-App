import React,{useState,useEffect,useCallback} from "react"
import {View,Text,StyleSheet,TouchableOpacity ,Switch} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Colors from "../constants/colors"
import { useDispatch } from 'react-redux';
import { setFilters } from '../actions/meals';


const FilterSwitch = props => {
    return (
      <View style={styles.filterContainer}>
        <Text>{props.label}</Text>
        <Switch
          trackColor={{ true: Colors.primary }}
          thumbColor={Platform.OS === 'android' ? Colors.primary : ''}
          value={props.state}
          onValueChange={props.onChange}
        />
      </View>
    );
  };

 const FiltersScreen=(props)=>{
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const dispatch = useDispatch();
  const saveFilters = useCallback(() => {

    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      isVegetarian: isVegetarian
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters ]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={newValue => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label="Lactose-free"
        state={isLactoseFree}
        onChange={newValue => setIsLactoseFree(newValue)}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={newValue => setIsVegan(newValue)}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={newValue => setIsVegetarian(newValue)}
      />
    </View>
  );

}

FiltersScreen.navigationOptions= (navData)=> ({
        headerTitle:"Filters",
        headerLeft:()=>{
            return(
                <TouchableOpacity style={styles.iconBox}>
                      <Ionicons name="ios-arrow-dropleft" size={30} color="black" onPress={()=>{
                        navData.navigation.navigate({routeName:"Categories"})
                      }
                    
                    }/>
                    </TouchableOpacity>
            )
        },
        headerRight:()=>{
          return(
              <TouchableOpacity activeOpacity={.1} style={styles.iconBox}>
                    <Ionicons name="ios-save" size={30} color="black" onPress={ 
                      navData.navigation.getParam("save")
                    }
                  
                   />
                  </TouchableOpacity>
          )
      },
       
        })
 

 const styles=StyleSheet.create({
      
     iconBox:{
         padding:15,
         justifyContent:"center",
         alignItems:"center"
     },
     screen: {
        flex: 1,
        alignItems: 'center'
      },
      title: {
        fontFamily: 'OpenSans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
      },
      filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
      }
    
 })

 export default  FiltersScreen