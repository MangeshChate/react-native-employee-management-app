import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from "twrnc"
import { Redirect } from 'expo-router'
const index = () => {
  return (
    <Redirect href="/(home)"/>
  )
}

export default index
 
const styles = StyleSheet.create({})