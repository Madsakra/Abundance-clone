import { Ionicons } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import SearchSection from '~/components/SearchSection';
import { EDAMAM_APP_ID, EDAMAM_APP_KEY } from '~/utils';

export default function CookedMeals() {

    const [foodName,setFoodName] = useState<string>("");
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isRenewing, setIsRenewing] = useState(false); // Track if renewing search
    const PAGE_SIZE = 10; // Number of results per page


    
   


    const baseUrl = "https://api.edamam.com/api/recipes/v2";
    const params = {
        type: "public",
        q: foodName,
        app_id: "569abc82",
        app_key: "0e9a1db25af81668a3958305c56299b4",
        imageSize: "SMALL",
        random: true,
      };

    // Trigger a new search
    const renewSearch = async () => {
        if (loading) return;

        setIsRenewing(true);
        setData([]); // Clear current data
        setPage(0);
        setHasMore(true);

        await searchForFood(); // Start new search
        setIsRenewing(false);
    };


    const searchForFood = async ()=>{
        if (!hasMore || loading) return;
    
        setLoading(true);
    
        try {
          const from = page * PAGE_SIZE;
          const to = from + PAGE_SIZE;
    
          const response = await axios.get(baseUrl,{params});
    
          const newData = response.data.hits.map((hit: any) => hit.recipe);
    
          setData((prevData) => [...prevData, ...newData]); // Append new results
          setHasMore(newData.length > 0); // Stop if no more results
          setPage((prevPage) => prevPage + 1); // Increment page
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };


      const renderItem = ({ item }: { item: any }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc",flexDirection:"row" }}>
            {/* Display the recipe image */}

            {item.image?
            <Image 
            source={{ uri: item.image }} 
            style={{ 
                width: 80, 
                height: 80, 
                borderRadius: 10, 
                marginRight: 10 // Add spacing between image and text
            }} 
            />:
            <View style={{width:80,height:80,borderRadius:10,marginRight:10,backgroundColor:"gray"}}>
            
            </View>            
            }

        

           <View style={{flex:1,gap:10}}>
           <Text style={{ fontSize: 18, fontFamily:"Poppins-Medium" }} numberOfLines={1} ellipsizeMode='tail'>{item.label}</Text>
           <Text style={{fontFamily:"Poppins-Bold",fontSize:15,color:"#C68F5E"}}>{Math.round(item.calories)} kcal / {item.yield} servings</Text>
           </View>

        </View>
      );



  return (
    <View style={{flex:1}}>

        <View style={styles.topHeaderContainer}>
            {/*FIRST ROW*/}
            <View style={styles.firstRowContainer}>
                <Text style={styles.headerText}>Cooked Meals</Text>

                <Pressable style={styles.topRightButton}>
                    <Ionicons name="camera" size={20} color="#C68F5E" style={{paddingBottom:3}}/>
                    <Text style={styles.topRightButtonText}>Scan Food</Text>
                </Pressable>           
            </View>

             {/*Input Row*/}
            <SearchSection
            value={foodName}
            setValue={setFoodName}
            searchFunction={renewSearch}
            />
        </View>

        
        
      
      {/* FlashList Section */}
      {isRenewing ? (
        // Show Activity Indicator during a new search
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : data.length > 0 ? (
        <FlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={100}
          keyExtractor={(item, index) => `${item.label}-${index}`}
          onEndReached={searchForFood} // Load more data when reaching the end
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style={{ margin: 10 }}
              />
            ) : null
          }
        />
      ) : (
        // Show "No data yet" when no data is available
        <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
          No data yet
        </Text>
      )}
      
  
    
 




    </View>
  )
}


const styles = StyleSheet.create({
    topHeaderContainer:{
        backgroundColor:"#C68F5E",
        paddingBottom:10
    },

    firstRowContainer:{
        padding:18,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingBottom:4
    },

    headerText:{
        color:"white",
        fontFamily:"Poppins-Bold",
        fontSize:20
    },

    topRightButton:{
        backgroundColor:"white",
        padding:10,
        borderRadius:5,
        flexDirection:"row", 
        alignItems: "center" 
    },

    topRightButtonText:{
        color:"#C68F5E",
        fontFamily:"Poppins-Medium",
        fontSize:15,
        marginLeft:8
    }
    

})