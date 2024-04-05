import { useState } from 'react'
import { 
  View, 
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { useRouter } from 'expo-router'
import styles from './nearbyjobs.style'
import { COLORS } from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import useFetch from '../../../hook/useFetch'
import { searchJob } from '../../../temp/tempData'

const Nearbyjobs =  () => {
  const router = useRouter()
  const [data, setData] = useState(searchJob.data)
  // const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  // useFetch(
  //   'search',
  //   {
  //     query: 'React developer',
  //     num_pages: 1,

  //   }
  // ).then(res => {
  //   setData(res?.data)
  //   setIsLoading(res?.isLoading)
  //   setError(error?.error)
  // })


  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.header}
      >
        <Text
          style={styles.headerTitle}
        >
          Nearby jobs
        </Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View
        style={styles.cardsContainer}
      >
        {
          isLoading 
          ? (
            <ActivityIndicator size='large' color={COLORS.primary}/>
          )
          : error
            ? (
              <Text>Something went wrong</Text>
            )
            : (
              data?.map(job => (
                <NearbyJobCard 
                  job={job}
                  key={`nearby-job-${job?.job_id}`}
                  handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
                />
              ))
            )
        }
      </View>
    </View>
  )
}

export default Nearbyjobs