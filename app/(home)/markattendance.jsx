import { Pressable, ScrollView, StyleSheet, Text, Vibration, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from "twrnc";
import moment from "moment";
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

const markattendance = () => {
    const router = useRouter();

    const [currentDate, setCurrentDate] = useState(moment());
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
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

    useEffect(() => {

        const fetchAttendanceDate = async () => {
            try {

                const res = await axios.get(`http://192.168.1.7:8000/api/attendance`, {
                    params: {
                        date: currentDate.format("MMMM D, YYYY"),

                    }
                });
                setAttendance(res.data);


            } catch (error) {
                console.log("Error fetching attendace data ", error);
            }
        }

        fetchAttendanceDate();
    }, [currentDate]);

    const employeeWithAttendance = employees.map(employee => {
        const attRecord = attendance.find(record => record.employeeId === employee.employeeId)
        return {
            ...employee,
            status: attRecord ? attRecord.status : "",

        }
    });







    return (
        <View style={tw`flex-1 bg-white px-2`}>
            <Pressable>
                <View style={tw`flex-row items-center gap-[10px] ml-auto mr-auto my-[20px]`}>
                    <AntDesign style={tw`bg-${prevButtonColor} rounded-full  p-2 `} name="left" size={24} color="black" onPress={goToPrevDay} />
                    <Text>{formatDate(currentDate)}</Text>
                    <AntDesign style={tw`bg-${nextButtonColor} rounded-full  p-2`} name="right" size={24} color="black" onPress={goToNextDay} />

                </View>

                <ScrollView >
                    <View style={tw`gap-2 px-2`}>

                        {employeeWithAttendance.map((item, index) => (
                            <Pressable key={index} style={tw`flex-row items-center gap-[10px] bg-slate-100 px-2 rounded-xl`}
                                onPress={() => {
                                    router.push({
                                        pathname: "/[user]",
                                        params: {
                                            name: item?.employeeName,
                                            id: item?.employeeId,
                                            salary: item?.salary,
                                            designation: item?.designation
                                        }
                                    })
                                }}

                            >
                                <View style={tw`my-[10px]  flex-row items-center justify-between`}>
                                    <View style={tw`flex-row gap-[10px] flex-1`}>

                                        <View style={tw`w-[50px] h-[50px] rounded-lg p-[10px] bg-[#4b6cb7] items-center justify-center`}>
                                            <Text style={tw`text-white font-bold`}>{item?.employeeName?.charAt(0)}</Text>
                                        </View>
                                        <View>
                                            <Text style={tw`text-lg font-bold`}>{item?.employeeName}</Text>
                                            <Text style={tw`text-sm text-gray-600`}>{item?.designation} ({item?.employeeId})</Text>

                                        </View>
                                    </View>
                                    {item?.status && (
                                        <View>
                                            <AntDesign style={tw``} name="checkcircle" size={24} color="blue" />
                                        </View>

                                    )}
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>
            </Pressable>
        </View>
    )
}

export default markattendance

const styles = StyleSheet.create({})