import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'


const Layout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="employees"/>
      <Stack.Screen name="addetails"/>
      <Stack.Screen name="markattendance"/>
      <Stack.Screen name="summery"/>

      <Stack.Screen name="[user]"/>



    </Stack>
  )
}

export default Layout

const styles = StyleSheet.create({})