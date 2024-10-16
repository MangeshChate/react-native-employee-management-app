import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc"
import { useRouter } from 'expo-router'
import axios from 'axios'

const addetails = () => {
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [designation, setDesignation] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dob, setDob] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [salary, setSalary] = useState('');
  const [address, setAddress] = useState('');


  const handleRegister = async()=>{
      const employeeData = {
        employeeName:name,
        employeeId:employeeId,
        designation:designation,
        phoneNumber:mobileNumber,
        dateOfBirth:dob,
        joiningDate:joiningDate,
        activeEmployee:true,
        salary:salary,
        address:address,
      }

      axios.post("http://192.168.1.7:8000/api/employee", employeeData)
      .then(()=>{
          Alert.alert("Registration Successfull" , "Employee added successfully");

          setName(' ');
          setEmployeeId(' ');
          setDesignation(' ');
          setMobileNumber(' ');
          setDob(' ');
          setJoiningDate(' ');
          setSalary(' ');
          setAddress(' ');
         }).catch((error)=>{
          Alert.alert("Registration Failed" , "Employee not added");
          console.log(error)
         });
    }
  
  

  const router = useRouter();

  return (
    <ScrollView style={tw`mb-5`}>
      <View style={tw`p-[10px]`}>
        <Text style={tw` font-bold`}>Add a New Employeee</Text>
        <TextInput
          style={tw`p-[10px] border-[#D0D0D0] rounded-lg border mt-[10px]`}
          placeholder='johnn doe'
          placeholderTextColor={"black"}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={tw`p-[10px]`}>
        <Text style={tw` font-bold`}>Employee Id</Text>
        <TextInput
          style={tw`p-[10px] border-[#D0D0D0] rounded-lg border mt-[10px]`}
          placeholder='Enter Full Name'
          placeholderTextColor={"black"}
          value={employeeId}
          onChangeText={setEmployeeId}
        />
      </View>

      <View style={tw`p-[10px]`}>
        <Text style={tw` font-bold`}>Designation</Text>
        <TextInput
          style={tw`p-[10px] border-[#D0D0D0] rounded-lg border mt-[10px]`}
          placeholder='Enter Designation'
          placeholderTextColor={"black"}
          value={designation}
          onChangeText={setDesignation}
        />
      </View>

      <View style={tw`p-[10px]`}>
        <Text style={tw` font-bold`}>Mobile Number</Text>
        <TextInput
          style={tw`p-[10px] border-[#D0D0D0] rounded-lg border mt-[10px]`}
          placeholder='Enter Mobile NUmber'
          placeholderTextColor={"black"}
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
      </View>

      <View style={tw`p-[10px]`}>
        <Text style={tw` font-bold`}>Date Of Birth</Text>
        <TextInput
          style={tw`p-[10px] border-[#D0D0D0] rounded-lg border mt-[10px]`}
          placeholder='Enter DOB'
          placeholderTextColor={"black"}
          value={dob}
          onChangeText={setDob}
        />
      </View>

      <View style={tw`p-[10px]`}>
        <Text style={tw` font-bold`}>Joining Date</Text>
        <TextInput
          style={tw`p-[10px] border-[#D0D0D0] rounded-lg border mt-[10px]`}
          placeholder='Enter Joining Date'
          placeholderTextColor={"black"}
          value={joiningDate}
          onChangeText={setJoiningDate}
        />
      </View>

      <View style={tw`flex-row  items-center justify-between p-[10px]`}>
        <Text>Active Employee</Text>
        <Text style={tw`text-blue-400 font-bold underline`}>true</Text>
      </View>

      <View style={tw`p-[10px]`}>
        <Text style={tw` font-bold`}>Salary</Text>
        <TextInput
          style={tw`p-[10px] border-[#D0D0D0] rounded-lg border mt-[10px]`}
          placeholder='Enter Salary'
          placeholderTextColor={"black"}
          value={salary}
          onChangeText={setSalary}
        />
      </View>

      <View style={tw`p-[10px]`}>
        <Text style={tw` font-bold`}>Address</Text>
        <TextInput
          style={tw`p-[10px] border-[#D0D0D0] rounded-lg border mt-[10px]`}
          placeholder='Enter Address Date'
          placeholderTextColor={"black"}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={tw`flex-row mx-3 gap-3`}>
        <Pressable style={tw`bg-blue-300 p-3  items-center justify-center  rounded-xl flex-1`} onPress={handleRegister}>
          <Text style={tw` font-bold `}>Add Employee</Text>
        </Pressable>

        <Pressable style={tw`bg-red-200 p-3  items-center justify-center  rounded-xl flex-1`} onPress={() => router.push("/(home)/employees")}>
          <Text style={tw` font-bold `}>Cancle</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default addetails

const styles = StyleSheet.create({})
