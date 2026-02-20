import React, { useState, ReactNode } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "@/context/theme/ThemeProvider";
import { useNavigationContext } from "@context/navigation/NavigationProvider";
import { createNotificationScreenStyles } from "./styles/NotificationScreen.styles";

// Import icons
import CheckIcon from "@assets/icons/check.svg";
import TrendUpIcon from "@assets/icons/trend-up.svg";
import WalletIcon from "@assets/icons/wallet.svg";
import ShieldIcon from "@assets/icons/shield.svg";
import GoalsIcon from "@assets/icons/goals.svg";
import GiftIcon from "@assets/icons/gift.svg";
import BellIcon from "@assets/icons/bell.svg";
import AlertTriangleIcon from "@assets/icons/alert-triangle.svg";
import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import SettingsIcon from "@assets/icons/settings.svg";
import MailIcon from "@assets/icons/mail.svg";
import MessageCircleIcon from "@assets/icons/message-circle.svg";

type NotificationType = "goal" | "transaction" | "alert" | "security" | "milestone" | "promo" | "reminder" | "market" | "system";

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: ReactNode;
  color: string;
  action: string;
}

const NotificationScreen = () => {
  const [theme] = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createNotificationScreenStyles(theme, width, height);
  const { navigate } = useNavigationContext();

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      type: "goal",
      title: "Hedef Kilometre Taşı! 🎉",
      message: "Yaz Tatili hedefinizin %50'sini biriktirdiniz. Böyle devam!",
      time: "2 dk önce",
      read: false,
      icon: <GoalsIcon width={20} height={20} fill="#f59e0b" stroke="#f59e0b" />,
      color: "#f59e0b",
      action: "Hedefe Git",
    },
    {
      id: "2",
      type: "transaction",
      title: "Para Yatırıldı",
      message: "₺500.00 tasarruf hesabınıza eklendi.",
      time: "1 saat önce",
      read: false,
      icon: <WalletIcon width={20} height={20} fill="#00d4aa" stroke="#00d4aa" />,
      color: "#00d4aa",
      action: "Detayları Gör",
    },
    {
      id: "3",
      type: "alert",
      title: "Harcama Uyarısı",
      message: "Aylık bütçenizin %80'ini harcadınız. Yavaşlamayı düşünün.",
      time: "3 saat önce",
      read: false,
      icon: <AlertTriangleIcon width={20} height={20} fill="#f59e0b" stroke="#f59e0b" />,
      color: "#f59e0b",
      action: "Bütçeyi Gör",
    },
    {
      id: "4",
      type: "security",
      title: "Yeni Giriş Algılandı",
      message: "Hesabınıza New York, ABD'den yeni bir cihaz giriş yaptı.",
      time: "5 saat önce",
      read: true,
      icon: <ShieldIcon width={20} height={20} fill="#6366f1" stroke="#6366f1" />,
      color: "#6366f1",
      action: "İncele",
    },
    {
      id: "5",
      type: "milestone",
      title: "Seri Başarısı!",
      message: "Harika! 12 gün üst üste tasarruf ettiniz. 🔥",
      time: "Dün",
      read: true,
      icon: <TrendUpIcon width={20} height={20} fill="#22c55e" stroke="#22c55e" />,
      color: "#22c55e",
      action: "Paylaş",
    },
    {
      id: "6",
      type: "promo",
      title: "Bonus Faiz Oranı",
      message: "Bu ay tasarruflarınızda %2.5 faiz kazanın. Sınırlı süre!",
      time: "Dün",
      read: true,
      icon: <GiftIcon width={20} height={20} fill="#ec4899" stroke="#ec4899" />,
      color: "#ec4899",
      action: "Daha Fazla",
    },
  ]);

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "unread" | NotificationType>("all");
  const [editMode, setEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteSelected = () => {
    setNotifications((prev) => prev.filter((n) => !selectedItems.includes(n.id)));
    setSelectedItems([]);
    setEditMode(false);
  };

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const filteredNotifications =
    selectedFilter === "all"
      ? notifications
      : selectedFilter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.type === selectedFilter);

  const getTimeColor = (time: string) => {
    if (time.includes("dk") || time.includes("saat")) return theme.StatsHighlightColor;
    if (time.includes("Dün")) return "#f59e0b";
    return theme.StatsLabelColor;
  };

  const renderNotification = (item: NotificationItem) => {
    const isSelected = selectedItems.includes(item.id);

    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.notificationCard,
          !item.read && styles.unreadCard,
          isSelected && styles.selectedCard,
        ]}
        onPress={() => {
          if (editMode) {
            toggleSelection(item.id);
          } else {
            markAsRead(item.id);
          }
        }}
        onLongPress={() => {
          setEditMode(true);
          toggleSelection(item.id);
        }}
        activeOpacity={0.8}
        accessibilityLabel={`${item.title}. ${item.message}`}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected, checked: item.read }}
        accessibilityHint={editMode ? "Seçmek için dokunun" : item.read ? "Bildirim okundu" : "Okundu işaretle"}
      >
        {editMode && (
          <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
            {isSelected && <CheckIcon width={16} height={16} fill="#FFFFFF" stroke="#FFFFFF" />}
          </View>
        )}

        <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
          {item.icon}
        </View>

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={[styles.title, !item.read && styles.unreadTitle]} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={[styles.time, { color: getTimeColor(item.time) }]}>{item.time}</Text>
          </View>
          <Text style={styles.message} numberOfLines={2}>
            {item.message}
          </Text>

          <TouchableOpacity
            style={styles.actionBtn}
            accessibilityLabel={item.action}
            accessibilityRole="button"
            accessibilityHint={`${item.title} için ${item.action}`}
          >
            <Text style={[styles.actionText, { color: item.color }]}>{item.action} →</Text>
          </TouchableOpacity>
        </View>

        {!item.read && !editMode && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigate("Home")}
          accessibilityLabel="Geri"
          accessibilityRole="button"
          accessibilityHint="Ana sayfaya dön"
        >
          <ChevronLeftIcon width={24} height={24} stroke={theme.StatsValueColor} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Bildirimler</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.settingsBtn}
          accessibilityLabel="Bildirim Ayarları"
          accessibilityRole="button"
          accessibilityHint="Bildirim tercihlerinizi düzenleyin"
        >
          <SettingsIcon width={20} height={20} stroke={theme.StatsValueColor} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      {!editMode && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {[
            { id: "all" as const, label: "Tümü", count: notifications.length },
            { id: "unread" as const, label: "Okunmamış", count: unreadCount },
            {
              id: "transaction" as const,
              label: "İşlemler",
              count: notifications.filter((n) => n.type === "transaction").length,
            },
            {
              id: "goal" as const,
              label: "Hedefler",
              count: notifications.filter((n) => n.type === "goal").length,
            },
            {
              id: "alert" as const,
              label: "Uyarılar",
              count: notifications.filter((n) => n.type === "alert").length,
            },
          ].map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[styles.filterBtn, selectedFilter === filter.id && styles.filterBtnActive]}
              onPress={() => setSelectedFilter(filter.id)}
              accessibilityLabel={`${filter.label} bildirimleri`}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedFilter === filter.id }}
              accessibilityHint={`${filter.count} bildirim göster`}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter.id && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
              {filter.count > 0 && (
                <View
                  style={[
                    styles.filterBadge,
                    selectedFilter === filter.id && styles.filterBadgeActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterBadgeText,
                      selectedFilter === filter.id && styles.filterBadgeTextActive,
                    ]}
                  >
                    {filter.count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Edit Mode Header */}
      {editMode && (
        <View style={styles.editHeader}>
          <Text style={styles.editText}>{selectedItems.length} seçildi</Text>
          <View style={styles.editActions}>
            <TouchableOpacity
              onPress={() => {
                setEditMode(false);
                setSelectedItems([]);
              }}
              accessibilityLabel="İptal"
              accessibilityRole="button"
              accessibilityHint="Düzenleme modundan çık"
            >
              <Text style={styles.editCancel}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={deleteSelected}
              accessibilityLabel="Seçilenleri Sil"
              accessibilityRole="button"
              accessibilityHint={`${selectedItems.length} bildirimi sil`}
            >
              <Text style={styles.editDelete}>Sil</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Mark All as Read */}
      {!editMode && unreadCount > 0 && (
        <TouchableOpacity
          style={styles.markAllBtn}
          onPress={markAllAsRead}
          accessibilityLabel="Tümünü okundu işaretle"
          accessibilityRole="button"
          accessibilityHint={`${unreadCount} okunmamış bildirimi okundu işaretle`}
        >
          <CheckIcon width={20} height={20} fill={theme.StatsHighlightColor} stroke={theme.StatsHighlightColor} />
          <Text style={styles.markAllText}>Tümünü okundu işaretle</Text>
        </TouchableOpacity>
      )}

      {/* Notifications List */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <BellIcon width={64} height={64} stroke={theme.StatsLabelColor} />
            <Text style={styles.emptyTitle}>Bildirim yok</Text>
            <Text style={styles.emptyText}>
              Her şey tamamlandı! Güncellemeler için daha sonra tekrar kontrol edin.
            </Text>
          </View>
        ) : (
          <>
            {filteredNotifications.map(renderNotification)}
            <View style={styles.bottomPadding} />
          </>
        )}
      </ScrollView>

      {/* Notification Preferences */}
      <View style={styles.preferencesCard}>
        <Text style={styles.preferencesTitle}>Bildirim Tercihleri</Text>

        <View style={styles.preferenceItem}>
          <View style={styles.preferenceLeft}>
            <BellIcon width={20} height={20} fill={theme.StatsHighlightColor} stroke={theme.StatsHighlightColor} />
            <View style={styles.preferenceTextContainer}>
              <Text style={styles.preferenceName}>Push Bildirimleri</Text>
              <Text style={styles.preferenceDesc}>Anında bildirim alın</Text>
            </View>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: theme.StatsPeriodButtonBgColor, true: theme.StatsHighlightColor }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.preferenceItem}>
          <View style={styles.preferenceLeft}>
            <MailIcon width={20} height={20} stroke={theme.StatsHighlightColor} />
            <View style={styles.preferenceTextContainer}>
              <Text style={styles.preferenceName}>E-posta Bildirimleri</Text>
              <Text style={styles.preferenceDesc}>Haftalık özetler</Text>
            </View>
          </View>
          <Switch
            value={emailEnabled}
            onValueChange={setEmailEnabled}
            trackColor={{ false: theme.StatsPeriodButtonBgColor, true: theme.StatsHighlightColor }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.preferenceItem}>
          <View style={styles.preferenceLeft}>
            <MessageCircleIcon width={20} height={20} stroke={theme.StatsHighlightColor} />
            <View style={styles.preferenceTextContainer}>
              <Text style={styles.preferenceName}>SMS Uyarıları</Text>
              <Text style={styles.preferenceDesc}>Sadece güvenlik kodları</Text>
            </View>
          </View>
          <Switch
            value={smsEnabled}
            onValueChange={setSmsEnabled}
            trackColor={{ false: theme.StatsPeriodButtonBgColor, true: theme.StatsHighlightColor }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>
    </View>
  );
};

export default NotificationScreen;
