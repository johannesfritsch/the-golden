import { RefreshControl, ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { ReactNode } from 'react';
import CText from './CText';

export type LayoutProps = {
  children: ReactNode;
  topElement?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  bottomElement?: ReactNode;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  error?: { message: string };
  refetch?: () => void;
};

const Layout = ({ children, topElement, header, footer, bottomElement, style, loading = false, error, refetch = () => {} }: LayoutProps) => {
  const bottomSpacerHeight = 50;

  return (
    <View style={[style, { height: '100%', backgroundColor: 'white' }]}> 
      {topElement}
      {loading && <View style={{ flexGrow: 1, paddingBottom: 90 }}><CText type='normal'>Loading...</CText></View>}
      {error && (
        <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <CText type={'h3'}>An error occured</CText>
          <CText type='normal'>{error.message}</CText>
        </View>
      )}
      {!loading && !error && (
        <ScrollView style={{ flexGrow: 1, backgroundColor: 'white' }}>
          <RefreshControl refreshing={!!loading} onRefresh={refetch} />
          {header}
          <View style={{ padding: 20 }}>{children}</View>
          {footer || <View style={{ height: bottomSpacerHeight }} />}
        </ScrollView>
      )}
      {!loading && !error && bottomElement}
    </View>
  );
};

export default Layout;
