import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import tw from 'twrnc'
import { useRouter } from 'expo-router';
const index = () => {

    const router = useRouter();

    return (
        <ScrollView>
            <LinearGradient colors={["#E0EAFC", "#CFDEF3"]} style={{ flex: 1 }}>
                <View style={tw`p-[12px]`}>
                    <View style={[tw`flex-row items-center justify-between p-3`, {}]}>

                        <Feather name="bar-chart" size={24} color="black" />
                        <Text style={[tw`text-lg font-medium`, {}]}>Employee Management System</Text>
                        <Entypo name="lock" size={24} color="black" />
                    </View>
                    <View style={tw`gap-2 flex-row items-center`}>
                        <Pressable style={[tw`bg-[#D3CCE3] p-[12px] items-center justify-center rounded-xl flex-1`, {}]}  onPress={() => { router.push("/(home)/employees")}}>
                            <View style={[tw`w-[50px] h-[50px] rounded-full bg-white items-center justify-center`]}>
                                <Ionicons name="people-sharp" size={24} color="black" />
                            </View>
                            <Text style={[tw`mt-2 font-medium`]}>Employee List</Text>
                        </Pressable>

                        <Pressable style={[tw`bg-[#D3CCE3] p-[12px] items-center justify-center rounded-xl flex-1`, {}]} onPress={()=>router.push("/(home)/markattendance")}>
                            <View style={[tw`w-[50px] h-[50px] rounded-full bg-white items-center justify-center`]}>
                                <Ionicons name="people-sharp" size={24} color="black" />
                            </View>
                            <Text style={[tw`mt-2 font-medium`]}>Mark Attendance</Text>
                        </Pressable>
                    </View>
                    <View style={tw`mt-[20px] bg-white p-3 items-center rounded-xl gap-5`}>
                        <Pressable style={tw`flex-row items-center justify-center  rounded-xl bg-[#BE93C5] p-[10px] `}>
                            <View style={tw`p-[7px] h-[45px] bg-white items-center justify-center rounded-xl w-[45px] `}>
                                <Ionicons name="newspaper-outline" size={24} color="black" />

                            </View>
                            <Text style={tw`ml-[10px] text-lg flex-1`}>Attendance Report</Text>
                            <View style={tw`w-[35px] h-[35px] rounded-xl bg-white items-center justify-center`}>
                                <Entypo name="chevron-right" size={24} color="black" />

                            </View>
                        </Pressable>

                        <Pressable style={tw`flex-row items-center justify-center  rounded-xl bg-[#BE93C5] p-[10px] `} onPress={()=>router.push("(home)/summery")}>
                            <View style={tw`p-[7px] h-[45px] bg-white items-center justify-center rounded-xl w-[45px] `}>
                                <Octicons name="repo-clone" size={24} color="black" />

                            </View>
                            <Text style={tw`ml-[10px] text-lg flex-1`}>Summery Report</Text>
                            <View style={tw`w-[35px] h-[35px] rounded-xl bg-white items-center justify-center`}>
                                <Entypo name="chevron-right" size={24} color="black" />

                            </View>
                        </Pressable>

                        <Pressable style={tw`flex-row items-center justify-center  rounded-xl bg-[#BE93C5] p-[10px] `}>
                            <View style={tw`p-[7px] h-[45px] bg-white items-center justify-center rounded-xl w-[45px] `}>
                                <Octicons name="report" size={24} color="black" />
                            </View>
                            <Text style={tw`ml-[10px] text-lg flex-1`}>All Genrate Report</Text>
                            <View style={tw`w-[35px] h-[35px] rounded-xl bg-white items-center justify-center`}>
                                <Entypo name="chevron-right" size={24} color="black" />

                            </View>
                        </Pressable>

                        <Pressable style={tw`flex-row items-center justify-center  rounded-xl bg-[#BE93C5] p-[10px] `}>
                            <View style={tw`p-[7px] h-[45px] bg-white items-center justify-center rounded-xl w-[45px] `}>
                                <Ionicons name="people" size={24} color="black" />

                            </View>
                            <Text style={tw`ml-[10px] text-lg flex-1`}>Overtime Employees</Text>
                            <View style={tw`w-[35px] h-[35px] rounded-xl bg-white items-center justify-center`}>
                                <Entypo name="chevron-right" size={24} color="black" />

                            </View>
                        </Pressable>
                    </View>
                    <View style={tw`gap-3 mt-[20px] items-center flex-row`}>
                        {/* First Card */}
                        <View style={tw`bg-[#F79D00] gap-2 rounded-xl p-3 flex-1 items-center justify-center h-[100px]`}>
                            <View style={tw`w-[35px] h-[35px] rounded-lg bg-white items-center justify-center`}>
                                <MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="black" />
                            </View>
                            <Text style={tw`font-medium text-center`}>Attendance Criteria</Text>
                        </View>

                        {/* Second Card */}
                        <View style={tw`bg-[#ABCABA] gap-2 rounded-xl p-3 flex-1 items-center justify-center h-[100px]`}>
                            <View style={tw`w-[35px] h-[35px] rounded-lg bg-white items-center justify-center`}>
                                <Feather name="bar-chart" size={24} color="black" />
                            </View>
                            <Text style={tw`font-medium text-center`}>Increases Workflow</Text>
                        </View>
                    </View>

                    <View style={tw`gap-3 mt-[20px] items-center flex-row`}>
                        {/* Third Card */}
                        <View style={tw`bg-[#D3CCE3] gap-2 rounded-xl p-3 flex-1 items-center justify-center h-[100px]`}>
                            <View style={tw`w-[35px] h-[35px] rounded-lg bg-white items-center justify-center`}>
                                <MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="black" />
                            </View>
                            <Text style={tw`font-medium text-center`}>Cost Savings</Text>
                        </View>

                        {/* Fourth Card */}
                        <View style={tw`bg-[#BDC3c7] gap-2 rounded-xl p-3 flex-1 items-center justify-center h-[100px]`}>
                            <View style={tw`w-[35px] h-[35px] rounded-lg bg-white items-center justify-center`}>
                                <Feather name="bar-chart" size={24} color="black" />
                            </View>
                            <Text style={tw`font-medium text-center`}>Employee Performance</Text>
                        </View>
                    </View>

                </View>
            </LinearGradient>
        </ScrollView>
    )
}

export default index

const styles = StyleSheet.create({})