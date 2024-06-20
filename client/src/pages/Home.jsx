import Card from '../components/Card'
import PostEmergency from '../components/PostEmergency'

const Home = () => {
    return (
        <div className='flex flex-row flex-wrap space-x-5 justify-evenly space-y-5'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <PostEmergency/>
        </div>
    )
}

export default Home
