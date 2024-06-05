import React, { useCallback, useEffect, useState } from 'react'
import {FlatList, View,Text, SafeAreaView,Image,ActivityIndicator,   LogBox} from 'react-native'
 import{bike} from '../data/Data1'
 let loadmore =true
export default function About(){
    const [data,setData]=useState([])
    const [page,setPage]=useState(0)
    const [limit,setLimit]=useState(8)
    const [loading,setLoading]=useState(false)
    LogBox.ignoreAllLogs();
    useEffect(()=>{
        fatchData()
    },[])

    function fatchData(){
        setLoading(true)
        
        let bike1=bike.slice(page,limit)
        setData([...data,...bike1])
        setPage(page+1)
        setLimit(limit+8)
       
        loadmore=false
        setLoading(false)
        }

    let renditem= useCallback(({item})=>{
        return(
            <>
            <View style={{height:200,backgroundColor:'red',marginHorizontal:10,marginVertical:10}}>
            <Text>{item.name}</Text>
            <Image source={item.img} style={{width:200,height:200}}/>
            </View>
            </>
        )
    }
,[data])
   
    
    function onEndReached(){
     
        setPage(prevPage => prevPage + 1);
    }
    return(
       <>
       <SafeAreaView>
       <FlatList
       data={data}
       renderItem={renditem}
       keyExtractor={index=>index.id}
       onEndReached={onEndReached}
       onEndReachedThreshold={.1}
       ListFooterComponent={()=>{
        return(
            loading&&<ActivityIndicator size="small" color="#0000ff" />
        )
       }}
       />
       </SafeAreaView>
       </>
    )
}