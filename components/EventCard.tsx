import { Image } from 'expo-image';
import { Dimensions, Pressable, Text, View } from 'react-native'
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from "react-native-reanimated";
import { useRef } from 'react';
import { Link, router } from 'expo-router';

export type EventCardProps = {
    event: {
        id: number
        name: string
        startDate: string
        endDate: string
        location: string
        images: string[]
        description: string
    }
}

const EventCard = ({ event }: EventCardProps) => {
    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const ratio = 0.667708333333333;

    return (
        <View key={event.id} style={{ paddingBottom: 10 }}>
            <View style={{ height: Dimensions.get('window').width * ratio, borderRadius: 10 }}>
                <Carousel
                    loop={false}
                    width={Dimensions.get('window').width - 20}
                    height={Dimensions.get('window').width * ratio}
                    onConfigurePanGesture={gestureChain => (
                        gestureChain.activeOffsetX([-10, 10])
                    )}
                    data={event.images}
                    scrollAnimationDuration={200}
                    onSnapToItem={(index) => console.log('current index:', index)}
                    onProgressChange={progress}
                    renderItem={({ item }) => (
                        <Pressable style={{
                            flex: 1,
                            justifyContent: 'center',
                        }} onPress={() => router.push(`/events/${event.id}`)}>

                            <Image
                                source={{ uri: item }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }} />

                        </Pressable>
                    )}
                />

                <Pagination.Basic
                    progress={progress}
                    data={event.images}
                    dotStyle={{ backgroundColor: "rgba(255,255,255,1)", borderRadius: 50 }}
                    activeDotStyle={{ backgroundColor: "#FFCC81", borderRadius: 50 }}
                    containerStyle={{ gap: 5, marginBottom: 10 }}
                    size={10}
                />

            </View>
            <View style={{ paddingVertical: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>{event.name}</Text>
                    <Text style={{ fontWeight: 'normal' }}>{event.startDate}</Text>
                </View>
                <Text style={{ fontWeight: 'normal' }}>{event.description}</Text>
            </View>

        </View>
    )
}

export default EventCard