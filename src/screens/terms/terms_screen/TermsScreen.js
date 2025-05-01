import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { styles } from './terms_screen_style';
import { useNavigation } from '@react-navigation/native';
import BeforeNavigator from '../../../navigations/BeforeNavigator';

export default function TermsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        {/* 이전 버튼 */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginBottom: 20 }}
        >
          <BeforeNavigator onPress={() => navigation.goBack()} />
        </TouchableOpacity>

        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.title}>
            TOnePick에서{"\n"}사용되는 권한입니다.
          </Text>
          <Text style={styles.subTitle}>
            선택 권한을 허용하지 않아도 앱을 사용할 수 있으나{"\n"}일부 기능이 제한될 수 있어요
          </Text>
        </View>

        {/* 권한 항목 */}
        <View style={styles.permissionList}>
          {/* 마이크 권한 */}
          <View style={styles.permissionItem}>
            <View style={styles.permissionRow}>
              <Image source={require('../../../../assets/mic.png')} style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={styles.permissionTitle}>마이크 (필수)</Text>
                <Text style={styles.permissionDesc}>
                  녹음 및 음성 인식 기능 제공을 위해 사용됩니다.
                </Text>
              </View>
            </View>
          </View>

          {/* 파일 권한 */}
          <View style={styles.permissionItem}>
            <View style={styles.permissionRow}>
              <Image source={require('../../../../assets/upload.png')} style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={styles.permissionTitle}>파일 첨부 (필수)</Text>
                <Text style={styles.permissionDesc}>
                  녹음 파일 및 관련 자료를 업로드하기 위해 사용됩니다.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 완료 버튼 */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => navigation.navigate('PermissionsScreen')}
          >
            <Text style={styles.completeButtonText}>완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
