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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12
  },
  container: {
    height: ITEM_HEIGHT * 5,
    width: "100%",
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: "#f8f8f8"
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  selectedItem: {
    backgroundColor: "#cfd9ff", // blended blue-gray
    width: "100%",
    height: ITEM_HEIGHT + 2, // extend 1px top & bottom
    justifyContent: "center",
    alignItems: "center",
    marginVertical: -1 // perfectly aligns under center overlay borders
  },
  text: {
    fontSize: 17,
    color: "#555"
  },
  selectedText: {
    color: "#1a237e",
    fontWeight: "700"
  },
  centerOverlay: {
    position: "absolute",
    top: (ITEM_HEIGHT * 5) / 2 - ITEM_HEIGHT / 2,
    width: "100%",
    height: ITEM_HEIGHT,
    borderColor: "#1a237e",
    backgroundColor: "#C8D2FF)", // softer translucent blue
    pointerEvents: "none"
  },
  closeButton: {
    marginTop: 18,
    backgroundColor: "#1a237e",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 10
  },
  closeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.3
  }
});

export default CurrencyModal;
