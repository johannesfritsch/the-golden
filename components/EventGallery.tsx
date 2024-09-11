import { Dimensions, Pressable, View, Text } from "react-native"
import Carousel, { Pagination } from "react-native-reanimated-carousel"
import { Image } from 'expo-image';
import { useEffect, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import { Event } from "@/data/event";
import { formatDistance, intervalToDuration } from "date-fns";
import CText from "./CText";

export type EventGalleryProps = {
    event: Event;
    onPress: () => void;
    fullWidth?: boolean;
    hideLabels?: boolean;
}

const EventGallery = ({ event, onPress, fullWidth = false, hideLabels = false }: EventGalleryProps) => {
    const progress = useSharedValue<number>(0);
    const [topRightLabel, setTopRightLabel] = useState<string | null>(null);

    const ratio = 0.667708333333333;

    const calculateTimeLeft = () => {
        const now = new Date();
        const distance = intervalToDuration({ start: now, end: Date.parse(event.windowStart) });
        if (!distance.years && !distance.months && !distance.days && (distance.hours && distance.hours <= 24)) {
            // Last 24h
            setTopRightLabel(`${((distance.days || 0) * 24 + (distance.hours || 0)).toString().padStart(2, '0')}h ${(distance.minutes || 0).toString().padStart(2, '0')}m ${(distance.seconds || 0).toString().padStart(2, '0')}s`);
        } else if (!distance.years && !distance.months && distance.days) {
            setTopRightLabel(formatDistance(event.windowStart, now, { addSuffix: true }));
        } else {
            setTopRightLabel(event.type === 'peer_reviewed' ? 'Peer Review' : 'Open Guest List');
        }
    }

    useEffect(() => {
        const interval = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={{ height: Dimensions.get('window').width * ratio }}>
            <Carousel
                loop={false}
                width={Dimensions.get('window').width - (fullWidth ? 0 : 40)}
                height={Dimensions.get('window').width * ratio}
                onConfigurePanGesture={gestureChain => (
                    gestureChain.activeOffsetX([-10, 10])
                )}
                style={{
                    borderRadius: fullWidth ? 0 : 15,
                }}
                data={event.images}
                scrollAnimationDuration={200}
                onSnapToItem={(index) => console.log('current index:', index)}
                onProgressChange={progress}
                renderItem={({ item }) => (
                    <Pressable style={{
                        flex: 1,
                        justifyContent: 'center',
                    }} onPress={onPress}>

                        <Image
                            source={{ uri: item }}
                            style={{
                                width: '100%',
                                height: '100%',
                            }} />

                    </Pressable>
                )}
            />

            {!hideLabels && topRightLabel && <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'white', padding: 10, borderRadius: 20, shadowOpacity: 0.2, shadowRadius: 2, shadowColor: 'black', shadowOffset: { width: 0, height: 3 } }}><CText type="h3">{topRightLabel}</CText></View>}

            <Pagination.Basic
                progress={progress}
                data={event.images}
                dotStyle={{ backgroundColor: "rgba(255,255,255,1)", borderRadius: 50 }}
                activeDotStyle={{ backgroundColor: "#B29146", borderRadius: 50 }}
                containerStyle={{ gap: 5, marginBottom: 10 }}
                size={12}
            />

        </View>

    )
}

export default EventGallery