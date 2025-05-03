// analytics/index.tsx
import { InteractionManager, View } from "react-native";
import { useSelector } from "react-redux";
import PageContainer from "../../../../components/PageContainer";
import CommonText from "../../../../components/CommonText";
import { Tag, Contact } from "../../../../utils/types";
import getTheme from "../../../../utils/GetTheme";
import TagPercentageChart from "../../../../components/analytics/TagPercentageChart";
import TopTagPair from "../../../../components/analytics/TopTagPair";
import CoOccurenceGraph from "../../../../components/analytics/CoOccurenceGraph";
import { router, usePathname } from "expo-router";
import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const contacts: Contact[] = useSelector((s: any) => s.contacts);
  const tags: Tag[] = useSelector((s: any) => s.tags);
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => setReady(true));
    return () => task.cancel();
  }, []);

  if (!ready) return null;
  return (
    <PageContainer scrollEnabled style={{ paddingBottom: 200 }}>
      <View style={{ height: 25 }} />
      <CommonText size="small" weight="regular">
        My Network
      </CommonText>
      <View style={{ height: 10 }} />
      <CoOccurenceGraph contacts={contacts} tags={tags} />
      <View style={{ height: 25 }} />
      <CommonText size="small" weight="regular">
        Percent of Contacts With Tag (%)
      </CommonText>
      <View style={{ height: 10 }} />
      <TagPercentageChart contacts={contacts} tags={tags} />
      <View style={{ height: 25 }} />
      <CommonText size="small" weight="regular">
        Most Common Tag Pair
      </CommonText>
      <View style={{ height: 10 }} />
      <TopTagPair tags={tags} contacts={contacts} />
    </PageContainer>
  );
}
