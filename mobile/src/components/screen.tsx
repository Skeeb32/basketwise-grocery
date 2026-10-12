import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const colors = {
  ink: '#202820', muted: '#747d73', line: '#e5e9df', paper: '#f5f6f0', white: '#ffffff',
  green: '#2e673d', greenDark: '#214d30', mint: '#e8f0e6', gold: '#f6eee0', soft: '#fafbf8',
};

export function AppScreen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Eyebrow({ children }: PropsWithChildren) {
  return <Text style={styles.eyebrow}>{children}</Text>;
}

export function ScreenTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.titleWrap}>
      <Eyebrow>GOSHEN PILOT · SAMPLE DATA</Eyebrow>
      <Text accessibilityRole="header" style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

export function SectionTitle({ title, trailing }: { title: string; trailing?: string }) {
  return (
    <View style={styles.sectionRow}>
      <Text accessibilityRole="header" style={styles.sectionTitle}>{title}</Text>
      {trailing ? <Text style={styles.sectionTrailing}>{trailing}</Text> : null}
    </View>
  );
}

export function SampleNotice({ children = 'Prototype prices are illustrative, not live retailer prices.' }: PropsWithChildren) {
  return (
    <View accessibilityRole="alert" style={styles.notice}>
      <Text style={styles.noticeIcon}>i</Text>
      <Text style={styles.noticeText}>{children}</Text>
    </View>
  );
}

export function Surface({ children, style }: PropsWithChildren<{ style?: object }>) {
  return <View style={[styles.surface, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  content: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 28, gap: 16 },
  eyebrow: { color: '#7c897a', fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  titleWrap: { gap: 7, paddingTop: 10, paddingBottom: 2 },
  title: { color: colors.ink, fontSize: 29, lineHeight: 34, fontWeight: '800', letterSpacing: -0.8 },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: '700' },
  sectionTrailing: { color: colors.muted, fontSize: 12 },
  notice: { flexDirection: 'row', gap: 9, alignItems: 'flex-start', padding: 12, borderRadius: 9, backgroundColor: '#edf0e8' },
  noticeIcon: { color: colors.green, fontSize: 13, fontWeight: '800', width: 18, height: 18, textAlign: 'center', borderRadius: 9, backgroundColor: '#dce8d8', overflow: 'hidden', paddingTop: 1 },
  noticeText: { color: '#556052', fontSize: 11, lineHeight: 16, flex: 1 },
  surface: { backgroundColor: colors.white, borderColor: colors.line, borderWidth: 1, borderRadius: 11, padding: 14 },
});
