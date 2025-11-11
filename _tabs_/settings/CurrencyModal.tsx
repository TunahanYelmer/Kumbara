import React, { useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent
} from "react-native";
import { useDataLayerValue } from "@/context/state/StateProvider";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createCurrencyModalStyles } from "./styles/CurrencyModal.styles";


interface CurrencyModalProps {
  modalVisible: boolean;
  onClose: () => void;
}

const currencies = [
  { code: "TRY", symbol: "₺", name: "Turkish Lira" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" }
];
const ITEM_HEIGHT = 40;


const CurrencyModal = ({ modalVisible , onClose}: CurrencyModalProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [{ Currency }, dispatch] = useDataLayerValue();
  const [theme] = useTheme();
  const styles = createCurrencyModalStyles(theme , ITEM_HEIGHT);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    if (index !== selectedIndex) {
      setSelectedIndex(index);
    }
  };

  const handleSelect = () => {
    dispatch({
      type: "SET_CURRENCY",
      Currency: [currencies[selectedIndex]]
    });
    onClose();
  };

  return (
    <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={ onClose }>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.container}>
            <ScrollView
              ref={scrollRef}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onScroll={handleScroll}
              scrollEventThrottle={16}
              contentContainerStyle={{
                // This ensures items are centered around the middle line
                paddingVertical: ITEM_HEIGHT * 2
              }}
            >
              {currencies.map((item, index) => (
                <View
                  key={item.code}
                  style={[
                    styles.item,
                    index === selectedIndex && styles.selectedItem
                  ]}
                >
                  <Pressable onPress={handleSelect}>
                    <Text
                      style={[
                        styles.text,
                        index === selectedIndex && styles.selectedText
                      ]}
                    >
                      {item.symbol} {item.name}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>

            {/* Center highlight frame */}
            <View style={styles.centerOverlay} />
          </View>
        </View>
      </View>
    </Modal>
  );
};



export default CurrencyModal;
