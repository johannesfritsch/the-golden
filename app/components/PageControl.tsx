import { Pressable, View } from "react-native"

export type PageControlProps = {
    currentPage: number;
    totalPages: number;
    onPagePress?: (index: number) => void;
}

const PageControl = ({ currentPage, totalPages, onPagePress }: PageControlProps) => {


    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, width: '100%' }}>
            {Array.from({ length: totalPages }, (_, i) => (
                <Pressable style={{ flexGrow: 1, paddingVertical: 15 }} key={i} onPress={() => {
                    if (onPagePress) {
                        onPagePress(i)
                    }
                }}><View style={{ height: 10, backgroundColor: i <= currentPage ? '#B29146' : '#CCC', borderRadius: 10 / 2 }}></View></Pressable>
            ))}
        </View>
    )
}

export default PageControl