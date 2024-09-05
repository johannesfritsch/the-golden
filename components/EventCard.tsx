import { Image } from 'expo-image';
import { Dimensions, Pressable, Text, View } from 'react-native'
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from "react-native-reanimated";
import { useRef } from 'react';
import { router } from 'expo-router';
import { format } from 'date-fns'
import { getCountry, getLocales } from 'react-native-localize';

export type EventCardProps = {
    event: {
        id: number
        name: string
        days: number
        nights: number
        windowStart: string
        windowEnd: string
        location: string
        images: string[]
        description: string
        price: {
            currency: string
            currencySymbol: string
            value: number
        }
    }
}

const EventCard = ({ event }: EventCardProps) => {
    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const ratio = 0.667708333333333;

    return (
        <View key={event.id} style={{ paddingBottom: 10, marginBottom: 15 }}>
            <View style={{ height: Dimensions.get('window').width * ratio }}>
                <Carousel
                    loop={false}
                    width={Dimensions.get('window').width - 40}
                    height={Dimensions.get('window').width * ratio}
                    onConfigurePanGesture={gestureChain => (
                        gestureChain.activeOffsetX([-10, 10])
                    )}
                    style={{
                        borderRadius: 15,
                    }}
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
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{event.name}</Text>
                    <Text style={{ fontWeight: 'normal', fontSize: 16 }}>{format(Date.parse(event.windowStart), 'MMMM yyyy')}</Text>
                </View>
                <Text style={{ fontWeight: 'normal', fontSize: 16 }}>{event.description}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{event.price.currencySymbol} {event.price.value}</Text>
                    <Text style={{ fontSize: 16 }}> | {event.days} days</Text>
                </View>
            </View>

        </View>
    )
}

export default EventCard