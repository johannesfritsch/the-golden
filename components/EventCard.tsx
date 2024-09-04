import { Image } from 'expo-image';
import { Dimensions, Text, View } from 'react-native'
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from "react-native-reanimated";
import { useRef } from 'react';

export type EventCardProps = {
    event: {
        id: number
        name: string
        date: string
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
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                source={{ uri: item }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }} />
                        </View>
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
            <View style={{ paddingVertical: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>{event.name}</Text>
                <Text style={{ fontWeight: 'normal' }}>{event.description}</Text>
            </View>
        </View>
    )
}

export default EventCard