import {useCallback, useState} from 'react'
import { 
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl
} from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { 
    Company,
    JobTabs,
    JobAbout,
    JobFooter,
    Specifics,
    ScreenHeaderBtn
} from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import useFetch from '../../hook/useFetch'

const JobDetails = () => {
    const params = useLocalSearchParams()
    const router = useRouter()
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    useFetch(
        'job-details',
        {
            job_id: params.id,    
        }
    ).then(res => {
        setData(res?.data)
        setIsLoading(res?.isLoading)
        setError(error?.error)
    })
    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = () => {}


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.share}
                            dimension='60%'
                        />
                    ),
                    headerTitle: ''
                }}
            />
            <>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                    {
                        isLoading 
                        ? <ActivityIndicator size='large' color={COLORS.primary} />
                        : error
                            ? <Text>Something went wrong</Text>
                            : data.length === 0 
                                ? <Text>No data</Text>
                                : (
                                    <View
                                        style={{padding: SIZES.medium, paddingBottom: 100}}
                                    >
                                        <Company 
                                            companyLogo={data[0].employer_logo}
                                            jobTitle={data[0].job_title}
                                            companyName={data[0].employer_name}
                                            location={data[0].job_country}
                                        />
                                        <JobTabs />
                                    </View>
                                )
                    }
                </ScrollView>
            </>
        </SafeAreaView>
    )
}

export default JobDetails