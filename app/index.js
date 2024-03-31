import { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { COLORS, SIZES } from '../constants'
import { ScreenHeaderBtn, Welcome, Popularjobs, Nearbyjobs } from '../components'

const Home = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn />
                    ),
                    headerTitle: ""
                }}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >
                    <Welcome />
                    <Popularjobs/>
                    <Nearbyjobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home