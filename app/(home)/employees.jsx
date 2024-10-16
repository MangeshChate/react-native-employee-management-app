import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from "twrnc"
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import SearchResults from '../components/SearchResults';

const employees = () => {
  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState('');
  const router = useRouter();



  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`http://192.168.1.7:8000/api/employees`);
        setEmployees(res.data.employees); 
      } catch (error) {
        console.log("Error Fetching Employee Data", error);
      }
    }
    fetchEmployees();
  }, []);
  
  useEffect(() => {
    if (employees && employees.length > 0) {
      console.log(`Number of employees: ${employees.length}`);
    }
  }, [employees]); 
  


  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row items-center bg-white `}>
        <Ionicons style={tw`ml-[10px]`} name="arrow-back" size={24} color="black" onPress={()=>router.push("/(home)")}/>
        <Pressable style={tw`flex-row items-center mx-[7px] bg-white h-[40px] rounded-xl gap-2 flex-1 `}>
          <Ionicons name="search" size={20} color="black" />
          <TextInput value={input} onChangeText={(text) => setInput(text)} placeholder='Search' style={tw`flex-1`} />
          {employees.length > 0 && (
            <View>
              <Pressable onPress={()=>router.push("/(home)/addetails")}>
                <Ionicons name="add-circle" size={24} style={tw`text-indigo-400`} />

              </Pressable>
            </View>
          )}

        </Pressable>
      </View>
     
     {employees.length > 0  ? (
        <SearchResults data={employees} input={input} setInput={setInput}/>
     ) :(
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg font-medium`}>No Employees Found</Text>
        <Text style={tw`text-sm font-medium text-slate-700`}>Add a Employee by Pressing Below Button</Text>

        <Pressable style={tw`mt-3`} onPress={()=>router.push("/(home)/addetails  ")}>
          <Ionicons name="add-circle-outline" size={24} color="black" />
        </Pressable>
      </View>
     )}
    </View>
  )
}

export default employees

const styles = StyleSheet.create({})