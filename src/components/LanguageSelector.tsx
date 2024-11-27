import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from './theme/ThemeContext';
import { ChevronDown } from 'lucide-react-native';

const languages = [
  { code: 'en', name: 'English', flag: require('../assets/flags/en.png') },
  { code: 'fr', name: 'Français', flag: require('../assets/flags/fr.png') },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.background, borderColor: theme.border }]}
        onPress={() => setModalVisible(true)}
      >
        <Image source={currentLanguage.flag} style={styles.flag} />
        <Text style={[styles.buttonText, { color: theme.foreground }]}>{currentLanguage.code.toUpperCase()}</Text>
        <ChevronDown size={16} color={theme.foreground} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <FlatList
              data={languages}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.languageItem, { borderBottomColor: theme.border }]}
                  onPress={() => changeLanguage(item.code)}
                >
                  <Image source={item.flag} style={styles.flag} />
                  <Text style={[styles.languageName, { color: theme.foreground }]}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  buttonText: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  flag: {
    width: 24,
    height: 16,
    borderRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '50%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  languageName: {
    marginLeft: 12,
    fontSize: 16,
  },
});

export default LanguageSelector;