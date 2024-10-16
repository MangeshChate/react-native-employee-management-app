import { Alert, Pressable, StyleSheet, Text, TextInput, Vibration, View } from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc"
import moment from "moment"
import { useLocalSearchParams, useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import axios from 'axios'


const user = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState(moment());
    const [attendanceStatus, setAttendanceStatus] = useState("present")

    const [prevButtonColor, setPrevButtonColor] = useState('slate-200');
    const [nextButtonColor, setNextButtonColor] = useState('slate-200');

    const goToNextDay = () => {
        Vibration.vibrate(50);
        setNextButtonColor('blue-200');
        const nextDate = moment(currentDate).add(1, "days");
        setCurrentDate(nextDate);
        setTimeout(() => setNextButtonColor('slate-200'), 200);
    }

    const goToPrevDay = () => {
        Vibration.vibrate(50);
        setPrevButtonColor('blue-200');
        const prevDate = moment(currentDate).subtract(1, "days");
        setCurrentDate(prevDate);
        setTimeout(() => setPrevButtonColor('slate-200'), 200);

    }

    const formatDate = (date) => {
        return date.format("MMMM D, YYYY");
    }


    const submitAttendance = async () => {
        try {

            const attendaceData = {
                employeeId: params?.id,
                employeeName: params?.name,

                date: currentDate.format("MMMM D, YYYY"),
                status: attendanceStatus
            }

            const response = await axios.post("http://192.168.1.7:8000/api/attendance", attendaceData);

            if (response.status === 200) {
                Alert.alert(`Attendance marked successfully for ${params?.name}`);
                router.push("/(home)/markattendance")
            }



        } catch (error) {
            console.log("Error Submitting the attendance", error);
            Alert.alert(`Attendance not submitted due to some problem`);


        }
    }

    return (
        <View style={tw`flex-1 bg-white px-2`}>
            <View style={tw`flex-row items-center gap-[10px] ml-auto mr-auto my-[20px]`}>
                <AntDesign style={tw`bg-${prevButtonColor} rounded-full  p-2 `} name="left" size={24} color="black" onPress={goToPrevDay} />
                <Text>{formatDate(currentDate)}</Text>
                <AntDesign style={tw`bg-${nextButtonColor} rounded-full  p-2`} name="right" size={24} color="black" onPress={goToNextDay} />

            </View>
            <Pressable style={tw`items-center flex-row gap-[10px]`}>
                <View style={tw`my-[10px] gap-[10px] flex-row `}>
                    <View style={tw`w-[50px] h-[50px] rounded-lg p-[10px] bg-[#4b6cb7] items-center justify-center`}>
                        <Text style={tw`text-white font-bold`}>{params?.name?.charAt(0)}</Text>
                    </View>
                </View>
                <View>
                    <Text style={tw`text-lg font-bold`}>{params?.name}</Text>
                    <Text style={tw`text-sm text-gray-600`}>{params?.designation} ({params?.id})</Text>

                </View>
            </Pressable>
            <Text style={tw`text-lg `}>Basic Pay : {params?.salary} /-</Text>
            <View>
                <Text style={tw`text-lg tracking-widest mt-5 font-bold p-2 bg-indigo-400 rounded-xl px-5 text-white shadow-2xl`}>Attendance</Text>
            </View>
            <View style={tw`mt-5 gap-3 flex-row`}>
                <Pressable style={tw`flex-1 bg-[#C4E0E5] p-3 rounded-xl items-center flex-row gap-3`} onPress={() => setAttendanceStatus("present")}>
                    {attendanceStatus == "present" ? (
                        <>
                            <FontAwesome5 name="dot-circle" size={24} color="green" />

                        </>
                    ) : (
                        <FontAwesome5 name="circle" size={24} color="blue" />

                    )}

                    <Text style={tw`text-lg`}>Present</Text>
                </Pressable>

                <Pressable style={tw` flex-1 bg-[#C4E0E5] p-3 rounded-xl items-center flex-row gap-3`} onPress={() => setAttendanceStatus("absent")}>
                    {attendanceStatus == "absent" ? (
                        <>
                            <FontAwesome5 name="dot-circle" size={24} color="green" />

                        </>
                    ) : (
                        <FontAwesome5 name="circle" size={24} color="blue" />

                    )}

                    <Text style={tw`text-lg`}>Absent</Text>
                </Pressable>
            </View>

            <View style={tw`mt-5 gap-3 flex-row`}>
                <Pressable style={tw`flex-1 bg-[#C4E0E5] p-3 rounded-xl items-center flex-row gap-3`} onPress={() => setAttendanceStatus("halfday")}>
                    {attendanceStatus == "halfday" ? (
                        <>
                            <FontAwesome5 name="dot-circle" size={24} color="green" />

                        </>
                    ) : (
                        <FontAwesome5 name="circle" size={24} color="blue" />

                    )}

                    <Text style={tw`text-lg`}>halfday</Text>
                </Pressable>

                <Pressable style={tw` flex-1 bg-[#C4E0E5]  p-3 rounded-xl items-center flex-row gap-3`} onPress={() => setAttendanceStatus("holiday")}>
                    {attendanceStatus == "holiday" ? (
                        <>
                            <FontAwesome5 name="dot-circle" size={24} color="green" />

                        </>
                    ) : (
                        <FontAwesome5 name="circle" size={24} color="blue" />

                    )}

                    <Text style={tw`text-lg`}>holiday</Text>
                </Pressable>
            </View>


            <View style={tw`flex-row justify-between mt-5`}>
                {/* First Input */}
                <TextInput
                    placeholder="Advance / loans"
                    style={tw`flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 mr-2`}
                />

                {/* Second Input */}
                <TextInput
                    placeholder="Extra Bonus"
                    style={tw`flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2`}
                />
            </View>

            <View style={tw`flex-row items-center justify-center mt-5`}>
                {/* Submit Attendance Button */}
                <Pressable
                    style={tw`flex-1 mx-2 p-3 rounded-lg bg-emerald-600 border-emerald-400 border-2 shadow-lg items-center justify-center`}
                    onPress={submitAttendance}
                >
                    <Text style={tw`text-white font-semibold tracking-wider`}>
                        Submit
                    </Text>
                </Pressable>

                {/* Cancel Button */}
                <Pressable
                    style={tw`flex-1 mx-2 p-3 rounded-lg bg-rose-600 border-rose-400 border-2 shadow-lg items-center justify-center`}
                    onPress={() => router.push("/(home)/markattendance")}
                >
                    <Text style={tw`text-white font-semibold tracking-wider`}>
                        Cancel
                    </Text>
                </Pressable>
            </View>



        </View>
    )
}

export default user

const styles = StyleSheet.create({})