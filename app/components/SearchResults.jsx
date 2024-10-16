import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from "twrnc"
const SearchResults = ({data , input , setInput}) => {
  return (
    <View style={tw`p-[10px]`}>
      <FlatList
        data={data}
        renderItem={({item}) => {
            if(item?.employeeName.toLowerCase().includes(input.toLowerCase()))
            return (
                <View style={tw`my-[10px] gap-[10px] flex-row`}>
                    <View style={tw`w-[50px] h-[50px] rounded-lg p-[10px] bg-[#4b6cb7] items-center justify-center`}>
                        <Text style={tw`text-white font-bold`}>{item?.employeeName?.charAt(0)}</Text>
                    </View>
                    <View>
                        <Text style={tw`text-lg font-bold`}>{item?.employeeName}</Text>
                        <Text style={tw`text-sm text-gray-600`}>{item?.designation} ({item?.employeeId})</Text>

                    </View>
                </View>
            )
        }}
      >

      </FlatList>
    </View>
  )
}

export default SearchResults

const styles = StyleSheet.create({})